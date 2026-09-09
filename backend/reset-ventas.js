import { initDB } from './db.js';
import { DatabaseSync } from 'node:sqlite';
import { DB_FILE } from './config.js';

const args = process.argv.slice(2);
const execute = args.includes('--si');
const includeAnalytics = args.includes('--analitica');

await initDB();
const db = new DatabaseSync(DB_FILE);

const counts = {
  cuentas: db.prepare('SELECT COUNT(*) c FROM cuentas').get().c,
  ordenes: db.prepare('SELECT COUNT(*) c FROM ordenes').get().c,
  orden_items: db.prepare('SELECT COUNT(*) c FROM orden_items').get().c,
  cortes: db.prepare('SELECT COUNT(*) c FROM cortes').get().c,
  analytics: includeAnalytics ? db.prepare('SELECT COUNT(*) c FROM analytics').get().c : 0,
};

console.log('📊 Registros que serán eliminados:');
console.log(` - Cuentas: ${counts.cuentas}`);
console.log(` - Órdenes: ${counts.ordenes}`);
console.log(` - Ítems de Órdenes: ${counts.orden_items}`);
console.log(` - Cortes de Caja: ${counts.cortes}`);
if (includeAnalytics) {
  console.log(` - Analítica: ${counts.analytics}`);
}

if (!execute) {
  console.log('\n⚠️  MODO SIMULACIÓN. Para borrar realmente de la base de datos ejecuta:');
  console.log('   node backend/reset-ventas.js --si [--analitica]');
  process.exit(0);
}

db.exec('BEGIN');
try {
  db.exec('DELETE FROM orden_items');
  db.exec('DELETE FROM ordenes');
  db.exec('DELETE FROM cuentas');
  db.exec('DELETE FROM cortes');
  if (includeAnalytics) {
    db.exec('DELETE FROM analytics');
  }
  db.exec('COMMIT');
  console.log('✅ Ventas y cortes reiniciados exitosamente a cero.');
} catch (err) {
  db.exec('ROLLBACK');
  console.error('❌ Error al reiniciar ventas:', err);
  process.exit(1);
}
