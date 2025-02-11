import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  InstagramFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/instagram_footer.svg" 
        alt="Icono Instagram"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default InstagramFooter ;