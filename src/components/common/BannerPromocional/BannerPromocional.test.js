import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import BannerPromocional from './BannerPromocional';

describe('BannerPromocional Component', () => {
    const mockBoton = jest.fn();
    const props = {
        titulo: 'Promoción Especial',
        precio: '€100',
        precioTachado: '{"ES":"€150"}',
        descripcion: 'Descripción de la promoción',
        img: '/path/to/image.jpg',
        boton: mockBoton,
        cargando: false
    };

    test('se renderiza sin fallos', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BannerPromocional {...props} />
            </I18nextProvider>
        );
    });

    test('renderiza el título, precio y descripción correctamente', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BannerPromocional {...props} />
            </I18nextProvider>
        );
        expect(screen.getByText(props.titulo)).toBeInTheDocument();
        expect(screen.getByText(props.precio)).toBeInTheDocument();
        expect(screen.getByText('€150')).toBeInTheDocument();
        expect(screen.getByText(props.descripcion)).toBeInTheDocument();
    });


    test('renderiza la imagen con el atributo src correcto', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BannerPromocional {...props} />
            </I18nextProvider>
        );
        const img = screen.getByRole('img');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', props.img);
    });
});