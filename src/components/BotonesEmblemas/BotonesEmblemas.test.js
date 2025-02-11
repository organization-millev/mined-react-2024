import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BotonesEmblemas from './BotonesEmblemas';

describe('BotonesEmblemas Component', () => {
  const mockTitulos = [
    { idTitulo: 1, nombre: 'Titulo 1', estado: 'activo', estadoSeleccionado: false },
    { idTitulo: 2, nombre: 'Titulo 2', estado: 'activo', estadoSeleccionado: true },
    { idTitulo: 3, nombre: 'Titulo 3', estado: 'inactivo', estadoSeleccionado: false },
  ];
  const mockOnSelect = jest.fn();

  // Test para verificar que el componente se renderiza sin fallos
  test('se renderiza sin fallos', () => {
    render(<BotonesEmblemas titulos={mockTitulos} onSelect={mockOnSelect} />);
  });

  // Test para verificar que los botones se renderizan correctamente según su estado
  test('los botones se renderizan correctamente según su estado', () => {
    render(<BotonesEmblemas titulos={mockTitulos} onSelect={mockOnSelect} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(buttons[0]).toHaveClass('bg-gris-carbón');
    expect(buttons[1]).toHaveClass('bg-gris-carbón');
    expect(buttons[2]).toHaveClass('bg-gris-medio');
  });


  // Test para verificar la selección inicial basada en estadoSeleccionado
  test('selección inicial basada en estadoSeleccionado', () => {
    render(<BotonesEmblemas titulos={mockTitulos} onSelect={mockOnSelect} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[1]).toHaveClass('border-gris-azulado-profundo border-2');
  });
});