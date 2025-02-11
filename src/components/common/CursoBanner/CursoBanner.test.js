import React from 'react';
import { render, screen } from '@testing-library/react';
import CursoBanner from './CursoBanner';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        subtitulo: 'Subtítulo del curso'
      }
    }
  }
});

test('renderiza el componente CursoBanner con las props proporcionadas', () => {
  const props = {
    obj: {
      fondo: 'fondo.jpg',
      color: 'rgba(0,0,0,0.5)',
      logo: 'logo.png',
      subtitulo: 'Subtítulo del curso'
    }
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CursoBanner {...props} />
    </I18nextProvider>
  );

  expect(screen.getByText('Subtítulo del curso')).toBeTruthy();
});