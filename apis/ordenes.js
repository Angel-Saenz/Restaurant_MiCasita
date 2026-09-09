/**
 * apis/ordenes.js — Controlador de comandas de mesa y solicitudes de cuenta para Mi Casita.
 */

import { Router } from 'express';
import { getMenuItem, crearOrden, cuentaDeMesa, pedirCuenta } from '../backend/db.js';
import { priceBuild, desglosar } from '../backend/config.js';

const router = Router();

// POST /api/ordenes — Envía comandas a la cocina
router.post('/ordenes', (req, res) => {
  try {
    const { mesa, items, nota, visitorId } = req.body || {};

    if (!mesa || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'La mesa y al menos un ítem son obligatorios.' });
    }

    const lineas = [];

    for (const raw of items) {
      const cantidad = Math.max(1, Number(raw.cantidad) || 1);

      if (raw.isCustom) {
        // Platillo del configurador "Arma tu Taco"
        const { price, parts } = priceBuild(raw.selection || {});
        lineas.push({
          item_id: 'custom-builder',
          nombre: 'Arma tu Taco / Platillo (Personalizado)',
          detalle: parts.join(' • '),
          precio: price,
          cantidad,
        });
      } else {
        // Platillo regular del menú
        const dbItem = getMenuItem(raw.id);
        if (!dbItem) {
          return res.status(400).json({ error: `El platillo ${raw.id} ya no está disponible.` });
        }
        lineas.push({
          item_id: dbItem.id,
          nombre: dbItem.name,
          detalle: raw.detalle || null,
          precio: dbItem.price,
          cantidad,
        });
      }
    }

    const result = crearOrden({
      mesa: String(mesa),
      lineas,
      nota: nota ? String(nota).trim() : null,
      visitorId: visitorId ? String(visitorId).trim() : null,
    });

    const cuentaActualizada = cuentaDeMesa(mesa);
    const desglose = desglosar(cuentaActualizada.bruto);

    res.json({
      success: true,
      ordenId: result.ordenId,
      cuentaId: result.cuentaId,
      cuenta: cuentaActualizada,
      desglose,
    });
  } catch (err) {
    console.error('Error al crear orden:', err);
    res.status(500).json({ error: 'No se pudo registrar la comanda.' });
  }
});

// GET /api/cuenta/:mesa — Estado actual de la mesa
router.get('/cuenta/:mesa', (req, res) => {
  const mesa = req.params.mesa;
  const resumen = cuentaDeMesa(mesa);

  if (!resumen) {
    return res.json({ cuenta: null, ordenes: [], bruto: 0, desglose: desglosar(0) });
  }

  res.json({
    ...resumen,
    desglose: desglosar(resumen.bruto),
  });
});

// POST /api/cuenta/:mesa/cobrar — Cliente solicita la cuenta
router.post('/cuenta/:mesa/cobrar', (req, res) => {
  const mesa = req.params.mesa;
  const resumen = pedirCuenta(mesa);

  if (!resumen) {
    return res.status(404).json({ error: 'No hay cuenta abierta para esta mesa.' });
  }

  res.json({
    success: true,
    message: 'La solicitud de cuenta ha sido enviada al mesero.',
    resumen,
    desglose: desglosar(resumen.bruto),
  });
});

export default router;
