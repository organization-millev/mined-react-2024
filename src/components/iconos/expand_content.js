import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  expand_content  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/expand_content.svg" 
        alt="Icono Expandir Contenido"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default expand_content ;