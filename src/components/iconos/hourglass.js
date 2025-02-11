import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  hourglass  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/hourglass.svg" 
        alt="Icono Reloj Arena"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default hourglass ;