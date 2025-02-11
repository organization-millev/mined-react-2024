import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  fuego_negro  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/fuego_negro.svg" 
        alt="Icono Fuego"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default fuego_negro ;