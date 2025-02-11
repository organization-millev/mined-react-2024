import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  twitterFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/twitterFooter.svg" 
        alt="Icono Twitter"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default twitterFooter ;