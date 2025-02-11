import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const chevron_left_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/chevron_left_dark.svg" 
        alt="Icono Flecha Izq dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default chevron_left_dark ;