import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const close_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/close_blanco.svg" 
        alt="Icono Cerrar Blanco"
        width="20"
        height="20"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default close_blanco;