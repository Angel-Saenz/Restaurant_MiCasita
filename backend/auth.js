import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
if (!SECRET && process.env.NODE_ENV === 'production') {
  console.error('❌ ERROR FATAL: JWT_SECRET debe estar definido en producción (.env)');
  process.exit(1);
}

const FALLBACK_SECRET = SECRET || 'micasita_dev_secret_fallback_key_2026';

export function signToken(payload) {
  return jwt.sign(payload, FALLBACK_SECRET, { expiresIn: '8h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, FALLBACK_SECRET);
  } catch {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Se requiere token de autenticación.' });
  }

  const token = authHeader.slice(7).trim();
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido o expirado.' });
  }

  req.admin = decoded;
  next();
}
