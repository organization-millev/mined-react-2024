import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  estrella_oro  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/estrella_oro.svg" 
        alt="Icono estrella color oro"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default estrella_oro;