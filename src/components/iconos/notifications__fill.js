import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  notifications__fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/notifications__fill.svg" 
        alt="Icono Notification Oscuro"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default notifications__fill ;


