import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  menu  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/menu.svg" 
        alt="Icono Menu "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default menu ;