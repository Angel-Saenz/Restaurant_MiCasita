# Mi Casita Restaurant & Garibaldi Mexican Kitchen — Roswell, NM (v2.0.0)

Ecosistema digital inmersivo, panel administrativo y sistema de comandas QR para los dos restaurantes familiares de Roswell, New Mexico:
1. **Mi Casita Restaurant** (305 S Main St) — Tradición, desayunos auténticos, menudo y sopapillas.
2. **Garibaldi Mexican Kitchen** (2019 S Main St) — Cocina viva, tacos al pastor/alambre, pozole, parrilladas y salón de eventos.

Cuenta con una **pantalla selectora inicial (Welcome Portal)** para elegir entre ambos restaurantes al entrar al sitio, con conmutación dinámica de identidad visual, menú, configurador interactivo, horarios y datos de contacto.

Construido con **Node.js 24 + Express 5 + SQLite nativo (`node:sqlite`)**.  
**Sin build, sin frameworks pesados y con pre-renderizado nativo en servidor (SSR).**

```bash
npm install
npm start          # Servidor en http://localhost:3000
npm run dev        # Modo desarrollo con recarga automática --watch
```

- Portal Principal: `http://localhost:3000/` (con selector de restaurante)
- Mi Casita directo: `http://localhost:3000/?rest=micasita`
- Garibaldi Kitchen directo: `http://localhost:3000/?rest=garibaldi`
- Panel de Administración: `http://localhost:3000/admin`  
- Carta Digital de Mesa: `http://localhost:3000/carta` (o `/mesa/1`)

---

## 🏗️ Arquitectura MVC del Proyecto

```
Mi-Casita_Web/
├── backend/
│   ├── config.js       Fuente única de verdad: negocio, categorías, IVA, IP local y configurador
│   ├── db.js          Base de datos SQLite nativa (node:sqlite): esquema, migración, transacciones y consultas
│   ├── auth.js        Firma y verificación de tokens JWT + contraseñas bcrypt
│   ├── validate.js    Validación estricta y sanitización contra XSS
│   ├── ssr.js         Pre-renderizado del menú en servidor + datos estructurados JSON-LD (SEO)
│   ├── seed-menu.js   Menú sembrado con antojitos, tacos, especialidades y bebidas tradicionales
│   ├── seed.js       Script de inicialización y siembra de base de datos
│   └── server.js     Servidor Express 5: Helmet, CSP, Rate Limit, Multer + Sharp, Rutas y Errores
├── apis/
│   ├── auth.js        POST /api/auth/login, POST /api/auth/change-password
│   ├── menu.js        GET /api/menu, GET /api/menu/:id, GET /api/menu/builder
│   ├── ordenes.js     POST /api/ordenes, GET /api/cuenta/:mesa, POST /api/cuenta/:mesa/cobrar
│   ├── admin.js       Controlador del panel: órdenes en cocina, caja, CRUD menú, fotos, QR
│   └── analytics.js   Registro anónimo de vistas y pedidos
└── frontend/
    ├── index.html     Portada principal con marcadores de Server-Side Rendering
    ├── carta.html     Carta digital optimizada para código QR de mesa en smartphones
    ├── styles.css     Sistema de diseño inmersivo: Terracota, Ámbar, Agave, Glassmorphic y Dark Mode
    ├── main.js        Lógica interactiva del cliente: Hero, Configurador, Carrito, Filtros, Analítica
    ├── theme-init.js  Script ultra-rápido antideslumbramiento (previene FOUC)
    └── admin/         Vista y controladores del Panel de Administración (index.html, admin.css, admin.js)
```

---

## 🔑 Variables de Entorno (`.env`)

Copia `.env.example` a `.env`. `npm start` lo carga automáticamente.

| Variable | Descripción |
|---|---|
| `JWT_SECRET` | Clave secreta para firmar tokens del panel. **Obligatoria en producción**. |
| `PORT` | Puerto HTTP (3000 por defecto). |
| `SITE_URL` | URL pública utilizada en sitemap, OpenGraph y códigos QR. |
| `DATA_DIR` | Ubicación de la base de datos SQLite y fotografías subidas (`backend/data`). |
| `NODE_ENV` | `production` activa HSTS, caché estática estricta y optimizaciones. |

---

## 🛠️ Comandos de Administración

```bash
# Cambiar contraseña del administrador (casita_admin)
npm run reset-password -- casita_admin NuevaClaveSegura123

# Ver simulación de reinicio de ventas y cortes de caja
npm run reset-ventas

# Reiniciar todas las ventas a cero para inaugurar el negocio
npm run reset-ventas -- --si

# Reiniciar además el historial de analíticas
npm run reset-ventas -- --si --analitica
```

---

## 🍽️ Sistema de Comandas por Código QR y Caja (POS)

1. El cliente escanea el código QR de su mesa → abre `/mesa/4`.
2. Agrega sus platillos o arma su taco personalizado y presiona **"Enviar Comanda a Cocina"** (`POST /api/ordenes`).
3. En el panel `/admin` → pestaña **Órdenes & Salón**, la comanda aparece en tiempo real. El mesero avanza el estado a *Preparando → Servida*.
4. Al terminar de comer, el cliente presiona **"Pedir la Cuenta"** (`POST /api/cuenta/4/cobrar`).
5. En el panel, presionar **"Cobrar y Cerrar Mesa"** permite seleccionar la forma de pago (Efectivo, Tarjeta, Transferencia), calcular el cambio exacto e imprimir el ticket con desglose de IVA.
6. En **Caja & Cortes**, el cajero puede realizar el cierre de turno con arqueo de efectivo (Efectivo Esperado vs. Contado) y gestión de Fondo de Caja.

---

## 🔐 Seguridad e Inmunidad
- Cabeceras **Helmet** y regla estricta de Content Security Policy (CSP).
- Rate Limiters por IP para prevenir abusos (300 req/min global, 20 req/min login, 20 req/min comandas).
- Autenticación mediante **JWT (8 horas)** y hashing **bcrypt (12 rondas)**.
- Subida segura de imágenes procesadas y redimensionadas en servidor a formato **WebP (1000px)** con `sharp`.
- **0 vulnerabilidades de seguridad**.
