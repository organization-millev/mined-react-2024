import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  vista_grilla_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/vista_grilla_dark.svg" 
        alt="Icono Vista en Cuadrícula"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default vista_grilla_dark ;