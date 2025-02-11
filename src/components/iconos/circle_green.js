import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const circle_green  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/circle_green.svg" 
        alt="Icono circulo verde"
        width="10"
        height="10"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default circle_green ;