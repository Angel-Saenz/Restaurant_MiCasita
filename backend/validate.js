/**
 * validate.js — Sanitización y validación estricta para Mi Casita.
 */

export function sanitizeString(str = '') {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export function validateMenuItemData(data = {}) {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('El nombre del platillo es obligatorio.');
  }

  if (!data.category || typeof data.category !== 'string' || !data.category.trim()) {
    errors.push('La categoría del platillo es obligatoria.');
  }

  const price = Number(data.price);
  if (isNaN(price) || price < 0) {
    errors.push('El precio debe ser un número mayor o igual a cero.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      name: sanitizeString(data.name),
      category: sanitizeString(data.category),
      badge: data.badge ? sanitizeString(data.badge) : null,
      price: price,
      description: sanitizeString(data.description || ''),
      ingredients: Array.isArray(data.ingredients)
        ? data.ingredients.map(i => sanitizeString(String(i)))
        : [],
      available: data.available !== false,
      sort_order: data.sort_order ? Number(data.sort_order) : 0,
      image_url: data.image_url ? String(data.image_url).trim() : null,
    },
  };
}
