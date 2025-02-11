import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_back  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_back.svg" 
        alt="Icono Flecha izq"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_back ;