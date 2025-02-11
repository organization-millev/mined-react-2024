import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  light_mode  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/light_mode.svg" 
        alt="Icono Modo Claro "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default light_mode ;