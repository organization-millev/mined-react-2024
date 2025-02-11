import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  RojoNoSeleccionado  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/RojoNoSeleccionado.svg" 
        alt="Icono Btn Radio no Marcado rojo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default RojoNoSeleccionado ;


