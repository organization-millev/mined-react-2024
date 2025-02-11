import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  lapiz_blanco  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/lapiz-blanco.svg" 
        alt="Icono Lapiz Blanco"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default lapiz_blanco ;


