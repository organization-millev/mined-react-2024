import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  like_plata  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/like_plata.svg" 
        alt="Icono like color plata"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default like_plata ;