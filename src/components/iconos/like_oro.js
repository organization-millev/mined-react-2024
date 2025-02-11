import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  like_oro  = ({ className, onClick,width,height }) => (
  <SvgIcon 
        src="/assets/iconos/like_oro.svg" 
        alt="Icono like color oro"
        width={width}
        height={height}
        className={className}
        onClick={onClick}
      />
);

export default like_oro ;