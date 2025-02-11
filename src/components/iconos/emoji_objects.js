import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  emoji_objects  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/emoji_objects.svg" 
        alt="Icono Emoji Foco"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default emoji_objects ;