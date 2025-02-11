import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  iconoEstrellaFondo  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/estrellaFondo.svg" 
        alt="Icono estrella con fondo"
        width="36"
        height="36"
        className={className}
        onClick={onClick}
      />
);

export default iconoEstrellaFondo ;