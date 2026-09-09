/**
 * download-dish-images.js
 * Descarga fotografías reales y profesionales de platillos para Mi Casita y Garibaldi Kitchen.
 * Almacena las imágenes localmente en `frontend/assets/dishes/<id>.jpg` y actualiza la base de datos SQLite.
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DISHES_DIR = join(ROOT, 'frontend', 'assets', 'dishes');
const DB_FILE = join(ROOT, 'backend', 'data', 'micasita.sqlite');

mkdirSync(DISHES_DIR, { recursive: true });

const DISH_PHOTOS = {
  
  'mc-huevos-rancheros': 'https:
  'mc-breakfast-burrito': 'https:
  'mc-chilaquiles-caseros': 'https:
  'mc-huevos-mexicana': 'https:
  'mc-menudo-fines-semana': 'https:
  'mc-burrito-mi-casita': 'https:
  'mc-caldo-pescado': 'https:
  'mc-caldo-camaron': 'https:
  'mc-enchiladas-nm': 'https:
  'mc-asado-de-puerco': 'https:
  'mc-carne-asada-plancha': 'https:
  'mc-sopapilla-rellena': 'https:
  'mc-sopapillas-miel': 'https:
  'mc-flan-casero': 'https:
  'mc-cafe-de-olla': 'https:
  'mc-aguas-frescas': 'https:

  
  'gb-tacos-pastor': 'https:
  'gb-tacos-barbacoa': 'https:
  'gb-tacos-asada': 'https:
  'gb-tacos-steak-cactus': 'https:
  'gb-alambre-especial': 'https:
  'gb-the-garibaldi-plate': 'https:
  'gb-parrillada-familiar': 'https:
  'gb-pozole-rojo': 'https:
  'gb-mole-poblano': 'https:
  'gb-chiles-rellenos': 'https:
  'gb-camarones-fiesta': 'https:
  'gb-camarones-empanizados': 'https:
  'gb-coctel-camarones': 'https:
  'gb-ceviche-mixto': 'https:
  'gb-chicken-fried-steak': 'https:
  'gb-asado-and-eggs': 'https:
  'gb-margarita-virgen': 'https:
  'gb-refrescos-mexicanos': 'https:
};

async function run() {
  console.log('Iniciando descarga de fotografías reales para los platillos...');
  let downloadedCount = 0;

  for (const [id, url] of Object.entries(DISH_PHOTOS)) {
    const filePath = join(DISHES_DIR, `${id}.jpg`);
    try {
      if (!existsSync(filePath)) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        writeFileSync(filePath, buf);
        console.log(`[OK] Descargada foto para: ${id} (${Math.round(buf.byteLength / 1024)} KB)`);
      } else {
        console.log(`[EXISTE] Foto ya disponible para: ${id}`);
      }
      downloadedCount++;
    } catch (err) {
      console.error(`[ERROR] No se pudo descargar ${id}:`, err.message);
    }
  }

  console.log(`\nFotografías procesadas: ${downloadedCount}/${Object.keys(DISH_PHOTOS).length}`);

  
  if (existsSync(DB_FILE)) {
    const db = new DatabaseSync(DB_FILE);
    const updateStmt = db.prepare('UPDATE menu_items SET image_url = ? WHERE id = ?');
    db.exec('BEGIN');
    let updatedDbCount = 0;
    for (const id of Object.keys(DISH_PHOTOS)) {
      const relUrl = `/assets/dishes/${id}.jpg`;
      const res = updateStmt.run(relUrl, id);
      if (res.changes > 0) updatedDbCount++;
    }
    db.exec('COMMIT');
    console.log(`[OK] Base de datos actualizada: ${updatedDbCount} platillos con imagen local vinculada.`);
  }
}

run();
