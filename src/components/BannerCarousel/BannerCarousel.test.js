import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BannerCarousel from './BannerCarousel';
import { I18nextProvider } from 'react-i18next';


describe('BannerCarousel Component', () => {
  const banners = [
    {
      src: '/path/to/image1.jpg',
      alt: 'Banner 1',
      empresa: 'Empresa 1',
      titulo: 'Titulo 1',
      descripcion: 'Descripcion 1',
      enlace: 'https://example.com/1'
    },
    {
      src: '/path/to/image2.jpg',
      alt: 'Banner 2',
      empresa: 'Empresa 2',
      titulo: 'Titulo 2',
      descripcion: 'Descripcion 2',
      enlace: 'https://example.com/2'
    }
  ];

  test('se renderiza sin fallos', () => {
    render(
        <BannerCarousel banners={banners} />
    );
  });

});