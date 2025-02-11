import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  responder_flecha  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/responder_flecha.svg" 
        alt="Icono de responder"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default responder_flecha ;


