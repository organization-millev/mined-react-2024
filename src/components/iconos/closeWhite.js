import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const close_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/close_white.svg" 
        alt="Icono Cerrar Blanco"
        width="24"
        height="24"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default close_white;