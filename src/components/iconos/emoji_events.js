import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  emoji_events  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/emoji_events.svg" 
        alt="Icono Emoji Trofeo"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default emoji_events ;