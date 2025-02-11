import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  edit  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/edit.svg" 
        alt="Icono Editar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default edit ;