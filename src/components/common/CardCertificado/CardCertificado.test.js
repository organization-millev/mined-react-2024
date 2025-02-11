import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardCertificado from './CardCertificado';

// Test básico para verificar que el componente se renderiza correctamente
test('debe renderizar el componente CardCertificado correctamente', () => {
    // Datos de prueba
    const props = {
        isEnabled: true,
        titulo: 'Certificado de prueba',
        url: 'https://example.com/certificado.pdf',
        handleDownload: jest.fn(),
        cert_fondo: 'https://example.com/image.jpg',
        cargando: false
    };

    // Renderiza el componente
    render(<CardCertificado {...props} />);

    // Busca el texto esperado en el documento
    const tituloElemento = screen.getByText(/Certificado de prueba/i);

    // Verifica que el texto esté presente en el documento
    expect(tituloElemento).toBeInTheDocument();
});

// Test para verificar que el botón de descarga funciona correctamente
test('debe llamar a handleDownload al hacer clic en el botón de descarga', () => {
    // Datos de prueba
    const props = {
        isEnabled: true,
        titulo: 'Certificado de prueba',
        url: 'https://example.com/certificado.pdf',
        handleDownload: jest.fn(),
        cert_fondo: 'https://example.com/image.jpg',
        cargando: false
    };

    // Renderiza el componente
    render(<CardCertificado {...props} />);

    // Busca el botón de descarga y simula un clic
    const botonDescarga = screen.getByRole('button');
    fireEvent.click(botonDescarga);

    // Verifica que la función handleDownload haya sido llamada
    expect(props.handleDownload).toHaveBeenCalled();
});