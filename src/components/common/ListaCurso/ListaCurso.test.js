import React from 'react';
import { render, screen } from '@testing-library/react';
import ListaCurso from './ListaCurso';

describe('ListaCurso Component', () => {
  const cursosMock = [
    {
      course_id: 1,
      miniaturaUrl: 'https://example.com/image1.jpg',
      name: 'Curso 1',
      count_modules: 5,
      count_classes: 20,
      total_duration: '10h',
      description: 'Descripción del curso 1',
    },
    {
      course_id: 2,
      miniaturaUrl: 'https://example.com/image2.jpg',
      name: 'Curso 2',
      count_modules: 3,
      count_classes: 15,
      total_duration: '8h',
      description: 'Descripción del curso 2',
    },
  ];

  test('se renderiza sin fallos', () => {
    render(<ListaCurso cursos={cursosMock} />);
  });

  test('muestra el nombre y descripción de los cursos correctamente', () => {
    render(<ListaCurso cursos={cursosMock} />);

    expect(screen.getByText('Curso 1')).toBeInTheDocument();
    expect(screen.getByText('Descripción del curso 1')).toBeInTheDocument();
    expect(screen.getByText('Curso 2')).toBeInTheDocument();
    expect(screen.getByText('Descripción del curso 2')).toBeInTheDocument();
  });

  test('muestra la información de módulos, clases y duración correctamente', () => {
    render(<ListaCurso cursos={cursosMock} />);

    expect(screen.getByText('Módulo 5')).toBeInTheDocument();
    expect(screen.getByText('Clases 20')).toBeInTheDocument();


    expect(screen.getByText('Módulo 3')).toBeInTheDocument();
    expect(screen.getByText('Clases 15')).toBeInTheDocument();

  });

  test('muestra la imagen de miniatura correctamente', () => {
    render(<ListaCurso cursos={cursosMock} />);

    const img1 = screen.getByAltText('Miniatura de Curso 1');
    const img2 = screen.getByAltText('Miniatura de Curso 2');

    expect(img1).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(img2).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });
});