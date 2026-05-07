const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

// ══════════════════════════════════════════
// PUSH NOTIFICATIONS — diario 12:30 y 18:00 UTC
// ══════════════════════════════════════════
exports.sendDailyNotif = functions.pubsub
  .schedule("30 12 * * *")   // 12:30 UTC = ~2:30 PM Bucarest, ~7:30 AM Colombia
  .timeZone("UTC")
  .onRun(async () => {
    return sendToAll();
  });

exports.sendEveningNotif = functions.pubsub
  .schedule("0 18 * * *")    // 6:00 PM UTC = ~8 PM Bucarest, ~1 PM Colombia
  .timeZone("UTC")
  .onRun(async () => {
    return sendToAll();
  });

async function sendToAll() {
  const msgs = {
    en: [
      {t: "🪐 The galaxy misses you", b: "Just one tap. How far can you go?"},
      {t: "🔥 Your streak is waiting", b: "Don't let it die. Quick game?"},
      {t: "🏆 New players joined", b: "Someone's climbing your leaderboard..."},
      {t: "😤 Top 3 think they're untouchable", b: "Prove them wrong. One game."},
      {t: "🎯 Daily challenge is live", b: "Complete it for bonus coins!"},
      {t: "🚀 Bored?", b: "Dethrone those guys in top 3 who think they're better than you"},
      {t: "⭐ Free coins waiting", b: "Your daily streak bonus is ready to collect"},
      {t: "🪐 Quick break?", b: "One orbit. That's all it takes to feel alive."},
    ],
    es: [
      {t: "🪐 La galaxia te extraña", b: "Solo un toque. ¿Hasta dónde llegas?"},
      {t: "🔥 Tu racha te espera", b: "No la dejes morir. ¿Una partida rápida?"},
      {t: "🏆 Nuevos jugadores entraron", b: "Alguien está subiendo en tu ranking..."},
      {t: "😤 El top 3 se cree intocable", b: "Demuéstrales que no. Una partida."},
      {t: "🎯 Reto diario activo", b: "¡Complétalo por monedas extra!"},
      {t: "🚀 ¿Aburrido?", b: "Destrona a esos del top 3 que creen ser mejores que tú"},
      {t: "⭐ Monedas gratis esperándote", b: "Tu bonus de racha diaria está listo"},
      {t: "🪐 ¿Un break rápido?", b: "Una órbita. Eso es todo lo que necesitas."},
    ]
  };

  const snap = await db.collection("users")
    .where("fcmToken", "!=", null)
    .get();

  const stale = [];

  const promises = snap.docs.map(async (doc) => {
    const data = doc.data();
    const token = data.fcmToken;
    if (!token) return;

    const lang = data.lang || "en";
    const pool = msgs[lang] || msgs.en;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    try {
      await messaging.send({
        token: token,
        notification: {title: pick.t, body: pick.b},
        webpush: {
          fcmOptions: {link: "https://deerrockstudios.github.io/orbit-game/"},
        },
      });
    } catch (err) {
      if (err.code === "messaging/registration-token-not-registered" ||
          err.code === "messaging/invalid-registration-token") {
        stale.push(doc.ref.update({fcmToken: null}));
      }
    }
  });

  await Promise.all(promises);
  await Promise.all(stale);
  console.log("Sent to", snap.size, "users, cleaned", stale.length, "stale tokens");
}

// ══════════════════════════════════════════
// STRIPE WEBHOOK — Season Pass grant/revoke
// ══════════════════════════════════════════
// Setup:
//   1. firebase functions:config:set stripe.webhook_secret="whsec_XXXX"
//   2. En Stripe Dashboard > Webhooks apunta a la URL de esta función
//   3. Eventos a escuchar:
//      - customer.subscription.created
//      - invoice.payment_succeeded
//      - customer.subscription.deleted
//      - customer.subscription.updated
//   4. El UID del usuario viaja en client_reference_id (ya implementado en buyPack)
// ══════════════════════════════════════════
const Stripe = require("stripe");

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  // Verificar firma de Stripe
  const webhookSecret = functions.config().stripe && functions.config().stripe.webhook_secret;
  if (!webhookSecret) {
    console.error("stripe.webhook_secret not configured. Run: firebase functions:config:set stripe.webhook_secret=\"whsec_xxx\"");
    return res.status(500).send("Webhook secret not configured");
  }

  const stripe = Stripe(webhookSecret.startsWith("whsec_")
    ? (functions.config().stripe.secret_key || process.env.STRIPE_SECRET_KEY || "")
    : webhookSecret);

  // Reconstruir evento y verificar firma
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = require("stripe")(
      functions.config().stripe.secret_key || process.env.STRIPE_SECRET_KEY || ""
    ).webhooks.constructEvent(req.rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send("Webhook Error: " + err.message);
  }

  // Extraer UID del usuario (viene como client_reference_id en el checkout)
  const obj = event.data.object;
  const uid = obj.client_reference_id || obj.metadata && obj.metadata.uid;

  if (!uid) {
    console.warn("No uid found in event:", event.type, "id:", obj.id);
    return res.json({received: true, warning: "no uid"});
  }

  const userRef = db.collection("users").doc(uid);

  try {
    if (
      event.type === "customer.subscription.created" ||
      event.type === "invoice.payment_succeeded"
    ) {
      // Season Pass activo — dar noAds + 2× multiplicador
      await userRef.set({
        noAds: true,
        nextGameMultiplier: 2,
        seasonPass: true,
        seasonPassUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});
      console.log("Season Pass ACTIVATED for uid:", uid, "event:", event.type);

    } else if (
      event.type === "customer.subscription.deleted" ||
      (event.type === "customer.subscription.updated" && obj.status === "canceled")
    ) {
      // Season Pass cancelado — revocar beneficios
      await userRef.set({
        noAds: false,
        nextGameMultiplier: 1,
        seasonPass: false,
        seasonPassUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});
      console.log("Season Pass REVOKED for uid:", uid, "event:", event.type);

    } else if (event.type === "customer.subscription.updated" && obj.status === "active") {
      // Renovación mensual — confirmar activo
      await userRef.set({
        noAds: true,
        nextGameMultiplier: 2,
        seasonPass: true,
        seasonPassUpdatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, {merge: true});
      console.log("Season Pass RENEWED for uid:", uid);
    }
  } catch (err) {
    console.error("Firestore update failed for uid:", uid, err);
    return res.status(500).send("DB error");
  }

  return res.json({received: true});
});
