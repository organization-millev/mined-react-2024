import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  WebFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/web_footer.svg" 
        alt="Icono Instagram"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default WebFooter ;