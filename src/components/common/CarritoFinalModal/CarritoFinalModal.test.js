import React from 'react';
import { render, screen } from '@testing-library/react';
import CarritoFinalModal from './CarritoFinalModal';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Configuración mínima de i18n para el test
i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        resumenCompra: 'Resumen de la compra',
        total: 'Total'
      }
    }
  }
});

test('renderiza el componente CarritoFinalModal correctamente', () => {
  const props = {
    tipo: 'SUCCESS',
    titulo: 'Compra realizada con éxito',
    mensaje: 'Gracias por tu compra.',
    opsdate: { data: { datetime: '2025-01-22' } },
    orden: {
      moneda: 'USD',
      items: [
        {
          id_producto: 1,
          nombre: 'Producto 1',
          precio: 50,
          price_cat_txt_name_lng: '{"ES": "Categoría 1"}', // JSON válido
          draft_item_text_sale: 'false'
        },
        {
          id_producto: 2,
          nombre: 'Producto 2',
          precio: 100,
          price_cat_txt_name_lng: '{"ES": "Categoría 2"}', // JSON válido
          draft_item_text_sale: 'false'
        }
      ]
    }
  };

  render(
    <I18nextProvider i18n={i18n}>
      <CarritoFinalModal {...props} />
    </I18nextProvider>
  );

  // Verifica que los textos principales estén presentes
  expect(screen.getByText('Compra realizada con éxito')).toBeInTheDocument();
  expect(screen.getByText('Gracias por tu compra.')).toBeInTheDocument();
  expect(screen.getByText(/Fecha de solicitud: 2025-01-22/)).toBeInTheDocument();
  expect(screen.getByText('Producto 1')).toBeInTheDocument();
  expect(screen.getByText('Producto 2')).toBeInTheDocument();
  expect(screen.getByText('Resumen de la compra')).toBeInTheDocument();
  expect(screen.getByText('Total')).toBeInTheDocument();
});
