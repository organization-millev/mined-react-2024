import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomButton from './CustomButton';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        btnInciarSesion: 'Iniciar Sesión'
      }
    }
  }
});

test('renderiza el botón con el texto "Iniciar Sesión"', () => {
  const props = {
    mobileFullWidth: true,
    onClick: jest.fn()
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CustomButton {...props} />
    </I18nextProvider>
  );

  const buttonElement = screen.getByText('Iniciar Sesión');
  expect(buttonElement).toBeTruthy();
  expect(buttonElement).toHaveClass('w-full');
});

test('maneja el clic en el botón', () => {
  const props = {
    mobileFullWidth: true,
    onClick: jest.fn()
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CustomButton {...props} />
    </I18nextProvider>
  );

  const buttonElement = screen.getByText('Iniciar Sesión');
  fireEvent.click(buttonElement);

  expect(props.onClick).toHaveBeenCalled();
});