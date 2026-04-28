const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe");

admin.initializeApp();
const db = admin.firestore();

// Pack definitions — must match your frontend PACKS
const PACK_COINS = {
  c3000: 3000,
  c10000: 10000,
};

exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed");
    return;
  }

  const event = req.body;

  // Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const uid = session.client_reference_id;

    if (!uid) {
      console.log("No client_reference_id found");
      res.status(200).send("OK - no UID");
      return;
    }

    // Determine what was purchased from the Stripe metadata or price
    const amountCents = session.amount_total;
    let coinsToAdd = 0;
    let isNoAds = false;

    // Match by amount (in cents)
    if (amountCents === 199) {
      // $1.99 = No Ads
      isNoAds = true;
    } else if (amountCents === 99) {
      // $0.99 = 3000 coins
      coinsToAdd = 3000;
    } else if (amountCents === 299) {
      // $2.99 = 10000 coins
      coinsToAdd = 10000;
    }

    try {
      const userRef = db.collection("users").doc(uid);
      if (isNoAds) {
        await userRef.set({ noAds: true }, { merge: true });
        console.log(`NoAds activated for ${uid}`);
      }
      if (coinsToAdd > 0) {
        await userRef.update({
          coins: admin.firestore.FieldValue.increment(coinsToAdd),
        });
        console.log(`Added ${coinsToAdd} coins to ${uid}`);
      }
      res.status(200).send("OK");
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).send("Error");
    }
  } else {
    res.status(200).send("OK - unhandled event");
  }
});