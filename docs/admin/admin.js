(function () {
  let token = localStorage.getItem('casita_token');
  let currentTab = 'ordenes';
  let pollTimer = null;
  let activeCuentaForCobro = null;
  let currentMenuFilter = '';

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async function apiFetch(url, options = {}) {
    options.headers = { ...authHeaders(), ...(options.headers || {}) };
    const res = await fetch(url, options);

    if (res.status === 401) {
      logout();
      throw new Error('Sesión expirada. Por favor inicie sesión de nuevo.');
    }
    return res;
  }

  const loginScreen = document.getElementById('loginScreen');
  const adminApp = document.getElementById('adminApp');
  const loginForm = document.getElementById('loginForm');

  async function checkAuth() {
    if (!token) {
      showLogin();
      return;
    }

    try {
      const res = await fetch('/api/auth/me', { headers: authHeaders() });
      if (res.ok) {
        const admin = await res.json();
        const userLabel = document.getElementById('adminUserLabel');
        if (userLabel) userLabel.innerHTML = `<i class="fa-solid fa-user-shield"></i> Usuario: ${escapeHtml(admin.username)}`;
        showApp();
      } else {
        showLogin();
      }
    } catch (err) {
      showLogin();
    }
  }

  function showLogin() {
    if (loginScreen) loginScreen.style.display = 'flex';
    if (adminApp) adminApp.style.display = 'none';
    if (pollTimer) clearInterval(pollTimer);
  }

  function showApp() {
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminApp) adminApp.style.display = 'grid';
    switchTab(currentTab);
    startPolling();
  }

  function logout() {
    token = null;
    localStorage.removeItem('casita_token');
    showLogin();
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;
      const errorEl = document.getElementById('loginError');

      try {
        if (errorEl) errorEl.style.display = 'none';
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (res.ok && data.token) {
          token = data.token;
          localStorage.setItem('casita_token', token);
          checkAuth();
        } else {
          if (errorEl) {
            errorEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${escapeHtml(data.error || 'Credenciales incorrectas.')}`;
            errorEl.style.display = 'flex';
          }
        }
      } catch (err) {
        if (errorEl) {
          errorEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error de conexión con el servidor.';
          errorEl.style.display = 'flex';
        }
      }
    });
  }

  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  const tabTitle = document.getElementById('tabTitle');

  function switchTab(tabId) {
    currentTab = tabId;
    tabs.forEach(t => {
      if (t.getAttribute('data-tab') === tabId) t.classList.add('active');
      else t.classList.remove('active');
    });

    contents.forEach(c => {
      if (c.id === `tab-${tabId}`) c.classList.add('active');
      else c.classList.remove('active');
    });

    const titles = {
      ordenes: 'Órdenes & Cocina en Tiempo Real',
      caja: 'Caja & Corte de Turno (POS)',
      menu: 'Gestión del Menú & Catálogo',
      analytics: 'Analíticas & Métricas del Negocio',
      ajustes: 'Ajustes & Código QR de Mesas',
    };
    if (tabTitle) tabTitle.textContent = titles[tabId] || 'Panel de Administración';

    loadTabData();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.getAttribute('data-tab'));
    });
  });

  function loadTabData() {
    if (currentTab === 'ordenes') loadOrdenes();
    else if (currentTab === 'caja') loadCaja();
    else if (currentTab === 'menu') loadAdminMenu();
    else if (currentTab === 'analytics') loadAnalytics();
    else if (currentTab === 'ajustes') generateQrCode();
  }

  function startPolling() {
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      if (currentTab === 'ordenes') loadOrdenes();
    }, 8000);
  }

  const refreshDataBtn = document.getElementById('refreshDataBtn');
  if (refreshDataBtn) refreshDataBtn.addEventListener('click', loadTabData);

  async function loadOrdenes() {
    try {
      const res = await apiFetch('/api/admin/ordenes');
      const data = await res.json();
      renderMesasGrid(data.cuentas || []);
    } catch (err) {
      console.error('Error cargando órdenes:', err);
    }
  }

  function renderMesasGrid(cuentas) {
    const grid = document.getElementById('mesasGrid');
    const badge = document.getElementById('pendingBadge');

    let totalNuevas = 0;
    cuentas.forEach(c => {
      (c.ordenes || []).forEach(o => {
        if (o.estado === 'nueva') totalNuevas++;
      });
    });

    if (badge) badge.textContent = totalNuevas;

    if (!grid) return;

    if (cuentas.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3.5rem 1rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 2.2rem; color: var(--text-dim); margin-bottom: 0.75rem;">
            <i class="fa-solid fa-bell-concierge"></i>
          </div>
          <strong style="font-size: 1.1rem; color: var(--text-main); display: block; margin-bottom: 0.3rem;">No hay mesas con órdenes activas</strong>
          <span>Las nuevas comandas enviadas desde la carta digital aparecerán aquí automáticamente en tiempo real.</span>
        </div>`;
      return;
    }

    grid.innerHTML = cuentas.map(c => `
      <div class="mesa-card">
        <div class="mesa-card-header">
          <div class="mesa-title">
            <i class="fa-solid fa-utensils"></i>
            <span>Mesa #${escapeHtml(c.cuenta.mesa)}</span>
          </div>
          <span style="font-size: 0.8rem; font-weight: 700; background: ${c.cuenta.estado === 'por_cobrar' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(46, 204, 113, 0.2)'}; color: ${c.cuenta.estado === 'por_cobrar' ? 'var(--secondary)' : 'var(--agave)'}; padding: 0.25rem 0.65rem; border-radius: var(--radius-full); display: inline-flex; align-items: center; gap: 0.35rem;">
            ${c.cuenta.estado === 'por_cobrar' ? '<i class="fa-solid fa-bell"></i> Pidió la Cuenta' : '<i class="fa-solid fa-circle-check"></i> Activa'}
          </span>
        </div>

        <div style="flex-grow: 1; margin-bottom: 1.25rem;">
          ${(c.ordenes || []).map(o => `
            <div style="background: rgba(0,0,0,0.25); padding: 0.85rem; border-radius: var(--radius-sm); margin-bottom: 0.75rem; border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">
                  <i class="fa-solid fa-receipt"></i> Comanda #${o.id}
                </span>
                <span class="comanda-state-pill state--${o.estado}">${o.estado}</span>
              </div>

              ${o.items.map(i => `
                <div class="comanda-item-row">
                  <span><strong>${i.cantidad}x</strong> ${escapeHtml(i.nombre)}</span>
                  <span style="color: var(--secondary); font-weight: 600;">$${i.importe.toFixed(2)}</span>
                </div>
                ${i.detalle ? `<div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.3rem; padding-left: 0.8rem;">↳ ${escapeHtml(i.detalle)}</div>` : ''}
              `).join('')}

              ${o.nota ? `<div style="font-size: 0.8rem; color: var(--secondary); margin-top: 0.4rem; padding: 0.3rem 0.5rem; background: rgba(233,180,76,0.1); border-radius: var(--radius-xs);"><i class="fa-solid fa-comment-dots"></i> Nota: ${escapeHtml(o.nota)}</div>` : ''}

              <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem; flex-wrap: wrap;">
                ${o.estado === 'nueva' ? `<button class="btn btn--outline" style="padding: 0.25rem 0.6rem; font-size: 0.78rem;" onclick="window.AdminApp.changeOrderState(${o.id}, 'preparando')"><i class="fa-solid fa-fire"></i> Preparar</button>` : ''}
                ${o.estado === 'preparando' ? `<button class="btn btn--outline" style="padding: 0.25rem 0.6rem; font-size: 0.78rem; border-color: var(--agave); color: var(--agave);" onclick="window.AdminApp.changeOrderState(${o.id}, 'servida')"><i class="fa-solid fa-check"></i> Servida</button>` : ''}
                ${o.estado !== 'cancelada' ? `<button class="btn btn--outline" style="padding: 0.25rem 0.6rem; font-size: 0.78rem; color: #EF4444;" onclick="window.AdminApp.changeOrderState(${o.id}, 'cancelada')"><i class="fa-solid fa-xmark"></i> Cancelar</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.85rem;">
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; margin-bottom: 0.85rem;">
            <span>Total Mesa:</span>
            <span style="color: var(--secondary);">$${c.bruto.toFixed(2)} USD</span>
          </div>
          <button class="btn btn--primary" style="width: 100%; font-size: 0.92rem;" onclick="window.AdminApp.openCobroModal(${c.cuenta.id}, '${c.cuenta.mesa}', ${c.bruto})">
            <i class="fa-solid fa-cash-register"></i> Cobrar y Cerrar Mesa
          </button>
        </div>
      </div>
    `).join('');
  }

  window.AdminApp = {
    async changeOrderState(id, estado) {
      try {
        await apiFetch(`/api/admin/ordenes/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ estado }),
        });
        loadOrdenes();
      } catch (err) {
        alert('Error cambiando estado de orden.');
      }
    },
    openCobroModal(cuentaId, mesa, bruto) {
      activeCuentaForCobro = { id: cuentaId, mesa, bruto };
      const modal = document.getElementById('cobroModal');
      const box = document.getElementById('cobroDetailsBox');

      const subtotal = (bruto / 1.0825).toFixed(2);
      const tax = (bruto - subtotal).toFixed(2);

      box.innerHTML = `
        <div style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.6rem; color: var(--text-main);">
          <i class="fa-solid fa-chair"></i> Mesa #${mesa}
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;"><span>Subtotal:</span><span>$${subtotal} USD</span></div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.88rem;"><span>Impuesto (Tax NM Estimado):</span><span>$${tax} USD</span></div>
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.25rem; color: var(--secondary); border-top: 1px solid var(--border-subtle); padding-top: 0.5rem;">
          <span>Total a Pagar:</span><span>$${bruto.toFixed(2)} USD</span>
        </div>
      `;

      if (modal) modal.classList.add('active');
    }
  };

  const cobroModalClose = document.getElementById('cobroModalClose');
  if (cobroModalClose) cobroModalClose.addEventListener('click', () => {
    const m = document.getElementById('cobroModal');
    if (m) m.classList.remove('active');
  });

  const cobroRecibido = document.getElementById('cobroRecibido');
  if (cobroRecibido) {
    cobroRecibido.addEventListener('input', () => {
      if (!activeCuentaForCobro) return;
      const rec = Number(cobroRecibido.value) || 0;
      const cambio = Math.max(0, rec - activeCuentaForCobro.bruto);
      const cambioEl = document.getElementById('cambioCalculado');
      if (cambioEl) cambioEl.textContent = `Cambio: $${cambio.toFixed(2)} USD`;
    });
  }

  const cobroForm = document.getElementById('cobroForm');
  if (cobroForm) {
    cobroForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!activeCuentaForCobro) return;

      const metodo = document.getElementById('cobroMetodo').value;
      const recibido = document.getElementById('cobroRecibido').value;

      try {
        const res = await apiFetch(`/api/admin/cuentas/${activeCuentaForCobro.id}/cerrar`, {
          method: 'POST',
          body: JSON.stringify({ metodo, recibido }),
        });

        const data = await res.json();
        if (data.success) {
          alert('Cuenta cobrada y mesa liberada exitosamente.');
          const m = document.getElementById('cobroModal');
          if (m) m.classList.remove('active');
          loadOrdenes();
        } else {
          alert(data.error || 'Error al cerrar cuenta.');
        }
      } catch (err) {
        alert('Error de conexión.');
      }
    });
  }

  async function loadCaja() {
    try {
      const res = await apiFetch('/api/admin/caja');
      const data = await res.json();

      const p = data.pendiente || {};
      const turnEl = document.getElementById('cajaTurnoTotal');
      if (turnEl) turnEl.textContent = `$${(p.totales?.total || 0).toFixed(2)} USD`;

      const cueEl = document.getElementById('cajaTurnoCuentas');
      if (cueEl) cueEl.textContent = `${p.totales?.cuentas || 0} Cuentas Cobradas`;

      const fonEl = document.getElementById('cajaFondoInicial');
      if (fonEl) fonEl.textContent = `$${(p.fondoInicial || 0).toFixed(2)} USD`;

      const espEl = document.getElementById('cajaEsperadoTotal');
      if (espEl) espEl.textContent = `$${(p.esperadoEnCaja || 0).toFixed(2)} USD`;

      const tbody = document.getElementById('cortesTableBody');
      if (tbody) {
        const historial = data.historial || [];
        if (historial.length === 0) {
          tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2rem;">No se han registrado cortes de caja aún.</td></tr>`;
        } else {
          tbody.innerHTML = historial.map(c => `
            <tr>
              <td>#${c.id}</td>
              <td>${new Date(c.cerrado_at).toLocaleString()}</td>
              <td>${escapeHtml(c.cerrado_por || 'Sistema')}</td>
              <td>${c.cuentas}</td>
              <td>$${(c.efectivo || 0).toFixed(2)}</td>
              <td>$${(c.tarjeta || 0).toFixed(2)}</td>
              <td><strong style="color: var(--secondary);">$${(c.total || 0).toFixed(2)}</strong></td>
              <td>${c.diferencia !== null ? `$${c.diferencia.toFixed(2)}` : 'N/A'}</td>
              <td><button class="btn btn--outline" style="padding: 0.25rem 0.55rem; font-size: 0.78rem;" onclick="window.print()"><i class="fa-solid fa-print"></i> Ticket</button></td>
            </tr>
          `).join('');
        }
      }
    } catch (err) {
      console.error('Error cargando caja:', err);
    }
  }

  const closeShiftBtn = document.getElementById('closeShiftBtn');
  if (closeShiftBtn) {
    closeShiftBtn.addEventListener('click', async () => {
      const declarado = prompt('Ingresa el dinero físico contado en el cajón de la caja ($ USD):');
      if (declarado === null) return;

      try {
        const res = await apiFetch('/api/admin/caja/cerrar', {
          method: 'POST',
          body: JSON.stringify({ declarado }),
        });
        const data = await res.json();
        if (data.success) {
          alert('Turno cerrado y corte registrado con éxito.');
          loadCaja();
        } else {
          alert(data.error || 'Error cerrando turno.');
        }
      } catch (err) {
        alert('Error al procesar el cierre.');
      }
    });
  }

  const setFondoBtn = document.getElementById('setFondoBtn');
  if (setFondoBtn) {
    setFondoBtn.addEventListener('click', async () => {
      const monto = prompt('Ingresa el nuevo fondo de caja para cambio ($ USD):');
      if (!monto) return;

      try {
        const res = await apiFetch('/api/admin/caja/fondo', {
          method: 'POST',
          body: JSON.stringify({ monto }),
        });
        const data = await res.json();
        if (data.success) {
          alert('Fondo de caja actualizado.');
          loadCaja();
        }
      } catch (err) {
        alert('Error ajustando fondo.');
      }
    });
  }

  const restaurantFilter = document.getElementById('adminRestaurantFilter');
  if (restaurantFilter) {
    restaurantFilter.addEventListener('change', (e) => {
      currentMenuFilter = e.target.value;
      loadAdminMenu();
    });
  }

  async function loadAdminMenu() {
    try {
      const query = currentMenuFilter ? `?restaurant=${currentMenuFilter}` : '';
      const res = await apiFetch(`/api/admin/menu${query}`);
      const items = await res.json();

      const tbody = document.getElementById('menuTableBody');
      if (!tbody) return;

      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 2.5rem;">No hay platillos en este filtro.</td></tr>`;
        return;
      }

      tbody.innerHTML = items.map(it => {
        const isMiCasita = it.restaurant_id === 'micasita';
        const restBadge = isMiCasita
          ? `<span class="badge" style="background: rgba(192, 90, 62, 0.2); color: #e07a5f; border: 1px solid rgba(192, 90, 62, 0.4);"><i class="fa-solid fa-house"></i> Mi Casita</span>`
          : `<span class="badge" style="background: rgba(46, 204, 113, 0.18); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.4);"><i class="fa-solid fa-guitar"></i> Garibaldi</span>`;

        return `
          <tr>
            <td>
              <div style="display: flex; gap: 0.25rem;">
                <button class="btn btn--outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="window.AdminApp.moveDish('${it.id}', 'up')" title="Subir"><i class="fa-solid fa-chevron-up"></i></button>
                <button class="btn btn--outline" style="padding: 0.15rem 0.4rem; font-size: 0.72rem;" onclick="window.AdminApp.moveDish('${it.id}', 'down')" title="Bajar"><i class="fa-solid fa-chevron-down"></i></button>
              </div>
            </td>
            <td>${restBadge}</td>
            <td>
              ${it.image_url
                ? `<img src="${it.image_url}" width="44" height="44" style="border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--border-subtle); display: block;" onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'width:44px;height:44px;background:rgba(255,255,255,0.05);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;color:var(--text-muted);\\'><i class=\\'fa-solid fa-utensils\\'></i></div>';">`
                : `<div style="width:44px;height:44px;background:rgba(255,255,255,0.05);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;color:var(--text-muted);"><i class="fa-solid fa-utensils"></i></div>`
              }
            </td>
            <td><strong>${escapeHtml(it.name)}</strong></td>
            <td><span class="badge" style="background: rgba(255,255,255,0.06);">${escapeHtml(it.category)}</span></td>
            <td><strong style="color: var(--secondary);">$${it.price.toFixed(2)}</strong></td>
            <td>${it.badge ? `<span class="badge badge--gold"><i class="fa-solid fa-star"></i> ${escapeHtml(it.badge)}</span>` : '-'}</td>
            <td>${it.available ? '<span class="badge badge--available"><i class="fa-solid fa-circle-check"></i> Disponible</span>' : '<span class="badge badge--soldout"><i class="fa-solid fa-circle-xmark"></i> Agotado</span>'}</td>
            <td>
              <div style="display: flex; gap: 0.4rem;">
                <button class="btn btn--outline" style="padding: 0.25rem 0.55rem; font-size: 0.76rem;" onclick="window.AdminApp.editDish('${it.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i> Editar</button>
                <button class="btn btn--outline" style="padding: 0.25rem 0.55rem; font-size: 0.76rem; color: #EF4444;" onclick="window.AdminApp.deleteDish('${it.id}')" title="Borrar"><i class="fa-solid fa-trash-can"></i></button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    } catch (err) {
      console.error('Error cargando menú admin:', err);
    }
  }

  window.AdminApp.moveDish = async function(id, dir) {
    await apiFetch(`/api/admin/menu/${id}/move`, {
      method: 'POST',
      body: JSON.stringify({ dir }),
    });
    loadAdminMenu();
  };

  window.AdminApp.deleteDish = async function(id) {
    if (!confirm('¿Seguro que deseas eliminar este platillo del menú?')) return;
    await apiFetch(`/api/admin/menu/${id}`, { method: 'DELETE' });
    loadAdminMenu();
  };

  const addDishBtn = document.getElementById('addDishBtn');
  const dishModal = document.getElementById('dishModal');
  const dishModalClose = document.getElementById('dishModalClose');

  if (addDishBtn) {
    addDishBtn.addEventListener('click', () => {
      document.getElementById('dishId').value = '';
      document.getElementById('dishRestaurant').value = currentMenuFilter || 'micasita';
      document.getElementById('dishName').value = '';
      document.getElementById('dishPrice').value = '';
      document.getElementById('dishBadge').value = '';
      document.getElementById('dishDescription').value = '';
      document.getElementById('dishImageUrl').value = '';
      document.getElementById('dishAvailable').checked = true;
      document.getElementById('dishModalTitle').innerHTML = '<i class="fa-solid fa-plus"></i> Nuevo Platillo';
      if (dishModal) dishModal.classList.add('active');
    });
  }

  if (dishModalClose && dishModal) {
    dishModalClose.addEventListener('click', () => {
      dishModal.classList.remove('active');
    });
  }

  window.AdminApp.editDish = async function(id) {
    try {
      const res = await apiFetch(`/api/menu/${id}`);
      const item = await res.json();

      document.getElementById('dishId').value = item.id;
      document.getElementById('dishRestaurant').value = item.restaurant_id || 'micasita';
      document.getElementById('dishName').value = item.name;
      document.getElementById('dishCategory').value = item.category;
      document.getElementById('dishPrice').value = item.price;
      document.getElementById('dishBadge').value = item.badge || '';
      document.getElementById('dishDescription').value = item.description || '';
      document.getElementById('dishImageUrl').value = item.image_url || '';
      document.getElementById('dishAvailable').checked = item.available;
      document.getElementById('dishModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Platillo';

      if (dishModal) dishModal.classList.add('active');
    } catch (err) {
      alert('Error cargando platillo.');
    }
  };

  const dishForm = document.getElementById('dishForm');
  if (dishForm) {
    dishForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('dishId').value;
      const fileInput = document.getElementById('dishPhotoInput');

      let imageUrl = document.getElementById('dishImageUrl').value;

      if (fileInput && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('photo', fileInput.files[0]);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          imageUrl = uploadData.imageUrl;
        }
      }

      const payload = {
        restaurant_id: document.getElementById('dishRestaurant').value,
        name: document.getElementById('dishName').value,
        category: document.getElementById('dishCategory').value,
        price: Number(document.getElementById('dishPrice').value),
        badge: document.getElementById('dishBadge').value || null,
        description: document.getElementById('dishDescription').value,
        image_url: imageUrl || null,
        available: document.getElementById('dishAvailable').checked,
      };

      const url = id ? `/api/admin/menu/${id}` : '/api/admin/menu';
      const method = id ? 'PATCH' : 'POST';

      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (dishModal) dishModal.classList.remove('active');
        loadAdminMenu();
      } else {
        alert('Error al guardar platillo.');
      }
    });
  }

  async function loadAnalytics() {
    try {
      const res = await apiFetch('/api/admin/analytics');
      const data = await res.json();

      const tv = document.getElementById('anTotalViews');
      if (tv) tv.textContent = data.summary?.totalViews || 0;

      const to = document.getElementById('anTotalOrders');
      if (to) to.textContent = data.summary?.totalOrders || 0;

      const vi = document.getElementById('anVisitors');
      if (vi) vi.textContent = data.summary?.visitors || 0;

      const topList = document.getElementById('topDishesList');
      if (topList) {
        const top = data.topByOrders || [];
        if (top.length === 0) {
          topList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.9rem; padding: 1rem 0;">Aún no hay suficientes órdenes registradas.</div>';
        } else {
          topList.innerHTML = top.map(i => `
            <div style="display: flex; justify-content: space-between; font-size: 0.92rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span><i class="fa-solid fa-utensils" style="color: var(--secondary); margin-right: 0.4rem;"></i> ${escapeHtml(i.name)}</span>
              <span style="font-weight: 700; color: var(--secondary);">${i.orders} Pedidos (${i.conversion}% conv.)</span>
            </div>
          `).join('');
        }
      }

      const abandList = document.getElementById('abandonedDishesList');
      if (abandList) {
        const aband = data.highAbandonment || [];
        if (aband.length === 0) {
          abandList.innerHTML = '<div style="color: var(--text-muted); font-size: 0.9rem; padding: 1rem 0;">Excelente rendimiento, no hay platillos con abandono crítico.</div>';
        } else {
          abandList.innerHTML = aband.map(i => `
            <div style="display: flex; justify-content: space-between; font-size: 0.92rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span>${escapeHtml(i.name)}</span>
              <span style="color: #EF4444;"><i class="fa-solid fa-chart-line-down"></i> ${i.views} vistas / ${i.orders} pedidos</span>
            </div>
          `).join('');
        }
      }
    } catch (err) {
      console.error('Error cargando analíticas:', err);
    }
  }

  async function generateQrCode() {
    const mesa = document.getElementById('qrMesaNumber')?.value || '1';
    try {
      const res = await apiFetch(`/api/admin/qr?mesa=${mesa}`);
      const data = await res.json();

      const container = document.getElementById('qrContainer');
      const img = document.getElementById('qrImage');
      const targetUrl = document.getElementById('qrTargetUrl');

      if (container && img && targetUrl) {
        img.src = data.qrDataUrl;
        targetUrl.textContent = data.targetUrl;
        container.style.display = 'block';
      }
    } catch (err) {
      console.error('Error generando QR:', err);
    }
  }

  const generateQrBtn = document.getElementById('generateQrBtn');
  if (generateQrBtn) generateQrBtn.addEventListener('click', generateQrCode);

  const printQrBtn = document.getElementById('printQrBtn');
  if (printQrBtn) {
    printQrBtn.addEventListener('click', () => {
      window.print();
    });
  }

  function escapeHtml(str = '') {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  checkAuth();
})();
