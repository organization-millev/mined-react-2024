import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  keyboard_voice  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/keyboard_voice.svg" 
        alt="Icono Microfono Teclado"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default keyboard_voice ;