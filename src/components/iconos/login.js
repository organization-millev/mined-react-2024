import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  login  = ({ className, onClick,padding,width,height }) => (
  <SvgIcon 
        src="/assets/iconos/login.svg" 
        alt="Icono Login  "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default login ;