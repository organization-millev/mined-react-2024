import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomSaberMas from './CustomSaberMas';

test('renderiza el botón con el texto proporcionado', () => {
  const props = {
    text: 'Saber más',
    onClick: jest.fn()
  };

  render(<CustomSaberMas {...props} />);

  const buttonElement = screen.getByText('Saber más');
  expect(buttonElement).toBeTruthy();
});

test('maneja el clic en el botón', () => {
  const props = {
    text: 'Saber más',
    onClick: jest.fn()
  };

  render(<CustomSaberMas {...props} />);

  const buttonElement = screen.getByText('Saber más');
  fireEvent.click(buttonElement);

  expect(props.onClick).toHaveBeenCalled();
});