import React from 'react';
import { render, screen } from '@testing-library/react';
import DescripcionClase from './DescripcionClase';

describe('Componente DescripcionClase', () => {
  test('se renderiza correctamente con el título por defecto', () => {
    render(<DescripcionClase />);

    // Verifica que el título por defecto se renderiza
    const titulo = screen.getByText(/En el curso MINED Binarias te enseñaremos a operar/i);
    expect(titulo).toBeInTheDocument();

    // Verifica que el párrafo se renderiza
    const parrafo = screen.getByText(/En este curso aprenderás todo lo necesario para entender y dominar/i);
    expect(parrafo).toBeInTheDocument();
  });

  test('se renderiza correctamente con un título personalizado', () => {
    const tituloPersonalizado = 'Curso personalizado de opciones binarias';
    render(<DescripcionClase tituloClase={tituloPersonalizado} />);

    // Verifica que el título personalizado se renderiza
    const titulo = screen.getByText(tituloPersonalizado);
    expect(titulo).toBeInTheDocument();
  });

  test('verifica que se aplican las clases correctamente', () => {
    render(<DescripcionClase />);

    // Verifica las clases del contenedor principal
    const contenedor = screen.getByText(/En el curso MINED Binarias te enseñaremos a operar/i).parentElement;
    expect(contenedor).toHaveClass('w-full rounded-[16px] border-1 h-auto p-[30px] shadow-lg');

    // Verifica las clases del título
    const titulo = screen.getByText(/En el curso MINED Binarias te enseñaremos a operar/i);
    expect(titulo).toHaveClass('font-sans font-semibold text-xl mb-2');

    // Verifica las clases del párrafo
    const parrafo = screen.getByText(/En este curso aprenderás todo lo necesario para entender y dominar/i);
    expect(parrafo).toHaveClass('max-h-[170px] font-sans text-sm');
  });
});
