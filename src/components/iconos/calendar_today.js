import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const calendar_today  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/calendar_today.svg" 
        alt="Icono Calendario"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default calendar_today ;