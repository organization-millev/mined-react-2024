import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Facebook  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Facebook.svg" 
        alt="Icono Facebook Claro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Facebook ;