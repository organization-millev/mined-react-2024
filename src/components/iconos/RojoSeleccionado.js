import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  RojoSeleccionado  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/RojoSeleccionado.svg" 
        alt="Icono Btn Radio Marcado rojo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default RojoSeleccionado ;


