import React from 'react';
import { render, screen } from '@testing-library/react';
import CalificacionesRating from './CalificacionesRating';

describe('CalificacionesRating Component', () => {
    const ratingData = [
        { stars: 5, percentage: 80 },
        { stars: 4, percentage: 60 },
        { stars: 3, percentage: 40 },
        { stars: 2, percentage: 20 },
        { stars: 1, percentage: 10 }
    ];

    test('se renderiza sin fallos', () => {
        render(<CalificacionesRating ratingData={ratingData} />);
    });

    test('renderiza las estrellas y porcentajes correctamente', () => {
        render(<CalificacionesRating ratingData={ratingData} />);
        ratingData.forEach(item => {
            expect(screen.getByText(item.stars)).toBeInTheDocument();
            expect(screen.getByText(`${item.percentage}%`)).toBeInTheDocument();
        });
    });

    test('renderiza los componentes StarFill y StarFillBlanca correctamente', () => {
        render(<CalificacionesRating ratingData={ratingData} />);
        expect(screen.getAllByRole('img', { hidden: true }).length).toBe(ratingData.length * 2);
    });
});