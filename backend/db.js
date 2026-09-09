import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, existsSync } from 'fs';
import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { DATA_DIR, UPLOADS_DIR, DB_FILE, ITEM_CATEGORIES } from './config.js';

let db;

export function uid() {
  return Date.now().toString(36) + randomBytes(3).toString('hex');
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS admins (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  username             TEXT NOT NULL UNIQUE,
  password_hash        TEXT NOT NULL,
  must_change_password INTEGER NOT NULL DEFAULT 0,
  created_at           TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS menu_items (
  id            TEXT PRIMARY KEY,
  restaurant_id TEXT NOT NULL DEFAULT 'micasita',
  category      TEXT NOT NULL,
  name          TEXT NOT NULL,
  badge         TEXT,
  price         REAL NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  ingredients   TEXT NOT NULL DEFAULT '[]',
  available     INTEGER NOT NULL DEFAULT 1,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  image_url     TEXT,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_menu_sort ON menu_items(sort_order);

CREATE TABLE IF NOT EXISTS analytics (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id     TEXT NOT NULL,
  event_type  TEXT NOT NULL,
  visitor_id  TEXT NOT NULL DEFAULT 'anon',
  source      TEXT,
  day         TEXT NOT NULL,
  recorded_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_an_item  ON analytics(item_id, event_type);
CREATE INDEX IF NOT EXISTS idx_an_day   ON analytics(day);
CREATE UNIQUE INDEX IF NOT EXISTS idx_an_view_once
  ON analytics(visitor_id, item_id, day) WHERE event_type = 'view';

CREATE TABLE IF NOT EXISTS cuentas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  mesa        TEXT NOT NULL,
  estado      TEXT NOT NULL DEFAULT 'abierta',
  abierta_at  TEXT NOT NULL,
  cobro_at    TEXT,
  cerrada_at  TEXT,
  subtotal    REAL,
  iva         REAL,
  total       REAL,
  metodo_pago TEXT,
  recibido    REAL,
  cambio      REAL,
  cerrada_por TEXT,
  corte_id    INTEGER
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_cuenta_mesa_viva
  ON cuentas(mesa) WHERE estado <> 'cerrada';
CREATE INDEX IF NOT EXISTS idx_cuentas_corte ON cuentas(corte_id);

CREATE TABLE IF NOT EXISTS ordenes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  cuenta_id  INTEGER NOT NULL REFERENCES cuentas(id),
  estado     TEXT NOT NULL DEFAULT 'nueva',
  nota       TEXT,
  visitor_id TEXT,
  creada_at  TEXT NOT NULL,
  tocada_at  TEXT
);
CREATE INDEX IF NOT EXISTS idx_ordenes_cuenta ON ordenes(cuenta_id);

CREATE TABLE IF NOT EXISTS orden_items (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  orden_id INTEGER NOT NULL REFERENCES ordenes(id),
  item_id  TEXT,
  nombre   TEXT NOT NULL,
  detalle  TEXT,
  precio   REAL NOT NULL,
  cantidad INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_orden_items ON orden_items(orden_id);

CREATE TABLE IF NOT EXISTS cortes (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  desde_at      TEXT,
  hasta_at      TEXT,
  cerrado_at    TEXT NOT NULL,
  cerrado_por   TEXT,
  cuentas       INTEGER NOT NULL DEFAULT 0,
  subtotal      REAL NOT NULL DEFAULT 0,
  iva           REAL NOT NULL DEFAULT 0,
  total         REAL NOT NULL DEFAULT 0,
  efectivo      REAL NOT NULL DEFAULT 0,
  tarjeta       REAL NOT NULL DEFAULT 0,
  transferencia REAL NOT NULL DEFAULT 0,
  declarado     REAL,
  diferencia    REAL,
  nota          TEXT,
  fondo_inicial REAL,
  fondo_dejado  REAL,
  retiro        REAL,
  tipo          TEXT
);
`;

export async function initDB() {
  mkdirSync(DATA_DIR, { recursive: true });
  mkdirSync(UPLOADS_DIR, { recursive: true });

  db = new DatabaseSync(DB_FILE);
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA synchronous = NORMAL');

  try { db.exec("ALTER TABLE menu_items ADD COLUMN restaurant_id TEXT NOT NULL DEFAULT 'micasita'"); } catch {}
  try { db.exec("ALTER TABLE cuentas ADD COLUMN restaurant_id TEXT NOT NULL DEFAULT 'micasita'"); } catch {}

  db.exec(SCHEMA);

  try { db.exec("CREATE INDEX IF NOT EXISTS idx_menu_rest ON menu_items(restaurant_id)"); } catch {}

  await seed();

  const n = db.prepare('SELECT COUNT(*) c FROM menu_items').get().c;
  console.log(`✅ Base de datos SQLite inicializada (${n} platillos) → ${DB_FILE}`);
  return db;
}

async function seed() {
  const countGaribaldi = db.prepare("SELECT COUNT(*) c FROM menu_items WHERE restaurant_id = 'garibaldi'").get().c;
  const countTotal = db.prepare('SELECT COUNT(*) c FROM menu_items').get().c;

  if (countTotal === 0 || countGaribaldi === 0) {
    const { menuItems } = await import('./seed-menu.js');
    const now = new Date().toISOString();

    const hasOld = db.prepare("SELECT COUNT(*) c FROM menu_items WHERE id IN ('tacos-al-pastor', 'tacos-de-suadero', 'tacos-de-birria')").get().c;
    if (hasOld > 0) {
      db.prepare("DELETE FROM menu_items WHERE id IN ('tacos-al-pastor', 'tacos-de-suadero', 'tacos-de-birria', 'tacos-carnitas', 'enchiladas-verdes', 'sopes-del-valle', 'gringas-al-pastor', 'quesadillas-flor-calabaza', 'molcajete-mi-casita', 'flan-abuela', 'tres-leches-artesanal', 'churros-azucar', 'agua-horchata', 'agua-jamaica', 'margarita-clasica', 'mezcalita-artesanal', 'cerveza-artesanal')").run();
    }

    const ins = db.prepare(`INSERT OR REPLACE INTO menu_items
      (id, restaurant_id, category, name, badge, price, description, ingredients, available, sort_order, image_url, created_at, updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    db.exec('BEGIN');
    menuItems.forEach((it, i) => ins.run(
      it.id, it.restaurant_id || 'micasita', it.category, it.name, it.badge ?? null, it.price, it.description || '',
      JSON.stringify(it.ingredients || []), it.available === false ? 0 : 1, i, it.image_url ?? null, now, now
    ));
    db.exec('COMMIT');
    console.log(`✅ Menús sembrados para Mi Casita y Garibaldi: ${menuItems.length} platillos en total.`);
  }

  if (db.prepare('SELECT COUNT(*) c FROM admins').get().c === 0) {
    const pass = randomBytes(9).toString('base64url');
    const hash = await bcrypt.hash(pass, 12);
    db.prepare(
      'INSERT INTO admins (username, password_hash, must_change_password, created_at) VALUES (?,?,1,?)'
    ).run('casita_admin', hash, new Date().toISOString());
    console.log(
      '\n┌───────────────────────────────────────────────────────────┐\n' +
      '│  ADMINISTRADOR CREADO (Mi Casita & Garibaldi)             │\n' +
      '│  usuario: casita_admin                                    │\n' +
      `│  clave:   ${pass.padEnd(48)}│\n` +
      '│  El panel requerirá cambiarla al iniciar sesión.          │\n' +
      '└───────────────────────────────────────────────────────────┘\n'
    );
  }
}

function rowToItem(r) {
  if (!r) return null;
  let ingredients = [];
  try { ingredients = JSON.parse(r.ingredients); } catch {  }
  return { ...r, available: !!r.available, ingredients: Array.isArray(ingredients) ? ingredients : [] };
}

export function listMenu({ restaurant_id = null, restaurant = null, onlyAvailable = false } = {}) {
  const rest = restaurant_id || restaurant || null;
  let sql = 'SELECT * FROM menu_items WHERE 1=1';
  const params = [];
  if (rest) {
    sql += ' AND restaurant_id = ?';
    params.push(rest);
  }
  if (onlyAvailable) {
    sql += ' AND available = 1';
  }
  sql += ' ORDER BY sort_order, name';
  return db.prepare(sql).all(...params).map(rowToItem);
}

export function getMenuItem(id) {
  return rowToItem(db.prepare('SELECT * FROM menu_items WHERE id = ?').get(id));
}

export function createMenuItem(data) {
  const now = new Date().toISOString();
  const id = uid();
  const restId = data.restaurant_id || 'micasita';
  const next = db.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 n FROM menu_items WHERE restaurant_id = ?').get(restId).n;
  db.prepare(`INSERT INTO menu_items
    (id, restaurant_id, category, name, badge, price, description, ingredients, available, sort_order, image_url, created_at, updated_at)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
    id, restId, data.category, data.name, data.badge ?? null, data.price, data.description ?? '',
    JSON.stringify(data.ingredients ?? []), data.available === false ? 0 : 1,
    data.sort_order ?? next, data.image_url ?? null, now, now
  );
  return getMenuItem(id);
}

const UPDATABLE = ['restaurant_id', 'category', 'name', 'badge', 'price', 'description', 'ingredients', 'available', 'sort_order', 'image_url'];

export function updateMenuItem(id, patch) {
  const sets = [];
  const vals = [];
  for (const k of UPDATABLE) {
    if (!(k in patch)) continue;
    let v = patch[k];
    if (k === 'ingredients') v = JSON.stringify(v ?? []);
    if (k === 'available')   v = v ? 1 : 0;
    sets.push(`${k} = ?`);
    vals.push(v ?? null);
  }
  if (!sets.length) return getMenuItem(id);
  sets.push('updated_at = ?');
  vals.push(new Date().toISOString(), id);
  db.prepare(`UPDATE menu_items SET ${sets.join(', ')} WHERE id = ?`).run(...vals);
  return getMenuItem(id);
}

export function deleteMenuItem(id) {
  return db.prepare('DELETE FROM menu_items WHERE id = ?').run(id).changes > 0;
}

export function moveMenuItem(id, dir) {
  const item = getMenuItem(id);
  if (!item) return null;
  const neighbour = dir === 'up'
    ? db.prepare('SELECT * FROM menu_items WHERE restaurant_id = ? AND sort_order < ? ORDER BY sort_order DESC LIMIT 1').get(item.restaurant_id || 'micasita', item.sort_order)
    : db.prepare('SELECT * FROM menu_items WHERE restaurant_id = ? AND sort_order > ? ORDER BY sort_order ASC LIMIT 1').get(item.restaurant_id || 'micasita', item.sort_order);
  if (!neighbour) return item;
  const upd = db.prepare('UPDATE menu_items SET sort_order = ? WHERE id = ?');
  db.exec('BEGIN');
  upd.run(neighbour.sort_order, item.id);
  upd.run(item.sort_order, neighbour.id);
  db.exec('COMMIT');
  return getMenuItem(id);
}

export function recordEvent({ itemId, type, visitorId = 'anon', source = null }) {
  const now = new Date();
  const verb = type === 'view' ? 'INSERT OR IGNORE INTO' : 'INSERT INTO';
  db.prepare(`${verb} analytics (item_id, event_type, visitor_id, source, day, recorded_at) VALUES (?,?,?,?,?,?)`)
    .run(itemId, type, visitorId, source, now.toISOString().slice(0, 10), now.toISOString());
}

export function menuItemExists(id) {
  return !!db.prepare('SELECT 1 x FROM menu_items WHERE id = ?').get(id);
}

export function topDishes(limit = 3, restaurant_id = null) {
  let sql = `
    SELECT m.* FROM menu_items m
    JOIN (SELECT item_id, COUNT(*) n FROM analytics WHERE event_type = 'order' GROUP BY item_id) a
      ON a.item_id = m.id
    WHERE m.available = 1
  `;
  const params = [];
  if (restaurant_id) {
    sql += ' AND m.restaurant_id = ?';
    params.push(restaurant_id);
  }
  sql += ' ORDER BY a.n DESC, m.sort_order LIMIT ?';
  params.push(limit);
  return db.prepare(sql).all(...params).map(rowToItem);
}

export function dashboard() {
  const rows = db.prepare(`
    SELECT m.id, m.name, m.category, m.price, m.available,
           COALESCE(v.n, 0) views,
           COALESCE(o.n, 0) orders
    FROM menu_items m
    LEFT JOIN (SELECT item_id, COUNT(*) n FROM analytics WHERE event_type='view'  GROUP BY item_id) v ON v.item_id = m.id
    LEFT JOIN (SELECT item_id, COUNT(*) n FROM analytics WHERE event_type='order' GROUP BY item_id) o ON o.item_id = m.id
    ORDER BY m.sort_order`).all().map(r => ({
      ...r,
      available: !!r.available,
      conversion: r.views > 0 ? Math.round((r.orders / r.views) * 100) : 0,
      abandoned: Math.max(0, r.views - r.orders),
    }));

  const byOrders    = [...rows].sort((a, b) => b.orders - a.orders);
  const byAbandoned = [...rows].sort((a, b) => b.abandoned - a.abandoned);
  const leastSeen   = [...rows].sort((a, b) => a.views - b.views);

  const daily = db.prepare(`
    SELECT day,
           SUM(CASE WHEN event_type='view'  THEN 1 ELSE 0 END) views,
           SUM(CASE WHEN event_type='order' THEN 1 ELSE 0 END) orders
    FROM analytics WHERE day >= date('now', '-13 days')
    GROUP BY day ORDER BY day`).all();

  const picks = db.prepare(`
    SELECT item_id option_key, COUNT(*) n FROM analytics
    WHERE event_type = 'pick' GROUP BY item_id ORDER BY n DESC LIMIT 12`).all();

  const sources = db.prepare(`
    SELECT COALESCE(source, 'directo') src, COUNT(*) n FROM analytics
    WHERE event_type = 'order' GROUP BY src ORDER BY n DESC`).all();

  const totals = db.prepare(`
    SELECT
      SUM(CASE WHEN event_type='view'  THEN 1 ELSE 0 END) views,
      SUM(CASE WHEN event_type='order' THEN 1 ELSE 0 END) orders,
      COUNT(DISTINCT visitor_id) visitors
    FROM analytics`).get();

  return {
    topByOrders:     byOrders.slice(0, 10),
    highAbandonment: byAbandoned.slice(0, 8),
    leastSeen:       leastSeen.slice(0, 8),
    all: rows,
    daily,
    picks,
    sources,
    summary: {
      totalViews:  totals.views  || 0,
      totalOrders: totals.orders || 0,
      totalItems:  rows.length,
      visitors:    totals.visitors || 0,
    },
  };
}

export function getAdminByUsername(username) {
  return db.prepare('SELECT * FROM admins WHERE username = ?').get(username) || null;
}

export function getAdminById(id) {
  return db.prepare('SELECT * FROM admins WHERE id = ?').get(id) || null;
}

export function setAdminPassword(id, hash) {
  db.prepare('UPDATE admins SET password_hash = ?, must_change_password = 0 WHERE id = ?').run(hash, id);
}

export { ITEM_CATEGORIES };

const ESTADOS_ORDEN = new Set(['nueva', 'preparando', 'servida', 'cancelada']);

export function cuentaViva(mesa) {
  return db.prepare("SELECT * FROM cuentas WHERE mesa = ? AND estado <> 'cerrada'").get(String(mesa)) || null;
}

export function crearOrden({ mesa, lineas, nota = null, visitorId = null }) {
  const ahora = new Date().toISOString();

  db.exec('BEGIN');
  try {
    let cuenta = cuentaViva(mesa);
    if (!cuenta) {
      db.prepare('INSERT INTO cuentas (mesa, estado, abierta_at) VALUES (?, ?, ?)')
        .run(String(mesa), 'abierta', ahora);
      cuenta = cuentaViva(mesa);
    }

    const orden = db.prepare(
      'INSERT INTO ordenes (cuenta_id, estado, nota, visitor_id, creada_at) VALUES (?,?,?,?,?)'
    ).run(cuenta.id, 'nueva', nota, visitorId, ahora);

    const ins = db.prepare(
      'INSERT INTO orden_items (orden_id, item_id, nombre, detalle, precio, cantidad) VALUES (?,?,?,?,?,?)'
    );
    for (const l of lineas) {
      ins.run(orden.lastInsertRowid, l.item_id ?? null, l.nombre, l.detalle ?? null, l.precio, l.cantidad);
    }

    db.exec('COMMIT');
    return { ordenId: Number(orden.lastInsertRowid), cuentaId: cuenta.id };
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

function ordenesDeCuenta(cuentaId) {
  const ordenes = db.prepare('SELECT * FROM ordenes WHERE cuenta_id = ? ORDER BY id').all(cuentaId);
  const items = db.prepare(`
    SELECT oi.* FROM orden_items oi
    JOIN ordenes o ON o.id = oi.orden_id
    WHERE o.cuenta_id = ? ORDER BY oi.id`).all(cuentaId);

  return ordenes.map(o => ({
    ...o,
    items: items.filter(i => i.orden_id === o.id).map(i => ({
      ...i, importe: Math.round(i.precio * i.cantidad * 100) / 100,
    })),
  }));
}

export function resumenCuenta(cuentaId) {
  const cuenta = db.prepare('SELECT * FROM cuentas WHERE id = ?').get(cuentaId);
  if (!cuenta) return null;

  const ordenes = ordenesDeCuenta(cuentaId);
  const bruto = ordenes
    .filter(o => o.estado !== 'cancelada')
    .reduce((s, o) => s + o.items.reduce((t, i) => t + i.importe, 0), 0);

  return {
    cuenta,
    ordenes,
    piezas: ordenes.filter(o => o.estado !== 'cancelada')
      .reduce((s, o) => s + o.items.reduce((t, i) => t + i.cantidad, 0), 0),
    bruto: Math.round(bruto * 100) / 100,
  };
}

export function cuentaDeMesa(mesa) {
  const c = cuentaViva(mesa);
  return c ? resumenCuenta(c.id) : null;
}

export function pedirCuenta(mesa) {
  const c = cuentaViva(mesa);
  if (!c) return null;
  db.prepare("UPDATE cuentas SET estado = 'por_cobrar', cobro_at = ? WHERE id = ?")
    .run(new Date().toISOString(), c.id);
  return resumenCuenta(c.id);
}

export function listarCuentasVivas() {
  return db.prepare("SELECT id FROM cuentas WHERE estado <> 'cerrada' ORDER BY abierta_at")
    .all().map(r => resumenCuenta(r.id));
}

export function cambiarEstadoOrden(id, estado) {
  if (!ESTADOS_ORDEN.has(estado)) return null;
  const r = db.prepare('UPDATE ordenes SET estado = ?, tocada_at = ? WHERE id = ?')
    .run(estado, new Date().toISOString(), Number(id));
  if (!r.changes) return null;
  const o = db.prepare('SELECT cuenta_id FROM ordenes WHERE id = ?').get(Number(id));
  return resumenCuenta(o.cuenta_id);
}

export function cerrarCuenta(cuentaId, { subtotal, iva, total, metodo = 'efectivo', recibido = null, cambio = null, por = null }) {
  const ahora = new Date().toISOString();
  const r = db.prepare(`UPDATE cuentas
      SET estado = 'cerrada', cerrada_at = ?, subtotal = ?, iva = ?, total = ?,
          metodo_pago = ?, recibido = ?, cambio = ?, cerrada_por = ?
      WHERE id = ? AND estado <> 'cerrada'`)
    .run(ahora, subtotal, iva, total, metodo, recibido, cambio, por, Number(cuentaId));
  return r.changes > 0 ? db.prepare('SELECT * FROM cuentas WHERE id = ?').get(Number(cuentaId)) : null;
}

export function historialCuentas({ desde = null, limite = 50 } = {}) {
  const dia = desde || new Date().toISOString().slice(0, 10);
  const cuentas = db.prepare(`SELECT * FROM cuentas
      WHERE estado = 'cerrada' AND substr(cerrada_at, 1, 10) >= ?
      ORDER BY cerrada_at DESC LIMIT ?`).all(dia, limite);

  const total = cuentas.reduce((s, c) => s + (c.total || 0), 0);
  return {
    desde: dia,
    cuentas,
    resumen: {
      cuentas: cuentas.length,
      total: Math.round(total * 100) / 100,
      promedio: cuentas.length ? Math.round((total / cuentas.length) * 100) / 100 : 0,
    },
  };
}

const METODOS = ['efectivo', 'tarjeta', 'transferencia'];
export const METODOS_PAGO = METODOS;

function sumarCuentas(filas) {
  const cero = { cuentas: filas.length, subtotal: 0, iva: 0, total: 0, efectivo: 0, tarjeta: 0, transferencia: 0 };
  const t = filas.reduce((a, c) => {
    a.subtotal += c.subtotal || 0;
    a.iva += c.iva || 0;
    a.total += c.total || 0;
    const m = METODOS.includes(c.metodo_pago) ? c.metodo_pago : 'efectivo';
    a[m] += c.total || 0;
    return a;
  }, cero);
  for (const k of ['subtotal', 'iva', 'total', 'efectivo', 'tarjeta', 'transferencia']) {
    t[k] = Math.round(t[k] * 100) / 100;
  }
  t.promedio = t.cuentas ? Math.round((t.total / t.cuentas) * 100) / 100 : 0;
  return t;
}

export function fondoActual() {
  const ultimo = db.prepare(
    'SELECT fondo_dejado FROM cortes ORDER BY cerrado_at DESC, id DESC LIMIT 1'
  ).get();
  return Math.round((ultimo?.fondo_dejado || 0) * 100) / 100;
}

export function cortePendiente() {
  const cuentas = db.prepare(`SELECT * FROM cuentas
      WHERE estado = 'cerrada' AND corte_id IS NULL
      ORDER BY cerrada_at`).all();

  const platillos = db.prepare(`
    SELECT oi.nombre, SUM(oi.cantidad) piezas, SUM(oi.precio * oi.cantidad) importe
    FROM orden_items oi
    JOIN ordenes o  ON o.id = oi.orden_id AND o.estado <> 'cancelada'
    JOIN cuentas c  ON c.id = o.cuenta_id
    WHERE c.estado = 'cerrada' AND c.corte_id IS NULL
    GROUP BY oi.nombre ORDER BY piezas DESC, importe DESC LIMIT 12`).all();

  const totales = sumarCuentas(cuentas);
  const fondoInicial = fondoActual();

  return {
    cuentas,
    platillos,
    desde: cuentas[0]?.cerrada_at || null,
    hasta: cuentas.at(-1)?.cerrada_at || null,
    totales,
    fondoInicial,
    esperadoEnCaja: Math.round((fondoInicial + totales.efectivo) * 100) / 100,
  };
}

export function cerrarCorte({ declarado = null, fondoDejado = null, nota = null, por = null } = {}) {
  const pendiente = cortePendiente();
  const t = pendiente.totales;
  const num = (v) => (v === null || v === undefined || v === '' ? null : Math.round(Number(v) * 100) / 100);

  const dec = num(declarado);
  const fondo = num(fondoDejado) ?? pendiente.fondoInicial;

  if (!pendiente.cuentas.length && fondo === pendiente.fondoInicial) return null;
  if (dec !== null && fondo > dec) {
    throw Object.assign(new Error('No puedes dejar de fondo más de lo que hay contado en la caja.'), { status: 400 });
  }

  const esperado = pendiente.esperadoEnCaja;
  const dif = dec === null ? null : Math.round((dec - esperado) * 100) / 100;
  const retiro = dec === null ? null : Math.round((dec - fondo) * 100) / 100;
  const ahora = new Date().toISOString();

  db.exec('BEGIN');
  try {
    const r = db.prepare(`INSERT INTO cortes
      (desde_at, hasta_at, cerrado_at, cerrado_por, cuentas, subtotal, iva, total,
       efectivo, tarjeta, transferencia, declarado, diferencia, nota,
       fondo_inicial, fondo_dejado, retiro, tipo)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).run(
      pendiente.desde, pendiente.hasta, ahora, por, t.cuentas, t.subtotal, t.iva, t.total,
      t.efectivo, t.tarjeta, t.transferencia, dec, dif, nota,
      pendiente.fondoInicial, fondo, retiro, 'corte'
    );
    const corteId = Number(r.lastInsertRowid);
    const marcar = db.prepare('UPDATE cuentas SET corte_id = ? WHERE id = ?');
    for (const c of pendiente.cuentas) marcar.run(corteId, c.id);
    db.exec('COMMIT');
    return detalleCorte(corteId);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

export function fijarFondo({ monto, nota = null, por = null }) {
  const fondo = Math.round(Number(monto) * 100) / 100;
  if (!Number.isFinite(fondo) || fondo < 0) {
    throw Object.assign(new Error('Monto de fondo inválido.'), { status: 400 });
  }
  const ahora = new Date().toISOString();
  const r = db.prepare(`INSERT INTO cortes
    (desde_at, hasta_at, cerrado_at, cerrado_por, cuentas, subtotal, iva, total,
     efectivo, tarjeta, transferencia, declarado, diferencia, nota,
     fondo_inicial, fondo_dejado, retiro, tipo)
    VALUES (NULL,NULL,?,?,0,0,0,0,0,0,0,NULL,NULL,?,?,?,NULL,'fondo')`)
    .run(ahora, por, nota || 'Fondo de caja', fondoActual(), fondo);
  return detalleCorte(Number(r.lastInsertRowid));
}

export function listarCortes({ limite = 30 } = {}) {
  return db.prepare('SELECT * FROM cortes ORDER BY cerrado_at DESC LIMIT ?').all(limite);
}

export function detalleCorte(id) {
  const corte = db.prepare('SELECT * FROM cortes WHERE id = ?').get(Number(id));
  if (!corte) return null;
  const cuentas = db.prepare('SELECT * FROM cuentas WHERE corte_id = ? ORDER BY cerrada_at').all(corte.id);
  const platillos = db.prepare(`
    SELECT oi.nombre, SUM(oi.cantidad) piezas, SUM(oi.precio * oi.cantidad) importe
    FROM orden_items oi
    JOIN ordenes o ON o.id = oi.orden_id AND o.estado <> 'cancelada'
    JOIN cuentas c ON c.id = o.cuenta_id
    WHERE c.corte_id = ?
    GROUP BY oi.nombre ORDER BY piezas DESC LIMIT 12`).all(corte.id);
  return { corte, cuentas, platillos };
}
