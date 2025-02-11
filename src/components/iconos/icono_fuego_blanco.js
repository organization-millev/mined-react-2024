import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  icono_fuego_blanco  = ({ className, onClick ,width,height,padding}) => (
  <SvgIcon 
        src="/assets/iconos/icono_fuego_blanco.svg" 
        alt="Icono fuego blanco "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default icono_fuego_blanco ;


