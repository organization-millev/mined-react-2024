import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFunctions, httpsCallable } from 'firebase/functions';

// Configuración de Firebase
const VAPID_KEY = 'BO4YpeSp9TRlFRH9k6D5rUbFOC_J4JUL5DNq_kCeG4iQfMeix1FHKe3hmv0DCQhgKvDGxgH--8lfdwFW1V8C1f0';

// Obtener la URL del Service Worker desde el entorno
const swUrl = process.env.REACT_APP_FIREBASE_SW_URL;
      
const firebaseConfig = {
  apiKey: "AIzaSyD4QnRAzHIT2UcOgBVn61TB_2xpi-hNzZI",
  authDomain: "mined-e-learning.firebaseapp.com",
  projectId: "mined-e-learning",
  storageBucket: "mined-e-learning.appspot.com",
  messagingSenderId: "305587457257",
  appId: "1:305587457257:web:85f6b12de0a4e994f43478",
  measurementId: "G-N9L9QYNSTW"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

// Inicializamos Firebase Messaging si el navegador es compatible
let messaging = null;

if ('serviceWorker' in navigator) {
  messaging = getMessaging(firebase);
}

// Escuchar mensajes en primer plano
if (messaging) {
  onMessage(messaging, (payload) => {
    console.log('Mensaje recibido en primer plano:', payload);
    // Mostrar un alert con el contenido del mensaje
    alert(`Nuevo mensaje: ${payload.notification?.title || 'Sin título'}`);
  });
}

const functions = getFunctions(firebase);
const subscribeToTopic = httpsCallable(functions, 'subscribeToTopic');

// Función para suscribirse a un tema
const subscribeUserToTopic = (token, topic) => {
  subscribeToTopic({ token, topic })
    .then((result) => {
      console.log('Suscripción exitosa:', result.data);
    })
    .catch((error) => {
      console.error('Error subscribing to topic:', error);
    });
}

const subscribeUserToLanguageTopic = (token) => {
  const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
  const canal = language_code === 'ES' ? 'prod_general_es' : 'prod_general_en';
  subscribeUserToTopic(token, canal);
};

// Función para manejar la lógica del Service Worker y sus actualizaciones
const registerAndUpdateServiceWorker = async () => {
  
  if ('serviceWorker' in navigator) {
    try {
      // Verificar si ya hay un Service Worker registrado
      const existingRegistration = await navigator.serviceWorker.getRegistration();
      if (existingRegistration) {
        console.log('Service Worker ya está registrado:', existingRegistration);
        return; // No registrar de nuevo si ya existe
      }

      // Registrar un nuevo Service Worker si no hay uno registrado
      const registration = await navigator.serviceWorker.register(swUrl);
      console.log('Service Worker registrado correctamente:', registration);
      // Verificar si existe una nueva versión del Service Worker
      /*registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Nuevo Service Worker instalado.');
              } else {
                console.log('Service Worker disponible por primera vez.');
              }
              requestFirebaseNotificationPermission();
            }
          };
        }
      };*/

    } catch (error) {
      console.error('Error al registrar el Service Worker:', error);
    }
  } else {
    console.warn('El navegador no soporta Service Workers.');
  }
};



// Función para eliminar Service Workers antiguos si es necesario
const removeOldServiceWorkers = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      registrations.forEach(async (registration) => {
        await registration.unregister();
        console.log('Service Worker antiguo eliminado:', registration);
      });
    } catch (error) {
      console.error('Error al eliminar los Service Workers antiguos:', error);
    }
  }
};

const initializeFirebaseServices = async () => {
  await requestFirebaseNotificationPermission();
  //await registerAndUpdateServiceWorker();
};

// Solicitar permiso para las notificaciones y obtener el token
const requestFirebaseNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    if (token) {
      console.log('Token de notificación recibido:', token);
      localStorage.setItem('notificationToken', token);
      const storedToken = localStorage.getItem('notificationToken');
      if (storedToken) {
        subscribeUserToLanguageTopic(storedToken);
      }
    } else {
      console.warn('No se pudo obtener el token de notificación. Intentando de nuevo...');
    }
  } catch (error) {
    console.error('Error al obtener el permiso de notificación:', error);
  }
}

/*const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      resolve(payload);
    });
  });*/

export { initializeFirebaseServices, requestFirebaseNotificationPermission, subscribeUserToTopic, getToken, VAPID_KEY, messaging, onMessage };
export default firebase;
