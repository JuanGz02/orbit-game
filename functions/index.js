const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
const messaging = admin.messaging();

// Scheduled notification — runs every day at 12:30 PM and 6:00 PM UTC
// (adjust for your target audience timezone)
exports.sendDailyNotif = functions.pubsub
  .schedule("30 12 * * *")   // 12:30 UTC = ~2:30 PM Bucharest, ~7:30 AM Colombia
  .timeZone("UTC")
  .onRun(async () => {
    return sendToAll();
  });

exports.sendEveningNotif = functions.pubsub
  .schedule("0 18 * * *")    // 6:00 PM UTC = ~8 PM Bucharest, ~1 PM Colombia
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