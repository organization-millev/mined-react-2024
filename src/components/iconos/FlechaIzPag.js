import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  FlechaIzPag  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/FlechaIzPag.svg" 
        alt="Icono Flecha Derecha Blanco"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default FlechaIzPag ;