import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  grid_view  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/grid_view.svg" 
        alt="Icono Vista en Cuadrícula"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default grid_view ;