import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  workspace_premium_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/workspace_premium_white.svg" 
        alt="Icono medalla"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default workspace_premium_white ;