import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bid_landscape  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bid_landscape.svg" 
        alt="Icono Landscape"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bid_landscape ;