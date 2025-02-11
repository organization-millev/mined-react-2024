import React from 'react';
import { render, screen } from '@testing-library/react';
import ClassEventCard from './ClassEventCard';

test('renderiza el componente ClassEventCard correctamente con múltiples eventos', () => {
  const events = [
    { icon: <span>🎓</span>, hour: '10:00 AM', title: 'Clase de Matemáticas' },
    { icon: <span>📚</span>, hour: '11:00 AM', title: 'Clase de Historia' }
  ];

  render(<ClassEventCard events={events} />);

  // Verifica que los títulos y horarios de los eventos estén presentes
  expect(screen.getByText('Clase de Matemáticas')).toBeInTheDocument();
  expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  expect(screen.getByText('Clase de Historia')).toBeInTheDocument();
  expect(screen.getByText('11:00 AM')).toBeInTheDocument();

  // Verifica que los íconos estén presentes
  expect(screen.getByText('🎓')).toBeInTheDocument();
  expect(screen.getByText('📚')).toBeInTheDocument();
});

test('renderiza el componente ClassEventCard correctamente con un solo evento', () => {
  const events = [
    { icon: <span>🎓</span>, hour: '10:00 AM', title: 'Clase de Física' }
  ];

  render(<ClassEventCard events={events} />);

  // Verifica que el título y horario del evento único estén presentes
  expect(screen.getByText('Clase de Física')).toBeInTheDocument();
  expect(screen.getByText('10:00 AM')).toBeInTheDocument();

  // Verifica que el ícono esté presente
  expect(screen.getByText('🎓')).toBeInTheDocument();
});

test('renderiza el componente ClassEventCard sin eventos', () => {
  const events = [];

  render(<ClassEventCard events={events} />);

  // Verifica que no haya eventos renderizados
  expect(screen.queryByText(/Clase/)).toBeNull();
  expect(screen.queryByText(/AM/)).toBeNull();
});
