import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';

// Mock de los íconos para evitar problemas al renderizar SVGs
jest.mock('../../iconos/expand_more', () => (props) => <svg data-testid="flecha-abajo-select" {...props} />);
jest.mock('../../iconos/expand_more_blanco.js', () => (props) => <svg data-testid="flecha-abajo-select-dark" {...props} />);

describe('Select Component', () => {
  const mockProps = {
    className: 'custom-class',
    onChange: jest.fn(),
    selectedvalue: 'option2',
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  };

  test('renders correctly with all options', () => {
    render(<Select {...mockProps} />);

    // Verifica que el select está en el documento
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Verifica que todas las opciones están presentes
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  test('sets the correct selected value', () => {
    render(<Select {...mockProps} />);

    // Verifica que la opción seleccionada por defecto es "option2"
    const selectedOption = screen.getByRole('option', { name: 'Option 2' });
    expect(selectedOption.selected).toBe(true);
  });

  test('calls onChange when a different option is selected', () => {
    render(<Select {...mockProps} />);

    const selectElement = screen.getByRole('combobox');

    // Simula seleccionar una opción diferente
    fireEvent.change(selectElement, { target: { value: 'option3' } });

    // Verifica que se llamó a la función onChange
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(expect.anything());
  });

  test('renders the icons correctly', () => {
    render(<Select {...mockProps} />);

    // Verifica que el ícono para light mode está presente
    const flechaAbajoSelect = screen.getByTestId('flecha-abajo-select');
    expect(flechaAbajoSelect).toBeInTheDocument();

    // Verifica que el ícono para dark mode está presente
    const flechaAbajoSelectDark = screen.getByTestId('flecha-abajo-select-dark');
    expect(flechaAbajoSelectDark).toBeInTheDocument();
  });
});
