import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AvatarItem from './AvatarItem';
import LockIcon from '../../iconos/lock';

describe('AvatarItem Component', () => {
    const mockOnClick = jest.fn();

    test('se renderiza sin fallos', () => {
        render(<AvatarItem src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="test" state="activo" onClick={mockOnClick} isSelected={false} />);
    });

    test('llama a onClick cuando se hace clic', () => {
        render(<AvatarItem src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="test" state="activo" onClick={mockOnClick} isSelected={false} />);
        fireEvent.click(screen.getByRole('img').parentElement);
        expect(mockOnClick).toHaveBeenCalled();
    });

});