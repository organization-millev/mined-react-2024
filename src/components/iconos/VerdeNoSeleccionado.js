import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  VerdeNoSeleccionado  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/VerdeNoSeleccionado.svg" 
        alt="Icono Btn Radio no Marcado verde"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default VerdeNoSeleccionado ;


