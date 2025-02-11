import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import AvisoLegal from './AvisoLegal';

describe('AvisoLegal Component', () => {
  test('se renderiza sin fallos', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AvisoLegal />
      </I18nextProvider>
    );
  });

  test('renderiza el iframe con los atributos correctos', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AvisoLegal />
      </I18nextProvider>
    );
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('width', '375');
    expect(iframe).toHaveAttribute('height', '164');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/LlxtDbosfrE?autoplay=0&mute=1&controls=0&loop=1&playlist=LlxtDbosfrE&rel=0');
  });
});