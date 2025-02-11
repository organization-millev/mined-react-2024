import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  visibility_off  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/visibility_off.svg" 
        alt="Icono No Visible"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default visibility_off ;


