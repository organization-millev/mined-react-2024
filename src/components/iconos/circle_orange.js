import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const circleOrange  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/circle_orange.svg" 
        alt="Icono circulo naranja"
        width="10"
        height="10"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default circleOrange ;