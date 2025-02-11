import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  description  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/description.svg" 
        alt="Icono Descripcion"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default description ;