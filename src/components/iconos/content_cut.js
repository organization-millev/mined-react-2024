import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const content_cut  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/content_cut.svg" 
        alt="Icono Tijera"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default content_cut ;