import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  edit_lapiz_blanco  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/edit_lapiz_blanco.svg" 
        alt="Icono Editar lapiz blanco"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default edit_lapiz_blanco ;