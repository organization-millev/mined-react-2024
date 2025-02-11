import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const bookmark_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/bookmark_dark.svg" 
        alt="Icono de Guardado dark"
        padding="0"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default bookmark_dark ;