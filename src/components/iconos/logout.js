import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  logout  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/logout.svg" 
        alt="Icono Cerrar Sesion  "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default logout ;