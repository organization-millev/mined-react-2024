import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  reloj_dark  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/reloj_dark.svg" 
        alt="Icono Reloj dark"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default reloj_dark ;