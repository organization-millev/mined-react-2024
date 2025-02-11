import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  folder_notificaciones  = ({ className, onClick ,width,height,padding}) => (
  <SvgIcon 
        src="/assets/iconos/folder_notificaciones.svg" 
        alt="Icono folder notificaciones "
        width={width}
        height={height}
        padding={padding}
        className={className}
        onClick={onClick}
      />
);

export default folder_notificaciones ;


