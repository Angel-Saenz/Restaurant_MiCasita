(function () {

  const UI = {
    es: {
      skipToMenu: 'Saltar al menú',
      familyTag: 'Tradición Familiar Garcia / Salazar / Saens · Roswell, New Mexico',
      twoRestaurantsNote: 'Dos restaurantes únicos:',
      chooseSwitchBtn: 'Elegir / Cambiar Restaurante',
      navMenu: 'Menú',
      navBuilder: 'Arma tu Platillo',
      navStory: 'Historia Familiar',
      navContact: 'Ubicación & Contacto',
      navAdmin: 'Admin',
      themeToggleAria: 'Cambiar tema claro / oscuro',
      heroMenuBtn: 'Ver el Menú',
      heroBuilderBtn: 'Arma tu Platillo',
      heroSwitchBtn: 'Cambiar Restaurante',
      exploreMenu: 'Explorar Menú',
      menuSectionEyebrow: 'Tradición Culinaria en Roswell',
      menuSectionTitle: 'Nuestra Carta',
      menuSectionDesc: 'Precios en dólares (USD). Todos nuestros platillos se preparan al momento con recetas de familia.',
      viewDetail: 'Ver Detalle',
      orderNow: 'Pedir Ya',
      builderSectionEyebrow: 'Experiencia a tu Medida',
      builderTotalLabel: 'Total Personalizado',
      builderAddBtn: 'Agregar al Pedido',
      storyEyebrow: 'Dos Conceptos · Una Misma Familia',
      storyTitle: 'Historia de Nuestra Pasión en Roswell',
      storyDesc: 'Conoce los dos pilares gastronómicos de la familia Garcia / Salazar / Saens a lo largo de South Main Street.',
      storyCard1Year: '1993',
      storyCard1Title: 'Mi Casita Restaurant (Downtown)',
      storyCard1Desc: 'Fundado por Eddie Garcia y Karyn Salazar Garcia en el 305 S Main St. Por más de tres décadas ha sido el templo matutino del pueblo: menudo de fin de semana, huevos rancheros con chile de Nuevo México y sopapillas calientitas infladas al comal con miel.',
      storyCard2Year: '2021',
      storyCard2Title: 'Garibaldi Mexican Kitchen (South Main)',
      storyCard2Desc: 'Nace bajo el liderazgo de la familia (M&N LLC / Saens) en el 2019 S Main St para celebrar la cocina viva y el ambiente festivo de Plaza Garibaldi. Cuenta con salón privado para eventos (quinceañeras, cumpleaños), drive-thru, tacos al pastor y parrilladas al carbón.',
      storyCard3Year: 'Hoy',
      storyCard3Title: 'Dos Experiencias Complementarias',
      storyCard3Desc: 'No somos franquicia ni sucursales idénticas: somos dos restaurantes independientes con personalidad propia. Mi Casita para iniciar tu mañana con el calor del hogar, y Garibaldi Kitchen para tus almuerzos, cenas y eventos festivos.',
      contactEyebrow: 'Visítanos en Roswell, NM',
      contactTitle: 'Ubicación y Contacto Directo',
      contactDesc: 'Pide para recoger o ven a disfrutar en nuestro salón comedor.',
      activeRestaurantBadge: 'Restaurante Activo',
      callBtn: 'Llamar al Restaurante',
      directionsBtn: 'Cómo Llegar (Google Maps)',
      facebookBtn: 'Facebook',
      siblingBadge: 'Nuestro Otro Restaurante Familiar',
      portalTitle: 'Dos Restaurantes, Una Misma Familia',
      portalDesc: 'Nuestros dos restaurantes no son sucursales, sino dos conceptos culinarios únicos con identidad y sazón propia. Elige la experiencia que deseas disfrutar hoy:',
      portalSpecialtiesTitle: 'Especialidades Estrella:',
      portalFooterNote: '¿Indeciso? Puedes alternar libremente entre ambos menús en cualquier momento con el botón "Cambiar" en la barra superior.',
      cartFloatBtn: 'Mi Pedido',
      cartSummaryTitle: 'Resumen de tu Pedido',
      cartEmpty: 'Tu pedido está vacío.',
      cartTotal: 'Total:',
      cartMesaLabel: 'Número de Mesa (Si estás en el restaurante):',
      cartMesaPlaceholder: 'Ej. Mesa 4',
      sendToKitchen: 'Enviar Comanda a Cocina (En Mesa)',
      sendWhatsApp: 'Pedir por Teléfono / WhatsApp (Para Llevar)',
      detailIngredients: 'Ingredientes:',
      detailAddBtn: 'Agregar a Mi Pedido',
      footerFamilyNote: 'Una tradición de la Familia Garcia / Salazar / Saens en Roswell, NM.',
      footerRestaurantsTitle: 'Restaurantes',
      footerHoursTitle: 'Horario',
      footerContactTitle: 'Contacto Roswell',
      footerRights: '© Mi Casita Restaurant & Garibaldi Mexican Kitchen · Roswell, New Mexico · Todos los derechos reservados.',

      statusOpen: '● ABIERTO AHORA',
      statusClosed: '○ CERRADO POR AHORA',
      statusSundayClosed: '○ CERRADO LOS DOMINGOS',

      toastAdded: 'Agregado:',
      toastWelcome: '¡Bienvenido a',
      toastSwitched: 'Cambiado a',
      toastCustomAdded: 'Platillo personalizado agregado a tu pedido.',
      alertKitchenSuccess: '¡Comanda enviada a cocina exitosamente!',
      alertOrderEmpty: 'Tu pedido está vacío.',

      cartaHeaderMesa: 'Mesa Salón',
      cartaTableAccount: 'Consumo de tu Mesa',
      cartaTableOpen: 'Abierta',
      cartaAccumulatedTotal: 'Total Acumulado:',
      cartaRequestBill: 'Pedir la Cuenta al Mesero',
      cartaKitchenTitle: 'Comanda para la Cocina',
      cartaKitchenNoteLabel: 'Nota para Cocina (Ej. Sin cebolla, chile aparte):',
      cartaTotalComanda: 'Total Comanda:',
      cartaSendKitchenBtn: 'Enviar Comanda a Cocina',
      cartaPortalTitle: 'Elige en qué Restaurante Estás Sentado',
      cartaPortalDesc: 'Selecciona tu mesa para enviar la comanda a la cocina correspondiente en Roswell, NM:',
    },
    en: {
      skipToMenu: 'Skip to menu',
      familyTag: 'Garcia / Salazar / Saens Family Culinary Tradition · Roswell, New Mexico',
      twoRestaurantsNote: 'Two unique dining experiences:',
      chooseSwitchBtn: 'Choose / Switch Restaurant',
      navMenu: 'Menu',
      navBuilder: 'Build Your Plate',
      navStory: 'Family History',
      navContact: 'Location & Contact',
      navAdmin: 'Admin',
      themeToggleAria: 'Toggle light / dark theme',
      heroMenuBtn: 'View the Menu',
      heroBuilderBtn: 'Build Your Plate',
      heroSwitchBtn: 'Switch Restaurant',
      exploreMenu: 'Explore Menu',
      menuSectionEyebrow: 'Culinary Tradition in Roswell',
      menuSectionTitle: 'Our Menu',
      menuSectionDesc: 'Prices in USD ($). Every dish is made fresh to order using authentic family recipes.',
      viewDetail: 'View Details',
      orderNow: 'Order Now',
      builderSectionEyebrow: 'Crafted Just for You',
      builderTotalLabel: 'Custom Plate Total',
      builderAddBtn: 'Add to My Order',
      storyEyebrow: 'Two Concepts · One Proud Family',
      storyTitle: 'Our Family Passion in Roswell',
      storyDesc: 'Discover the two culinary pillars of the Garcia / Salazar / Saens family along South Main Street.',
      storyCard1Year: '1993',
      storyCard1Title: 'Mi Casita Restaurant (Downtown)',
      storyCard1Desc: 'Founded by Eddie Garcia and Karyn Salazar Garcia at 305 S Main St. For over three decades, it has been Roswell’s go-to morning haven: weekend menudo, smothered New Mexico chile breakfast burritos, and warm sopapillas served hot off the griddle with honey.',
      storyCard2Year: '2021',
      storyCard2Title: 'Garibaldi Mexican Kitchen (South Main)',
      storyCard2Desc: 'Created under family leadership (M&N LLC / Saens) at 2019 S Main St to celebrate the lively kitchen culture of Plaza Garibaldi. Features a private banquet hall for events (quinceañeras, parties), drive-thru window, al pastor street tacos, and open-flame parrilladas.',
      storyCard3Year: 'Today',
      storyCard3Title: 'Two Complementary Experiences',
      storyCard3Desc: 'We are not a franchise or duplicate chain branches: we are two independent restaurants each with its own soul. Mi Casita to start your day with comforting warmth, and Garibaldi Kitchen for vibrant lunches, dinners, and celebrations.',
      contactEyebrow: 'Visit Us in Roswell, NM',
      contactTitle: 'Location & Direct Contact',
      contactDesc: 'Order takeout or join us in our comfortable dining room.',
      activeRestaurantBadge: 'Active Restaurant',
      callBtn: 'Call the Restaurant',
      directionsBtn: 'Get Directions (Google Maps)',
      facebookBtn: 'Facebook',
      siblingBadge: 'Our Sister Family Restaurant',
      portalTitle: 'Two Restaurants, One Family',
      portalDesc: 'Our two restaurants are not chain branches, but two distinct dining concepts with their own personality and recipes. Choose your dining experience today:',
      portalSpecialtiesTitle: 'House Specialties:',
      portalFooterNote: 'Undecided? You can freely switch between both menus anytime using the "Switch" button in the top navigation bar.',
      cartFloatBtn: 'My Order',
      cartSummaryTitle: 'Order Summary',
      cartEmpty: 'Your order is currently empty.',
      cartTotal: 'Total:',
      cartMesaLabel: 'Table Number (If dining in):',
      cartMesaPlaceholder: 'e.g. Table 4',
      sendToKitchen: 'Send Order to Kitchen (Dine-in)',
      sendWhatsApp: 'Order by Phone / WhatsApp (Takeout)',
      detailIngredients: 'Ingredients:',
      detailAddBtn: 'Add to My Order',
      footerFamilyNote: 'A proud tradition of the Garcia / Salazar / Saens Family in Roswell, NM.',
      footerRestaurantsTitle: 'Restaurants',
      footerHoursTitle: 'Hours of Operation',
      footerContactTitle: 'Roswell Contact',
      footerRights: '© Mi Casita Restaurant & Garibaldi Mexican Kitchen · Roswell, New Mexico · All rights reserved.',

      statusOpen: '● OPEN NOW',
      statusClosed: '○ CURRENTLY CLOSED',
      statusSundayClosed: '○ CLOSED ON SUNDAYS',

      toastAdded: 'Added:',
      toastWelcome: 'Welcome to',
      toastSwitched: 'Switched to',
      toastCustomAdded: 'Custom plate added to your order.',
      alertKitchenSuccess: 'Order successfully sent to kitchen!',
      alertOrderEmpty: 'Your order is empty.',

      cartaHeaderMesa: 'Dine-In Table',
      cartaTableAccount: 'Your Table Tab',
      cartaTableOpen: 'Open',
      cartaAccumulatedTotal: 'Running Total:',
      cartaRequestBill: 'Ask Server for the Check',
      cartaKitchenTitle: 'Kitchen Order Ticket',
      cartaKitchenNoteLabel: 'Kitchen Note (e.g., No onions, chile on the side):',
      cartaTotalComanda: 'Ticket Total:',
      cartaSendKitchenBtn: 'Send Order to Kitchen',
      cartaPortalTitle: 'Select Which Restaurant You Are Seated At',
      cartaPortalDesc: 'Choose your dining room to send your ticket directly to the correct kitchen in Roswell, NM:',
    },
  };

  const RESTAURANTS_I18N = {
    micasita: {
      es: {
        shortName: 'Mi Casita',
        slogan: '"¡Una delicia para su paladar! — Auténtica Sazón de Hogar"',
        eyebrow: 'DOWNTOWN ROSWELL · MÁS DE 30 AÑOS DE TRADICIÓN',
        heroTitle: 'Auténtica Comida Mexicana <em>Hecha en Casa</em>',
        heroSubtitle: 'El rincón tradicional de Roswell: menudo artesanal de fin de semana, burritos ahogados en chile de Nuevo México y sopapillas calientitas con miel.',
        badge: 'Desayunos & Sabor Casero',
        hoursLabel: 'Lunes a Sábado: 7:00 AM – 3:00 PM | Domingo: Cerrado',
        portalBadge: 'Desayunos & Sabor Casero',
        portalEnterBtn: 'Entrar a Mi Casita Restaurant',
        portalSpecialties: [
          'Menudo de Fin de Semana',
          'Breakfast Burritos Ahogados',
          'Huevos Rancheros NM',
          'Sopapillas con Miel',
          'Asado de Puerco',
          'Caldo de Camarón',
        ],
        heroDishTag: 'Especialidad de Fin de Semana',
        heroDishName: 'Menudo Tradicional Casero',
        heroDishDesc: 'Servido con pata tierna, grano de maíz, orégano, cebolla picada y tortillas de comal.',
        highlights: [
          { icon: 'fa-solid fa-bowl-food', text: '<b>Menudo Tradicional</b> los fines de semana' },
          { icon: 'fa-solid fa-bread-slice', text: '<b>Breakfast Burritos</b> ahogados en chile NM' },
          { icon: 'fa-solid fa-egg', text: '<b>Huevos Rancheros</b> y Chilaquiles de comal' },
          { icon: 'fa-solid fa-cookie-bite', text: '<b>Sopapillas Calientitas</b> con miel pura' },
        ],
        siblingDesc: '¿Buscas tacos al pastor, alambre al comal, pozole tradicional, parrilladas y cena? Visita Garibaldi Kitchen en 2019 S Main St.',
        siblingBtn: '<i class="fa-solid fa-guitar"></i> Ver la Carta de Garibaldi Kitchen',
        builderTitle: 'Arma tu Burrito o Platillo Casero',
        builderSubtitle: 'Elige tu base, guisado tradicional de Nuevo México, tipo de chile y complementos caseros.',
      },
      en: {
        shortName: 'Mi Casita',
        slogan: '"A treat for your palate! — Authentic Homestyle Mexican Savor"',
        eyebrow: 'DOWNTOWN ROSWELL · OVER 30 YEARS OF TRADITION',
        heroTitle: 'Authentic Mexican Cuisine <em>Cooked from Scratch</em>',
        heroSubtitle: 'Roswell’s traditional breakfast haven: weekend menudo, smothered New Mexico chile burritos, and fluffy sopapillas drizzled with honey.',
        badge: 'Homestyle Breakfast & Lunch',
        hoursLabel: 'Monday to Saturday: 7:00 AM – 3:00 PM | Sunday: Closed',
        portalBadge: 'Homestyle Breakfast & Comfort Food',
        portalEnterBtn: 'Enter Mi Casita Restaurant',
        portalSpecialties: [
          'Traditional Weekend Menudo',
          'Smothered Breakfast Burritos',
          'New Mexico Huevos Rancheros',
          'Warm Sopapillas with Honey',
          'Red Chile Pork Asado',
          'Spicy Shrimp Soup',
        ],
        heroDishTag: 'Weekend Legend Specialty',
        heroDishName: 'Traditional Homestyle Menudo',
        heroDishDesc: 'Slow-simmered tripe and tender hominy in rich red chile broth, served with fresh oregano, diced onions, and warm tortillas.',
        highlights: [
          { icon: 'fa-solid fa-bowl-food', text: '<b>Weekend Menudo</b> simmered low and slow' },
          { icon: 'fa-solid fa-bread-slice', text: '<b>Breakfast Burritos</b> smothered in NM chile' },
          { icon: 'fa-solid fa-egg', text: '<b>Huevos Rancheros</b> and crispy Chilaquiles' },
          { icon: 'fa-solid fa-cookie-bite', text: '<b>Warm Sopapillas</b> with 100% pure honey' },
        ],
        siblingDesc: 'Looking for al pastor street tacos, sizzling skillets, red pozole, and evening dining? Visit Garibaldi Kitchen at 2019 S Main St.',
        siblingBtn: '<i class="fa-solid fa-guitar"></i> View Garibaldi Kitchen Menu',
        builderTitle: 'Build Your Custom Burrito or Platter',
        builderSubtitle: 'Select your warm base, traditional New Mexico braise, chile heat level, and homestyle toppings.',
      },
    },
    garibaldi: {
      es: {
        shortName: 'Garibaldi Kitchen',
        slogan: '"Where Flavor and Tradition Meet!"',
        eyebrow: 'SOUTH MAIN ROSWELL · COCINA VIVA & EVENTOS PRIVADOS',
        heroTitle: 'La Fiesta del Sabor en <em>Garibaldi Kitchen</em>',
        heroSubtitle: 'Inspirado en la mística Plaza Garibaldi: tacos al pastor con piña, alambre al comal, pozole tradicional, parrilladas al carbón y mariscos fiesta.',
        badge: 'Cocina Viva, Tacos & Eventos',
        hoursLabel: 'Lunes a Sábado: 8:00 AM – 8:00 PM | Domingo: 8:00 AM – 4:00 PM',
        portalBadge: 'Cocina Viva, Tacos & Eventos',
        portalEnterBtn: 'Entrar a Garibaldi Kitchen',
        portalSpecialties: [
          'Tacos al Pastor con Piña',
          'Alambre con Queso Fundido',
          'Pozole Rojo Tradicional',
          'Parrilladas Familiares',
          'Camarones Fiesta en Tocino',
          'Salón para Eventos & Drive-Thru',
        ],
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
        siblingDesc: '¿Prefieres el clásico desayuno casero, menudo de fin de semana y sopapillas? Visita Mi Casita en 305 S Main St.',
        siblingBtn: '<i class="fa-solid fa-house"></i> Ver la Carta de Mi Casita Restaurant',
        builderTitle: 'Arma tu Orden de Tacos o Alambre al Comal',
        builderSubtitle: 'Selecciona tus cortes selectos, queso fundido, salsas taqueras y extras al estilo Garibaldi.',
      },
      en: {
        shortName: 'Garibaldi Kitchen',
        slogan: '"Where Flavor and Tradition Meet!"',
        eyebrow: 'SOUTH MAIN ROSWELL · VIBRANT KITCHEN & PRIVATE BANQUETS',
        heroTitle: 'A Celebration of Flavor at <em>Garibaldi Kitchen</em>',
        heroSubtitle: 'Inspired by Mexico City’s famed Plaza Garibaldi: al pastor tacos with charred pineapple, sizzling skillets, red pozole, mixed grill platters, and fiesta seafood.',
        badge: 'Street Tacos, Grill & Events',
        hoursLabel: 'Monday to Saturday: 8:00 AM – 8:00 PM | Sunday: 8:00 AM – 4:00 PM',
        portalBadge: 'Vibrant Kitchen, Tacos & Private Events',
        portalEnterBtn: 'Enter Garibaldi Kitchen',
        portalSpecialties: [
          'Al Pastor Tacos with Grilled Pineapple',
          'Sizzling Alambre with Melted Cheese',
          'Traditional Red Pork Pozole',
          'Family Mixed Grill Parrilladas',
          'Fiesta Bacon-Wrapped Shrimp',
          'Private Banquet Hall & Drive-Thru',
        ],
        heroDishTag: 'House Signature Star',
        heroDishName: 'Al Pastor Tacos & Sizzling Alambre',
        heroDishDesc: 'Marinated pork seared on the comal with sweet pineapple, smothered in molten Oaxaca cheese with house fiery salsas.',
        highlights: [
          { icon: 'fa-solid fa-fire', text: '<b>Tacos al Pastor</b> with seared caramelized pineapple' },
          { icon: 'fa-solid fa-fire-burner', text: '<b>Supreme Alambre</b> with melted Oaxaca cheese' },
          { icon: 'fa-solid fa-bowl-rice', text: '<b>Traditional Red Pozole</b> and rich Mole Poblano' },
          { icon: 'fa-solid fa-shrimp', text: '<b>Fiesta Seafood</b> and family parrillada grills' },
          { icon: 'fa-solid fa-champagne-glasses', text: '<b>Private Banquet Hall</b> & fast Drive-Thru' },
        ],
        siblingDesc: 'In the mood for a classic homestyle morning breakfast, weekend menudo, and hot sopapillas? Visit Mi Casita at 305 S Main St.',
        siblingBtn: '<i class="fa-solid fa-house"></i> View Mi Casita Restaurant Menu',
        builderTitle: 'Build Your Custom Taco Order or Sizzling Skillet',
        builderSubtitle: 'Choose your tender meats, melted cheeses, fiery street salsas, and Garibaldi-style extras.',
      },
    },
  };

  const CATEGORIES_I18N = {
    micasita: {
      es: [
        { id: 'all', label: 'Todo el Menú' },
        { id: 'desayunos', label: 'Desayunos & Huevos' },
        { id: 'burritos', label: 'Burritos & Caldos' },
        { id: 'especiales', label: 'Especialidades & Enchiladas' },
        { id: 'sopapillas', label: 'Sopapillas & Postres' },
        { id: 'bebidas', label: 'Bebidas & Café' },
      ],
      en: [
        { id: 'all', label: 'Full Menu' },
        { id: 'desayunos', label: 'Breakfasts & Eggs' },
        { id: 'burritos', label: 'Burritos & Soups' },
        { id: 'especiales', label: 'Specialties & Enchiladas' },
        { id: 'sopapillas', label: 'Sopapillas & Desserts' },
        { id: 'bebidas', label: 'Beverages & Coffee' },
      ],
    },
    garibaldi: {
      es: [
        { id: 'all', label: 'Todo el Menú' },
        { id: 'tacos', label: 'Tacos & Taquería' },
        { id: 'alambres', label: 'Alambres & Parrilladas' },
        { id: 'pozole', label: 'Pozole & Guisos' },
        { id: 'mariscos', label: 'Mariscos de la Cocina' },
        { id: 'crossover', label: 'Platillos Suroeste' },
        { id: 'bebidas', label: 'Bebidas & Refrescos' },
      ],
      en: [
        { id: 'all', label: 'Full Menu' },
        { id: 'tacos', label: 'Tacos & Taquería' },
        { id: 'alambres', label: 'Sizzling Skillets & Grills' },
        { id: 'pozole', label: 'Pozole & Braised Stews' },
        { id: 'mariscos', label: 'Fresh Seafood Specialties' },
        { id: 'crossover', label: 'Southwest Favorites' },
        { id: 'bebidas', label: 'Drinks & Mexican Sodas' },
      ],
    },
  };

  const DISHES_I18N = {

    'mc-huevos-rancheros': {
      name: { es: 'Huevos Rancheros Tradicionales', en: 'Traditional Huevos Rancheros' },
      badge: { es: 'Favorito Matutino', en: 'Morning Favorite' },
      description: {
        es: 'Dos huevos de granja montados sobre tortillas de maíz doraditas, bañados en salsa de chile rojo o chile verde asado de Nuevo México. Acompañados de frijoles refritos, papitas caseras y tortillas calientes.',
        en: 'Two farm-fresh eggs over lightly crisped corn tortillas, smothered in authentic New Mexico red or roasted green chile sauce. Served with refried beans, homestyle potatoes, and warm tortillas.',
      },
    },
    'mc-breakfast-burrito': {
      name: { es: 'Breakfast Burrito Gigante', en: 'Giant Breakfast Burrito' },
      badge: { es: 'El Clásico de Roswell', en: 'The Roswell Classic' },
      description: {
        es: 'Burrito grande en tortilla de harina relleno de huevo revuelto esponjoso, papas sazonadas, queso derretido y tu elección de chorizo artesanal, tocino o salchicha. Pídelo seco o bañado en chile (smothered).',
        en: 'Huge warm flour tortilla loaded with fluffy scrambled eggs, seasoned potatoes, melted cheddar cheese, and your choice of artisan chorizo, bacon, or sausage. Order it dry or smothered in New Mexico chile.',
      },
    },
    'mc-chilaquiles-caseros': {
      name: { es: 'Chilaquiles con Huevos al Gusto', en: 'Homestyle Chilaquiles with Eggs' },
      badge: { es: 'Receta Familiar', en: 'Family Recipe' },
      description: {
        es: 'Totopos crujientes de maíz bañados en salsa roja o verde casera, espolvoreados con queso fresco, crema y cebolla finamente picada. Acompañados de dos huevos al gusto y frijoles refritos.',
        en: 'Crisp corn tortilla chips tossed in homemade red or green sauce, topped with queso fresco, Mexican crema, and diced onions. Served with two eggs your way and refried beans.',
      },
    },
    'mc-huevos-mexicana': {
      name: { es: 'Huevos a la Mexicana', en: 'Huevos a la Mexicana' },
      badge: { es: null, en: null },
      description: {
        es: 'Huevos revueltos con jitomate fresco, cebolla y chile serrano sofrito. Servidos con frijoles refritos, papas de la casa y tortillas de harina recién comaleadas.',
        en: 'Fluffy scrambled eggs sautéed with fresh diced tomatoes, onions, and serrano pepper. Served with refried beans, house potatoes, and freshly griddled flour tortillas.',
      },
    },
    'mc-menudo-fines-semana': {
      name: { es: 'Menudo Tradicional (Fines de Semana)', en: 'Traditional Weekend Menudo' },
      badge: { es: 'Especialidad Legendaria', en: 'Legendary Weekend Specialty' },
      description: {
        es: 'Tazón grande de menudo rojo cocinado a fuego lento por horas con grano de maíz pozolero y tripa tierna. Servido con orégano, cebolla picada, hojuelas de chile seco, limones frescos y tortillas calientes.',
        en: 'A generous steaming bowl of slow-cooked red tripe soup with tender hominy. Served with oregano, diced onions, crushed red pepper flakes, fresh limes, and warm tortillas.',
      },
    },
    'mc-burrito-mi-casita': {
      name: { es: 'Burrito Especial "Mi Casita"', en: 'Signature "Mi Casita" Smothered Burrito' },
      badge: { es: 'Firma de la Casa', en: 'House Signature' },
      description: {
        es: 'Nuestro burrito insignia: abundante pollo tierno deshebrado sazonado con la receta secreta, envuelto en tortilla de harina grande y bañado por completo en cremosa salsa de queso nacho fundido.',
        en: 'Our house favorite: shredded tender chicken seasoned with our secret family blend, wrapped in a large flour tortilla and completely smothered in creamy melted nacho cheese.',
      },
    },
    'mc-caldo-pescado': {
      name: { es: 'Caldo de Pescado con Verduras', en: 'Tilapia Fish Soup with Vegetables' },
      badge: { es: 'Saludable & Casero', en: 'Healthy & Homestyle' },
      description: {
        es: 'Generosa sopa de filete de tilapia con zanahorias, papas, calabacitas y apio en caldo rojo aromático. Acompañado de arroz mexicano y tu elección de pan, galletas o tortillas.',
        en: 'Generous tilapia filet soup simmered with carrots, potatoes, zucchini, and celery in an aromatic red broth. Served with Mexican rice and your choice of bread, crackers, or tortillas.',
      },
    },
    'mc-caldo-camaron': {
      name: { es: 'Caldo de Camarón Especial', en: 'Special Mexican Shrimp Soup' },
      badge: { es: 'Favorito del Mar', en: 'Coastal Favorite' },
      description: {
        es: 'Deliciosa sopa de camarones enteros con vegetales de temporada en caldo de mariscos especiado con cilantro fresco y toque de chile guajillo. Servido con arroz y tortillas.',
        en: 'Delicious whole shrimp soup with seasonal vegetables in a rich, spiced seafood broth accented with fresh cilantro and guajillo pepper. Served with rice and tortillas.',
      },
    },
    'mc-enchiladas-nm': {
      name: { es: 'Plato de Enchiladas Nuevo México', en: 'New Mexico Enchilada Platter' },
      badge: { es: 'Auténtico Sabor NM', en: 'Authentic NM Flavor' },
      description: {
        es: 'Tres enchiladas de maíz apiladas o enrolladas, rellenas de queso, carne molida o pollo deshebrado, bañadas en salsa de chile rojo o verde tostado de Nuevo México, con arroz y frijoles.',
        en: 'Three stacked or rolled corn enchiladas filled with cheese, seasoned ground beef, or shredded chicken, smothered in authentic New Mexico red or roasted green chile, served with Spanish rice and beans.',
      },
    },
    'mc-asado-de-puerco': {
      name: { es: 'Asado de Puerco Tradicional', en: 'Traditional Red Chile Pork Asado' },
      badge: { es: 'Receta de Antaño', en: 'Time-Honored Recipe' },
      description: {
        es: 'Trozos tiernos de lomo y pierna de puerco estofados lentamente en adobo espeso de chiles secos con comino y hierbas de olor. Acompañado de arroz con frijoles y tortillas de comal.',
        en: 'Tender chunks of slow-braised pork shoulder in a rich, velvety red chile adobo sauce with cumin and secret Mexican spices. Served with rice, beans, and fresh tortillas.',
      },
    },
    'mc-carne-asada-plancha': {
      name: { es: 'Carne Asada a la Plancha', en: 'Griddled Carne Asada Platter' },
      badge: { es: null, en: null },
      description: {
        es: 'Filete de res marinado y asado a la plancha, servido con cebollitas asadas, chile toreado, guacamole fresco, frijoles refritos y ensalada.',
        en: 'Marinated skirt steak seared to perfection on the griddle, served with grilled scallions, toreado peppers, fresh guacamole, refried beans, and salad.',
      },
    },
    'mc-sopapilla-rellena': {
      name: { es: 'Sopapilla Rellena Suprema', en: 'Supreme Stuffed Sopapilla' },
      badge: { es: 'Imperdible', en: 'Must Try' },
      description: {
        es: 'Una esponjosa sopapilla dorada recién inflada, rellena de carne molida o pollo con frijoles, bañada en chile verde de Nuevo México y gratinada con queso.',
        en: 'A fluffy, golden-fried puffy sopapilla freshly stuffed with seasoned ground beef or shredded chicken and refried beans, smothered in New Mexico green chile and melted cheese.',
      },
    },
    'mc-sopapillas-miel': {
      name: { es: 'Sopapillas Calientitas con Miel (Orden de 4)', en: 'Warm Sopapillas with Pure Honey (Order of 4)' },
      badge: { es: 'La Dulce Tradición', en: 'Sweet Tradition' },
      description: {
        es: 'Nuestras famosas sopapillas: masa frita esponjada y crujiente, servidas recién salidas del sartén con mantequilla y miel para rociar en su interior.',
        en: 'Our legendary sopapillas: light, golden puffy pastries straight from the fryer, served hot with butter and pure honey to drizzle inside.',
      },
    },
    'mc-flan-casero': {
      name: { es: 'Flan Casero con Caramelo', en: 'Homemade Caramel Flan' },
      badge: { es: null, en: null },
      description: {
        es: 'Suave flan de vainilla horneado a baño maría con caramelo líquido dorado tradicional.',
        en: 'Silky smooth vanilla bean custard baked in a traditional water bath, topped with a rich golden caramel glaze.',
      },
    },
    'mc-cafe-de-olla': {
      name: { es: 'Café de Olla Artesanal', en: 'Artisanal Mexican Café de Olla' },
      badge: { es: 'Reconfortante', en: 'Comforting & Spiced' },
      description: {
        es: 'Café recién colado con rajitas de canela, toque de piloncillo y cáscara de naranja.',
        en: 'Freshly brewed Mexican coffee infused with real cinnamon sticks, raw piloncillo cane sugar, and orange peel.',
      },
    },
    'mc-aguas-frescas': {
      name: { es: 'Aguas Frescas del Día (Horchata / Jamaica)', en: 'Fresh Daily Aguas Frescas (Horchata / Jamaica)' },
      badge: { es: null, en: null },
      description: {
        es: 'Vaso grande de agua fresca natural elaborada diariamente con arroz, canela y vainilla o flor de jamaica.',
        en: 'Large ice-cold glass of natural Mexican refreshments made daily: creamy rice cinnamon Horchata or tart Hibiscus Jamaica.',
      },
    },

    'gb-tacos-pastor': {
      name: { es: 'Tacos al Pastor Tradicionales (Orden de 4)', en: 'Traditional Tacos al Pastor (Order of 4)' },
      badge: { es: 'Estrella Garibaldi', en: 'Garibaldi Star' },
      description: {
        es: 'Cuatro tacos en tortilla de maíz nixtamal con carne de cerdo marinada en achiote, jugo de cítricos y chiles secos, doradita a la plancha con piña asada, cilantro y cebolla picada.',
        en: 'Four nixtamal corn tortilla tacos with tender pork marinated in achiote and citrus juices, seared on the comal with caramelized grilled pineapple, fresh cilantro, and onions.',
      },
    },
    'gb-tacos-barbacoa': {
      name: { es: 'Tacos de Barbacoa de Res (Orden de 4)', en: 'Beef Barbacoa Tacos (Order of 4)' },
      badge: { es: 'Súper Jugosa', en: 'Tender & Juicy' },
      description: {
        es: 'Cuatro tacos de carne de res horneada lentamente hasta quedar tierna y jugosa, servidos con consomé para chopear, cebollita, cilantro y limones frescos.',
        en: 'Four melt-in-your-mouth slow-braised beef barbacoa tacos served with rich dipping consommé, cilantro, onions, and lime wedges.',
      },
    },
    'gb-tacos-asada': {
      name: { es: 'Tacos de Carne Asada al Carbón (Orden de 4)', en: 'Charcoal Grilled Carne Asada Tacos (Order of 4)' },
      badge: { es: null, en: null },
      description: {
        es: 'Corte de res marinado y asado al comal caliente, picado al momento y servido con cebollitas asadas, chile toreado y salsa verde o roja.',
        en: 'Marinated steak seared over open heat, chopped to order, and served with grilled spring onions, toreado chile, and house salsas.',
      },
    },
    'gb-tacos-steak-cactus': {
      name: { es: 'Tacos de Steak con Nopalitos Asados', en: 'Steak & Grilled Cactus Tacos (Order of 4)' },
      badge: { es: 'Especialidad', en: 'Specialty' },
      description: {
        es: 'Cuatro tacos que combinan tiras jugosas de bistec con nopalitos tiernos asados a la plancha, cebolla caramelizada y queso fresco desmoronado.',
        en: 'Four savory tacos combining juicy steak strips with tender griddled nopalitos (cactus), caramelized onions, and crumbled queso fresco.',
      },
    },
    'gb-alambre-especial': {
      name: { es: 'Alambre Especial Garibaldi', en: 'Garibaldi Special Sizzling Alambre' },
      badge: { es: 'Favorito al Comal', en: 'Skillet Favorite' },
      description: {
        es: 'Sauté generoso de fajita de res, pechuga de pollo, tocino crocante, chorizo artesanal, pimientos verdes y cebolla, todo cubierto y fundido con queso Oaxaca. Servido con arroz, frijoles y tortillas.',
        en: 'Hearty skillet toss of steak fajita, chicken breast, crispy bacon, artisanal chorizo, green bell peppers, and onions, all smothered in melted Oaxaca cheese. Served with rice, beans, and tortillas.',
      },
    },
    'gb-the-garibaldi-plate': {
      name: { es: '"The Garibaldi Plate" (Platillo Insignia)', en: '"The Garibaldi Plate" (Signature Combo)' },
      badge: { es: 'Platillo Insignia', en: 'Signature Dish' },
      description: {
        es: 'Corte selecto de carne a la parrilla acompañado de una enchilada roja de queso, un chile relleno capeado tradicional, guacamole fresco, arroz a la mexicana y frijoles refritos.',
        en: 'Choice grilled steak cut paired with a red cheese enchilada, a traditional egg-battered chile relleno, fresh guacamole, Mexican rice, and refried beans.',
      },
    },
    'gb-parrillada-familiar': {
      name: { es: 'Parrillada Mixta Familiar (Para Compartir)', en: 'Family Mixed Grill Parrillada (To Share)' },
      badge: { es: 'Para Fiestas & Familias', en: 'Great for Sharing' },
      description: {
        es: 'Bandeja caliente al carbón con arrachera asada, pollo marinado, salchicha polaca o chorizo, queso panela asado, nopalitos a la plancha, chiles toreados, cebollitas cambray y tortillas para todos.',
        en: 'Sizzling tabletop platter with grilled arrachera steak, marinated chicken breast, Mexican chorizo, griddled panela cheese, grilled cactus paddles, scallions, toreados, and tortillas for the whole family.',
      },
    },
    'gb-pozole-rojo': {
      name: { es: 'Pozole Rojo Tradicional', en: 'Traditional Red Pork Pozole' },
      badge: { es: 'Cultura & Sazón', en: 'Heritage & Flavor' },
      description: {
        es: 'Plato hondo humeante de pozole con maíz cacahuazintle y carne de cerdo en caldo aromático de chiles guajillo y ancho. Se acompaña de col o lechuga picada, rabanitos, orégano, cebolla y tostadas.',
        en: 'Steaming bowl of heirloom hominy corn and tender pork simmered in rich guajillo and ancho broth. Served with shredded cabbage, radishes, Mexican oregano, and crunchy tostadas.',
      },
    },
    'gb-mole-poblano': {
      name: { es: 'Pollo en Mole Poblano Artesanal', en: 'Artisanal Chicken Mole Poblano' },
      badge: { es: 'Herencia Culinaria', en: 'Culinary Heritage' },
      description: {
        es: 'Pierna y muslo de pollo tiernos bañados en nuestro mole poblano espeso y complejo, con notas de chocolate amargo, chiles tostados y ajonjolí dorado. Servido con arroz rojo y frijoles.',
        en: 'Tender bone-in chicken leg and thigh bathed in our velvety, complex mole poblano made with Mexican chocolate, roasted chiles, and toasted sesame seeds. Served with rice and beans.',
      },
    },
    'gb-chiles-rellenos': {
      name: { es: 'Chiles Rellenos Capeados', en: 'Egg-Battered Chiles Rellenos' },
      badge: { es: null, en: null },
      description: {
        es: 'Dos chiles verdes rellenos de queso asadero, capeados en huevo esponjado y bañados en caldillo de jitomate sazonado. Con arroz y frijoles.',
        en: 'Two roasted green poblano chiles stuffed with melting asadero cheese, dipped in fluffy egg batter and fried golden, smothered in savory tomato caldillo. Served with rice and beans.',
      },
    },
    'gb-camarones-fiesta': {
      name: { es: 'Camarones Fiesta (Envueltos en Tocino)', en: 'Fiesta Bacon-Wrapped Jumbo Shrimp' },
      badge: { es: 'Sabor Costero Supremo', en: 'Supreme Coastal Flavor' },
      description: {
        es: 'Camarones jumbo rellenos de queso y pimiento, envueltos en rebanadas de tocino ahumado y dorados a fuego vivo. Servidos sobre cama de arroz blanco con ensalada y aderezo especial.',
        en: 'Jumbo shrimp stuffed with cheese and mild pepper, wrapped in savory smoked bacon strips and crisped to perfection. Served over seasoned rice with a crisp garden salad.',
      },
    },
    'gb-camarones-empanizados': {
      name: { es: 'Camarones Empanizados Crujientes', en: 'Crispy Golden Breaded Shrimp' },
      badge: { es: null, en: null },
      description: {
        es: 'Camarones gigantes rebozados en pan rallado sazonado y fritos al dorado perfecto. Acompañados de papas a la francesa, arroz y salsa tártara o chipotle.',
        en: 'Giant butterflied shrimp breaded in seasoned panko crumbs and fried to golden crispiness. Served with French fries, rice, and house chipotle tartar sauce.',
      },
    },
    'gb-coctel-camarones': {
      name: { es: 'Cóctel de Camarón Garibaldi', en: 'Garibaldi Mexican Shrimp Cocktail' },
      badge: { es: 'Fresco & Refrescante', en: 'Fresh & Chilled' },
      description: {
        es: 'Camarones cocidos y servidos en copa grande con caldo frío sazonado de jitomate y cítricos, pepino, cebolla morada, cilantro y abundante aguacate en cubos.',
        en: 'Chilled cooked shrimp served in an oversized goblet with our zesty citrus tomato broth, diced cucumber, red onions, cilantro, and generous chunks of fresh avocado.',
      },
    },
    'gb-ceviche-mixto': {
      name: { es: 'Ceviche Fresco de Pescado y Camarón', en: 'Fresh Fish & Shrimp Ceviche' },
      badge: { es: null, en: null },
      description: {
        es: 'Pescado blanco y camarones curtidos al momento en jugo de limón fresco, con jitomate, cebolla morada, cilantro y láminas de aguacate. Servido con tostadas crujientes.',
        en: 'Tender white fish and shrimp cured fresh to order in key lime juice, tossed with tomatoes, red onions, cilantro, and avocado slices. Served with crunchy tostadas.',
      },
    },
    'gb-chicken-fried-steak': {
      name: { es: 'Chicken Fried Steak Estilo New Mexico', en: 'New Mexico Style Chicken Fried Steak' },
      badge: { es: 'Clásico del Suroeste', en: 'Southwest Classic' },
      description: {
        es: 'Corte grueso de carne de res empanizado al estilo sureño, frito bien crujiente y cubierto con abundante gravy blanco cremoso. Acompañado de puré de papa o papas a la francesa y ensalada.',
        en: 'Thick tenderized beef cutlet southern-breaded, fried extra crispy, and smothered in rich country pepper gravy. Served with mashed potatoes and dinner salad.',
      },
    },
    'gb-asado-and-eggs': {
      name: { es: 'Asado & Eggs (Platillo Fuerte)', en: 'Asado & Eggs Hearty Platter' },
      badge: { es: 'Desayuno o Almuerzo', en: 'Breakfast or Lunch' },
      description: {
        es: 'Generosa porción de asado de puerco en salsa roja, acompañado de dos huevos al gusto, frijoles refritos, papitas y tortillas calientes.',
        en: 'Generous bowl of slow-cooked red chile pork asado served with two farm eggs cooked your way, refried beans, golden breakfast potatoes, and warm tortillas.',
      },
    },
    'gb-margarita-virgen': {
      name: { es: 'Margarita Especial de la Casa (Sin Alcohol / Preparada)', en: 'House Specialty Virgin Margarita / Prepared Drink' },
      badge: { es: 'Refrescante Fiesta', en: 'Refreshing Citrus' },
      description: {
        es: 'Mezcla cítrica de jugo de lima, limón y naranja escarchada con sal de mar o tajín.',
        en: 'Hand-shaken citrus blend of key lime, lemon, and sweet orange juices, served over crushed ice with a salted or Tajín chili rim.',
      },
    },
    'gb-refrescos-mexicanos': {
      name: { es: 'Refrescos Mexicanos de Vidrio (Jarritos, Coca-Cola)', en: 'Imported Mexican Glass Bottle Sodas (Mexican Coke, Jarritos)' },
      badge: { es: null, en: null },
      description: {
        es: 'Botella de vidrio tradicional importada de México, endulzada con 100% azúcar de caña pura.',
        en: 'Authentic glass bottle sodas imported from Mexico, made with 100% pure cane sugar.',
      },
    },
  };

  const BUILDER_I18N = {
    micasita: {
      title: { es: 'Arma tu Burrito o Platillo Casero', en: 'Build Your Custom Burrito or Platter' },
      subtitle: {
        es: 'Elige tu base, guisado tradicional de Nuevo México, tipo de chile y complementos caseros.',
        en: 'Choose your tortilla style, authentic New Mexico simmered meat, chile heat, and homemade toppings.',
      },
      steps: {
        base: {
          label: { es: '1. Elige la Presentación / Tortilla', en: '1. Choose Tortilla / Style' },
          help: { es: 'Tortillas recién hechas al comal.', en: 'Freshly griddled tortillas made daily.' },
          options: {
            harina_grande: { label: { es: 'Tortilla de Harina Calientita (Estilo Burrito)', en: 'Warm Jumbo Flour Tortilla (Burrito Style)' }, note: { es: 'El clásico de Mi Casita', en: 'Mi Casita classic' } },
            maiz_orden: { label: { es: 'Orden de Tortillas de Maíz', en: 'Order of Warm Corn Tortillas' }, note: { es: 'Tradicional', en: 'Traditional' } },
            plato_completo: { label: { es: 'Platillo Completo (con Frijoles y Papas)', en: 'Full Platter (with Pinto Beans & Papas)' }, note: { es: 'Muy recomendado', en: 'Highly recommended' } },
          },
        },
        proteina: {
          label: { es: '2. Guisado o Proteína de la Casa', en: '2. House Meat or Guisado' },
          help: { es: 'Preparados a fuego lento con sazón de hogar.', en: 'Slow-simmered with home recipes.' },
          options: {
            asado_puerco: { label: { es: 'Asado de Puerco en Chile Rojo', en: 'Red Chile Pork Asado' }, note: { es: 'Especialidad de la casa', en: 'House specialty' } },
            deshebrada: { label: { es: 'Deshebrada de Res con Papitas', en: 'Shredded Beef with Potatoes' } },
            huevos_chorizo: { label: { es: 'Huevos Revueltos con Chorizo', en: 'Scrambled Eggs with Chorizo' } },
            pollo_guisado: { label: { es: 'Pollo Deshebrado en Caldillo', en: 'Slow-Stewed Shredded Chicken' } },
            frijol_queso: { label: { es: 'Frijoles Refritos con Queso Derretido', en: 'Refried Beans with Melted Cheese' } },
          },
        },
        chile: {
          label: { es: '3. Chile & Salsa Nuevo México', en: '3. New Mexico Chile & Sauce' },
          help: { es: 'Chiles cosechados en el estado con sabor inigualable.', en: 'State-grown chiles with unmatched flavor.' },
          options: {
            rojo_nm: { label: { es: 'Chile Rojo Tradicional (Picor Medio)', en: 'Traditional Red Chile (Medium)' }, note: { es: 'Receta familiar', en: 'Family recipe' } },
            verde_nm: { label: { es: 'Chile Verde Asado de Nuevo México', en: 'NM Fire-Roasted Green Chile' }, note: { es: 'Toque ahumado clásico', en: 'Smoky classic' } },
            ahogado: { label: { es: 'Smothered / Ahogado con Queso y Chile', en: 'Smothered with Melted Cheese & Chile' }, note: { es: 'Bañado por encima', en: 'Topped generously' } },
            sin_chile: { label: { es: 'Sin Chile (Salsa por separado)', en: 'No Chile (Sauce on the Side)' } },
          },
        },
        extras: {
          label: { es: '4. Agregados & Complementos Caseros', en: '4. Homemade Add-ons & Sides' },
          help: { es: 'Personaliza tu orden a tu gusto.', en: 'Customize your order to your liking.' },
          options: {
            queso_derretido: { label: { es: 'Queso Cheddar / Jack Derretido', en: 'Melted Cheddar / Jack Cheese' } },
            papas_caseras: { label: { es: 'Papas Caseras Doraditas', en: 'Golden Breakfast Home Fries' } },
            aguacate: { label: { es: 'Rebanadas de Aguacate Fresco', en: 'Fresh Avocado Slices' } },
            sopapilla_extra: { label: { es: 'Sopapilla Calientita con Miel', en: 'Warm Puffed Sopapilla with Honey' } },
          },
        },
      },
    },
    garibaldi: {
      title: { es: 'Arma tu Orden de Tacos o Alambre al Comal', en: 'Build Your Custom Taco Plate or Alambre' },
      subtitle: {
        es: 'Elige tus cortes selectos, queso fundido, salsas bravas y extras al estilo Garibaldi.',
        en: 'Select your charbroiled cuts, melted cheese, fiery salsas, and fiesta extras.',
      },
      steps: {
        base: {
          label: { es: '1. Estilo de Servicio / Base', en: '1. Service Style / Base' },
          help: { es: 'Servido con todo el sabor festivo.', en: 'Served with lively Plaza Garibaldi flair.' },
          options: {
            tacos_maiz: { label: { es: 'Orden de 4 Tacos en Maíz Nixtamal', en: 'Plate of 4 Nixtamal Corn Tacos' }, note: { es: 'Con cilantro, cebolla y piña', en: 'With cilantro, onion & pineapple' } },
            tacos_harina: { label: { es: 'Orden de 3 Tacos en Tortilla de Harina', en: 'Plate of 3 Flour Tortilla Tacos' } },
            alambre_bowl: { label: { es: 'Cazuela de Alambre con Queso Gratinado', en: 'Sizzling Alambre Skillet with Melted Cheese' }, note: { es: 'Para compartir', en: 'Great for sharing' } },
          },
        },
        proteina: {
          label: { es: '2. Carnes y Cortes al Comal', en: '2. Comal Meats & Cuts' },
          help: { es: 'Doradas al carbón y la plancha.', en: 'Charbroiled and griddled hot to order.' },
          options: {
            al_pastor: { label: { es: 'Trompo al Pastor con Piña Asada', en: 'Al Pastor Pork with Grilled Pineapple' }, note: { es: 'Estrella Garibaldi', en: 'Garibaldi favorite' } },
            barbacoa: { label: { es: 'Barbacoa de Res Horneada', en: 'Slow-Braised Beef Barbacoa' }, note: { es: 'Suave y jugosa', en: 'Tender & juicy' } },
            asada: { label: { es: 'Carne Asada de Res Seleccionada', en: 'Select Charbroiled Carne Asada' } },
            carnitas: { label: { es: 'Carnitas Doraditas', en: 'Golden Crispy Michoacán Carnitas' } },
            mix_alambre: { label: { es: 'Mix Alambre (Res + Tocino + Chorizo + Pimientos)', en: 'Alambre Supreme Mix (Steak + Bacon + Chorizo + Peppers)' } },
          },
        },
        salsa: {
          label: { es: '3. Nivel de Salsa & Picor', en: '3. Salsa & Heat Level' },
          help: { es: 'Hechas frescas todos los días.', en: 'Made fresh from scratch every morning.' },
          options: {
            verde_taquera: { label: { es: 'Salsa Verde Taquera (Picor Moderado)', en: 'Taquera Tomatillo Green Salsa (Medium)' } },
            roja_brava: { label: { es: 'Salsa Roja de Chile de Árbol (Fuerte)', en: 'Fiery Chile de Árbol Red Salsa (Hot)' } },
            macha: { label: { es: 'Salsa Macha con Chiles Dorados y Ajo', en: 'Artisanal Salsa Macha with Garlic & Chiles' }, note: { es: 'Súper sabrosa', en: 'Super rich & fragrant' } },
            sin_salsa: { label: { es: 'Salsas al Lado', en: 'Salsas on the Side' } },
          },
        },
        extras: {
          label: { es: '4. Toques de Fiesta', en: '4. Fiesta Extras' },
          help: { es: 'Complementos para llevar tu taco al siguiente nivel.', en: 'Toppings to take your tacos to the next level.' },
          options: {
            queso_fundido: { label: { es: 'Queso Oaxaca Fundido al Comal', en: 'Melted Oaxaca Cheese on the Griddle' } },
            nopalitos: { label: { es: 'Nopalitos Asados a la Plancha', en: 'Grilled Tender Cactus Paddles' } },
            cebollitas: { label: { es: 'Cebollitas Cambray y Chiles Toreados', en: 'Charred Green Onions & Blistered Chiles' } },
            guacamole: { label: { es: 'Porción de Guacamole Fresco', en: 'Side of Fresh House Guacamole' } },
          },
        },
      },
    },
  };

  window.CasitaI18N = {
    current: 'es',
    UI,
    RESTAURANTS_I18N,
    CATEGORIES_I18N,
    DISHES_I18N,
    BUILDER_I18N,

    t(key, lang = this.current) {
      return (UI[lang] && UI[lang][key]) || (UI.es[key] || key);
    },

    getRestaurant(id, lang = this.current) {
      return (RESTAURANTS_I18N[id] && RESTAURANTS_I18N[id][lang]) || {};
    },

    getCategories(restId, lang = this.current) {
      return (CATEGORIES_I18N[restId] && CATEGORIES_I18N[restId][lang]) || [];
    },

    getDish(id, lang = this.current) {
      const d = DISHES_I18N[id];
      if (!d) return null;
      return {
        name: (d.name && d.name[lang]) || '',
        badge: (d.badge && d.badge[lang]) || null,
        description: (d.description && d.description[lang]) || '',
      };
    },

    getBuilder(restId, lang = this.current) {
      return BUILDER_I18N[restId] || null;
    },
  };
})();
