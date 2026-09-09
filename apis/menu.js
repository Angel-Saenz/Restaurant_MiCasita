/**
 * apis/menu.js — Controlador público del menú para Mi Casita y Garibaldi Kitchen.
 */

import { Router } from 'express';
import { listMenu, getMenuItem, topDishes } from '../backend/db.js';
import {
  RESTAURANTS,
  CATEGORIES_BY_RESTAURANT,
  BUILDER_BY_RESTAURANT,
  getRestaurant,
  DEFAULT_RESTAURANT,
} from '../backend/config.js';

const router = Router();

// GET /api/menu/restaurants — Información de ambos restaurantes familiares
router.get('/restaurants', (req, res) => {
  res.json({
    restaurants: Object.values(RESTAURANTS),
    defaultRestaurant: DEFAULT_RESTAURANT,
  });
});

// GET /api/menu — Menú del restaurante seleccionado (o todos)
router.get('/', (req, res) => {
  const restId = req.query.restaurant || DEFAULT_RESTAURANT;
  const items = listMenu({ restaurant_id: restId, onlyAvailable: true });
  const categories = CATEGORIES_BY_RESTAURANT[restId] || CATEGORIES_BY_RESTAURANT.micasita;
  const restaurant = getRestaurant(restId);

  res.json({
    restaurant,
    categories,
    items,
  });
});

// GET /api/menu/top — Platillos más populares por restaurante
router.get('/top', (req, res) => {
  const restId = req.query.restaurant || null;
  const limit = Math.min(Number(req.query.limit) || 3, 10);
  const items = topDishes(limit, restId);
  res.json(items);
});

// GET /api/menu/builder — Configurador "Arma tu Platillo" específico
router.get('/builder', (req, res) => {
  const restId = req.query.restaurant || DEFAULT_RESTAURANT;
  const builder = BUILDER_BY_RESTAURANT[restId] || BUILDER_BY_RESTAURANT.micasita;
  res.json(builder);
});

// GET /api/menu/:id — Detalle de un platillo específico
router.get('/:id', (req, res) => {
  const item = getMenuItem(req.params.id);
  if (!item) return res.status(404).json({ error: 'Platillo no encontrado.' });
  res.json(item);
});

export default router;
