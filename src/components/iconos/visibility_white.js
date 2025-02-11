import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  visibility_white  = ({ className, onClick,padding }) => (
  <SvgIcon 
        src="/assets/iconos/visibility_white.svg" 
        alt="Icono Visible Blanco"
        width="40"
        height="40"
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default visibility_white ;


