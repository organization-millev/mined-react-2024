import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  delete_icon  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/delete.svg" 
        alt="Icono Tacho Basura"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default delete_icon ;