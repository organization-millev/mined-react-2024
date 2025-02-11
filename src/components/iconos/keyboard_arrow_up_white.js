import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  keyboard_arrow_up_white  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/keyboard_arrow_up_white.svg" 
        alt="Icono Flecha Arriba Teclado"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default keyboard_arrow_up_white ;