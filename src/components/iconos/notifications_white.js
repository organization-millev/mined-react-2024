import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  notifications_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/notifications_white.svg" 
        alt="Icono Notification Claro"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default notifications_white ;


