/**
 * apis/analytics.js — Eventos de analítica (vistas únicas, pedidos) para Mi Casita.
 */

import { Router } from 'express';
import { recordEvent, menuItemExists } from '../backend/db.js';

const router = Router();

// POST /api/analytics/event
router.post('/event', (req, res) => {
  try {
    const { itemId, type, visitorId, source } = req.body || {};

    if (!itemId || !type || !['view', 'order', 'pick'].includes(type)) {
      return res.status(400).json({ error: 'Datos de evento inválidos.' });
    }

    if (itemId !== 'custom-builder' && !menuItemExists(itemId)) {
      return res.status(404).json({ error: 'El platillo no existe.' });
    }

    recordEvent({
      itemId: String(itemId),
      type: String(type),
      visitorId: visitorId ? String(visitorId) : 'anon',
      source: source ? String(source) : null,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar analítica.' });
  }
});

export default router;
