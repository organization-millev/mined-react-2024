import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectLista from './SelectLista';

// Mock de los íconos para evitar problemas al renderizar SVGs
jest.mock('../../iconos/expand_more', () => (props) => <svg data-testid="flecha-abajo-select" {...props} />);
jest.mock('../../iconos/keyboard_arrow_up', () => (props) => <svg data-testid="flecha-arriba-select" {...props} />);
jest.mock('../../iconos/expand_more_white.js', () => (props) => <svg data-testid="flecha-abajo-white" {...props} />);
jest.mock('../../iconos/keyboard_arrow_up_white.js', () => (props) => <svg data-testid="flecha-arriba-white" {...props} />);

describe('Componente SelectLista', () => {
  const opcionesMock = [
    { value: 'opcion1', label: 'Opción 1' },
    { value: 'opcion2', label: 'Opción 2' },
    { value: 'opcion3', label: 'Opción 3' },
  ];

  const mockProps = {
    id: 'test-select',
    isOpen: false,
    onToggle: jest.fn(),
    defaultValue: '-',
    opciones: opcionesMock,
    onChange: jest.fn(),
  };

  test('se renderiza correctamente con el valor predeterminado', () => {
    render(<SelectLista {...mockProps} />);

    // Verifica que se muestra "Seleccione una opción" si no hay selección
    expect(screen.getByText('Seleccione una opción')).toBeInTheDocument();
  });

  test('muestra las opciones cuando se abre el dropdown', () => {
    render(<SelectLista {...mockProps} isOpen={true} />);

    // Verifica que todas las opciones se muestran en el dropdown
    opcionesMock.forEach((opcion) => {
      expect(screen.getByText(opcion.label)).toBeInTheDocument();
    });
  });

  test('llama a onToggle cuando se hace clic en el encabezado', () => {
    render(<SelectLista {...mockProps} />);

    // Simula clic en el encabezado
    const header = screen.getByText('Seleccione una opción');
    fireEvent.click(header);

    // Verifica que se llama a onToggle
    expect(mockProps.onToggle).toHaveBeenCalledTimes(1);
    expect(mockProps.onToggle).toHaveBeenCalledWith(mockProps.id);
  });

  test('cambia la opción seleccionada al hacer clic en una opción', () => {
    render(<SelectLista {...mockProps} isOpen={true} />);

    // Simula clic en "Opción 2"
    const opcion = screen.getByText('Opción 2');
    fireEvent.click(opcion);

    // Verifica que se llama a onChange con el valor de la opción seleccionada
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith('opcion2');
  });

  test('renderiza los íconos correctamente según el estado', () => {
    const { rerender } = render(<SelectLista {...mockProps} isOpen={false} />);

    // Verifica que se muestra el ícono de flecha hacia abajo inicialmente
    expect(screen.getByTestId('flecha-abajo-select')).toBeInTheDocument();
    expect(screen.queryByTestId('flecha-arriba-select')).toBeNull();

    // Re-renderiza con el estado abierto
    rerender(<SelectLista {...mockProps} isOpen={true} />);

    // Verifica que se muestra el ícono de flecha hacia arriba cuando el dropdown está abierto
    expect(screen.getByTestId('flecha-arriba-select')).toBeInTheDocument();
    expect(screen.queryByTestId('flecha-abajo-select')).toBeNull();
  });
});
