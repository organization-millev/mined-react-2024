import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_circle_right  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_circle_right.svg" 
        alt="Icono Flecha Der Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_circle_right ;