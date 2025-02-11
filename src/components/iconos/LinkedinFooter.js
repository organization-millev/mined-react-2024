import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  LinkedinFooter  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/linkedin_footer.svg" 
        alt="Icono LinkedIn"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default LinkedinFooter ;