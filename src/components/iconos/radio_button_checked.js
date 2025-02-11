import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  radio_button_checked  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/radio_button_checked.svg" 
        alt="Icono Btn Radio Marcado"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default radio_button_checked ;


