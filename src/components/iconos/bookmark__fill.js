import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bookmark__fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bookmark__fill.svg" 
        alt="Icono de Guardado"
        padding="0"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bookmark__fill ;