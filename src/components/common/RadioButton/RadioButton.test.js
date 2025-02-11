import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioButtonsGroup from './RadioButton';

describe('RadioButtonsGroup Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const mockProps = {
    options: mockOptions,
    name: 'testGroup',
    selectedOption: 'option2',
    onChange: jest.fn(),
    className: 'radio-group',
    labelClassName: 'radio-label',
  };

  test('renders all options correctly', () => {
    render(<RadioButtonsGroup {...mockProps} />);

    // Verifica que todas las opciones están en el DOM
    mockOptions.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  test('checks the correct radio button based on selectedOption', () => {
    render(<RadioButtonsGroup {...mockProps} />);

    // Verifica que la opción seleccionada está marcada
    const selectedRadio = screen.getByDisplayValue(mockProps.selectedOption);
    expect(selectedRadio).toBeChecked();
  });

  test('triggers onChange when a radio button is clicked', () => {
    render(<RadioButtonsGroup {...mockProps} />);

    const radioToClick = screen.getByDisplayValue('option1');
    fireEvent.click(radioToClick);

    // Verifica que se llama a la función onChange
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(expect.anything());
  });
});
