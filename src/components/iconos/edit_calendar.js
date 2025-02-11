import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  edit_calendar  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/edit_calendar.svg" 
        alt="Icono Editar Calendario"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default edit_calendar ;