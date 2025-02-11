import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  responder_flecha_dark  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/responder_flecha_dark.svg" 
        alt="Icono de responder dark"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default responder_flecha_dark ;


