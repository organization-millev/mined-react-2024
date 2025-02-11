import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const check  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/check.svg" 
        alt="Icono Check "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default check ;