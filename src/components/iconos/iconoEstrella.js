import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  iconoEstrella  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/estrella.svg" 
        alt="Icono Estrella"
        width="36"
        height="36"
        className={className}
        onClick={onClick}
      />
);

export default iconoEstrella ;