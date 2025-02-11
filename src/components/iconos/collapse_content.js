import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const collapse_content  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/collapse_content.svg" 
        alt="Icono Collapse Content"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default collapse_content ;