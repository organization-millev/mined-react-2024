import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bookmarkLoader  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/loader.svg" 
        alt="Icono No Guardado"
        padding="0"
        width="40"
        height="40"
        className={`animate-spin ${className}`}  // Agregar animate-spin para la rotación continua
        onClick={onClick}
      />
);

export default bookmarkLoader ;