import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { networkInterfaces } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ROOT = join(__dirname, '..');
export const IS_PROD = process.env.NODE_ENV === 'production';
export const PORT = Number(process.env.PORT) || 3000;

export const DATA_DIR = process.env.DATA_DIR?.trim()
  ? process.env.DATA_DIR.trim()
  : join(ROOT, 'backend', 'data');

export const UPLOADS_DIR = join(DATA_DIR, 'uploads');
export const DB_FILE     = join(DATA_DIR, 'micasita.sqlite');

export const SITE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');

export const RESTAURANTS = {
  micasita: {
    id: 'micasita',
    name: 'Mi Casita Restaurant',
    shortName: 'Mi Casita',
    slogan: 'Una delicia para su paladar! — Auténtico Sabor Casero',
    eyebrow: 'DOWNTOWN ROSWELL · MÁS DE 30 AÑOS DE TRADICIÓN',
    heroTitle: 'Auténtica Comida Mexicana <em>Hecha en Casa</em>',
    heroSubtitle: 'El rincón tradicional de Roswell: menudo artesanal de fin de semana, burritos ahogados en chile de Nuevo México y sopapillas calientitas con miel.',
    badge: 'Desayuno & Almuerzo Tradicional',
    icon: 'fa-solid fa-house',
    accentColor: '#c05a3e',
    founded: 1993,
    phone: '5756231455',
    phoneLabel: '(575) 623-1455',
    whatsapp: '15756231455',
    street: '305 S Main St',
    neighborhood: 'Downtown',
    city: 'Roswell',
    state: 'NM',
    postalCode: '88203',
    country: 'US',
    lat: 33.3908,
    lng: -104.5230,
    facebook: 'https://www.facebook.com/MiCasitaRestaurantRoswell',
    facebookLabel: 'facebook.com/MiCasitaRestaurantRoswell',
    maps: 'https://www.google.com/maps/search/?api=1&query=Mi+Casita+Restaurant+305+S+Main+St+Roswell+NM+88203',
    priceRange: '$',
    rating: 4.7,
    ratingCount: 890,
    hoursLabel: 'Lun – Sáb: 7:00 AM – 3:00 PM | Dom: Cerrado',
    hours: {
      open: 7,
      close: 15,
      daysOpen: [1, 2, 3, 4, 5, 6],
      sundayClosed: true,
    },
    serviceSummary: 'Comedor familiar, pedidos para llevar y servicio a mostrador.',
  },
  garibaldi: {
    id: 'garibaldi',
    name: 'Garibaldi Mexican Kitchen',
    shortName: 'Garibaldi Kitchen',
    slogan: 'Where Flavor and Tradition Meet! — Donde el Sabor y la Tradición se Encuentran',
    eyebrow: 'SOUTH MAIN ROSWELL · COCINA VIVA & EVENTOS PRIVADOS',
    heroTitle: 'La Fiesta del Sabor en <em>Garibaldi Kitchen</em>',
    heroSubtitle: 'Inspirado en la mística Plaza Garibaldi: tacos al pastor, alambre supremo, pozole tradicional, parrilladas al carbón y mariscos fiesta.',
    badge: 'Cocina Viva, Tacos & Eventos',
    icon: 'fa-solid fa-guitar',
    accentColor: '#1b7a43',
    founded: 2021,
    phone: '5755505100',
    phoneLabel: '(575) 550-5100',
    whatsapp: '15755505100',
    street: '2019 S Main St',
    neighborhood: 'South Main',
    city: 'Roswell',
    state: 'NM',
    postalCode: '88203',
    country: 'US',
    lat: 33.3712,
    lng: -104.5230,
    facebook: 'https://www.facebook.com/share/g/1bT3LZBWXG/',
    facebookLabel: 'Grupo de Facebook Garibaldi Kitchen',
    facebookPage: 'https://www.facebook.com/garibaldiroswell',
    toastTab: 'https://order.toasttab.com/online/garibaldimexicankitchen',
    maps: 'https://www.google.com/maps/search/?api=1&query=Garibaldi+Mexican+Kitchen+2019+S+Main+St+Roswell+NM+88203',
    priceRange: '$$',
    rating: 4.8,
    ratingCount: 650,
    hoursLabel: 'Lun – Sáb: 8:00 AM – 8:00 PM | Dom: 8:00 AM – 4:00 PM',
    hours: {
      open: 8,
      close: 20,
      sundayClose: 16,
      daysOpen: [0, 1, 2, 3, 4, 5, 6],
      sundayClosed: false,
    },
    serviceSummary: 'Comedor, ventanilla drive-thru, pedidos en línea y salón para fiestas/eventos.',
  },
};

export const DEFAULT_RESTAURANT = 'micasita';

export function getRestaurant(id) {
  return RESTAURANTS[id] || RESTAURANTS[DEFAULT_RESTAURANT];
}

export const BUSINESS = RESTAURANTS.micasita;

export function yearsOfHistory(founded = BUSINESS.founded, now = new Date()) {
  return now.getFullYear() - founded;
}

