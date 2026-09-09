import bcrypt from 'bcryptjs';
import { initDB, getAdminByUsername, setAdminPassword } from './db.js';

const args = process.argv.slice(2);
const username = args[0] || 'casita_admin';
const newPassword = args[1];

if (!newPassword) {
  console.log('Uso: node backend/reset-password.js <usuario> <nueva_contraseña>');
  process.exit(1);
}

await initDB();
const admin = getAdminByUsername(username);

if (!admin) {
  console.error(`❌ El usuario "${username}" no existe.`);
  process.exit(1);
}

const hash = await bcrypt.hash(newPassword, 12);
setAdminPassword(admin.id, hash);
console.log(`✅ Contraseña actualizada para el usuario "${username}".`);
