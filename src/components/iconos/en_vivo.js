import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  en_vivo  = ({ className, onClick,width,height,padding }) => (
  <SvgIcon 
        src="/assets/iconos/en_vivo.svg" 
        alt="Icono Favorito Negrito"
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default en_vivo ;