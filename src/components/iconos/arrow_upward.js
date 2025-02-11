import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_upward  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_upward.svg" 
        alt="Icono Flecha Arriba "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_upward ;