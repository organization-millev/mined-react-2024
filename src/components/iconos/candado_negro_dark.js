import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  candado_negro_dark  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/candado_negro_dark.svg" 
        alt="Icono Candado negro modo dark"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default candado_negro_dark ;


