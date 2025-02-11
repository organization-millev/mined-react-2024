import React from 'react';
import { render, screen } from '@testing-library/react';
import Theme from './Theme';

// Mock de los íconos para evitar problemas
jest.mock('../../iconos/dark_mode', () => (props) => <svg data-testid="icon-luna" {...props} />);
jest.mock('../../iconos/dark_mode__fill_white', () => (props) => <svg data-testid="icon-luna-select" {...props} />);
jest.mock('../../iconos/light_mode', () => (props) => <svg data-testid="icon-sol" {...props} />);
jest.mock('../../iconos/light_mode__fill', () => (props) => <svg data-testid="icon-sol-select" {...props} />);

describe('Componente Theme', () => {
  test('se renderiza correctamente', () => {
    render(<Theme />);

    // Verifica que se renderizan dos botones
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);

    // Verifica que los íconos están presentes
    expect(screen.getByTestId('icon-sol-select')).toBeInTheDocument();
    expect(screen.getByTestId('icon-luna')).toBeInTheDocument();
  });
});
