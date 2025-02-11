import React from 'react';
import SvgIcon from './SvgIcon'; // Asegúrate de que la ruta de importación es correcta


const  IconosProgramacion  = ({icono,className, onClick }) => {
  
  let src = ""
  let alt = ""
  
  switch(icono){
      
        case "EnVivo":
            src="en_vivo.svg"
            alt="En vivo"
            break;
        case "calendarAdd":
          src="calendar_add_on.svg"
          alt="Agendar";
          break;
        case "reloj":
          src="nest_clock_farsight_analog.svg"
          alt="reloj";
          break;
        case "flechaDer":
          src="arrow_forward.svg"
          alt="Izquierda";
          break;
        case "flechaIzq":
          src="arrow_back.svg"
          alt="Derecha";
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

export default IconosProgramacion ;