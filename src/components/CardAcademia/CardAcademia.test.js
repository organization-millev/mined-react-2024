import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CardAcademia from './CardAcademia';

// Mock para el hook useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key, // Retorna la clave como texto traducido
  }),
}));

describe('CardAcademia Component', () => {
  const mockProps = {
    isEnabled: true,
    subtitle: 'Sample Subtitle',
    logo: 'https://example.com/logo.png',
    academiaLogo: 'https://example.com/academia-logo.png',
    fondoComprado: 'https://example.com/fondo-comprado.png',
    fondoNoComprado: 'https://example.com/fondo-no-comprado.png',
    id: 'academy-id',
    formatForURL: (id) => id.replace(/\s+/g, '-').toLowerCase(), // Simula el formato para URL
  };

  // Helper para renderizar el componente con Router
  const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test('se renderiza correctamente cuando está habilitado', () => {
    renderWithRouter(<CardAcademia {...mockProps} />);
    // Usa getAllByText para manejar elementos duplicados
    const subtitles = screen.getAllByText(mockProps.subtitle);
    expect(subtitles.length).toBeGreaterThan(0); // Asegúrate de que al menos uno existe
    expect(subtitles[0]).toBeInTheDocument(); // Verifica el primero
  });
  
 
  
});
