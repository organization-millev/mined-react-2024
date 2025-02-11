import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  AmarilloSeleccionado  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/AmarilloSeleccionado.svg" 
        alt="Icono Btn Radio Marcado amarillo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default AmarilloSeleccionado ;


