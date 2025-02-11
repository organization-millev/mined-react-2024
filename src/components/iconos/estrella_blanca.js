import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  estrella_blanca  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/estrella_blanca.svg" 
        alt="Icono Estrella  blanca"
        width="36"
        height="36"
        className={className}
        onClick={onClick}
      />
);

export default estrella_blanca ;