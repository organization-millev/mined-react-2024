import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  radio_button_unchecked_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/radio_button_unchecked_blanco.svg" 
        alt="Icono Btn Radio Desmarcado blanco"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default radio_button_unchecked_blanco ;


