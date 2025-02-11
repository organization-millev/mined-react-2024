import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  help_fill  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/help_fill.svg" 
        alt="Icono Ayuda Negrito"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default help_fill ;