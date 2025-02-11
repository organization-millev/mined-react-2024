import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  skip_previous_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/skip_previous_dark.svg" 
        alt="Icono previous dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default skip_previous_dark ;


