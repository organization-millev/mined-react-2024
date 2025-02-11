import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const call  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/call.svg" 
        alt="Icono Telefono"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default call ;