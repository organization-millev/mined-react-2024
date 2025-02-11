import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  diamond  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/diamond.svg" 
        alt="Icono Diamante"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default diamond ;