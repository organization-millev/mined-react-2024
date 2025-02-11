import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarritoEliminarModal from './CarritoEliminarModal';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Configuración de i18n para pruebas
i18n.use(initReactI18next).init({
  lng: 'es',
  resources: {
    es: {
      translation: {
        eliminarTitle: 'Eliminar artículo',
        eliminarSubtitle: '¿Estás seguro de que deseas eliminar este artículo?',
        eliminarCerrar: 'Cerrar',
        eliminarEliminar: 'Eliminar'
      }
    }
  }
});

test('renderiza el componente CarritoEliminarModal con las props proporcionadas', () => {
  const props = {
    mostrarModalFinal: true, // Asegúrate de pasar esta propiedad
    cerrarModal: jest.fn(),
    accionEliminar: jest.fn()
  };

  // Renderiza el componente envuelto con el proveedor de i18n
  render(
    <I18nextProvider i18n={i18n}>
      <CarritoEliminarModal {...props} />
    </I18nextProvider>
  );

  // Verificar que el texto esté presente en el DOM
  expect(screen.getByText('¿Estás seguro de que deseas eliminar este artículo?')).toBeInTheDocument();
  expect(screen.getByText('Cerrar')).toBeInTheDocument();
  expect(screen.getByText('Eliminar')).toBeInTheDocument();
});
