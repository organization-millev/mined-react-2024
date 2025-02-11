import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  open_in_new  = ({ className, onClick ,width,height,padding}) => (
  <SvgIcon 
        src="/assets/iconos/open_in_new.svg" 
        alt="Icono Abrir "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default open_in_new ;


