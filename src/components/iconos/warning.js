import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  warning  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/warning.svg" 
        alt="Icono Advertencia"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default warning ;


