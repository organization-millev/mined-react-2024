import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  star  = ({ className, padding = "8px", onClick }) => (
  <SvgIcon 
        src="/assets/iconos/star.svg" 
        alt="Icono Estrella  "
        width="40"
        height="40"
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default star ;


