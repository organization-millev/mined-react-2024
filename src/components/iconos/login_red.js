import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  login_red  = ({ className, onClick,padding,width,height }) => (
  <SvgIcon 
        src="/assets/iconos/login_red.svg" 
        alt="Icono Login Rojo"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default login_red ;