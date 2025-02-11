import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  Icon_url  = ({ className, onClick , url }) => (
  <SvgIcon 
        src={url} 
        alt="Icono Bandera Blanco "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default Icon_url ;


