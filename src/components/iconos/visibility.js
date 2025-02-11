import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  visibility  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/visibility.svg" 
        alt="Icono Visible"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default visibility ;


