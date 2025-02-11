import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  inventory_2  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/inventory_2.svg" 
        alt="Icono Inventario"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default inventory_2 ;