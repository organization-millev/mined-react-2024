import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Facebook__filled  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Facebook__filled.svg" 
        alt="Icono Facebook Oscuro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Facebook__filled ;