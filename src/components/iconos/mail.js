import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  mail  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/mail.svg" 
        alt="Icono Correo "
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default mail ;