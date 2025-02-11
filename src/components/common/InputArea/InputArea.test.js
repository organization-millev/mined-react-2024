import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputArea from './InputArea';

test('renderiza el componente InputArea con las props proporcionadas', () => {
  const props = {
    placeholder: 'Escribe aquí',
    name: 'inputAreaName',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class'
  };

  render(<InputArea {...props} />);

  const textareaElement = screen.getByPlaceholderText('Escribe aquí');
  expect(textareaElement).toBeTruthy();
  expect(textareaElement).toHaveAttribute('name', 'inputAreaName');
  expect(textareaElement).toHaveClass('custom-class');
});

test('maneja el cambio de valor en el textarea', () => {
  const props = {
    placeholder: 'Escribe aquí',
    name: 'inputAreaName',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class'
  };

  render(<InputArea {...props} />);

  const textareaElement = screen.getByPlaceholderText('Escribe aquí');
  fireEvent.change(textareaElement, { target: { value: 'Nuevo valor' } });

  expect(props.onChange).toHaveBeenCalledWith('Nuevo valor');
});