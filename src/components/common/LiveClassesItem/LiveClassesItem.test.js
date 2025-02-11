import React from 'react';
import { render, screen } from '@testing-library/react';
import LiveClassesItem from './LiveClassesItem';

describe('LiveClassesItem Component', () => {
    const mockProps = {
        title: 'Clase en vivo',
        name: 'Instructor',
        imageUrl: 'https://example.com/image.jpg',
        statusColor: 'green',
    };

    test('se renderiza sin fallos', () => {
        render(<LiveClassesItem {...mockProps} />);
    });

    test('muestra el título y el nombre correctamente', () => {
        render(<LiveClassesItem {...mockProps} />);

        expect(screen.getByText('Clase en vivo')).toBeInTheDocument();
        expect(screen.getByText('Instructor')).toBeInTheDocument();
    });

    test('muestra la imagen correctamente', () => {
        render(<LiveClassesItem {...mockProps} />);

        const img = screen.getByAltText('Instructor');
        expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

});