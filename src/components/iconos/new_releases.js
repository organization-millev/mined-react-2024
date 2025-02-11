import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  new_releases  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/new_releases.svg" 
        alt="Icono Nuevos Lanzamientos "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default new_releases ;