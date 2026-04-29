importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:"AIzaSyB9rkCg1lqThz0ZLN4jKKzKxG0ABMqhdaU",
  authDomain:"orbit-game-8f865.firebaseapp.com",
  projectId:"orbit-game-8f865",
  storageBucket:"orbit-game-8f865.firebasestorage.app",
  messagingSenderId:"913628193179",
  appId:"1:913628193179:web:f40c1bc8007a206c94413e"
});

var messaging=firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  var data=payload.notification||payload.data||{};
  var title=data.title||'ORBIT';
  var options={
    body:data.body||'Time to play!',
    icon:'/icon-192.png',
    badge:'/icon-192.png',
    data:{url:'/orbit-game/'}
  };
  return self.registration.showNotification(title,options);
});

self.addEventListener('notificationclick',function(e){
  e.notification.close();
  e.waitUntil(clients.openWindow('https://deerrockstudios.github.io/orbit-game/'));
});
