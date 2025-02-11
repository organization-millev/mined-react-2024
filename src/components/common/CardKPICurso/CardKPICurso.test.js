import React from 'react';
import { render, screen } from '@testing-library/react';
import CardKPICurso from './CardKPICurso';

// Test básico para verificar que el componente se renderiza correctamente
test('debe renderizar el componente CardKPICurso correctamente', () => {
    // Datos de prueba
    const items = [
        { title: 'Título 1', description: 'Descripción 1' },
        { title: 'Título 2', description: 'Descripción 2' },
        { title: 'Título 3', description: 'Descripción 3' },
        { title: 'Título 4', description: 'Descripción 4' },
        { title: 'Título 5', description: 'Descripción 5' },
        { title: 'Título 6', description: 'Descripción 6' }
    ];

    // Renderiza el componente
    render(<CardKPICurso items={items} />);

    // Verifica que los elementos se renderizan correctamente
    items.slice(0, 5).forEach(item => {
        const titleElement = screen.getByText(new RegExp(item.title, 'i'));
        const descriptionElement = screen.getByText(new RegExp(item.description, 'i'));

        expect(titleElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });
});

// Test para verificar que no se renderiza nada si no hay elementos válidos
test('no debe renderizar nada si no hay elementos válidos', () => {
    // Datos de prueba sin elementos válidos
    const items = [
        { title: '', description: '' },
        { title: '', description: '' }
    ];

    // Renderiza el componente
    const { container } = render(<CardKPICurso items={items} />);

    // Verifica que el componente no renderiza nada
    expect(container.firstChild).toBeNull();
});