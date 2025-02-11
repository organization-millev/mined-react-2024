import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  folder_notificaciones_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/folder_notificaciones_dark.svg" 
        alt="Icono folder notificaciones dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default folder_notificaciones_dark ;


