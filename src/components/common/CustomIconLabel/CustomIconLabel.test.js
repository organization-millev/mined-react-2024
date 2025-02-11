import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomIconLabel from './CustomIconLabel';

const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

test('renderiza el componente CustomIconLabel con el icono y la etiqueta proporcionados', () => {
  const props = {
    icon: MockIcon,
    label: 'Etiqueta de prueba'
  };

  render(<CustomIconLabel {...props} />);

  expect(screen.getByTestId('mock-icon')).toBeTruthy();
  expect(screen.getByText('Etiqueta de prueba')).toBeTruthy();
});