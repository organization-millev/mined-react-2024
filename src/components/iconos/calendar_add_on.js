import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const calendar_add_on  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/calendar_add_on.svg" 
        alt="Icono Agregar Calendario"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default calendar_add_on ;