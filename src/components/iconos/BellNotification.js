import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bellNotification  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bell_notification.svg" 
        alt="Icono Campana de Notificacion"
        padding="0"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bellNotification ;