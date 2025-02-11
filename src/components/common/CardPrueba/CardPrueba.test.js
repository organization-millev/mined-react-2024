import React from 'react';
import { render, screen } from '@testing-library/react';
import CardPrueba from './CardPrueba';

test('renderiza el componente CardPrueba con las props proporcionadas', () => {
  const color = 'red';
  const content = 'Descripción en español';

  // Renderizar el componente y obtener el contenedor
  const { container } = render(
    <CardPrueba color={color}>
      {content}
    </CardPrueba>
  );

  // Verificar que el contenido se haya renderizado
  const contentElement = screen.getByText(content);
  expect(contentElement).toBeTruthy();

  // Buscar el div con el estilo de fondo usando querySelector
  const colorElement = container.querySelector(`div[style*="background-color: ${color}"]`);
  expect(colorElement).toBeTruthy();
  expect(colorElement).toHaveStyle(`background-color: ${color}`);
});
