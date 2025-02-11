import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Geolocation from './Geolocation'; // Ruta de tu componente


// Simula la API de geolocalización
global.navigator.geolocation = {
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
};

describe('Geolocation component', () => {
  afterEach(cleanup); // Limpia el DOM después de cada prueba

  test('debe llamar a onLocation con las coordenadas correctas cuando la geolocalización se obtiene correctamente', () => {
    const mockOnLocation = jest.fn();
    
    // Simula una respuesta de geolocalización exitosa
    const mockPosition = { coords: { latitude: 40.7128, longitude: -74.0060 } };
    navigator.geolocation.watchPosition.mockImplementationOnce((success) => success(mockPosition));
    
    // Renderiza el componente
    render(<Geolocation onLocation={mockOnLocation} />);
    
    // Verifica que la función onLocation haya sido llamada con las coordenadas correctas
    expect(mockOnLocation).toHaveBeenCalledWith(mockPosition.coords);
  });

  test('debe manejar el error al obtener la geolocalización', () => {
    const mockOnLocation = jest.fn();
    
    // Simula una respuesta de error
    const mockError = { code: 1, message: 'Permission denied' };
    navigator.geolocation.watchPosition.mockImplementationOnce((success, error) => error(mockError));
    
    // Renderiza el componente
    render(<Geolocation onLocation={mockOnLocation} />);
    
    // Verifica que el error se haya registrado correctamente
    expect(console.error).toHaveBeenCalledWith('Error al obtener la geolocalización:', mockError);
  });
});
