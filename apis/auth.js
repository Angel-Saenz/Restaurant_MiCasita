/**
 * apis/auth.js — Controlador de autenticación para el panel administrativo.
 */

import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getAdminByUsername, getAdminById, setAdminPassword } from '../backend/db.js';
import { signToken, authMiddleware } from '../backend/auth.js';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos.' });
    }

    const admin = getAdminByUsername(username);
    if (!admin) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = signToken({ id: admin.id, username: admin.username });
    res.json({
      token,
      username: admin.username,
      mustChangePassword: !!admin.must_change_password,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error interno de autenticación.' });
  }
});

// POST /api/auth/change-password
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body || {};
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    setAdminPassword(req.admin.id, hash);
    res.json({ success: true, message: 'Contraseña actualizada correctamente.' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar contraseña.' });
  }
});

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const admin = getAdminById(req.admin.id);
  if (!admin) return res.status(404).json({ error: 'Usuario no encontrado.' });
  res.json({
    id: admin.id,
    username: admin.username,
    mustChangePassword: !!admin.must_change_password,
  });
});

export default router;
