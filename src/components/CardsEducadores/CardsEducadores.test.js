import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsEducadores from './CardsEducadores';

// Mock para `useChannelFavorite`
jest.mock('../../hooks/favorite/useChannelFavorite', () => ({
  useChannelFavorite: () => ({
    guardarChannelFavorite: jest.fn(),
  }),
}));

describe('CardsEducadores Component', () => {
  const mockOnHover = jest.fn();
  const mockProps = {
    file_url: 'https://example.com/image.jpg',
    is_live: true,
    estadoClase: 'activo',
    NombreCurso: 'Curso de Prueba',
    descripcion: 'Descripción del curso',
    instructor_name: 'Instructor de Prueba',
    is_favorite: false,
    isHovered: false,
    onHover: mockOnHover,
    session_description: 'Descripción de la sesión',
    start_time: '2023-01-01T00:00:00Z',
    expected_end_time: '2023-01-01T01:00:00Z',
    files: [],
    channel_id: 1,
  };

  // Test para verificar que el componente se renderiza sin fallos
  test('se renderiza sin fallos', () => {
    render(<CardsEducadores {...mockProps} />);
  });

 
});
