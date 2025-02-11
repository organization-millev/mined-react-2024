import React from 'react';
import "./ClaseItem.css"; // Importa tu archivo CSS aquí
import Reloj from '../../iconos/nest_clock_farsight_analog.js';
import RelojWhite from '../../iconos/nest_clock_farsight_analog_white.js';
import PuntoCeleste from '../../iconos/circle_celeste.js';
import PuntoVerde from '../../iconos/circle_green.js';
import PuntoGris from '../../iconos/circle_black.js';
import Deshabilitado from '../../iconos/candado_blanco.js';
import { Link,useNavigate } from 'react-router-dom';

import { useNavigation } from '../../../providers/NavigationContext';


const ClaseItem = ({ habilitado , tiempoClase , nombreClase , descripcionClase,classId, formatForURL,nameCurso,nameProgram,index,moduloIndex,viewed,subtitleClase,idModulo}) => {
  //
  const { goToAcademyCursoClase } = useNavigation();
    
  const navigate = useNavigate();
  const handleClick = (programName, courseName, idClass) => {
    goToAcademyCursoClase(programName, courseName, encodeURIComponent(formatForURL(nombreClase)) , { idClass });
  };
  
  /*const formatDuration = (duration) => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    
    let formattedDuration = '';
    
    if (hours > 0) {
        formattedDuration += `${hours} ${hours > 1 ? 'horas' : 'hora'} `;
    }
    
    if (minutes > 0) {
        formattedDuration += `${minutes} ${minutes > 1 ? 'min' : 'min'}`;
    }
    
    return formattedDuration.trim();
};*/


    
  const isHabilitado = moduloIndex === 0 && index === 0 ? true : habilitado;
  
  let iconoEstado;
  if(viewed > 0){
    iconoEstado = PuntoVerde;
  }else if(isHabilitado){
    iconoEstado = PuntoCeleste;
  }else {
    iconoEstado = PuntoGris;
  }
  
  return (
    <>
      
      <div className={`border-b-[1px] border-gris-medio !m-[0px] w-full flex justify-between pl-[11px] pr-4 py-[20px]  item-modules-estilos hover:bg-[#cfcfd170]  dark:hover:bg-[#cfcfd130] ${habilitado ? 'cursor-pointer' : 'cursor-pointer'}`}
        onClick={isHabilitado ? () => handleClick(formatForURL(nameProgram), formatForURL(nameCurso), classId) : null}> {/*border-b-[1px] border-[#CFCFD1]*/}
        <div className="flex flex-1 items-baseline md:items-center gap-3">
          
          {iconoEstado && React.createElement(iconoEstado, { width: '10px', height: '10px' })}
          
                     
          <div className="flex-1 flex flex-col gap-[5px] md:gap-0">
            
            <div className="max-w-[900px]">
              <a className="text-sm font-bold font-sans mb-[4px] lg:mb-0 dark:text-white line-clamp-1">{ nombreClase }</a >
              <p className="text-sm font-normal font-sans hidden lg:flex dark:text-color-dark-texto line-clamp-1">{ subtitleClase }</p>
            </div>
            
            <div className="flex flex-row gap-[9px] md:hidden">
              <Reloj width="20px" height="20px" padding="0px" className="dark:hidden" />
              <RelojWhite width="20px" height="20px" padding="0px" className="dark:block hidden"/>
              <p className="font-sans text-medium text-púrpura-grisáceo dark:text-white ">{ tiempoClase }</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-end md:w-[120px]">
          {!isHabilitado  && (
            <div className="flex flex-row items-center justify-center bg-plata-suave rounded-full w-[29px] h-[28px] mr-2">
              <Deshabilitado className="m-2" width="15px" height="15px" padding="0px" />
            </div>
          )}
          <div className="hidden lg:flex lg:gap-[6px]  justify-end ">
            <Reloj width="20px" height="20px" padding="0px" className="dark:hidden"/>
            <RelojWhite width="20px" height="20px" padding="0px" className="dark:block hidden"/>
            <p className="dark:text-white  min-w-[45px] "> {tiempoClase}</p>
             
          </div>
        </div>
      </div>
    </>
  );
}

export default ClaseItem;
