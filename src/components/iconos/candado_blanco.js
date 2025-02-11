import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  candado_blanco  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/candado_blanco.svg" 
        alt="Icono Candado Blanco"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default candado_blanco ;


