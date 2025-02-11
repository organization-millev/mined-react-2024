import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  event_available  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/event_available.svg" 
        alt="Icono Evento Disponible"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default event_available ;