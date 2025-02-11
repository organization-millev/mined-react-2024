import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  IconosCanal  = ({icono,className, onClick }) => {
  
  let src = ""
  let alt = ""
  
  switch(icono){
      
        case "circulo_naranja":
            src="circle_orange.svg"
            alt="circulo naranja"
            break;
            
        case "calendario_hoy":
            src="calendar_today.svg"
            alt="Fecha"
            break;
        case "folder_abierto":
            src="folder_open.svg"
            alt="Archivos"
            break;
        case "estrella":
            src="star_icon.svg"
            alt="Estrella"
            break;
        case "estrella_llena":
            src="star_llena_icon.svg"
            alt="Estrella rellena"
            break;
        case "estrella_blanca":
            src="estrella_blanca.svg"
            alt="Estrella  blanca"
            break;
        case "estrella_llena_blanca":
            src="estrella_llena_blanca.svg"
            alt="Estrella rellena blanca"
            break;    
        case "chevron_izq":
            src="chevron_left.svg"
            alt="Izquierda"
        case "chevron_der":
            src="chevron_right.svg"
            alt="Derecha"
        case "visibility":
            src="visibility.svg"
            alt="visibility"
            break;
    
        case "visibility_off":
            src="visibility_off.svg"
            alt="visibility_off"
            break;
        case "visibility_white":
            src="visibility_white.svg"
            alt="visibility_off_dark"
            break;
    
        case "visibility_off_blanco":
            src="visibility_off_blanco.svg"
            alt="visibility_off_blanco"
            break;    
    
  }

  return (
  <SvgIcon 
        src={"/assets/iconos/"+src} 
        alt={alt}
        width="40"
        height="40"
        className={className}
        onClick={onClick}
      />)
};

export default IconosCanal ;