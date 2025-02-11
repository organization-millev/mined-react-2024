import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  shopping_bag  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/shopping_bag.svg" 
        alt="Icono Bolsa Compra"
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />
);

export default shopping_bag ;


