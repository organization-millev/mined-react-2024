import React from 'react';
import { render, screen } from '@testing-library/react';
import CarritoResumen from './CarritoResumen';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Mock de convertirMonedas
jest.mock('../../../utils/funciones', () => ({
  convertirMonedas: jest.fn(() => '$')
}));

// Configuración mínima de i18n para el test
i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        total: 'Total',
        continuarCompra: 'Continuar con la compra'
      }
    }
  }
});

test('renderiza el componente CarritoResumen correctamente', () => {
  const props = {
    carrito: {
      moneda: 'USD',
      invalid_items: false,
      items: [
        { id_producto: 1, nombre: 'Producto 1', precio: 50 },
        { id_producto: 2, nombre: 'Producto 2', precio: 100 }
      ]
    },
    cargando: false,
    cargandoOrden: false,
    accion: jest.fn()
  };

  // Renderiza el componente envuelto en el proveedor de i18n
  render(
    <I18nextProvider i18n={i18n}>
      <CarritoResumen {...props} />
    </I18nextProvider>
  );

  // Verifica que los elementos clave estén presentes
  expect(screen.getByText('Producto 1')).toBeInTheDocument();
  expect(screen.getByText('Producto 2')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
  expect(screen.getByText('Continuar con la compra')).toBeInTheDocument();
});
