import React from 'react';
import { render } from '@testing-library/react';
import ItemEducador from './ItemEducador';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // Asegúrate de que la ruta sea correcta

test("debe renderizar el componente ItemEducador con el texto y la imagen correctamente", () => {
  const { getByText, getByAltText } = render(
    <I18nextProvider i18n={i18n}>
      <ItemEducador 
        titulo_item_educador="titulo-clase" 
        contenedor_imagen="contenedor-imagen" 
        url_EducadorImagen="https://example.com/imagen.jpg" 
        imagen_fondo_educador="imagen-fondo" 
        button_clases_item_educador="boton-clases"
      />
    </I18nextProvider>
  );


  expect(getByAltText('perfil educador')).toBeInTheDocument();
  
});