export const CATEGORIES_BY_RESTAURANT = {
  micasita: [
    { id: 'all',          label: 'Todo el Menú',              icon: 'fa-solid fa-utensils' },
    { id: 'desayunos',    label: 'Desayunos & Huevos',         icon: 'fa-solid fa-egg' },
    { id: 'burritos',     label: 'Burritos & Caldos',          icon: 'fa-solid fa-bowl-food' },
    { id: 'especiales',   label: 'Especialidades & Enchiladas', icon: 'fa-solid fa-plate-wheat' },
    { id: 'sopapillas',   label: 'Sopapillas & Postres',       icon: 'fa-solid fa-cookie-bite' },
    { id: 'bebidas',      label: 'Bebidas & Café',             icon: 'fa-solid fa-mug-hot' },
  ],
  garibaldi: [
    { id: 'all',          label: 'Todo el Menú',              icon: 'fa-solid fa-utensils' },
    { id: 'tacos',        label: 'Tacos & Taquería',           icon: 'fa-solid fa-fire' },
    { id: 'alambres',     label: 'Alambres & Parrilladas',     icon: 'fa-solid fa-fire-burner' },
    { id: 'pozole',       label: 'Pozole & Guisos',            icon: 'fa-solid fa-bowl-rice' },
    { id: 'mariscos',     label: 'Mariscos de la Cocina',      icon: 'fa-solid fa-shrimp' },
    { id: 'crossover',    label: 'Platillos & Desayunos',      icon: 'fa-solid fa-drumstick-bite' },
    { id: 'bebidas',      label: 'Bebidas & Refrescos',        icon: 'fa-solid fa-wine-glass' },
  ],
};

export const CATEGORIES = CATEGORIES_BY_RESTAURANT.micasita;
export const ITEM_CATEGORIES = [
  'desayunos', 'burritos', 'especiales', 'sopapillas', 'bebidas',
  'tacos', 'alambres', 'pozole', 'mariscos', 'crossover'
];

export const COBRO = {
  taxRate: 0.0825,
  preciosConIva: true,
  moneda: 'USD',
  simbolo: '$',
};

export function desglosar(subtotalBruto) {
  const bruto = Math.round(Number(subtotalBruto) * 100) / 100;
  const tax = Math.round(bruto * COBRO.taxRate * 100) / 100;
  return {
    subtotal: bruto,
    tax,
    total: Math.round((bruto + tax) * 100) / 100,
    moneda: COBRO.moneda,
    simbolo: COBRO.simbolo,
  };
}

