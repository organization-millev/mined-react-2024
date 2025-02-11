import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalificacionEstrellas from './CalificacionEstrellas';

describe('CalificacionEstrellas Component', () => {
    const mockOnRatingChange = jest.fn();

    // Test para verificar que el componente se renderiza sin fallos
    test('se renderiza sin fallos', () => {
        render(<CalificacionEstrellas rating={0} onRatingChange={mockOnRatingChange} />);
    });

});