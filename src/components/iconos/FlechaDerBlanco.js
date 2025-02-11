import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  FlechaDerBlanco  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/FlechaDerBlanco.svg" 
        alt="Icono Flecha Derecha Blanco"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default FlechaDerBlanco ;