import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  TwitterX  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/TwitterX.svg" 
        alt="Icono TwitterX Claro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default TwitterX ;


