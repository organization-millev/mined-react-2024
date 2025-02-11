import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  shopping_cart_white  = ({ className, onClick }) => (
  <SvgIcon 
        src="/assets/iconos/shopping_cart_white.svg" 
        alt="Icono Carrito Compras"
        width="40"
        height="40"
        padding="0"
        className={className}
        onClick={onClick}
      />
);

export default shopping_cart_white ;


