import React from 'react';
import { render, screen } from '@testing-library/react';
import CardDescription from './CardDescription';

test('debe renderizar el componente CardDescription correctamente', () => {
    const mockProps = {
        nombreAcademia: 'Academia de Matemáticas',
        descriptionAcademy: 'Una descripción detallada de la academia de matemáticas.',
    };

    // Renderiza el componente con las propiedades de prueba
    render(<CardDescription {...mockProps} />);

    // Verifica que el nombre de la academia se renderiza correctamente
    const nombreElemento = screen.getByText(mockProps.nombreAcademia);
    expect(nombreElemento).toBeInTheDocument();

    // Verifica que la descripción de la academia se renderiza correctamente
    const descripcionElemento = screen.getByText(mockProps.descriptionAcademy);
    expect(descripcionElemento).toBeInTheDocument();
});
