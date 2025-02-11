import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  remove  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/remove.svg" 
        alt="Icono Remover-Eliminar"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default remove ;


