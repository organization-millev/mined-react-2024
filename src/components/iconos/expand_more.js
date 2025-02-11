import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  expand_more  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/expand_more.svg" 
        alt="Icono Expandir Mas"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default expand_more ;