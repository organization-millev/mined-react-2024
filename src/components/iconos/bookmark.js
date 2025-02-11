import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bookmark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bookmark.svg" 
        alt="Icono No Guardado"
        padding="0"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bookmark ;