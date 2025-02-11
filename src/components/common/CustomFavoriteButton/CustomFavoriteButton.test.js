import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomFavoriteButton from './CustomFavoriteButton';

const EmptyIcon = () => <div data-testid="empty-icon">Empty</div>;
const FilledIcon = () => <div data-testid="filled-icon">Filled</div>;

test('renderiza el botón de favorito con el icono vacío inicialmente', () => {
  const props = {
    isOn: false,
    emptyIcon: EmptyIcon,
    filledIcon: FilledIcon
  };

  render(<CustomFavoriteButton {...props} />);

  expect(screen.getByTestId('empty-icon')).toBeTruthy();
});

test('cambia el icono al hacer clic en el botón de favorito', async () => {
  const props = {
    isOn: false,
    emptyIcon: EmptyIcon,
    filledIcon: FilledIcon
  };

  render(<CustomFavoriteButton {...props} />);

  const buttonElement = screen.getByTestId('empty-icon');
  fireEvent.click(buttonElement);

  
});