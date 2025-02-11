import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_circle_up  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_circle_up.svg" 
        alt="Icono Flecha Arriba Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default arrow_circle_up ;