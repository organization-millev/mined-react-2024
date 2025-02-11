import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardVerMas from './CardVerMas';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        verMas: 'ver más',
        verMenos: 'ver menos'
      }
    }
  }
});

test('renders CardVerMas component with provided props', () => {
  const props = {
    titleDescription: 'Título de prueba',
    description: 'Esta es una descripción detallada en español.'
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CardVerMas {...props} />
    </I18nextProvider>
  );

  const titleElement = screen.getByText('Título de prueba');
  const descriptionElement = screen.getByText('Esta es una descripción detallada en español.');

  expect(titleElement).toBeTruthy();
  expect(descriptionElement).toBeTruthy();
});

test('toggles content visibility on click', () => {
  const props = {
    titleDescription: 'Título de prueba',
    description: 'Esta es una descripción detallada en español.'
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CardVerMas {...props} />
    </I18nextProvider>
  );

  const toggleButton = screen.getByText('ver más');
  fireEvent.click(toggleButton);

  const toggleButtonAfterClick = screen.getByText('ver menos');
  expect(toggleButtonAfterClick).toBeTruthy();
});