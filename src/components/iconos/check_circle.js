import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const check_circle  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/check_circle.svg" 
        alt="Icono Check Circulo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default check_circle ;