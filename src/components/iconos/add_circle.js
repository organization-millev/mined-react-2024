import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const add_circle  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/add_circle.svg" 
        alt="Icono Agregar Circular"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default add_circle ;