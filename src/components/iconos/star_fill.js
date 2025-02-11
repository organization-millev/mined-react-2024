import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  star_fill  = ({ className, padding = "8px", onClick }) => (
  <SvgIcon 
        src="/assets/iconos/star_fill.svg" 
        alt="Icono Estrella Negrita  "
        width="40"
        height="40"
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default star_fill ;


