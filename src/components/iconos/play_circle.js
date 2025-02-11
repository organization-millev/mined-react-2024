import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  play_circle  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/play_circle.svg" 
        alt="Icono Play Circulo "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default play_circle ;


