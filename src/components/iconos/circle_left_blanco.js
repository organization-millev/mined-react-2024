import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const circle_left_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/circle_left_blanco.svg" 
        alt="Icono circulo blanco left"
        width="25"
        height="25"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default circle_left_blanco ;