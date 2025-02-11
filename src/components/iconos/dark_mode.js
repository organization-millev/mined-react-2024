import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const dark_mode  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/dark_mode.svg" 
        alt="Icono Modo Oscuro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default dark_mode ;