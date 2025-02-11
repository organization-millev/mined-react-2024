import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  info  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/info.svg" 
        alt="Icono Info"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default info ;