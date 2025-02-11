import React from 'react';
import { render, screen } from '@testing-library/react';
import WspButton from './WspButton';

describe('Componente WspButton', () => {
  beforeEach(() => {
    // Configura la variable de entorno para la imagen
    process.env.REACT_APP_URL_IMG = 'https://example.com';
  });

  test('se renderiza correctamente', () => {
    render(<WspButton />);

    // Verifica que el enlace tiene el href correcto
    const linkElement = screen.getByRole('link', { name: /WhatsApp Chat/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://wa.me/51936568782');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');

    // Verifica que la imagen del logo se renderiza con el src correcto
    const imageElement = screen.getByAltText('WhatsApp Logo');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'https://example.com/assets/images/LogoWtsp.png');
  });

  test('el enlace tiene estilos correctos', () => {
    render(<WspButton />);

    const linkElement = screen.getByRole('link', { name: /WhatsApp Chat/i });
    expect(linkElement).toHaveStyle({
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      zIndex: '1000',
      backgroundColor: '#5fd568',
    });
  });
});
