import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  estrella_star_fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/estrella_star_fill.svg" 
        alt="Icono Estrella fill"
        width="36"
        height="36"
        className={className}
        onClick={onClick}
      />
);

export default estrella_star_fill ;