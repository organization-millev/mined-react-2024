import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  event_busy  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/event_busy.svg" 
        alt="Icono Evento Ocupado"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default event_busy ;