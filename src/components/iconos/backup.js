import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const backup  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/backup.svg" 
        alt="Icono Guardar Nube"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default backup ;