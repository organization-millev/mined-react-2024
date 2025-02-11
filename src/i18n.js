// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from './components/locales/es'; // Importa solo el idioma español
import en from './components/locales/en'; // Importa solo el idioma ingles


i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es, },
      en: { translation: en, },
    },
    lng: 'es', // Idioma por defecto
    fallbackLng: 'en', // Idioma de respaldo
    interpolation: {
      escapeValue: false, // React ya escapa los valores
    },
  });

export default i18n;

