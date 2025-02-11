import React from 'react';
import { render, screen } from '@testing-library/react';
import DetalleProductoAcademia from './DetalleProductoAcademia';

test('renderiza el componente DetalleProductoAcademia con las props proporcionadas', () => {
  const props = {
    logo: 'logo.png',
    subtitle: 'Subtítulo del producto',
    description: 'Descripción del producto',
    itemNoComprada: 1
  };

  render(<DetalleProductoAcademia {...props} />);

  expect(screen.getByAltText('Subtítulo del producto')).toHaveAttribute('src', 'logo.png');
  expect(screen.getByText('Subtítulo del producto')).toBeTruthy();
  expect(screen.getByText('Descripción del producto')).toBeTruthy();
});