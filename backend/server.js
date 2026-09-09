import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

import { initDB } from './db.js';
import { renderLanding } from './ssr.js';
import { PORT, IS_PROD, UPLOADS_DIR, SITE_URL, BUSINESS } from './config.js';

import authApi from '../apis/auth.js';
import menuApi from '../apis/menu.js';
import ordenesApi from '../apis/ordenes.js';
import adminApi from '../apis/admin.js';
import analyticsApi from '../apis/analytics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const app = express();

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com', 'https://cdnjs.cloudflare.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 300,
  message: { error: 'Demasiadas peticiones. Por favor intenta de nuevo en un minuto.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Demasiados intentos de acceso. Intenta en 15 minutos.' },
});

const orderLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Límite de comandas alcanzado. Espera un momento.' },
});

app.use(globalLimiter);

app.use('/public/uploads', express.static(UPLOADS_DIR, { maxAge: IS_PROD ? '30d' : 0 }));
app.use(express.static(join(ROOT, 'frontend'), { index: false, maxAge: IS_PROD ? '1d' : 0 }));

app.get('/', (req, res) => {
  try {
    const restId = req.query.rest || req.query.restaurant || null;
    const html = renderLanding(ROOT, restId);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('Error renderizando portada:', err);
    res.sendFile(join(ROOT, 'frontend', 'index.html'));
  }
});

app.get(['/carta', '/mesa/:mesa'], (req, res) => {
  res.sendFile(join(ROOT, 'frontend', 'carta.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(join(ROOT, 'frontend', 'admin', 'index.html'));
});

app.get('/healthz', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nSitemap: ${SITE_URL}/sitemap.xml`);
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/carta</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`);
});

app.use('/api/auth', authLimiter, authApi);
app.use('/api/menu', menuApi);
app.use('/api', orderLimiter, ordenesApi);
app.use('/api/admin', adminApi);
app.use('/api/analytics', analyticsApi);

app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(join(ROOT, 'frontend', 'index.html'));
  } else {
    res.status(404).json({ error: 'Recurso no encontrado.' });
  }
});

app.use((err, req, res, next) => {
  console.error('❌ Error no capturado:', err);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

await initDB();

app.listen(PORT, () => {
  console.log(`
[OK] ─────────────────────────────────────────────────────────── [OK]
     Restaurante Mi Casita & Garibaldi Mexican Kitchen
     - Portal Principal:       http://localhost:${PORT}
     - Carta Digital Mesa:     http://localhost:${PORT}/carta
     - Panel de Administración: http://localhost:${PORT}/admin
[OK] ─────────────────────────────────────────────────────────── [OK]
  `);
});
