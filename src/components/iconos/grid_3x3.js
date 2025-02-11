import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  grid_3x3  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/grid_3x3.svg" 
        alt="Icono Formato Grid"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default grid_3x3 ;