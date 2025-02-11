import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  fire  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/Fire.svg" 
        alt="Icono Fuego "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default fire ;