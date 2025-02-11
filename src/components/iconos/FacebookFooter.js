import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  FacebookFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/facebook_footer.svg" 
        alt="Icono Facebook"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default FacebookFooter ;