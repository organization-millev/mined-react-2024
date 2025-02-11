import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  FlechaIzPagDark  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/FlechaIzPagDark.svg" 
        alt="Icono Flecha Derecha Blanco dark"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default FlechaIzPagDark ;