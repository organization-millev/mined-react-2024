import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmblemList from './EmblemList';

test('renderiza el componente EmblemList con la lista proporcionada', () => {
  const props = {
    onClick: jest.fn(),
    className: 'custom-class',
    lista: [
      { id: 1, titulo: 'Emblema 1', seleccionado: false },
      { id: 2, titulo: 'Emblema 2', seleccionado: true },
      { id: 3, titulo: 'Emblema 3', seleccionado: false }
    ]
  };

  render(<EmblemList {...props} />);

  expect(screen.getByText('Emblema 1')).toBeTruthy();
  expect(screen.getByText('Emblema 2')).toBeTruthy();
  expect(screen.getByText('Emblema 3')).toBeTruthy();

});

test('maneja el clic en un emblema y llama a la función onClick', () => {
  const props = {
    onClick: jest.fn(),
    className: 'custom-class',
    lista: [
      { id: 1, titulo: 'Emblema 1', seleccionado: false },
      { id: 2, titulo: 'Emblema 2', seleccionado: true },
      { id: 3, titulo: 'Emblema 3', seleccionado: false }
    ]
  };

  render(<EmblemList {...props} />);

  const emblemaElement = screen.getByText('Emblema 1');
  fireEvent.click(emblemaElement);

  expect(props.onClick).toHaveBeenCalledWith('1');

});