import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const checkVerde  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/CheckVerde.svg" 
        alt="Icono Check Verde"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default checkVerde ;