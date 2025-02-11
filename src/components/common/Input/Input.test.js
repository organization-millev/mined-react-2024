import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

test('renderiza el componente Input con las props proporcionadas', () => {
  const props = {
    type: 'text',
    placeholder: 'Escribe aquí',
    name: 'inputName',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class'
  };

  render(<Input {...props} />);

  const inputElement = screen.getByPlaceholderText('Escribe aquí');
  expect(inputElement).toBeTruthy();
  expect(inputElement).toHaveAttribute('type', 'text');
  expect(inputElement).toHaveAttribute('name', 'inputName');
  expect(inputElement).toHaveClass('custom-class');
});

test('maneja el cambio de valor en el input', () => {
  const props = {
    type: 'text',
    placeholder: 'Escribe aquí',
    name: 'inputName',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class'
  };

  render(<Input {...props} />);

  const inputElement = screen.getByPlaceholderText('Escribe aquí');
  fireEvent.change(inputElement, { target: { value: 'Nuevo valor' } });

  expect(props.onChange).toHaveBeenCalled();

});