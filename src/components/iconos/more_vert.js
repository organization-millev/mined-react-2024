import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  more_vert  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/more_vert.svg" 
        alt="Icono Tres Puntos Vertical "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default more_vert ;