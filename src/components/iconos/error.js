import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  error  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/error.svg" 
        alt="Icono Error"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default error ;