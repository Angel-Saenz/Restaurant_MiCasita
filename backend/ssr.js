import { readFileSync } from 'fs';
import { join } from 'path';
import { listMenu } from './db.js';
import {
  RESTAURANTS,
  DEFAULT_RESTAURANT,
  getRestaurant,
  CATEGORIES_BY_RESTAURANT,
  SITE_URL,
  yearsOfHistory,
} from './config.js';

let indexTemplate = null;

export function renderLanding(rootPath, restId = null) {
  const currentRestId = (restId && RESTAURANTS[restId]) ? restId : DEFAULT_RESTAURANT;
  const restaurant = getRestaurant(currentRestId);
  const categories = CATEGORIES_BY_RESTAURANT[currentRestId] || CATEGORIES_BY_RESTAURANT.micasita;

  indexTemplate = readFileSync(join(rootPath, 'frontend', 'index.html'), 'utf8');

  const items = listMenu({ restaurant_id: currentRestId, onlyAvailable: true });

  const categoriesHtml = categories.map(c => `
    <button class="filter-btn ${c.id === 'all' ? 'active' : ''}" data-category="${c.id}" data-cat="${c.id}" type="button">
      <span class="cat-icon"><i class="${c.icon}"></i></span>
      <span class="cat-label">${c.label}</span>
    </button>
  `).join('');

  const menuHtml = items.map(item => `
    <article class="menu-card" data-id="${item.id}" data-category="${item.category}" data-cat="${item.category}" data-price="${item.price}" data-restaurant="${item.restaurant_id || currentRestId}" role="button" tabindex="0" onclick="window.Casita.openDetail('${item.id}')">
      <div class="card-art">
        ${item.badge ? `<span class="card-badge">${escapeHtml(item.badge)}</span>` : ''}
        ${item.image_url
          ? `<img src="${item.image_url}" alt="${escapeHtml(item.name)}" loading="lazy" width="400" height="260">`
          : `<span class="card-art-emoji"><i class="${getCategoryIcon(item.category)}"></i></span>`
        }
      </div>
      <div class="card-body">
        <header class="card-head">
          <h3 class="card-name">${escapeHtml(item.name)}</h3>
          <span class="card-price">$${item.price.toFixed(2)}</span>
        </header>
        <p class="card-desc">${escapeHtml(item.description)}</p>
        <div class="card-foot">
          <button class="btn btn-outline" type="button" data-action="detail" data-id="${item.id}" onclick="event.stopPropagation(); window.Casita.openDetail('${item.id}')">View Details</button>
          <button class="btn btn-primary" type="button" data-action="order" data-id="${item.id}" onclick="event.stopPropagation(); window.Casita.addToCart('${item.id}')"><i class="fa-solid fa-plus"></i> Order Now</button>
        </div>
      </div>
    </article>
  `).join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': `${SITE_URL}/#restaurant`,
        'name': restaurant.name,
        'telephone': restaurant.phone,
        'priceRange': restaurant.priceRange,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': restaurant.street,
          'addressLocality': restaurant.city,
          'addressRegion': restaurant.state,
          'postalCode': restaurant.postalCode,
          'addressCountry': restaurant.country
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': restaurant.lat,
          'longitude': restaurant.lng
        },
        'url': SITE_URL,
        'servesCuisine': 'Mexican, New Mexican',
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': restaurant.rating,
          'ratingCount': restaurant.ratingCount
        }
      },
      {
        '@type': 'Menu',
        '@id': `${SITE_URL}/#menu`,
        'name': `Menú - ${restaurant.name}`,
        'hasMenuSection': categories.filter(c => c.id !== 'all').map(cat => ({
          '@type': 'MenuSection',
          'name': cat.label,
          'hasMenuItem': items.filter(i => i.category === cat.id).map(i => ({
            '@type': 'MenuItem',
            'name': i.name,
            'description': i.description,
            'offers': {
              '@type': 'Offer',
              'price': i.price,
              'priceCurrency': 'USD'
            }
          }))
        }))
      }
    ]
  };

  const seoTags = `
    <title>${restaurant.name} — ${restaurant.slogan}</title>
    <meta name="description" content="${escapeHtml(restaurant.heroSubtitle)}">
    <link rel="canonical" href="${SITE_URL}/">
    <meta property="og:title" content="${restaurant.name} | Roswell, NM">
    <meta property="og:description" content="${escapeHtml(restaurant.slogan)}">
    <meta property="og:url" content="${SITE_URL}/">
    <meta property="og:type" content="website">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  `;

  const years = yearsOfHistory(restaurant.founded);

  return indexTemplate
    .replace('<!-- {{SEO_TAGS}} -->', seoTags)
    .replace('<!-- {{CATEGORIES_HTML}} -->', categoriesHtml)
    .replace('<!-- {{MENU_HTML}} -->', menuHtml)
    .replace(/\{\{REST_ID\}\}/g, restaurant.id)
    .replace(/\{\{REST_NAME\}\}/g, restaurant.name)
    .replace(/\{\{REST_SHORT\}\}/g, restaurant.shortName)
    .replace(/\{\{REST_SLOGAN\}\}/g, restaurant.slogan)
    .replace(/\{\{REST_EYEBROW\}\}/g, restaurant.eyebrow)
    .replace(/\{\{REST_HERO_TITLE\}\}/g, restaurant.heroTitle)
    .replace(/\{\{REST_HERO_SUBTITLE\}\}/g, restaurant.heroSubtitle)
    .replace(/\{\{REST_ADDRESS\}\}/g, `${restaurant.street}, ${restaurant.city}, ${restaurant.state} ${restaurant.postalCode}`)
    .replace(/\{\{REST_HOURS_LABEL\}\}/g, restaurant.hoursLabel)
    .replace(/\{\{FOUNDED\}\}/g, String(restaurant.founded))
    .replace(/\{\{YEARS\}\}/g, String(years))
    .replace(/\{\{YEARS_HISTORY\}\}/g, String(years))
    .replace(/\{\{PHONE\}\}/g, restaurant.phone)
    .replace(/\{\{PHONE_LABEL\}\}/g, restaurant.phoneLabel)
    .replace(/\{\{WHATSAPP\}\}/g, restaurant.whatsapp)
    .replace(/\{\{FACEBOOK_URL\}\}/g, restaurant.facebook)
    .replace(/\{\{MAPS_URL\}\}/g, restaurant.maps)
    .replace(/\{\{SITE_URL\}\}/g, SITE_URL);
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'desayunos': return 'fa-solid fa-egg';
    case 'burritos': return 'fa-solid fa-bowl-food';
    case 'especiales': return 'fa-solid fa-plate-wheat';
    case 'sopapillas': return 'fa-solid fa-cookie-bite';
    case 'tacos': return 'fa-solid fa-fire';
    case 'alambres': return 'fa-solid fa-fire-burner';
    case 'pozole': return 'fa-solid fa-bowl-rice';
    case 'mariscos': return 'fa-solid fa-shrimp';
    case 'crossover': return 'fa-solid fa-drumstick-bite';
    case 'bebidas': return 'fa-solid fa-wine-glass';
    default: return 'fa-solid fa-utensils';
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}