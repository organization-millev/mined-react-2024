import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  zoom_in_map  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/zoom_in_map.svg" 
        alt="Icono Ampliar Mapa "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default zoom_in_map ;


