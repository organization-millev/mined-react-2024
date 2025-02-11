import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  skip_next_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/skip_next_dark.svg" 
        alt="Icono next dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default skip_next_dark ;


