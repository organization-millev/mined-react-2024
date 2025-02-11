import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AvatarGrid from './AvatarGrid';

describe('AvatarGrid Component', () => {
    const mockAvatars = [
        { idAvatar: 1, iconoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', nombre: 'Avatar 1', estado: 'activo' },
        { idAvatar: 2, iconoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', nombre: 'Avatar 2', estado: 'activo' },
        { idAvatar: 3, iconoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', nombre: 'Avatar 3', estado: 'inactivo' },
    ];
    const mockOnSubmitAvatar = jest.fn();

    // Test para verificar que el componente se renderiza sin fallos
    test('renders without crashing', () => {
        render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
    });

    // Test para verificar que al hacer clic en un avatar se llama a onSubmitAvatar con el id correcto
    test('clicking an avatar calls onSubmitAvatar with correct id', () => {
        render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        const avatarItems = screen.getAllByRole('img');
        fireEvent.click(avatarItems[0]);
        expect(mockOnSubmitAvatar).toHaveBeenCalledWith(1);
    });

    // Test para verificar que los avatares inactivos no son clicables
    test('los avatares inactivos no son clicables', () => {
        render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        const avatarItems = screen.getAllByRole('img');
        fireEvent.click(avatarItems[2]);
        expect(mockOnSubmitAvatar).not.toHaveBeenCalledWith(3);
    });

    // Test para verificar que el avatar seleccionado tiene la clase correcta
    test('el avatar seleccionado tiene la clase correcta', () => {
        render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        const avatarItems = screen.getAllByRole('img');
        expect(avatarItems[0].parentElement).toHaveClass('border-[5px] border-gris-oscuro');
    });

    // Test para verificar que cambiar currectAvatarId actualiza el avatar seleccionado
    test('cambiar currectAvatarId actualiza el avatar seleccionado', () => {
        const { rerender } = render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        rerender(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={2} />);
        const avatarItems = screen.getAllByRole('img');
        expect(avatarItems[1].parentElement).toHaveClass('border-[5px] border-gris-oscuro');
    });

    // Test para verificar que se renderiza correctamente sin avatares
    test('se renderiza correctamente sin avatares', () => {
        render(<AvatarGrid avatarIcon={[]} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        const avatarItems = screen.queryAllByRole('img');
        expect(avatarItems.length).toBe(0);
    });

    // Test para verificar que al hacer clic en un avatar activo se actualiza el estado seleccionado
    test('al hacer clic en un avatar activo se actualiza el estado seleccionado', () => {
        render(<AvatarGrid avatarIcon={mockAvatars} onSubmitAvatar={mockOnSubmitAvatar} currectAvatarId={1} />);
        const avatarItems = screen.getAllByRole('img');
        fireEvent.click(avatarItems[1]);
        expect(mockOnSubmitAvatar).toHaveBeenCalledWith(2);
        expect(avatarItems[1].parentElement).toHaveClass('border-[5px] border-gris-oscuro');
    });

});