import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Componente Loader', () => {
  test('se renderiza correctamente', () => {
    render(<Loader />);

    // Verifica que se renderiza el contenedor principal con clases específicas
    const loaderContainer = screen.getByText((_, element) =>
      element.className.includes('relative min-h-screen flex justify-center items-center')
    );
    expect(loaderContainer).toBeInTheDocument();

    // Verifica que se renderizan las imágenes principales
    const darkLogo = screen.getByAltText('Logo Mined');
    expect(darkLogo).toBeInTheDocument();

    // Verifica que existe la barra de progreso
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  test('verifica las clases CSS del contenedor y la barra de progreso', () => {
    render(<Loader />);

    // Verifica que el contenedor tiene las clases principales
    const container = document.querySelector('.relative.min-h-screen.flex.justify-center.items-center');
    expect(container).toBeInTheDocument();

    // Verifica que la barra de progreso tiene la clase correcta
    const progressBar = document.querySelector('.progress-bar');
    expect(progressBar).toHaveClass('h-[5px] bg-gris-azulado-profundo dark:bg-white rounded');
  });
});
