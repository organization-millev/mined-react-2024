import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  pause_circle  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/pause_circle.svg" 
        alt="Icono Pausa Circulo "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default pause_circle ;


