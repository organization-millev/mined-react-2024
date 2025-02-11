import React from 'react';
import { render, screen } from '@testing-library/react';
import BannerStatic from './BannerStatic';

describe('BannerStatic Component', () => {
  const contenidoBanner = [
    {
      program_id: '1',
      bannerUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      logoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      name: 'Program 1',
      subtitle: 'Subtitle 1',
      slogan: 'Slogan 1'
    },
    {
      program_id: '2',
      bannerUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      logoUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      name: 'Program 2',
      subtitle: 'Subtitle 2',
      slogan: 'Slogan 2'
    }
  ];

  test('se renderiza sin fallos', () => {
    render(<BannerStatic contenidoBanner={contenidoBanner} />);
  });

  test('renderiza los banners', () => {
    render(<BannerStatic contenidoBanner={contenidoBanner} />);
    contenidoBanner.forEach((obj) => {
      const banner = screen.getByAltText(obj.name).closest('div');
    });
  });

  test('renderiza los logos con los atributos src correctos', () => {
    render(<BannerStatic contenidoBanner={contenidoBanner} />);
    contenidoBanner.forEach((obj) => {
      const logo = screen.getByAltText(obj.name);
      expect(logo).toHaveAttribute('src', obj.logoUrl);
    });
  });

  test('renderiza los subtítulos o eslóganes correctamente según el prop useSubtitle', () => {
    const { rerender } = render(<BannerStatic contenidoBanner={contenidoBanner} useSubtitle={true} />);
    contenidoBanner.forEach((obj) => {
      expect(screen.getByText(obj.subtitle)).toBeInTheDocument();
    });

    rerender(<BannerStatic contenidoBanner={contenidoBanner} useSubtitle={false} />);
    contenidoBanner.forEach((obj) => {
      expect(screen.getByText(obj.slogan)).toBeInTheDocument();
    });
  });
});