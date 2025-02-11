import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  estrella_plata  = ({ className, onClick,width,height }) => (
  <SvgIcon 
        src="/assets/iconos/estrella_plata.svg" 
        alt="Icono estrella color plata"
        width={width}
        height={height}
        className={className}
        onClick={onClick}
      />
);

export default estrella_plata ;