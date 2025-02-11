// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD4QnRAzHIT2UcOgBVn61TB_2xpi-hNzZI",
  authDomain: "mined-e-learning.firebaseapp.com",
  projectId: "mined-e-learning",
  storageBucket: "mined-e-learning.appspot.com",
  messagingSenderId: "305587457257",
  appId: "1:305587457257:web:85f6b12de0a4e994f43478",
  measurementId: "G-N9L9QYNSTW"
});

// Inicializa Firebase Messaging
const messaging = firebase.messaging();

// Maneja mensajes en segundo plano
/*messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});*/

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Recibido mensaje en segundo plano ', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title;
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body,
    // Puedes agregar más opciones como icono, acciones, etc.
  };

  // Mostrar la notificación
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Enviar el mensaje a las ventanas abiertas
  self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'PUSH_NOTIFICATION_RECEIVED',
        payload: payload
      });
    });
  });
});