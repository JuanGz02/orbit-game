# CLAUDE.md — Deer Rock Studios / ORBIT

Este archivo es leído automáticamente al inicio de cada sesión.
Contiene las reglas, convenciones y contexto del proyecto.

---

## 👤 El Estudio

- **Nombre:** Deer Rock Studios
- **Dueño:** Juan (jucapegu02@gmail.com)
- **Meta:** Lanzar 50 apps y juegos monetizados
- **Branding:** Estudio AI-native, 60+ agentes, dirección humana — NO mencionar que es una sola persona
- **Idioma con Juan:** Español siempre

---

## 🎮 ORBIT — Juego activo

- **Plataformas:** Web (GitHub Pages) + Android (Google Play)
- **Package:** `com.deerrock.orbit`
- **Play Store:** Prueba cerrada (Alpha), necesita 12 testers para producción
- **Stack:** Capacitor + Firebase + AdMob + Stripe
- **Repo:** `DeerRockStudios/orbit-game` en GitHub

### Archivos clave del juego
| Archivo | Descripción |
|---|---|
| `index.html` | Motor del juego (canvas) |
| `android/` | Proyecto Capacitor/Android |
| `android/app/build.gradle` | versionCode actual: **2** |
| `android/variables.gradle` | compileSdk/targetSdk: **35** |
| `android/app/src/main/AndroidManifest.xml` | Permisos Android |

### Reglas del juego
- Al subir nueva versión al Play Store → incrementar `versionCode` en `build.gradle`
- `targetSdkVersion` debe ser ≥ 35 (requisito Google 2026)
- El permiso `AD_ID` debe estar en el Manifest para AdMob

---

## 🌐 Sitio Web DRS

- **Ruta local:** `D:\Orbit\Web Oficial DRS\`
- **URL viva:** `https://deerrockstudios.github.io/orbit-game/Web%20Oficial%20DRS/`
- **Deploy:** GitHub Pages (push a `master` = deploy automático, ~2 min)

### Archivos del sitio
| Archivo | Descripción |
|---|---|
| `index.html` | Página principal |
| `styles.css` | Estilos completos |
| `app.js` | i18n EN/ES + renderProducts() |
| `products.json` | Catálogo de productos (fuente de verdad) |
| `privacy-policy.html` | Política de privacidad |
| `delete-account.html` | Página de eliminación de cuenta |
| `drs-logo.png` | Logo DRS (192x192, sin espacios en nombre) |
| `manifest.json` | display:browser (suprime botón PWA) |

### Reglas del sitio
- **i18n:** Todas las claves usan `data-i18n` + `el.textContent` (NO innerHTML)
- Las claves de i18n que contienen HTML (como spans) → el HTML va en el HTML, el texto en la clave
- Al agregar texto nuevo → agregar clave en **ambos idiomas** (EN + ES) en `app.js`
- Logo siempre referenciado como `./drs-logo.png` (sin espacios)
- `og:image` apunta a `https://deerrockstudios.github.io/orbit-game/Web%20Oficial%20DRS/drs-logo.png`

### Redes sociales
| Red | URL |
|---|---|
| Instagram | https://www.instagram.com/deerrockstudios/ |
| Facebook | https://www.facebook.com/profile.php?id=61588954963207 |
| TikTok | https://www.tiktok.com/@digital_king02 *(cambiar cuando actualice usuario)* |
| YouTube | https://www.youtube.com/@Deerrockstudios |

---

## ⚙️ GitHub Actions / CI-CD

- **Workflow:** `.github/workflows/build.yml`
- **Secrets requeridos:** `KEYSTORE_FILE`, `STORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`
- El workflow firma y genera el AAB de release automáticamente en cada push

---

## 🔥 Firebase

- **Proyecto:** `orbit-game-8f865`
- **Prefijo de colecciones compartidas con Eclipse:** `eclipse_`
- Auth, Firestore y AdMob configurados

---

## 📐 Convenciones de código

- **Commits:** en inglés, imperativo, con `Co-Authored-By: Claude Sonnet 4.6`
- **CSS:** variables en `:root`, mobile-first, breakpoints en 960px y 600px
- **Fuentes:** Space Grotesk (body) + JetBrains Mono (datos/números/monospace)
- **Paleta:** `--bg: #07080f` / `--cyan: #22d3ee` / `--amber: #f59e0b`
- **No usar `innerHTML`** para actualizaciones de i18n

---

## ❌ Reglas estrictas

- **Nunca** mencionar que el estudio es de una sola persona
- **Nunca** decir que la meta son "50 apps" en el copy del sitio — se dice "60+ agentes"
- **Nunca** subir archivos con espacios en el nombre a Git (renombrar primero)
- **Nunca** commitear `testers.csv` ni archivos con emails
- Ser cuidadoso con URLs sugeridas — verificar que existen antes de recomendarlas
