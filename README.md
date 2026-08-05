# ORBIT

1-tap space arcade — orbit planets, chase the high score, survive.

**Live:** [Google Play](https://play.google.com/store/apps/details?id=com.orbit.drstudios) · [Web demo](https://deerrockstudios.github.io/orbit-game/) · [Studio](https://deerrockstudios.com)

## Stack

- Web: HTML5 / Canvas
- Android: Capacitor
- Backend extras: Firebase (optional messaging)
- Ads / IAP where configured for store builds

## Repo layout

```
index.html          # game entry
android/            # Capacitor Android project
functions/          # Cloud Functions (Stripe hooks, etc.)
dist/               # build output
```

Signing keys and `.env` files are **not** in this repo. Release builds use CI secrets / local keystores only.

## License

All rights reserved © Deer Rock Studios unless noted otherwise in-file.
