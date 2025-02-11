import React from 'react';
import { render, screen } from '@testing-library/react';
import ResumenCompra from './ResumenCompra';
import { convertirMonedas } from '../../../utils/funciones';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n'; // Asegúrate de importar correctamente tu configuración de i18next

jest.mock('../../../utils/funciones', () => ({
  convertirMonedas: jest.fn(),
}));

describe('Componente ResumenCompra', () => {
  beforeEach(() => {
    convertirMonedas.mockImplementation(() => 'S/');
  });

  const mockProps = {
    orden: {
      moneda: 'PEN',
      items: [
        { id_producto: 1, nombre: 'Producto 1', precio: 50 },
        { id_producto: 2, nombre: 'Producto 2', precio: 30 },
      ],
      orden_boceto: true,
    },
  };

  test('se renderiza correctamente con los datos de la orden', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ResumenCompra {...mockProps} />
      </I18nextProvider>
    );

    // Verifica que el título "Resumen de tu compra" aparece
    const titulo = screen.getByText(/Resumen de tu compra/i);
    expect(titulo).toBeInTheDocument();

    // Verifica que los productos se renderizan correctamente
    mockProps.orden.items.forEach((item) => {
      expect(screen.getByText(item.nombre)).toBeInTheDocument();
      expect(screen.getByText(`S/${item.precio}`)).toBeInTheDocument();
    });

    // Verifica que el total se calcula y muestra correctamente
    const total = screen.getByText(/Total:/i);
    expect(total).toBeInTheDocument();
    expect(screen.getByText(`S/80`)).toBeInTheDocument(); // Total esperado: 50 + 30 = 80
  });

  test('se renderiza correctamente con una orden vacía', () => {
    const emptyOrderProps = {
      orden: {
        moneda: 'PEN',
        items: [],
        orden_boceto: true,
      },
    };

    render(
      <I18nextProvider i18n={i18n}>
        <ResumenCompra {...emptyOrderProps} />
      </I18nextProvider>
    );

    // Verifica que no hay productos
    expect(screen.queryByText(/Producto/i)).not.toBeInTheDocument();

    // Verifica que el total es 0
    expect(screen.getByText(`S/0`)).toBeInTheDocument();
  });
});
