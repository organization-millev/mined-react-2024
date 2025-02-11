import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  ojo_negro  = ({ className, onClick ,width,height,padding}) => (
  <SvgIcon 
        src="/assets/iconos/ojo_negro.svg" 
        alt="Icono ojo negro notificaciones "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default ojo_negro ;


