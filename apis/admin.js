/**
 * apis/admin.js — Rutas administrativas del sistema para Mi Casita (Órdenes, Caja, Menú, QR, Analíticas).
 */

import { Router } from 'express';
import { join } from 'path';
import multer from 'multer';
import sharp from 'sharp';
import QRCode from 'qrcode';
import { authMiddleware } from '../backend/auth.js';
import {
  listMenu, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem, moveMenuItem,
  listarCuentasVivas, cambiarEstadoOrden, cerrarCuenta, resumenCuenta,
  cortePendiente, cerrarCorte, fijarFondo, listarCortes, detalleCorte,
  dashboard, uid
} from '../backend/db.js';
import { validateMenuItemData } from '../backend/validate.js';
import { UPLOADS_DIR, SITE_URL, lanIPv4, desglosar } from '../backend/config.js';

const router = Router();

// Configuración de Multer para carga de imágenes en memoria
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Máximo 10 MB
  fileFilter: (req, file, cb) => {
    if (/image\/(jpeg|png|webp|avif|gif)/i.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (JPG, PNG, WebP, AVIF).'));
    }
  },
});

// Aplicar autenticación a todas las rutas de /api/admin
router.use(authMiddleware);

// ── 1. Órdenes de Cocina y Salón ─────────────────────────────────────────────

router.get('/ordenes', (req, res) => {
  const cuentas = listarCuentasVivas();
  res.json({ cuentas });
});

router.patch('/ordenes/:id', (req, res) => {
  const { estado } = req.body || {};
  const resumen = cambiarEstadoOrden(req.params.id, estado);
  if (!resumen) return res.status(400).json({ error: 'No se pudo actualizar el estado de la orden.' });
  res.json({ success: true, resumen });
});

router.post('/cuentas/:id/cerrar', (req, res) => {
  try {
    const cuentaId = req.params.id;
    const { metodo = 'efectivo', recibido = null } = req.body || {};

    const resumen = resumenCuenta(cuentaId);
    if (!resumen) return res.status(404).json({ error: 'Cuenta no encontrada.' });

    const desglose = desglosar(resumen.bruto);
    const recNum = recibido !== null ? Number(recibido) : null;
    const cambio = (recNum !== null && recNum >= desglose.total) ? Math.round((recNum - desglose.total) * 100) / 100 : 0;

    const cerrada = cerrarCuenta(cuentaId, {
      subtotal: desglose.subtotal,
      iva: desglose.iva,
      total: desglose.total,
      metodo,
      recibido: recNum,
      cambio,
      por: req.admin.username,
    });

    if (!cerrada) return res.status(400).json({ error: 'La cuenta ya estaba cerrada o no existe.' });

    res.json({
      success: true,
      cuenta: cerrada,
      desglose,
      resumen,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al cerrar la cuenta.' });
  }
});

// ── 2. Caja y Corte de Turno ────────────────────────────────────────────────

router.get('/caja', (req, res) => {
  const pendiente = cortePendiente();
  const historial = listarCortes({ limite: 30 });
  res.json({ pendiente, historial });
});

router.post('/caja/cerrar', (req, res) => {
  try {
    const { declarado = null, fondoDejado = null, nota = null } = req.body || {};
    const resultado = cerrarCorte({
      declarado,
      fondoDejado,
      nota,
      por: req.admin.username,
    });

    if (!resultado) {
      return res.status(400).json({ error: 'No hay ventas ni movimientos pendientes para cerrar turno.' });
    }

    res.json({ success: true, resultado });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error al cerrar corte de caja.' });
  }
});

router.post('/caja/fondo', (req, res) => {
  try {
    const { monto, nota } = req.body || {};
    const resultado = fijarFondo({
      monto,
      nota,
      por: req.admin.username,
    });
    res.json({ success: true, resultado });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Error al fijar fondo de caja.' });
  }
});

router.get('/caja/:id', (req, res) => {
  const detalle = detalleCorte(req.params.id);
  if (!detalle) return res.status(404).json({ error: 'Corte de caja no encontrado.' });
  res.json(detalle);
});

// ── 3. Menú CRUD y Subida de Fotos ──────────────────────────────────────────

router.get('/menu', (req, res) => {
  const rest = req.query.restaurant || req.query.restaurant_id || null;
  const items = listMenu({ onlyAvailable: false, restaurant: rest });
  res.json(items);
});

router.post('/menu', (req, res) => {
  const { isValid, errors, sanitized } = validateMenuItemData(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const newItem = createMenuItem(sanitized);
  res.status(201).json(newItem);
});

router.patch('/menu/:id', (req, res) => {
  const existing = getMenuItem(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Platillo no encontrado.' });

  const updated = updateMenuItem(req.params.id, req.body);
  res.json(updated);
});

router.delete('/menu/:id', (req, res) => {
  const success = deleteMenuItem(req.params.id);
  if (!success) return res.status(404).json({ error: 'Platillo no encontrado.' });
  res.json({ success: true });
});

router.post('/menu/:id/move', (req, res) => {
  const { dir } = req.body || {};
  if (dir !== 'up' && dir !== 'down') return res.status(400).json({ error: 'Dirección inválida.' });

  const item = moveMenuItem(req.params.id, dir);
  if (!item) return res.status(404).json({ error: 'No se pudo mover el platillo.' });
  res.json(item);
});

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se envió ningún archivo de imagen.' });

    const fileName = `item-${uid()}.webp`;
    const destPath = join(UPLOADS_DIR, fileName);

    await sharp(req.file.buffer)
      .resize(1000, 1000, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(destPath);

    const imageUrl = `/public/uploads/${fileName}`;
    res.json({ success: true, imageUrl });
  } catch (err) {
    console.error('Error procesando imagen:', err);
    res.status(500).json({ error: 'Error al procesar y guardar la fotografía.' });
  }
});

// ── 4. Analíticas y Generación de QR ────────────────────────────────────────

router.get('/analytics', (req, res) => {
  const data = dashboard();
  res.json(data);
});

router.get('/qr', async (req, res) => {
  try {
    const mesa = req.query.mesa || '1';
    let base = SITE_URL;

    // Si SITE_URL es localhost, usar la IP de la red local para escaneo real en celular
    if (/localhost|127\.0\.0\.1/.test(base)) {
      const ip = lanIPv4();
      if (ip) base = `http://${ip}:${process.env.PORT || 3000}`;
    }

    const qrUrl = `${base}/mesa/${mesa}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 2, width: 400 });

    res.json({
      mesa,
      targetUrl: qrUrl,
      qrDataUrl,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error generando código QR.' });
  }
});

export default router;
