/* ==========================================================
   REPUESTOS MOTOR - Lógica de la tienda
   Depende de: STORE_CONFIG, CATEGORIES, PRODUCTS (products.js)
   ========================================================== */

const state = { all: [], category: "all", query: "", sort: "default" };

const $ = (sel) => document.querySelector(sel);
const grid = $("#product-grid");
const emptyState = $("#empty-state");

/* ---------- Datos ----------
   Hoy lee products.js. Para conectar una base de datos, cambia
   el cuerpo de esta función por un fetch("/api/productos"). */
async function loadProducts() {
  return PRODUCTS;
}

/* ---------- Utilidades ---------- */
const formatPrice = (n) => `${STORE_CONFIG.currency}${n.toLocaleString("en-US")}`;
const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const categoryName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;

function waLink(message) {
  const base = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

function productMessage(p) {
  return `Hola, estoy interesado en solicitar este producto:\n\nProducto: ${p.name}\nPrecio: ${formatPrice(p.price)}\n\n¿Está disponible?`;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------- Filtrado ---------- */
function getVisible() {
  const q = normalize(state.query.trim());
  let list = state.all.filter((p) =>
    (state.category === "all" || p.category === state.category) &&
    (!q || normalize(p.name).includes(q))
  );
  if (state.sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
  if (state.sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "es"));
  return list;
}

/* ---------- Render ---------- */
function cardHTML(p) {
  const name = escapeHTML(p.name);
  const action = p.inStock
    ? `<a class="btn btn-wa" href="${waLink(productMessage(p))}" target="_blank" rel="noopener noreferrer" data-wa="${p.id}">
         <svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#wa-sym"/></svg><span>SOLICITAR POR WHATSAPP</span></a>`
    : `<button class="btn" type="button" disabled aria-disabled="true">NO DISPONIBLE</button>`;
  return `
    <article class="card ${p.inStock ? "" : "sold"}">
      <button class="card-media" type="button" data-view="${p.id}" aria-label="Ver imagen de ${name}">
        <img src="${p.image}" alt="${name}" loading="lazy">
        <span class="tag ${p.inStock ? "ok" : "out"}">${p.inStock ? "DISPONIBLE" : "AGOTADO"}</span>
      </button>
      <div class="card-body">
        <h3>${name}</h3>
        <p class="card-detail">${escapeHTML(categoryName(p.category))} · ${escapeHTML(p.detail || "")}</p>
        <div class="price">${formatPrice(p.price)}</div>
        ${action}
      </div>
    </article>`;
}

function renderProducts() {
  const list = getVisible();
  grid.innerHTML = list.map(cardHTML).join("");
  emptyState.hidden = list.length > 0;
  grid.hidden = list.length === 0;

  const catLabel = state.category === "all" ? "todo el catálogo" : categoryName(state.category);
  $("#result-count").textContent =
    `${list.length} ${list.length === 1 ? "producto" : "productos"} en ${catLabel}` +
    (state.query.trim() ? ` para "${state.query.trim()}"` : "");

  grid.querySelectorAll("img").forEach((img) =>
    img.addEventListener("error", () => { img.style.visibility = "hidden"; }, { once: true })
  );
}

function renderChips() {
  const items = [{ id: "all", name: "Todos" }, ...CATEGORIES];
  $("#chips").innerHTML = items.map((c) =>
    `<button class="chip" role="tab" type="button" data-cat="${c.id}" aria-selected="${state.category === c.id}">${escapeHTML(c.name)}</button>`
  ).join("");
}

function renderCategoryTiles() {
  $("#category-grid").innerHTML = CATEGORIES.map((c) => {
    const n = state.all.filter((p) => p.category === c.id).length;
    return `<button class="category-card" type="button" data-cat="${c.id}">
      <strong>${escapeHTML(c.name)}</strong><span>${n} ${n === 1 ? "producto" : "productos"}</span></button>`;
  }).join("");
}

function setCategory(id, scroll) {
  state.category = id;
  renderChips();
  renderProducts();
  if (scroll) $("#catalogo").scrollIntoView({ behavior: "smooth" });
}

/* ---------- Visor de imagen ---------- */
const viewer = $("#viewer");
function openViewer(id) {
  const p = state.all.find((x) => x.id === Number(id));
  if (!p) return;
  $("#viewer-img").src = p.image;
  $("#viewer-img").alt = p.name;
  $("#viewer-title").textContent = p.name;
  $("#viewer-price").textContent = formatPrice(p.price) + (p.inStock ? "" : " (agotado)");
  const wa = $("#viewer-wa");
  if (p.inStock) {
    wa.href = waLink(productMessage(p));
    wa.removeAttribute("aria-disabled");
    wa.style.display = "";
  } else {
    wa.removeAttribute("href");
    wa.style.display = "none";
  }
  viewer.showModal();
}

/* ---------- Eventos ---------- */
function bindEvents() {
  $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); $("#catalogo").scrollIntoView({ behavior: "smooth" }); });
  $("#search-input").addEventListener("input", (e) => { state.query = e.target.value; renderProducts(); });
  $("#sort-select").addEventListener("change", (e) => { state.sort = e.target.value; renderProducts(); });

  $("#chips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (b) setCategory(b.dataset.cat, false);
  });
  $("#category-grid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (b) setCategory(b.dataset.cat, true);
  });
  grid.addEventListener("click", (e) => {
    const v = e.target.closest("[data-view]"); if (v) openViewer(v.dataset.view);
  });
  $("#clear-filters").addEventListener("click", () => {
    state.query = ""; $("#search-input").value = ""; setCategory("all", false);
  });

  $("#viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

  const toggle = $("#menu-toggle"), nav = $("#main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  // Resalta el enlace del menú según la sección visible
  const links = [...nav.querySelectorAll("a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["inicio", "categorias", "catalogo", "contacto"].forEach((id) => io.observe(document.getElementById(id)));
}

/* ---------- Inicio ---------- */
async function init() {
  const generic = "Hola, quisiera consultar por los repuestos para motocicleta del catálogo.";
  $("#header-wa").href = waLink(generic);
  $("#contact-wa").href = waLink(generic);
  $("#info-phone").textContent = STORE_CONFIG.whatsappDisplay;
  $("#info-hours").textContent = STORE_CONFIG.hours;
  $("#info-location").textContent = STORE_CONFIG.location;

  state.all = await loadProducts();
  renderChips();
  renderCategoryTiles();
  renderProducts();
  bindEvents();
}
init();
