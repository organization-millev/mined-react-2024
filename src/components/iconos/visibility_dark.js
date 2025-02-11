import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  visibility_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/visibility_dark.svg" 
        alt="Icono Visible dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default visibility_dark ;


