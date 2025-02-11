
import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  bandera_peru  = ({ url , className, onClick }) => (
  <SvgIcon 
        src={url}
        alt="Icono Bandera Peru "
        width="37"
        height="28"
        className={className}
        onClick={onClick}
      />
);

export default bandera_peru ;


