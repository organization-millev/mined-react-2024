import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const add  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/add.svg" 
        alt="Icono Agregar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default add ;