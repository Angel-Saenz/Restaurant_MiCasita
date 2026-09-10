(function () {
  const money = (n) => Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function store(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  const RESTAURANTS = {
    micasita: {
      id: 'micasita',
      name: 'Mi Casita Restaurant',
      shortName: 'Mi Casita',
      icon: 'fa-solid fa-house',
      pillLabel: '<i class="fa-solid fa-house"></i> Mi Casita',
      since: 'Roswell, NM · Desde 1993',
      eyebrow: 'DOWNTOWN ROSWELL · MÁS DE 30 AÑOS DE TRADICIÓN',
      heroTitle: 'Auténtica Comida Mexicana <em>Hecha en Casa</em>',
      heroSubtitle: 'El rincón tradicional de Roswell: menudo artesanal de fin de semana, burritos ahogados en chile de Nuevo México y sopapillas calientitas con miel.',
      heroDishEmoji: 'fa-solid fa-bowl-food',
      heroDishTag: 'Especialidad de Fin de Semana',
      heroDishName: 'Menudo Tradicional Casero',
      heroDishDesc: 'Servido con pata tierna, grano de maíz, orégano, cebolla picada y tortillas de comal.',
      highlights: [
        { icon: 'fa-solid fa-bowl-food', text: '<b>Menudo Tradicional</b> los fines de semana' },
        { icon: 'fa-solid fa-bread-slice', text: '<b>Breakfast Burritos</b> ahogados en chile NM' },
        { icon: 'fa-solid fa-egg', text: '<b>Huevos Rancheros</b> y Chilaquiles de comal' },
        { icon: 'fa-solid fa-cookie-bite', text: '<b>Sopapillas Calientitas</b> con miel pura' },
      ],
      address: '305 S Main St, Roswell, NM 88203',
      phone: '5756231455',
      phoneLabel: '(575) 623-1455',
      whatsapp: '15756231455',
      hoursLabel: 'Lunes a Sábado: 7:00 AM – 3:00 PM | Domingo: Cerrado',
      hours: { open: 7, close: 15, closedDays: [0] },
      maps: 'https://www.google.com/maps/search/?api=1&query=Mi+Casita+Restaurant+305+S+Main+St+Roswell+NM+88203',
      facebook: 'https://www.facebook.com/MiCasitaRestaurantRoswell',
      siblingId: 'garibaldi',
      siblingName: 'Garibaldi Mexican Kitchen',
      siblingDesc: '¿Buscas tacos al pastor, alambre al comal, pozole tradicional, parrilladas y cena? Visita Garibaldi Kitchen en 2019 S Main St.',
      siblingBtn: '<i class="fa-solid fa-guitar"></i> Ver la Carta de Garibaldi Kitchen',
      builderTitle: 'Arma tu Burrito o Platillo Casero',
      builderSubtitle: 'Elige tu base, guisado tradicional de Nuevo México, tipo de chile y complementos caseros.',
    },
    garibaldi: {
      id: 'garibaldi',
      name: 'Garibaldi Mexican Kitchen',
      shortName: 'Garibaldi Kitchen',
      icon: 'fa-solid fa-guitar',
      pillLabel: '<i class="fa-solid fa-guitar"></i> Garibaldi Kitchen',
      since: 'Roswell, NM · Cocina Viva & Eventos',
      eyebrow: 'SOUTH MAIN ROSWELL · COCINA VIVA & EVENTOS PRIVADOS',
      heroTitle: 'La Fiesta del Sabor en <em>Garibaldi Kitchen</em>',
      heroSubtitle: 'Inspirado en la mística Plaza Garibaldi: tacos al pastor con piña, alambre al comal, pozole tradicional, parrilladas al carbón y mariscos fiesta.',
      heroDishEmoji: 'fa-solid fa-fire',
      heroDishTag: 'Estrella de la Casa',
      heroDishName: 'Tacos al Pastor & Alambre',
      heroDishDesc: 'Carne marinada al comal con piña caramelizada, queso fundido y salsas bravas.',
      highlights: [
        { icon: 'fa-solid fa-fire', text: '<b>Tacos al Pastor</b> con piña asada al comal' },
        { icon: 'fa-solid fa-fire-burner', text: '<b>Alambre Supremo</b> con queso Oaxaca fundido' },
        { icon: 'fa-solid fa-bowl-rice', text: '<b>Pozole Rojo Tradicional</b> y Mole Poblano' },
        { icon: 'fa-solid fa-shrimp', text: '<b>Mariscos Fiesta</b> y Parrilladas familiares' },
        { icon: 'fa-solid fa-champagne-glasses', text: '<b>Salón Privado</b> para eventos y Drive-Thru' },
      ],
      address: '2019 S Main St, Roswell, NM 88203',
      phone: '5755505100',
      phoneLabel: '(575) 550-5100',
      whatsapp: '15755505100',
      hoursLabel: 'Lunes a Sábado: 8:00 AM – 8:00 PM | Domingo: 8:00 AM – 4:00 PM',
      hours: { open: 8, close: 20, sundayClose: 16, closedDays: [] },
      maps: 'https://www.google.com/maps/search/?api=1&query=Garibaldi+Mexican+Kitchen+2019+S+Main+St+Roswell+NM+88203',
      facebook: 'https://www.facebook.com/share/g/1bT3LZBWXG/',
      siblingId: 'micasita',
      siblingName: 'Mi Casita Restaurant',
      siblingDesc: '¿Prefieres el clásico desayuno casero, menudo de fin de semana y sopapillas? Visita Mi Casita en 305 S Main St.',
      siblingBtn: '<i class="fa-solid fa-house"></i> Ver la Carta de Mi Casita Restaurant',
      builderTitle: 'Arma tu Orden de Tacos o Alambre al Comal',
      builderSubtitle: 'Selecciona tus cortes selectos, queso fundido, salsas taqueras y extras al estilo Garibaldi.',
    },
  };

  const params = new URLSearchParams(location.search);
  const pathMesa = location.pathname.match(/\/mesa\/([^/]+)/);
  const MESA = pathMesa ? pathMesa[1] : (params.get('mesa') || '').replace(/\D/g, '');
  const SOURCE = MESA ? 'mesa' : (params.get('src') === 'qr' ? 'qr' : 'web');

  const VISITOR = (() => {
    let v = store('casita_visitor', null);
    if (!v) {
      v = (crypto.randomUUID?.() || String(Math.random()).slice(2)).replace(/-/g, '').slice(0, 24);
      save('casita_visitor', v);
    }
    return v;
  })();

  const urlChoice = params.get('rest') || params.get('restaurant');
  const storedChoice = store('preferred_restaurant', null);

  let currentRestId = (urlChoice && RESTAURANTS[urlChoice])
    ? urlChoice
    : (storedChoice && RESTAURANTS[storedChoice] ? storedChoice : 'micasita');

  let currentLang = (() => {
    const p = params.get('lang');
    if (p === 'en' || p === 'es') return p;
    const s = store('casita_lang_v2', null);
    if (s === 'en' || s === 'es') return s;
    return 'en';
  })();

  const portalModal = $('#restaurantSelectorModal');

  function openPortal() {
    portalModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePortal() {
    portalModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showToast(msg) {
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3500);
  }

  function setLanguage(lang) {
    if (lang !== 'es' && lang !== 'en') lang = 'en';
    currentLang = lang;
    save('casita_lang_v2', lang);
    save('casita_lang', lang);
    if (window.CasitaI18N) window.CasitaI18N.current = lang;

    document.documentElement.setAttribute('lang', lang);

    $$('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    if (window.CasitaI18N) {
      $$('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = window.CasitaI18N.t(key, lang);
        if (text) el.textContent = text;
      });

      const cI18n = window.CasitaI18N.getRestaurant('micasita', lang);
      const gI18n = window.CasitaI18N.getRestaurant('garibaldi', lang);

      const pBadgeCasita = $('#portalBadgeCasita');
      if (pBadgeCasita && cI18n.heroBadge) pBadgeCasita.textContent = cI18n.heroBadge;
      const pSloganCasita = $('#portalSloganCasita');
      if (pSloganCasita && cI18n.slogan) pSloganCasita.textContent = `"${cI18n.slogan}"`;
      const pHoursCasita = $('#portalHoursCasita');
      if (pHoursCasita && cI18n.hoursLabel) pHoursCasita.innerHTML = `<b>${escapeHtml(cI18n.hoursLabel)}</b>`;
      const pBtnCasita = $('#portalBtnCasita span');
      if (pBtnCasita) pBtnCasita.textContent = lang === 'en' ? 'Enter Mi Casita Restaurant' : 'Entrar a Mi Casita Restaurant';

      const pBadgeGaribaldi = $('#portalBadgeGaribaldi');
      if (pBadgeGaribaldi && gI18n.heroBadge) pBadgeGaribaldi.textContent = gI18n.heroBadge;
      const pSloganGaribaldi = $('#portalSloganGaribaldi');
      if (pSloganGaribaldi && gI18n.slogan) pSloganGaribaldi.textContent = `"${gI18n.slogan}"`;
      const pHoursGaribaldi = $('#portalHoursGaribaldi');
      if (pHoursGaribaldi && gI18n.hoursLabel) pHoursGaribaldi.innerHTML = `<b>${escapeHtml(gI18n.hoursLabel)}</b>`;
      const pBtnGaribaldi = $('#portalBtnGaribaldi span');
      if (pBtnGaribaldi) pBtnGaribaldi.textContent = lang === 'en' ? 'Enter Garibaldi Kitchen' : 'Entrar a Garibaldi Kitchen';
    }

    activateRestaurant(currentRestId, false);
  }

  function activateRestaurant(restId, savePreference = true) {
    if (!RESTAURANTS[restId]) restId = 'micasita';
    currentRestId = restId;
    const r = RESTAURANTS[restId];
    const rI18n = (window.CasitaI18N && window.CasitaI18N.getRestaurant(restId, currentLang)) || {};
    const sibI18n = (window.CasitaI18N && window.CasitaI18N.getRestaurant(r.siblingId, currentLang)) || {};

    if (savePreference) {
      save('preferred_restaurant', restId);
      const url = new URL(location.href);
      url.searchParams.set('rest', restId);
      history.replaceState(null, '', url.toString());
    }

    document.documentElement.setAttribute('data-restaurant', restId);
    const heroSub = rI18n.heroSubtitle || r.heroSubtitle;
    document.title = `${r.name} — ${heroSub.slice(0, 60)}...`;

    const navName = $('#navRestaurantName');
    if (navName) navName.textContent = r.name;

    const navSince = $('#navRestaurantSince');
    if (navSince) navSince.textContent = rI18n.since || r.since;

    const navPill = $('#navPillLabel');
    if (navPill) navPill.innerHTML = `<i class="${r.icon}"></i> ${r.shortName}`;

    const navPhone = $('#navPhoneCta');
    if (navPhone) {
      navPhone.href = `tel:${r.phone}`;
      navPhone.innerHTML = `<i class="fa-solid fa-phone"></i> <span class="nav-cta-text">${escapeHtml(r.phoneLabel)}</span>`;
    }

    const heroBadge = $('#heroBadge');
    if (heroBadge) heroBadge.textContent = `${r.shortName} · ROSWELL, NM`;

    const heroEyebrow = $('#heroEyebrow');
    if (heroEyebrow) heroEyebrow.textContent = rI18n.eyebrow || r.eyebrow;

    const heroTitle = $('#heroTitle');
    if (heroTitle) heroTitle.innerHTML = rI18n.heroTitle || r.heroTitle;

    const heroSubtitle = $('#heroSubtitle');
    if (heroSubtitle) heroSubtitle.textContent = heroSub;

    const heroEmoji = $('#heroDishEmoji');
    if (heroEmoji) heroEmoji.innerHTML = `<i class="${r.heroDishEmoji}"></i>`;

    const heroDishTag = $('#heroDishTag');
    if (heroDishTag) heroDishTag.textContent = rI18n.heroDishTag || r.heroDishTag;

    const heroDishName = $('#heroDishName');
    if (heroDishName) heroDishName.textContent = rI18n.heroDishName || r.heroDishName;

    const heroDishDesc = $('#heroDishDesc');
    if (heroDishDesc) heroDishDesc.textContent = rI18n.heroDishDesc || r.heroDishDesc;

    const strip = $('#heroHighlightsStrip');
    if (strip) {
      const hl = rI18n.highlights || r.highlights;
      strip.innerHTML = hl.map(h => `
        <div class="hero-pill-feature">
          <span><i class="${h.icon}"></i></span>
          <span>${h.text}</span>
        </div>
      `).join('');
    }

    const bTitle = $('#builderTitle');
    if (bTitle) bTitle.textContent = rI18n.builderTitle || r.builderTitle;

    const bSub = $('#builderSubtitle');
    if (bSub) bSub.textContent = rI18n.builderSubtitle || r.builderSubtitle;

    const locBadge = $('#locationBadge');
    if (locBadge) locBadge.textContent = window.CasitaI18N ? window.CasitaI18N.t('activeRestaurantBadge', currentLang) : 'Restaurante Activo';

    const locName = $('#locationName');
    if (locName) locName.textContent = r.name;

    const locAddress = $('#locationAddress');
    if (locAddress) locAddress.innerHTML = `<i class="fa-solid fa-location-dot" style="color: var(--accent);"></i> <b>${escapeHtml(r.address)}</b>`;

    const locHours = $('#locationHours');
    if (locHours) {
      const hTitle = currentLang === 'en' ? 'Hours:' : 'Horario:';
      locHours.innerHTML = `<i class="fa-solid fa-clock" style="color: var(--accent);"></i> <b>${hTitle}</b> ${escapeHtml(rI18n.hoursLabel || r.hoursLabel)}`;
    }

    const locPhoneBtn = $('#locationPhoneBtn');
    if (locPhoneBtn) {
      locPhoneBtn.href = `tel:${r.phone}`;
      const callText = currentLang === 'en' ? `Call (${escapeHtml(r.phoneLabel)})` : `Llamar al (${escapeHtml(r.phoneLabel)})`;
      locPhoneBtn.innerHTML = `<i class="fa-solid fa-phone"></i> ${callText}`;
    }

    const locMapBtn = $('#locationMapBtn');
    if (locMapBtn) locMapBtn.href = r.maps;

    const locFbBtn = $('#locationFbBtn');
    if (locFbBtn) locFbBtn.href = r.facebook;

    const sibName = $('#siblingName');
    if (sibName) sibName.textContent = r.siblingName;

    const sibDesc = $('#siblingDesc');
    if (sibDesc) sibDesc.textContent = sibI18n.siblingDesc || r.siblingDesc;

    const sibBtn = $('#siblingBtnText');
    if (sibBtn) sibBtn.textContent = sibI18n.siblingBtn ? sibI18n.siblingBtn.replace(/<[^>]*>/g, '') : `Ver la Carta de ${r.siblingName}`;

    const footerName = $('#footerBrandName');
    if (footerName) footerName.textContent = r.name;

    const footerDesc = $('#footerBrandDesc');
    if (footerDesc) footerDesc.textContent = heroSub;

    const footerHours = $('#footerHours');
    if (footerHours) footerHours.textContent = rI18n.hoursLabel || r.hoursLabel;

    const footerAddr = $('#footerAddress');
    if (footerAddr) footerAddr.textContent = r.address;

    const footerPhone = $('#footerPhone');
    if (footerPhone) footerPhone.textContent = `Tel: ${r.phoneLabel}`;

    updateLiveStatus();
    loadMenuForRestaurant(restId);
    initBuilderForRestaurant(restId);
  }

  function updateLiveStatus() {
    const el = $('#liveStatus');
    if (!el) return;

    const r = RESTAURANTS[currentRestId];
    if (!r) return;

    const now = new Date();
    const day = now.getDay();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    let isOpen = false;
    let closesAt = r.hours.close;

    if (r.hours.closedDays?.includes(day)) {
      isOpen = false;
    } else if (day === 0 && r.hours.sundayClose) {
      closesAt = r.hours.sundayClose;
      isOpen = currentHour >= r.hours.open && currentHour < closesAt;
    } else {
      isOpen = currentHour >= r.hours.open && currentHour < closesAt;
    }

    if (isOpen) {
      const hoursLeft = closesAt - currentHour;
      if (hoursLeft <= 0.75) {
        el.textContent = currentLang === 'en' ? '● CLOSING SOON' : '● CIERRA PRONTO';
        el.className = 'live-status open';
      } else {
        el.textContent = currentLang === 'en' ? '● OPEN NOW' : '● ABIERTO AHORA';
        el.className = 'live-status open';
      }
    } else {
      el.textContent = currentLang === 'en' ? '● CLOSED' : '● CERRADO';
      el.className = 'live-status closed';
    }
  }

  setInterval(updateLiveStatus, 60000);

  const menuDataCache = {};

  function formatAssetUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    if (url.startsWith('/')) return '.' + url;
    return url;
  }

  async function loadMenuForRestaurant(restId) {
    const grid = $('#menuGrid');
    const filterBar = $('#menuFilters');
    if (!grid) return;

    try {
      if (!menuDataCache[restId]) {
        try {
          const res = await fetch(`/api/menu?restaurant=${restId}`);
          if (res.ok) {
            menuDataCache[restId] = await res.json();
          }
        } catch (e) {}

        if (!menuDataCache[restId] || !menuDataCache[restId].items) {
          try {
            const fallbackRes = await fetch('./assets/data/menu.json');
            if (fallbackRes.ok) {
              const all = await fallbackRes.json();
              menuDataCache[restId] = {
                items: all.filter(it => (it.restaurant_id || 'micasita') === restId)
              };
            }
          } catch (e) {}
        }
      }
      const data = menuDataCache[restId] || { items: [] };

      const categories = (window.CasitaI18N && window.CasitaI18N.getCategories(restId, currentLang)) || data.categories || [];

      if (filterBar && categories.length) {
        const currentActive = filterBar.querySelector('.filter-btn.active')?.dataset.category || 'all';
        filterBar.innerHTML = categories.map((c, i) => `
          <button class="filter-btn ${(c.id === currentActive || (i === 0 && currentActive === 'all')) ? 'active' : ''}" data-category="${c.id}" type="button">
            <span class="cat-icon"><i class="${c.icon}"></i></span>
            <span class="cat-label">${escapeHtml(c.label)}</span>
          </button>
        `).join('');
      }

      if (data.items) {
        const detailBtnLabel = window.CasitaI18N ? window.CasitaI18N.t('viewDetail', currentLang) : 'Ver Detalle';
        const orderBtnLabel = window.CasitaI18N ? window.CasitaI18N.t('orderNow', currentLang) : 'Pedir Ya';

        grid.innerHTML = data.items.map(item => {
          const loc = (window.CasitaI18N && window.CasitaI18N.getDish(item.id, currentLang)) || null;
          const dishName = (loc && loc.name) || item.name;
          const dishDesc = (loc && loc.description) || item.description;
          const dishBadge = (loc && loc.badge !== undefined) ? loc.badge : item.badge;

          return `
            <article class="menu-card" data-id="${item.id}" data-category="${item.category}" data-price="${item.price}" data-restaurant="${item.restaurant_id || restId}" role="button" tabindex="0" onclick="window.Casita.openDetail('${item.id}')">
              <div class="card-art">
                ${dishBadge ? `<span class="card-badge">${escapeHtml(dishBadge)}</span>` : ''}
                ${item.image_url
                  ? `<img src="${formatAssetUrl(item.image_url)}" alt="${escapeHtml(dishName)}" loading="lazy" width="400" height="260">`
                  : `<span class="card-art-emoji"><i class="${getCategoryIcon(item.category)}"></i></span>`
                }
              </div>
              <div class="card-body">
                <header class="card-head">
                  <h3 class="card-name">${escapeHtml(dishName)}</h3>
                  <span class="card-price">$${Number(item.price).toFixed(2)}</span>
                </header>
                <p class="card-desc">${escapeHtml(dishDesc)}</p>
                <div class="card-foot">
                  <button class="btn btn-outline" type="button" data-action="detail" data-id="${item.id}" onclick="event.stopPropagation(); window.Casita.openDetail('${item.id}')">${detailBtnLabel}</button>
                  <button class="btn btn-primary" type="button" data-action="order" data-id="${item.id}" onclick="event.stopPropagation(); window.Casita.addToCart('${item.id}')"><i class="fa-solid fa-plus"></i> ${orderBtnLabel}</button>
                </div>
              </div>
            </article>
          `;
        }).join('');

        setupViewTracking();
        initMenuCardAnimations();
      }
    } catch (err) {
      console.error('Error cargando menú:', err);
    }
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

  $('#menuFilters')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const cat = btn.dataset.category;

    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    $$('.menu-card').forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.classList.toggle('hidden', !show);
      if (!show) {
        card.classList.remove('anim-visible');
        card.style.transitionDelay = '0s';
      }
    });
    initMenuCardAnimations();
  });

  let menuCardObserver = null;
  let menuGridObserver = null;

  function initMenuCardAnimations() {
    if (!('IntersectionObserver' in window)) return;

    if (!menuCardObserver) {
      menuCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const card = entry.target;
          if (entry.isIntersecting) {
            card.classList.add('anim-visible');
          } else {
            card.classList.remove('anim-visible');
            card.style.transitionDelay = '0s';
          }
        });
      }, {
        rootMargin: '24px 0px -24px 0px',
        threshold: 0.08
      });
    }

    const cards = Array.from(document.querySelectorAll('.menu-card'));
    if (!cards.length) return;

    const visibleCards = cards.filter(c => !c.classList.contains('hidden'));
    if (!visibleCards.length) return;

    let inViewStagger = 0;
    visibleCards.forEach((card, idx) => {
      if (!card.classList.contains('anim-from-left') && !card.classList.contains('anim-from-right')) {
        const isLeft = idx % 2 === 0;
        card.classList.add(isLeft ? 'anim-from-left' : 'anim-from-right');
      }

      menuCardObserver.observe(card);

      const rect = card.getBoundingClientRect();
      const inViewNow = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewNow && !card.classList.contains('anim-visible')) {
        card.style.transitionDelay = `${(inViewStagger % 6) * 90}ms`;
        inViewStagger++;
        requestAnimationFrame(() => {
          card.classList.add('anim-visible');
        });
      }
    });

    setupMenuGridMutationObserver();
  }

  function setupMenuGridMutationObserver() {
    if (menuGridObserver) return;
    const grid = document.getElementById('menuGrid');
    if (!grid || !('MutationObserver' in window)) return;

    menuGridObserver = new MutationObserver((mutations) => {
      let hasNew = false;
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes.length) {
          for (const node of m.addedNodes) {
            if (node.nodeType === 1 && (node.classList?.contains('menu-card') || node.querySelector?.('.menu-card'))) {
              hasNew = true;
              break;
            }
          }
        }
        if (hasNew) break;
      }
      if (hasNew) {
        initMenuCardAnimations();
      }
    });

    menuGridObserver.observe(grid, { childList: true, subtree: true });
  }

  function setupViewTracking() {
    const viewObs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        track('view', e.target.dataset.id);
        viewObs.unobserve(e.target);
      }
    }, { threshold: 0.5 });
    $$('.menu-card').forEach(c => viewObs.observe(c));
  }

  function track(type, itemId) {
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, type, visitorId: VISITOR, source: SOURCE }),
    }).catch(() => {});
  }

  let cart = store('casita_cart', []);

  function saveCart() {
    save('casita_cart', cart);
    renderCartUI();
  }

  function renderCartUI() {
    const totalCount = cart.reduce((s, i) => s + i.cantidad, 0);
    const badge = $('#cartBadge');
    if (badge) badge.textContent = totalCount;

    const totalVal = $('#cartTotalAmount');
    if (totalVal) {
      const total = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);
      totalVal.textContent = `$${money(total)} USD`;
    }

    const list = $('#cartItemsList');
    if (list) {
      if (cart.length === 0) {
        const emptyMsg = window.CasitaI18N ? window.CasitaI18N.t('cartEmpty', currentLang) : 'Tu pedido está vacío.';
        list.innerHTML = `<p style="text-align: center; color: var(--muted); padding: 20px 0;">${emptyMsg}</p>`;
      } else {
        list.innerHTML = cart.map((item, idx) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border-subtle);">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">${escapeHtml(item.nombre)}</div>
              ${item.restaurantName ? `<div style="font-size: 0.74rem; color: var(--accent); font-weight: 700;">${escapeHtml(item.restaurantName)}</div>` : ''}
              ${item.detalle ? `<div style="font-size: 0.78rem; color: var(--muted);">${escapeHtml(item.detalle)}</div>` : ''}
              <div style="font-weight: 800; color: var(--accent-2); font-size: 0.92rem; margin-top: 2px;">$${money(item.precio)} USD</div>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button class="btn btn-outline" style="padding: 2px 8px;" onclick="window.Casita.changeQty(${idx}, -1)" title="Disminuir"><i class="fa-solid fa-minus" style="font-size: 0.72rem;"></i></button>
              <span style="font-weight: 800; min-width: 20px; text-align: center;">${item.cantidad}</span>
              <button class="btn btn-outline" style="padding: 2px 8px;" onclick="window.Casita.changeQty(${idx}, 1)" title="Aumentar"><i class="fa-solid fa-plus" style="font-size: 0.72rem;"></i></button>
              <button class="btn btn-outline" style="padding: 2px 6px; color: var(--danger);" onclick="window.Casita.removeItem(${idx})" title="Eliminar"><i class="fa-solid fa-trash-can" style="font-size: 0.75rem;"></i></button>
            </div>
          </div>
        `).join('');
      }
    }
  }

  window.Casita = {
    changeQty(idx, delta) {
      if (cart[idx]) {
        cart[idx].cantidad += delta;
        if (cart[idx].cantidad <= 0) cart.splice(idx, 1);
        saveCart();
      }
    },
    removeItem(idx) {
      cart.splice(idx, 1);
      saveCart();
    },
    openDetail(id) {
      openDetailModal(id);
    },
    addToCart(id) {
      addToCart(id);
    },
    addAndClose(id) {
      addToCart(id);
      closeDetailModal();
    }
  };

  function addToCart(id) {
    const card = $(`.menu-card[data-id="${id}"]`);
    if (!card) return;

    const loc = (window.CasitaI18N && window.CasitaI18N.getDish(id, currentLang)) || null;
    const nombre = (loc && loc.name) || card.querySelector('.card-name')?.textContent || 'Platillo';
    const precio = Number(card.dataset.price) || 0;
    const rest = card.dataset.restaurant || currentRestId;

    const exist = cart.find(i => i.id === id && !i.isCustom);
    if (exist) {
      exist.cantidad += 1;
    } else {
      cart.push({
        id,
        restaurant_id: rest,
        restaurantName: RESTAURANTS[rest]?.shortName || '',
        nombre,
        precio,
        cantidad: 1,
        isCustom: false,
      });
    }
    saveCart();
    track('order', id);
    const cartFloat = $('#cartFloatBtn');
    if (cartFloat) {
      cartFloat.classList.add('bump');
      setTimeout(() => cartFloat.classList.remove('bump'), 320);
    }
    const prefix = window.CasitaI18N ? window.CasitaI18N.t('toastAdded', currentLang) : 'Agregado:';
    showToast(`${prefix} ${nombre}`);
  }

  $('#menuGrid')?.addEventListener('click', (e) => {
    const orderBtn = e.target.closest('button[data-action="order"]');
    if (orderBtn) {
      e.stopPropagation();
      addToCart(orderBtn.dataset.id);
      return;
    }

    const detailBtn = e.target.closest('button[data-action="detail"]');
    if (detailBtn) {
      e.stopPropagation();
      openDetailModal(detailBtn.dataset.id);
      return;
    }

    const card = e.target.closest('.menu-card');
    if (card && card.dataset.id) {
      openDetailModal(card.dataset.id);
    }
  });

  async function openDetailModal(id) {
    try {
      let item = null;
      for (const r in menuDataCache) {
        const found = menuDataCache[r]?.items?.find(it => String(it.id) === String(id));
        if (found) {
          item = found;
          break;
        }
      }

      if (!item) {
        try {
          const res = await fetch(`/api/menu/${encodeURIComponent(id)}`);
          if (res.ok) {
            item = await res.json();
          }
        } catch (e) {}
      }

      if (!item) {
        try {
          const base = location.pathname.includes('/frontend/') ? './assets/data/menu.json' : './frontend/assets/data/menu.json';
          const staticRes = await fetch(base);
          if (staticRes.ok) {
            const all = await staticRes.json();
            item = all.find(it => String(it.id) === String(id)) || null;
          }
        } catch (e) {}
      }

      if (!item) {
        const card = document.querySelector(`.menu-card[data-id="${id}"]`);
        if (card) {
          const loc = (window.CasitaI18N && window.CasitaI18N.getDish(id, currentLang)) || null;
          item = {
            id,
            restaurant_id: card.dataset.restaurant || currentRestId,
            name: (loc && loc.name) || card.querySelector('.card-name')?.textContent || 'Platillo',
            description: (loc && loc.description) || card.querySelector('.card-desc')?.textContent || '',
            price: Number(card.dataset.price) || 0,
            image_url: card.querySelector('.card-art img')?.getAttribute('src') || '',
            ingredients: []
          };
        }
      }

      if (!item) return;

      track('view', item.id);

      const loc = (window.CasitaI18N && window.CasitaI18N.getDish(item.id, currentLang)) || null;
      const dishName = (loc && loc.name) || item.name;
      const dishDesc = (loc && loc.description) || item.description;

      const modal = $('#detailModal');
      const body = $('#detailModalBody');
      const ingLabel = window.CasitaI18N ? window.CasitaI18N.t('detailIngredients', currentLang) : 'Ingredients:';
      const addLabel = window.CasitaI18N ? window.CasitaI18N.t('detailAddBtn', currentLang) : 'Add to My Order';

      if (modal && body) {
        body.innerHTML = `
          ${item.image_url ? `<img src="${formatAssetUrl(item.image_url)}" alt="${escapeHtml(dishName)}" style="width: 100%; height: 210px; object-fit: cover; border-radius: var(--radius-sm); margin-bottom: 16px;">` : ''}
          <div style="font-size: 0.76rem; text-transform: uppercase; font-weight: 800; color: var(--accent); margin-bottom: 4px;">
            ${RESTAURANTS[item.restaurant_id || currentRestId]?.name || ''}
          </div>
          <h2 style="font-family: var(--font-serif); font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">${escapeHtml(dishName)}</h2>
          <div style="font-family: var(--font-serif); font-size: 1.4rem; font-weight: 800; color: var(--accent-2); margin-bottom: 14px;">$${money(item.price)} USD</div>
          <p style="color: var(--muted); margin-bottom: 20px; line-height: 1.6;">${escapeHtml(dishDesc)}</p>
          ${item.ingredients && item.ingredients.length ? `
            <div style="margin-bottom: 20px;">
              <b style="font-size: 0.85rem; display: block; margin-bottom: 6px;">${ingLabel}</b>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                ${item.ingredients.map(ing => `<span style="background: var(--surface-2); padding: 4px 10px; border-radius: 8px; font-size: 0.78rem;">${escapeHtml(ing)}</span>`).join('')}
              </div>
            </div>
          ` : ''}
          <button class="btn btn-primary" style="width: 100%; padding: 14px;" onclick="window.Casita.addAndClose('${item.id}')">${addLabel}</button>
        `;
        modal.classList.add('active');
      }
    } catch (err) {}
  }

  function closeDetailModal() {
    $('#detailModal')?.classList.remove('active');
  }

  function closeCartModal() {
    $('#cartModal')?.classList.remove('active');
  }

  $('#cartFloatBtn')?.addEventListener('click', () => {
    $('#cartModal')?.classList.add('active');
  });
  $('#cartModalClose')?.addEventListener('click', closeCartModal);
  $('#cartModal')?.addEventListener('click', (e) => {
    if (e.target === $('#cartModal')) closeCartModal();
  });
  $('#detailModalClose')?.addEventListener('click', closeDetailModal);
  $('#detailModal')?.addEventListener('click', (e) => {
    if (e.target === $('#detailModal')) closeDetailModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeCartModal();
      closePortal();
    }
  });

  $('#sendToKitchenBtn')?.addEventListener('click', async () => {
    if (cart.length === 0) {
      return alert(window.CasitaI18N ? window.CasitaI18N.t('alertOrderEmpty', currentLang) : 'Tu pedido está vacío.');
    }
    const mesa = MESA || ($('#cartMesaInput')?.value || '').replace(/\D/g, '') || '1';

    try {
      const res = await fetch('/api/ordenes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mesa,
          items: cart,
          visitorId: VISITOR,
          restaurant_id: currentRestId
        }),
      });
      const data = await res.json();
      if (data.success) {
        const msg = currentLang === 'en'
          ? `Order #${data.ordenId} sent to kitchen at ${RESTAURANTS[currentRestId].name} for Table #${mesa}!`
          : `¡Comanda #${data.ordenId} enviada a cocina de ${RESTAURANTS[currentRestId].name} para la Mesa #${mesa}!`;
        alert(msg);
        cart = [];
        saveCart();
        $('#cartModal')?.classList.remove('active');
      } else {
        alert(data.error || 'Error al enviar comanda.');
      }
    } catch (err) {
      alert(currentLang === 'en' ? 'Server connection error.' : 'Error de conexión con el servidor.');
    }
  });

  $('#sendWhatsAppBtn')?.addEventListener('click', () => {
    if (cart.length === 0) {
      return alert(window.CasitaI18N ? window.CasitaI18N.t('alertOrderEmpty', currentLang) : 'Tu pedido está vacío.');
    }
    const r = RESTAURANTS[currentRestId];
    const isEn = currentLang === 'en';
    let text = isEn
      ? `*New Order — ${r.name} (Roswell, NM)*\n\n`
      : `*Nuevo Pedido — ${r.name} (Roswell, NM)*\n\n`;
    cart.forEach(i => {
      text += `• ${i.cantidad}x *${i.nombre}* ($${money(i.precio * i.cantidad)} USD)\n`;
      if (i.detalle) text += `  _${i.detalle}_\n`;
    });
    const total = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);
    text += isEn
      ? `\n*Estimated Total:* $${money(total)} USD\nPick up at: ${r.address}\nPhone: ${r.phoneLabel}`
      : `\n*Total estimado:* $${money(total)} USD\nRecoger en: ${r.address}\nTeléfono: ${r.phoneLabel}`;

    window.open(`https://wa.me/${r.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  });

  let builderData = null;
  let builderSelection = {};

  async function initBuilderForRestaurant(restId) {
    const form = $('#builderForm');
    if (!form) return;

    try {
      const res = await fetch(`/api/menu/builder?restaurant=${restId}`);
      builderData = await res.json();
      builderSelection = {};

      builderData.steps.forEach(step => {
        builderSelection[step.id] = step.type === 'single' ? step.options[0].id : [];
      });

      renderBuilder();
    } catch (err) {
      console.error('Error cargando builder:', err);
    }
  }

  function renderBuilder() {
    const form = $('#builderForm');
    if (!form || !builderData) return;

    const bI18n = window.CasitaI18N && window.CasitaI18N.getBuilder(currentRestId, currentLang);

    form.innerHTML = builderData.steps.map(step => {
      const stepI18n = bI18n?.steps?.[step.id];
      const stepLabel = (stepI18n && stepI18n.label && stepI18n.label[currentLang]) || step.label;
      const stepHelp = (stepI18n && stepI18n.help && stepI18n.help[currentLang]) || step.help;

      return `
        <div class="builder-step">
          <h3 class="step-title">${escapeHtml(stepLabel)}</h3>
          <p class="step-help">${escapeHtml(stepHelp)}</p>
          <div class="options-grid">
            ${step.options.map(opt => {
              const sel = step.type === 'single'
                ? builderSelection[step.id] === opt.id
                : (builderSelection[step.id] || []).includes(opt.id);

              const optI18n = stepI18n?.options?.[opt.id];
              const optLabel = (optI18n && optI18n.label && optI18n.label[currentLang]) || opt.label;
              const optNote = (optI18n && optI18n.note && optI18n.note[currentLang]) || opt.note;

              return `
                <div class="opt-card ${sel ? 'selected' : ''}" data-step="${step.id}" data-type="${step.type}" data-opt="${opt.id}">
                  <div class="opt-name">
                    <span>${escapeHtml(optLabel)}</span>
                    ${opt.delta !== 0 ? `<span class="opt-delta">${opt.delta > 0 ? '+' : ''}$${Number(opt.delta).toFixed(2)}</span>` : ''}
                  </div>
                  ${optNote ? `<div class="opt-note">${escapeHtml(optNote)}</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    $$('.opt-card', form).forEach(card => {
      card.addEventListener('click', () => {
        const stepId = card.dataset.step;
        const type = card.dataset.type;
        const optId = card.dataset.opt;

        if (type === 'single') {
          builderSelection[stepId] = optId;
        } else {
          const list = builderSelection[stepId] || [];
          const idx = list.indexOf(optId);
          if (idx > -1) list.splice(idx, 1);
          else list.push(optId);
          builderSelection[stepId] = list;
        }
        renderBuilder();
      });
    });

    calculateBuilderTotal();
  }

  function calculateBuilderTotal() {
    if (!builderData) return 0;
    let price = builderData.basePrice;
    builderData.steps.forEach(step => {
      const picked = builderSelection[step.id];
      if (step.type === 'single') {
        const opt = step.options.find(o => o.id === picked);
        if (opt) price += opt.delta;
      } else {
        (picked || []).forEach(id => {
          const opt = step.options.find(o => o.id === id);
          if (opt) price += opt.delta;
        });
      }
    });

    const priceEl = $('#builderPrice');
    if (priceEl) priceEl.textContent = `$${money(price)} USD`;
    return price;
  }

  $('#addCustomOrderBtn')?.addEventListener('click', () => {
    if (!builderData) return;
    const price = calculateBuilderTotal();
    const parts = [];

    const bI18n = window.CasitaI18N && window.CasitaI18N.getBuilder(currentRestId, currentLang);

    builderData.steps.forEach(step => {
      const picked = builderSelection[step.id];
      const stepI18n = bI18n?.steps?.[step.id];

      if (step.type === 'single') {
        const opt = step.options.find(o => o.id === picked);
        if (opt) {
          const optI18n = stepI18n?.options?.[opt.id];
          const optLabel = (optI18n && optI18n.label && optI18n.label[currentLang]) || opt.label;
          parts.push(optLabel);
        }
      } else {
        (picked || []).forEach(id => {
          const opt = step.options.find(o => o.id === id);
          if (opt) {
            const optI18n = stepI18n?.options?.[opt.id];
            const optLabel = (optI18n && optI18n.label && optI18n.label[currentLang]) || opt.label;
            parts.push(optLabel);
          }
        });
      }
    });

    const r = RESTAURANTS[currentRestId];
    const rI18n = (window.CasitaI18N && window.CasitaI18N.getRestaurant(currentRestId, currentLang)) || {};
    const bTitle = rI18n.builderTitle || r.builderTitle;
    const customSuffix = currentLang === 'en' ? ' (Custom)' : ' (Personalizado)';

    cart.push({
      id: `custom-${currentRestId}-${Date.now()}`,
      restaurant_id: currentRestId,
      restaurantName: r.shortName,
      nombre: `${bTitle}${customSuffix}`,
      detalle: parts.join(' • '),
      precio: price,
      cantidad: 1,
      isCustom: true,
      selection: { ...builderSelection },
    });

    saveCart();
    track('order', 'custom-builder');
    showToast(window.CasitaI18N ? window.CasitaI18N.t('toastCustomAdded', currentLang) : 'Platillo personalizado agregado a tu pedido.');
  });

  const navbar = $('#navbar');
  const pintarNavbar = () => navbar?.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', pintarNavbar, { passive: true });
  pintarNavbar();

  $('#themeToggle')?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    save('theme', next);
  });

  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang && (lang === 'es' || lang === 'en')) {
        setLanguage(lang);
      }
    });
  });

  $('#topbarSwitchBtn')?.addEventListener('click', openPortal);
  $('#navSwitchBtn')?.addEventListener('click', openPortal);
  $('#heroSwitchBtn')?.addEventListener('click', openPortal);
  $('#portalCloseBtn')?.addEventListener('click', closePortal);

  $$('.portal-card').forEach(card => {
    const pick = () => {
      const choice = card.dataset.choice;
      if (choice) {
        activateRestaurant(choice, true);
        closePortal();
        const welcome = window.CasitaI18N ? window.CasitaI18N.t('toastWelcome', currentLang) : '¡Bienvenido a';
        showToast(`${welcome} ${RESTAURANTS[choice].name}!`);
      }
    };
    card.addEventListener('click', pick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pick();
      }
    });
  });

  $('#siblingSwitchBtn')?.addEventListener('click', () => {
    const nextId = RESTAURANTS[currentRestId].siblingId;
    activateRestaurant(nextId, true);
    const switched = window.CasitaI18N ? window.CasitaI18N.t('toastSwitched', currentLang) : 'Cambiado a';
    showToast(`${switched} ${RESTAURANTS[nextId].name}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $('.switch-to-micasita')?.addEventListener('click', (e) => {
    e.preventDefault();
    activateRestaurant('micasita', true);
    const switched = window.CasitaI18N ? window.CasitaI18N.t('toastSwitched', currentLang) : 'Cambiado a';
    showToast(`${switched} Mi Casita Restaurant`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $('.switch-to-garibaldi')?.addEventListener('click', (e) => {
    e.preventDefault();
    activateRestaurant('garibaldi', true);
    const switched = window.CasitaI18N ? window.CasitaI18N.t('toastSwitched', currentLang) : 'Cambiado a';
    showToast(`${switched} Garibaldi Mexican Kitchen`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  renderCartUI();

  setLanguage(currentLang);

  if (!urlChoice && !storedChoice) {
    activateRestaurant('micasita', false);
    openPortal();
  } else {
    activateRestaurant(currentRestId, false);
    closePortal();
  }
initMenuCardAnimations();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initMenuCardAnimations, 120);
  });
})();
