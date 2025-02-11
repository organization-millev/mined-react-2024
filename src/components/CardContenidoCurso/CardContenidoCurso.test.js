import React from 'react';
import { render, screen } from '@testing-library/react';
import ContenidoCurso from './CardContenidoCurso';

// Mock de los íconos para evitar problemas al renderizar SVGs
jest.mock('../iconos/calendar_today.js', () => () => <svg data-testid="calendar-icon" />);
jest.mock('../iconos/circle_orange.js', () => () => <svg data-testid="circle-icon" />);

describe('ContenidoCurso Component', () => {
  test('se renderiza correctamente', () => {
    render(<ContenidoCurso />);
    
    // Verifica que se renderizan 5 cursos (basado en la cantidad de datos)
    const cursos = screen.getAllByRole('img', { name: /profile/i });
    expect(cursos).toHaveLength(5);
  });

  test('cada curso muestra el nombre de la clase', () => {
    render(<ContenidoCurso />);

    // Verifica que se muestran todos los nombres de las clases
    const clases = [
      'Nombre de la clase 1',
      'Nombre de la clase 2',
      'Nombre de la clase 3',
      'Nombre de la clase 4',
      'Nombre de la clase 5',
    ];
    clases.forEach((nombre) => {
      expect(screen.getByText(nombre)).toBeInTheDocument();
    });
  });

  test('cada curso muestra el nombre del educador', () => {
    render(<ContenidoCurso />);

    // Verifica que se muestran los nombres de los educadores
    const educadores = ['Alexandra Laguna', 'Juan Pérez'];
    educadores.forEach((educador) => {
      expect(screen.getAllByText(educador).length).toBeGreaterThan(0);
    });
  });

  test('cada curso muestra la fecha correctamente', () => {
    render(<ContenidoCurso />);

    // Verifica que las fechas están presentes
    const fechas = ['12/06/23', '15/06/23'];
    fechas.forEach((fecha) => {
      expect(screen.getAllByText(fecha).length).toBeGreaterThan(0);
    });
  });

  test('muestra los íconos correctamente', () => {
    render(<ContenidoCurso />);

    // Verifica que el ícono del calendario está presente en cada curso
    const calendarIcons = screen.getAllByTestId('calendar-icon');
    expect(calendarIcons).toHaveLength(5);

    // Verifica que el ícono del círculo está presente en cada curso
    const circleIcons = screen.getAllByTestId('circle-icon');
    expect(circleIcons).toHaveLength(5);
  });
});
