import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  location_on  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/location_on.svg" 
        alt="Icono Locacion Actual"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default location_on ;