import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_circle_left  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_circle_left.svg" 
        alt="Icono Flecha Izq Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_circle_left ;