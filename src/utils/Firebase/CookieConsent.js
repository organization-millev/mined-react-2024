// CookieConsent.js
import React, { useState, useEffect } from 'react';
import { initializeFirebaseServices } from './firebaseConfig'; // Función para inicializar GA
import { useAlert } from '../../providers/AlertContext';

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { alertCustomTitle , success } = useAlert();
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'PUSH_NOTIFICATION_RECEIVED') {
          const payload = event.data.payload;
          console.log('Mensaje recibido desde el Service Worker -----------:', payload);
          // Aquí puedes manejar el mensaje como desees
          // Por ejemplo, actualizar el estado de la aplicación, mostrar una alerta, etc.
          alertCustomTitle(payload.notification?.title,payload.notification?.body);
        }
      });
    }
  }, []);


  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === null) {
      setVisible(true);
    } else if (consent === 'true') {
      initializeFirebaseServices();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
    initializeFirebaseServices();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
       <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
            <p className="mb-2 md:mb-0">
              Este sitio web utiliza cookies para mejorar la experiencia del usuario.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleAccept}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
              >
                Aceptar
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
  );
}

export default CookieConsent;
