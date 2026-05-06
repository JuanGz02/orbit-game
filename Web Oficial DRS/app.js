const i18n = {
  en: {
    nav_about: "About",
    nav_products: "Products",
    nav_press: "Press",
    nav_investors: "Investors",
    nav_support: "Support",
    hero_eyebrow: "Digital products with real-world impact",
    hero_title: "We build apps and games people actually use daily.",
    hero_text: "Deer Rock Studios is a product-focused company creating practical, high-quality software that bridges creativity, utility, and business outcomes.",
    hero_cta_1: "Explore Products",
    hero_cta_2: "Contact Support",
    hero_card_title: "Company Snapshot",
    metric_products: "Live products",
    metric_focus: "Product focus",
    metric_focus_value: "Apps + Games",
    metric_model: "Business model",
    metric_model_value: "B2C + Partnerships",
    about_title: "Corporate Profile",
    about_text: "We are a software studio dedicated to building apps with a clear mission: connect digital experiences to the real world. Our process blends product strategy, design, and engineering to launch software that is both useful and memorable.",
    products_title: "Apps & Games",
    products_pill: "Update-ready catalog",
    products_hint: "To update products, edit only the file <code>products.json</code>.",
    press_title: "Press",
    press_text: "For media inquiries, interviews, brand assets, and press materials, contact us by email and include \"Press\" in the subject line.",
    investors_title: "Investors",
    investors_text: "We are open to strategic conversations with investors and partners interested in scalable app ecosystems, product growth, and long-term software value creation.",
    support_title: "Support & Contact",
    support_text: "Need help with a product, account, purchase, or technical issue? Reach us directly and we will respond as soon as possible.",
    footer_privacy: "Privacy Policy",
    product_visit: "Visit"
  },
  es: {
    nav_about: "Empresa",
    nav_products: "Productos",
    nav_press: "Prensa",
    nav_investors: "Inversores",
    nav_support: "Soporte",
    hero_eyebrow: "Productos digitales con impacto en el mundo real",
    hero_title: "Creamos apps y juegos que la gente usa todos los días.",
    hero_text: "Deer Rock Studios es una empresa enfocada en producto, creando software útil y de alta calidad que une creatividad, utilidad y resultados de negocio.",
    hero_cta_1: "Ver Productos",
    hero_cta_2: "Contactar Soporte",
    hero_card_title: "Resumen Corporativo",
    metric_products: "Productos activos",
    metric_focus: "Enfoque",
    metric_focus_value: "Apps + Juegos",
    metric_model: "Modelo",
    metric_model_value: "B2C + Alianzas",
    about_title: "Perfil Corporativo",
    about_text: "Somos un estudio de software dedicado a crear apps con una misión clara: conectar experiencias digitales con el mundo real. Nuestro proceso une estrategia de producto, diseño e ingeniería para lanzar software útil y memorable.",
    products_title: "Apps y Juegos",
    products_pill: "Catálogo fácil de actualizar",
    products_hint: "Para actualizar productos, edita solo el archivo <code>products.json</code>.",
    press_title: "Prensa",
    press_text: "Para medios, entrevistas, recursos de marca y materiales de prensa, contáctanos por correo e incluye \"Press\" en el asunto.",
    investors_title: "Inversores",
    investors_text: "Estamos abiertos a conversaciones estratégicas con inversores y partners interesados en ecosistemas de apps escalables, crecimiento de producto y creación de valor a largo plazo.",
    support_title: "Soporte y Contacto",
    support_text: "¿Necesitas ayuda con un producto, cuenta, compra o tema técnico? Escríbenos directamente y responderemos lo antes posible.",
    footer_privacy: "Política de Privacidad",
    product_visit: "Visitar"
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
    if (t[key]) el.innerHTML = t[key];
  });
  document.getElementById("lang-btn").textContent = lang === "en" ? "ES" : "EN";
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("products-grid");
  grid.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("article");
    card.className = "product";
    const desc = currentLang === "es" ? p.description_es : p.description_en;
    card.innerHTML = `
      <div class="product-head">
        <h3>${p.name}</h3>
        <span class="badge">${p.badge}</span>
      </div>
      <p>${desc}</p>
      <div class="product-head">
        <span class="badge">${p.type}</span>
        <a href="${p.url}" target="_blank" rel="noopener">${i18n[currentLang].product_visit}</a>
      </div>
    `;
    grid.appendChild(card);
  });
  document.getElementById("metric-products").textContent = String(products.length);
}

async function loadProducts() {
  try {
    const response = await fetch("./products.json", { cache: "no-store" });
    products = await response.json();
    renderProducts();
  } catch {
    products = [];
    renderProducts();
  }
}

document.getElementById("lang-btn").addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "es" : "en");
});

document.getElementById("year").textContent = new Date().getFullYear();
loadProducts();
setLanguage("en");
