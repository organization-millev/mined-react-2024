import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  info_fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/info_fill.svg" 
        alt="Icono Info Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default info_fill ;