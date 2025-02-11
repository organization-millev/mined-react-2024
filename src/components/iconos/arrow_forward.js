import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const arrow_forward  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/arrow_forward.svg" 
        alt="Icono Flecha Der "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default arrow_forward ;