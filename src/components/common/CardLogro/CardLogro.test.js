import React from 'react';
import { render, screen } from '@testing-library/react';
import CardLogro from './CardLogro';
import { useTranslation } from 'react-i18next';

// Mock de useTranslation para pruebas
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Devuelve la clave directamente
  }),
}));

test('debe renderizar correctamente el componente CardLogro con los datos proporcionados', () => {
  const mockAchievement = {
    iconUrl: '/path/to/icon.png',
    iconName: 'Logro Ícono',
    points: 100,
    progress: 0.8, // 80%
    courseName: 'Curso de Matemáticas',
    languageCourse: 'ES',
    translationDescription: 'Descripción del logro',
    currentClasses: 8,
    targetClasses: 10,
  };

  const mockCurrentClasses = 6;

  // Renderizar el componente con datos simulados
  render(<CardLogro achievement={mockAchievement} currentClasses={mockCurrentClasses} />);

  // Validar que el ícono se renderiza correctamente
  const iconElement = screen.getByAltText(mockAchievement.iconName);
  expect(iconElement).toBeInTheDocument();
  expect(iconElement).toHaveAttribute('src', mockAchievement.iconUrl);

  // Validar que los puntos se muestran correctamente
  const pointsElement = screen.getByText(`${mockAchievement.points} puntos`);
  expect(pointsElement).toBeInTheDocument();

  // Validar que el nombre del curso y el idioma se muestran correctamente usando una expresión regular
  const courseRegex = new RegExp(`${mockAchievement.courseName}\\s*\\(${mockAchievement.languageCourse}\\)`);
  const courseElement = screen.getByText(courseRegex);
  expect(courseElement).toBeInTheDocument();

  // Validar que la descripción se muestra correctamente
  const descriptionElement = screen.getByText(mockAchievement.translationDescription);
  expect(descriptionElement).toBeInTheDocument();

  // Validar que la barra de progreso tiene el ancho esperado
  const progressBarText = `${mockCurrentClasses}/${mockAchievement.targetClasses} clases`;
  const progressBarElement = screen.getByText(progressBarText);
  expect(progressBarElement).toBeInTheDocument();

  // Validar que la barra de progreso tiene el estilo correcto
  const progressDiv = document.querySelector('.bg-verde-esmeralda');
  expect(progressDiv).toHaveStyle(`width: ${mockAchievement.progress * 100}%`);
});
