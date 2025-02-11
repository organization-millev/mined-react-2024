import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  schedule  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/schedule.svg" 
        alt="Icono Cronograma"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default schedule ;


