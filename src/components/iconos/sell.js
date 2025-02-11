import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  sell  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/sell.svg" 
        alt="Icono Venta"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default sell ;