export const BUILDER_BY_RESTAURANT = {
  micasita: {
    id: 'micasita-builder',
    title: 'Arma tu Burrito o Platillo Casero',
    subtitle: 'Elige tu base, guisado tradicional de Nuevo México, tipo de chile y complementos.',
    basePrice: 8.99,
    steps: [
      {
        id: 'base',
        label: '1. Elige la Presentación / Tortilla',
        help: 'Tortillas recién hechas al comal.',
        type: 'single',
        options: [
          { id: 'harina_grande', label: 'Tortilla de Harina Calientita (Estilo Burrito)', delta: 0, note: 'El clásico de Mi Casita' },
          { id: 'maiz_orden',    label: 'Orden de Tortillas de Maíz',                   delta: 0, note: 'Tradicional' },
          { id: 'plato_completo',label: 'Platillo Completo (con Frijoles y Papas)',      delta: 2.50, note: 'Muy recomendado' },
        ],
      },
      {
        id: 'proteina',
        label: '2. Guisado o Proteína de la Casa',
        help: 'Preparados a fuego lento con sazón de hogar.',
        type: 'single',
        options: [
          { id: 'asado_puerco',   label: 'Asado de Puerco en Chile Rojo',     delta: 0, note: 'Especialidad de la casa' },
          { id: 'deshebrada',     label: 'Deshebrada de Res con Papitas',      delta: 1.00 },
          { id: 'huevos_chorizo', label: 'Huevos Revueltos con Chorizo',       delta: 0 },
          { id: 'pollo_guisado',  label: 'Pollo Deshebrado en Caldillo',       delta: 0 },
          { id: 'frijol_queso',   label: 'Frijoles Refritos con Queso Derretido', delta: -0.50 },
        ],
      },
      {
        id: 'chile',
        label: '3. Chile & Salsa Nuevo México',
        help: 'Chiles cosechados en el estado con sabor inigualable.',
        type: 'single',
        options: [
          { id: 'rojo_nm',    label: 'Chile Rojo Tradicional (Picor Medio)',      delta: 0, note: 'Receta familiar' },
          { id: 'verde_nm',   label: 'Chile Verde Asado de Nuevo México',        delta: 0, note: 'Toque ahumado clásico' },
          { id: 'ahogado',    label: 'Smothered / Ahogado con Queso y Chile',    delta: 1.50, note: 'Bañado por encima' },
          { id: 'sin_chile',  label: 'Sin Chile (Salsa por separado)',            delta: 0 },
        ],
      },
      {
        id: 'extras',
        label: '4. Agregados & Complementos Caseros',
        help: 'Personaliza tu orden a tu gusto.',
        type: 'multi',
        options: [
          { id: 'queso_derretido', label: 'Queso Cheddar / Jack Derretido', delta: 1.25 },
          { id: 'papas_caseras',   label: 'Papas Caseras Doraditas',        delta: 1.00 },
          { id: 'aguacate',        label: 'Rebanadas de Aguacate Fresco',   delta: 1.50 },
          { id: 'sopapilla_extra', label: 'Sopapilla Calientita con Miel',  delta: 1.75 },
        ],
      },
    ],
  },
  garibaldi: {
    id: 'garibaldi-builder',
    title: 'Arma tu Orden de Tacos o Alambre al Comal',
    subtitle: 'Elige tus cortes selectos, queso fundido, salsas bravas y extras al estilo Plaza Garibaldi.',
    basePrice: 11.50,
    steps: [
      {
        id: 'base',
        label: '1. Estilo de Servicio / Base',
        help: 'Servido con todo el sabor festivo.',
        type: 'single',
        options: [
          { id: 'tacos_maiz',   label: 'Orden de 4 Tacos en Maíz Nixtamal', delta: 0, note: 'Con cilantro, cebolla y piña' },
          { id: 'tacos_harina', label: 'Orden de 3 Tacos en Tortilla de Harina', delta: 0.50 },
          { id: 'alambre_bowl', label: 'Cazuela de Alambre con Queso Gratinado', delta: 3.50, note: 'Para compartir' },
        ],
      },
      {
        id: 'proteina',
        label: '2. Carnes y Cortes al Comal',
        help: 'Doradas al carbón y la plancha.',
        type: 'single',
        options: [
          { id: 'al_pastor',  label: 'Trompo al Pastor con Piña Asada',  delta: 0, note: 'Estrella Garibaldi' },
          { id: 'barbacoa',   label: 'Barbacoa de Res Horneada',         delta: 1.00, note: 'Suave y jugosa' },
          { id: 'asada',      label: 'Carne Asada de Res Seleccionada',  delta: 1.00 },
          { id: 'carnitas',   label: 'Carnitas Doraditas',               delta: 0 },
          { id: 'mix_alambre',label: 'Mix Alambre (Res + Tocino + Chorizo + Pimientos)', delta: 2.50 },
        ],
      },
      {
        id: 'salsa',
        label: '3. Nivel de Salsa & Picor',
        help: 'Hechas frescas todos los días.',
        type: 'single',
        options: [
          { id: 'verde_taquera', label: 'Salsa Verde Taquera (Picor Moderado)', delta: 0 },
          { id: 'roja_brava',    label: 'Salsa Roja de Chile de Árbol (Fuerte)', delta: 0 },
          { id: 'macha',         label: 'Salsa Macha con Chiles Dorados y Ajo',   delta: 0.75, note: 'Súper sabrosa' },
          { id: 'sin_salsa',     label: 'Salsas al Lado',                         delta: 0 },
        ],
      },
      {
        id: 'extras',
        label: '4. Toques de Fiesta',
        help: 'Complementos para llevar tu taco al siguiente nivel.',
        type: 'multi',
        options: [
          { id: 'queso_fundido', label: 'Queso Oaxaca Fundido al Comal',    delta: 1.75 },
          { id: 'nopalitos',     label: 'Nopalitos Asados a la Plancha',     delta: 1.00 },
          { id: 'cebollitas',    label: 'Cebollitas Cambray y Chiles Toreados', delta: 1.25 },
          { id: 'guacamole',     label: 'Porción de Guacamole Fresco',      delta: 2.25 },
        ],
      },
    ],
  },
};

export const BUILDER = BUILDER_BY_RESTAURANT.micasita;

export function priceBuild(restaurantId = DEFAULT_RESTAURANT, selection = {}) {
  const builder = BUILDER_BY_RESTAURANT[restaurantId] || BUILDER_BY_RESTAURANT.micasita;
  let price = builder.basePrice;
  const parts = [];

  for (const step of builder.steps) {
    const picked = selection[step.id];
    if (step.type === 'single') {
      const opt = step.options.find(o => o.id === picked);
      if (opt) {
        price += opt.delta;
        parts.push(opt.label);
      }
    } else {
      for (const id of Array.isArray(picked) ? picked : []) {
        const opt = step.options.find(o => o.id === id);
        if (opt) {
          price += opt.delta;
          parts.push(opt.label);
        }
      }
    }
  }

  return { price: Math.round(price * 100) / 100, parts };
}

export function lanIPv4() {
  const virtuales = /vethernet|virtual|docker|wsl|loopback|bluetooth|vmware|vbox/i;
  const candidatas = [];

  for (const [nombre, lista] of Object.entries(networkInterfaces())) {
    if (virtuales.test(nombre)) continue;
    for (const i of lista || []) {
      if (i.family !== 'IPv4' || i.internal) continue;
      const privada = /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/.test(i.address);
      candidatas.push({ ip: i.address, privada });
    }
  }

  candidatas.sort((a, b) => Number(b.privada) - Number(a.privada));
  return candidatas[0]?.ip || null;
}
