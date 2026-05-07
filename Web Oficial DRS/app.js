const i18n = {
  en: {
    nav_products: "Products",
    nav_about: "About",
    nav_support: "Contact",
    hero_eyebrow: "Independent game & app studio",
    hero_title: "50 apps.\nOne studio.\nBuilt to last.",
    hero_text: "Deer Rock Studios is on a mission to ship 50 apps and games people actually use. Every product is live, monetized, and built to grow.",
    hero_cta_1: "See Our Apps",
    hero_cta_2: "Get in Touch",
    mission_label: "Apps shipped",
    mission_sub: "Building in public. One product at a time.",
    latest_eyebrow: "Latest release",
    latest_desc: "1-tap space game — Web & Android",
    products_title: "Apps & Games",
    products_pill: "Growing catalog",
    about_title: "About Us",
    about_text: "We are a one-person indie studio with a concrete goal: ship 50 apps and games that people actually use and pay for. No fluff. No bloat. Each product is live, monetized, and serves a real need.",
    about_text2: "Every product is built on the same battle-tested stack — Firebase, Stripe, AdMob, and Capacitor — so each new launch is faster than the last.",
    stack_title: "Our Stack",
    support_title: "Contact",
    support_text: "Support, press, partnerships, or just want to say hi — we read every email.",
    press_title: "Press & Partners",
    press_text: "Media kits, brand assets, and partnership inquiries — mention it in the subject line.",
    footer_privacy: "Privacy Policy",
    footer_delete: "Delete Account",
    product_visit: "Visit →"
  },
  es: {
    nav_products: "Productos",
    nav_about: "Empresa",
    nav_support: "Contacto",
    hero_eyebrow: "Estudio independiente de apps y juegos",
    hero_title: "50 apps.\nUn estudio.\nHechas para durar.",
    hero_text: "Deer Rock Studios tiene una misión: lanzar 50 apps y juegos que la gente realmente use. Cada producto está vivo, monetizado y diseñado para crecer.",
    hero_cta_1: "Ver Nuestras Apps",
    hero_cta_2: "Contactar",
    mission_label: "Apps publicadas",
    mission_sub: "Construyendo en público. Un producto a la vez.",
    latest_eyebrow: "Último lanzamiento",
    latest_desc: "Juego espacial 1 toque — Web y Android",
    products_title: "Apps y Juegos",
    products_pill: "Catálogo en crecimiento",
    about_title: "Sobre Nosotros",
    about_text: "Somos un estudio indie de una persona con un objetivo concreto: lanzar 50 apps y juegos que la gente use y pague. Sin relleno. Sin desperdicio. Cada producto está vivo, monetizado y resuelve una necesidad real.",
    about_text2: "Cada producto usa el mismo stack probado — Firebase, Stripe, AdMob y Capacitor — así cada nuevo lanzamiento es más rápido que el anterior.",
    stack_title: "Nuestro Stack",
    support_title: "Contacto",
    support_text: "Soporte, prensa, alianzas o simplemente quieres saludar — leemos cada correo.",
    press_title: "Prensa y Alianzas",
    press_text: "Kits de prensa, recursos de marca y consultas de alianzas — menciónalo en el asunto.",
    footer_privacy: "Política de Privacidad",
    footer_delete: "Eliminar Cuenta",
    product_visit: "Visitar →"
  }
};

let currentLang = "en";
let products = [];

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const t = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.getElementById("lang-btn").textContent = lang === "en" ? "ES" : "EN";
  renderProducts();
}

function getPlatformLabel(p) {
  const map = { web: "Web", android: "Android", ios: "iOS" };
  return map[p] || p;
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  const t = i18n[currentLang];

  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product";
    const desc = currentLang === "es" ? p.description_es : p.description_en;
    const isLive = p.badge === "Live";
    const badgeClass = isLive ? "live" : p.badge === "In Dev" ? "indev" : "";
    const iconHtml = p.icon
      ? `<img src="${p.icon}" alt="${p.name} icon" class="product-icon" loading="lazy">`
      : `<div class="product-icon-placeholder">🚀</div>`;
    const platformsHtml = (p.platforms || [])
      .map(pl => `<span class="platform-dot">${getPlatformLabel(pl)}</span>`)
      .join("");
    const linkUrl = p.url && p.url !== "#" ? p.url : null;

    card.innerHTML = `
      <div class="product-head">
        ${iconHtml}
        <div class="product-meta">
          <div class="product-name">${p.name}</div>
          <span class="badge ${badgeClass}">${p.badge}</span>
        </div>
      </div>
      <p class="product-desc">${desc}</p>
      <div class="product-footer">
        <div class="product-platforms">${platformsHtml}</div>
        ${linkUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener" class="product-link">${t.product_visit}</a>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });

  // Update mission counter
  const liveCount = products.filter(p => p.badge === "Live").length;
  const counter = document.getElementById("shipped-count");
  const bar = document.getElementById("mission-bar");
  if (counter) animateCount(counter, 0, liveCount, 800);
  if (bar) setTimeout(() => { bar.style.width = (liveCount / 50 * 100) + "%"; }, 100);
}

function animateCount(el, from, to, duration) {
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(from + (to - from) * easeOut(progress));
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

async function loadProducts() {
  try {
    const res = await fetch("./products.json", { cache: "no-store" });
    products = await res.json();
  } catch {
    products = [];
  }
  renderProducts();
}

document.getElementById("lang-btn").addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "es" : "en");
});

document.getElementById("year").textContent = new Date().getFullYear();
loadProducts();
setLanguage("en");
