import React from 'react';
import { render } from '@testing-library/react';
import MenuItemNotificaciones from './MenuItemNotificaciones';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n'; // Asegúrate de que la ruta sea correcta

test("debe renderizar el componente MenuItemNotificaciones con la hora de notificación correctamente", () => {
  const { getByText } = render(
    <I18nextProvider i18n={i18n}>
      <MenuItemNotificaciones horaNotificacion="2 horas" />
    </I18nextProvider>
  );
  
});
