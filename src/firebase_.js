/*import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD4QnRAzHIT2UcOgBVn61TB_2xpi-hNzZI",
  authDomain: "mined-e-learning.firebaseapp.com",
  projectId: "mined-e-learning",
  storageBucket: "mined-e-learning.appspot.com",
  messagingSenderId: "305587457257",
  appId: "1:305587457257:web:85f6b12de0a4e994f43478",
  measurementId: "G-N9L9QYNSTW"
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Inicializa Firebase Cloud Messaging (FCM)
const messaging = getMessaging(firebaseApp);

// Solicita el token de usuario
export const requestForToken = () => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const messaging = getMessaging(); // Inicializa el servicio de mensajería de Firebase

        getToken(messaging, { vapidKey: 'BO4YpeSp9TRlFRH9k6D5rUbFOC_J4JUL5DNq_kCeG4iQfMeix1FHKe3hmv0DCQhgKvDGxgH--8lfdwFW1V8C1f0' })
          .then((currentToken) => {
            if (currentToken) {
              
              // Aquí puedes enviar el token a tu backend o almacenarlo
            } else {
              
            }
          })
          .catch((err) => {
            
          });
      } else {
        
      }
    }).catch((err) => {
      
    });
  } else {
    
  }
};

// Maneja mensajes entrantes cuando la app está en primer plano
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });*/