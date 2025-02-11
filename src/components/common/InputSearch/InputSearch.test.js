import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from './InputSearch';

test('renderiza el componente InputSearch con las props proporcionadas', () => {
  const props = {
    placeholder: 'Buscar...',
    name: 'searchInput',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class',
    iconType: 'search',
    placeholderColor: 'placeholder-gris-azulado-profundo',
    iconPosition: 'right',
    results: [],
    onResultClick: jest.fn()
  };

  render(<InputSearch {...props} />);

  const inputElement = screen.getByPlaceholderText('Buscar...');
  expect(inputElement).toBeTruthy();
  expect(inputElement).toHaveAttribute('name', 'searchInput');
  expect(inputElement).toHaveClass('custom-class');
});

test('maneja el cambio de valor en el input de búsqueda', () => {
  const props = {
    placeholder: 'Buscar...',
    name: 'searchInput',
    value: '',
    onChange: jest.fn(),
    className: 'custom-class',
    iconType: 'search',
    placeholderColor: 'placeholder-gris-azulado-profundo',
    iconPosition: 'right',
    results: [],
    onResultClick: jest.fn()
  };

  render(<InputSearch {...props} />);

  const inputElement = screen.getByPlaceholderText('Buscar...');
  fireEvent.change(inputElement, { target: { value: 'Nuevo valor' } });

  expect(props.onChange).toHaveBeenCalledWith(expect.any(Object));

});