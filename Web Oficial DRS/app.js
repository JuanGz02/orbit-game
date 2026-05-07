const i18n = {
  en: {
    nav_products: "Products",
    nav_about: "The Studio",
    nav_milestones: "Milestones",
    nav_support: "Contact",
    hero_eyebrow: "Human-directed · AI-powered · Always shipping",
    hero_title: "We don't build apps.<br>We deploy<br><span class=\"gradient-word\">experiences.</span>",
    hero_text: "Deer Rock Studios sits at the intersection of human creativity and machine intelligence. Our mission: compress years of development into weeks, and ship products built to last decades.",
    hero_cta_1: "See Our Work",
    hero_cta_2: "The Studio",
    mission_label: "Mission progress",
    mission_sub: "Products deployed. The clock doesn't stop.",
    ai_live: "AI pipeline active",
    ai_title: "20+ specialized agents<br>in production",
    ai_sub: "Design · Code · QA · Deploy · Iterate — all running in parallel, orchestrated by human creative direction.",
    latest_eyebrow: "Latest deployment",
    latest_desc: "1-tap space game — Web & Android",
    products_title: "Deployed Products",
    products_pill: "Live operations",
    milestones_title: "Milestones & Achievements",
    milestones_pill: "Since founding",
    ms1_stat: "0 → Play Store",
    ms1_desc: "Full game concept to Google Play approved in under 30 days.",
    ms2_stat: "85+ users",
    ms2_desc: "Organic users acquired on launch week. Zero ad spend. Zero influencers.",
    ms3_stat: "3 platforms",
    ms3_desc: "Web, Android, and itch.io — all running from a single codebase.",
    ms4_stat: "20+ AI agents",
    ms4_desc: "First studio to run a fully parallelized AI development pipeline in production.",
    ms5_stat: "Day-1 revenue",
    ms5_desc: "Live monetization on launch day via Stripe and AdMob. No waiting period.",
    ms6_stat: "Sub-48h approval",
    ms6_desc: "Google Play store review completed in under 48 hours on first submission.",
    about_title: "The Studio",
    about_lead: "\"We believe the bottleneck in software was never ideas — it was execution speed. We removed it.\"",
    about_text: "Deer Rock Studios is a next-generation product studio. We operate at the intersection of human vision and artificial intelligence, running a team of 20+ specialized AI agents to design, code, test, and ship faster than any traditional team could imagine.",
    about_text2: "Our goal is concrete: 50 products that solve real problems, generate real revenue, and reach real people. No venture capital. No bloated org charts. Just relentless execution.",
    stat_products: "Products live",
    stat_agents: "AI agents",
    stat_goal: "Product goal",
    stat_ambition: "Ambition",
    support_title: "Contact",
    support_text: "Support, press, partnerships, investment, or just want to say something — we read every message.",
    press_title: "Press & Partners",
    press_text: "Covering the future of AI-native software studios? We're happy to talk. Mention \"Press\" in the subject.",
    footer_privacy: "Privacy Policy",
    footer_delete: "Delete Account",
    product_visit: "Visit →"
  },
  es: {
    nav_products: "Productos",
    nav_about: "El Estudio",
    nav_milestones: "Logros",
    nav_support: "Contacto",
    hero_eyebrow: "Dirección humana · Potencia IA · Siempre publicando",
    hero_title: "No construimos apps.<br>Desplegamos<br><span class=\"gradient-word\">experiencias.</span>",
    hero_text: "Deer Rock Studios opera en la intersección de la creatividad humana y la inteligencia artificial. Nuestra misión: comprimir años de desarrollo en semanas y publicar productos hechos para durar décadas.",
    hero_cta_1: "Ver Nuestros Productos",
    hero_cta_2: "El Estudio",
    mission_label: "Progreso de misión",
    mission_sub: "Productos desplegados. El reloj no para.",
    ai_live: "Pipeline IA activo",
    ai_title: "20+ agentes especializados<br>en producción",
    ai_sub: "Diseño · Código · QA · Deploy · Iteración — todo en paralelo, orquestado por dirección creativa humana.",
    latest_eyebrow: "Último despliegue",
    latest_desc: "Juego espacial 1 toque — Web y Android",
    products_title: "Productos Desplegados",
    products_pill: "Operaciones activas",
    milestones_title: "Hitos y Logros",
    milestones_pill: "Desde la fundación",
    ms1_stat: "0 → Play Store",
    ms1_desc: "De concepto de juego a Google Play aprobado en menos de 30 días.",
    ms2_stat: "85+ usuarios",
    ms2_desc: "Usuarios orgánicos en la semana de lanzamiento. Sin inversión en anuncios. Sin influencers.",
    ms3_stat: "3 plataformas",
    ms3_desc: "Web, Android e itch.io — todo funcionando desde un único código base.",
    ms4_stat: "20+ agentes IA",
    ms4_desc: "Primer estudio con un pipeline de desarrollo IA totalmente paralelo en producción.",
    ms5_stat: "Revenue desde día 1",
    ms5_desc: "Monetización activa desde el día de lanzamiento con Stripe y AdMob. Sin períodos de espera.",
    ms6_stat: "Aprobación sub-48h",
    ms6_desc: "Revisión de Google Play completada en menos de 48 horas en el primer envío.",
    about_title: "El Estudio",
    about_lead: "\"Creemos que el cuello de botella del software nunca fueron las ideas — fue la velocidad de ejecución. Nosotros lo eliminamos.\"",
    about_text: "Deer Rock Studios es un estudio de productos de nueva generación. Operamos en la intersección de la visión humana y la inteligencia artificial, con un equipo de 20+ agentes IA especializados que diseñan, codifican, prueban y publican más rápido de lo que cualquier equipo tradicional podría imaginar.",
    about_text2: "Nuestro objetivo es concreto: 50 productos que resuelvan problemas reales, generen ingresos reales y lleguen a personas reales. Sin capital riesgo. Sin organigramas inflados. Solo ejecución implacable.",
    stat_products: "Productos activos",
    stat_agents: "Agentes IA",
    stat_goal: "Meta de productos",
    stat_ambition: "Ambición",
    support_title: "Contacto",
    support_text: "Soporte, prensa, alianzas, inversión o simplemente quieres decir algo — leemos cada mensaje.",
    press_title: "Prensa y Alianzas",
    press_text: "¿Cubriendo el futuro de los estudios de software nativos de IA? Encantados de hablar. Menciona \"Prensa\" en el asunto.",
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
