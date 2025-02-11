import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // Asegúrate de que la ruta sea correcta

test("debe renderizar el componente Footer con los enlaces y textos correctamente", () => {
  const { getByText, getByAltText } = render(
    <I18nextProvider i18n={i18n}>
      <Footer />
    </I18nextProvider>
  );

  
});