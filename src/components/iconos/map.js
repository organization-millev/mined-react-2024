import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  map  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/map.svg" 
        alt="Icono Mapa "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default map ;