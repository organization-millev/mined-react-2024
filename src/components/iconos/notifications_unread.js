import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  notifications_unread  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/notifications_unread.svg" 
        alt="Icono Notificationes No Leidas"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default notifications_unread ;


