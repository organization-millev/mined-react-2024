import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseRating from './CourseRating';

jest.mock('../../iconos/estrella_star_fill', () => (props) => <div {...props}>★</div>);
jest.mock('../../iconos/estrella_llena_blanca', () => (props) => <div {...props}>☆</div>);
jest.mock('../../iconos/estrella_blanca', () => (props) => <div {...props}>✩</div>);
jest.mock('../../iconos/estrella_star', () => (props) => <div {...props}>✪</div>);

describe('CourseRating', () => {
  test('renderiza el componente con la calificación completa correctamente', () => {
    const props = {
      title: 'React Course',
      rating: 4.5
    };

    render(<CourseRating {...props} />);

    // Verifica que la calificación numérica esté presente
    expect(screen.getByText('4.5')).toBeInTheDocument();

    // Verifica que las estrellas completas se rendericen
    const fullStars = screen.getAllByText('★');
    expect(fullStars.length).toBe(5); // Redondeado hacia el más cercano

    // Verifica que no haya estrellas vacías
    const emptyStars = screen.queryByText('✪');
    expect(emptyStars).toBeNull();
  });

  test('renderiza el componente con calificación parcial correctamente', () => {
    const props = {
      title: 'React Course',
      rating: 3.2
    };

    render(<CourseRating {...props} />);

    // Verifica que la calificación numérica esté presente
    expect(screen.getByText('3.2')).toBeInTheDocument();

    // Verifica que las estrellas completas se rendericen
    const fullStars = screen.getAllByText('★');
    expect(fullStars.length).toBe(3);

    // Verifica que las estrellas vacías se rendericen
    const emptyStars = screen.getAllByText('✪');
    expect(emptyStars.length).toBe(2);
  });

  test('renderiza correctamente con calificación cero', () => {
    const props = {
      title: 'React Course',
      rating: 0
    };

    render(<CourseRating {...props} />);

    // Verifica que la calificación numérica esté presente
    expect(screen.getByText('0.0')).toBeInTheDocument();

    // Verifica que no haya estrellas completas
    const fullStars = screen.queryByText('★');
    expect(fullStars).toBeNull();

    // Verifica que todas las estrellas estén vacías
    const emptyStars = screen.getAllByText('✪');
    expect(emptyStars.length).toBe(5);
  });
});
