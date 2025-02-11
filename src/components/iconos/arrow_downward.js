import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_downward  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_downward.svg" 
        alt="Icono Flecha Abajo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_downward ;