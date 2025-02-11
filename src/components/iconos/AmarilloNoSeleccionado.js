import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  AmarilloNoSeleccionado  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/AmarilloNoSeleccionado.svg" 
        alt="Icono Btn Radio no Marcado amarillo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default AmarilloNoSeleccionado;


