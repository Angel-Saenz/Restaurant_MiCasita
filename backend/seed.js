import { initDB } from './db.js';

console.log('🌱 Inicializando base de datos y sembrando datos...');
await initDB();
console.log('✅ Proceso completado.');
