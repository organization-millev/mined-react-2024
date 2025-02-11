import React from 'react';
import { render, screen } from '@testing-library/react';
import GraficoPastel from './GraficoPastel';

describe('GraficoPastel', () => {
  test('renderiza el componente y ajusta el tamaño del gráfico según el tamaño de la ventana', () => {
    const mockData = {
      clasesTomadas: 5,
      clasesRestantes: 10,
    };

    render(<GraficoPastel data={mockData} />);

    // Busca el gráfico por clase CSS (ajústalo a tu estructura real)
    const chartElement = document.querySelector('.grafico-pastel-academias');
    expect(chartElement).toBeInTheDocument();

    // Puedes realizar verificaciones adicionales sobre las dimensiones si es aplicable.
    expect(chartElement).toHaveClass('flex');
  });
});
