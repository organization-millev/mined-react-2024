import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardReel from './CardReel';

describe('CardReel Component', () => {
    const mockOpenModal = jest.fn();
    const mockProps = {
        url_ImagenFondo_Reel: 'https://example.com/image.jpg',
        tiempo: '2:30',
        tituloReel: 'Sample Reel',
        videoReel: 'https://example.com/video.mp4',
        openModal: mockOpenModal,
    };

    // Test para verificar que el componente se renderiza sin fallos
    test('se renderiza sin fallos', () => {
        render(<CardReel {...mockProps} />);
    });


    // Test para verificar que el tiempo se muestra correctamente
    test('el tiempo se muestra correctamente', () => {
        render(<CardReel {...mockProps} />);
        const tiempo = screen.getByText(mockProps.tiempo);
        expect(tiempo).toBeInTheDocument();
    });

    // Test para verificar que el título se muestra correctamente
    test('el título se muestra correctamente', () => {
        render(<CardReel {...mockProps} />);
        const titulo = screen.getByText(mockProps.tituloReel);
        expect(titulo).toBeInTheDocument();
    });

   
});