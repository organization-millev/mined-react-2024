import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  skip_previous_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/skip_previous_blanco.svg" 
        alt="Icono Saltar Blanco  "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default skip_previous_blanco ;


