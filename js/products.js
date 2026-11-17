/* ==========================================================
   REPUESTOS MOTOR - Datos de demostración
   ----------------------------------------------------------
   Todo lo que el negocio puede cambiar vive en este archivo.
   Más adelante, PRODUCTS puede reemplazarse por una consulta
   a una base de datos (ver loadProducts() en app.js).
   ========================================================== */

const STORE_CONFIG = {
  name: "REPUESTOS MOTOR",
  whatsappNumber: "50581241835",      // +505 8124 1835 (formato wa.me, sin signos)
  whatsappDisplay: "+505 8124 1835",
  currency: "C$",
  hours: "Lun a Sáb: 8:00 a.m. - 6:00 p.m. (horario de ejemplo)",
  location: "Ubicación de ejemplo: Calle Principal, Tu Ciudad, Nicaragua"
};

const CATEGORIES = [
  { id: "motor",         name: "Motor" },
  { id: "frenos",        name: "Frenos" },
  { id: "transmision",   name: "Transmisión" },
  { id: "electricidad",  name: "Electricidad" },
  { id: "accesorios",    name: "Accesorios" },
  { id: "lubricantes",   name: "Lubricantes" },
  { id: "llantas",       name: "Llantas y neumáticos" }
];

/* inStock: true = DISPONIBLE, false = AGOTADO */
const PRODUCTS = [
  { id: 1,  name: "Aceite para motocicleta 4T 10W-40", category: "lubricantes",  price: 280,  inStock: true,  image: "assets/images/aceite.svg",       detail: "Botella de 1 litro" },
  { id: 2,  name: "Bujía estándar",                    category: "motor",        price: 95,   inStock: true,  image: "assets/images/bujia.svg",        detail: "Para motores de 125 a 200 cc" },
  { id: 3,  name: "Pastillas de freno",                category: "frenos",       price: 350,  inStock: true,  image: "assets/images/pastillas.svg",    detail: "Juego delantero" },
  { id: 4,  name: "Cadena de transmisión 428H",        category: "transmision",  price: 520,  inStock: true,  image: "assets/images/cadena.svg",       detail: "118 eslabones, reforzada" },
  { id: 5,  name: "Kit de piñones",                    category: "transmision",  price: 480,  inStock: false, image: "assets/images/pinones.svg",      detail: "Piñón y catalina" },
  { id: 6,  name: "Espejos retrovisores",              category: "accesorios",   price: 260,  inStock: true,  image: "assets/images/espejo.svg",       detail: "Par, rosca universal" },
  { id: 7,  name: "Luz LED para faro",                 category: "electricidad", price: 690,  inStock: true,  image: "assets/images/luz-led.svg",      detail: "Luz blanca, alta potencia" },
  { id: 8,  name: "Filtro de aire",                    category: "motor",        price: 140,  inStock: true,  image: "assets/images/filtro-aire.svg",  detail: "Elemento de repuesto" },
  { id: 9,  name: "Manecilla de freno",                category: "frenos",       price: 180,  inStock: true,  image: "assets/images/manecilla.svg",    detail: "Lado derecho" },
  { id: 10, name: "Neumático 90/90-18",                category: "llantas",      price: 1150, inStock: true,  image: "assets/images/neumatico.svg",    detail: "Uso mixto, calle y camino" },
  { id: 11, name: "Cámara de neumático 18\"",          category: "llantas",      price: 210,  inStock: false, image: "assets/images/camara.svg",       detail: "Válvula corta" },
  { id: 12, name: "Casco integral SETGO rosa mate",    category: "accesorios",   price: 2450, inStock: true,  image: "assets/images/casco-setgo-rosa.jpg",          detail: "Visor espejo" },
  { id: 13, name: "Casco integral SETGO Win",          category: "accesorios",   price: 2450, inStock: true,  image: "assets/images/casco-setgo-win-rojo.jpg",      detail: "Negro con detalles rojos, visor espejo" },
  { id: 14, name: "Casco modular SETGO verde",         category: "accesorios",   price: 3100, inStock: true,  image: "assets/images/casco-setgo-modular-verde.jpg", detail: "Modular, doble visor" },
  { id: 15, name: "Casco modular SETGO rojo",          category: "accesorios",   price: 3100, inStock: false, image: "assets/images/casco-setgo-modular-rojo.jpg",  detail: "Modular, doble visor" }
];
