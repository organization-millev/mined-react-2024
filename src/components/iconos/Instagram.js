import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Instagram  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Instagram.svg" 
        alt="Icono Instagram Claro"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Instagram ;