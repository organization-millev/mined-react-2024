import React, { useState } from 'react';
import Visibility from '../iconos/visibility';
import VisibilityOff from '../iconos/visibility_off';
import OjoIcono from '../iconos/ojo_negro';
import OjoIconoDark from '../iconos/vista_notificaciones_dark';

import CarpetaIcono from '../iconos/folder_notificaciones';
import CarpetaIconoDark from '../iconos/folder_notificaciones_dark';
import { useTranslation } from 'react-i18next';

const MenuItemNotificaciones = ({tituloNotificacion , descripcionNotificacion ,horaNotificacion }) => {
  
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const contenedor_general_item_notificacion = `w-full mx-auto  dark:!border-color-dark   border-b-[1px] max-h-[105px] mb-[20px] border-gris-oscuro ${
    !isVisible ? 'opacity-50' : 'opacity-100'
  } transition-opacity duration-300 ${isHovered ? 'hovered' : ''}`;

  const textZinc600 = 'max-h-[40px] min-h-[40px]  dark:text-blanco text-[#292735] font-sans text-xs font-medium lg:text-medium w-full  lg:w-[85%]';
  const titulo_notificacion = 'dark:text-blanco lg:text-base  text-sm font-semibold font-sans lg:font-bold text-gris-azulado-profundo ';
  const button_tag = 'dark:text-blanco dark:border-blanco border-solid border-[1px] border-gris-azulado-profundo rounded-[20px] lg:font-medium text-[#292735] font-semibold text-xs  lg:text-sm py-[2px] px-[12px]';

  return (
    
    <div className={contenedor_general_item_notificacion} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="flex lg:gap-2 flex-col  lg:flex-row">
        <div className="flex items-center justify-between gap-[6em] lg:gap-0">
          <h2 className={titulo_notificacion}>{tituloNotificacion}</h2>
          <div onClick={toggleVisibility} className="cursor-pointer relative lg:hidden">
            {isVisible ? <Visibility className="w-[24px] !p-0" /> : <VisibilityOff />}
          </div>
        </div>
        {/*
        <div className="flex gap-[5px] mb-1 ">
          <button className={button_tag}>{tag}</button>
          <button className={button_tag}>{tag}</button>
        </div>
        */}
        
      </div>
      <div className="flex flex-row">
        <p className={textZinc600}>{descripcionNotificacion}</p>
      
        <div className="!w-[68px]">
          <div className={`!w-[68px]  ${isHovered ? 'visible' : 'hidden'}`}>
            <button className="bg-[#e6e6e6] dark:bg-color-dark rounded-[6px] flex flex-row flex justify-center items-center p-2 gap-4">
              
              <OjoIcono width="18px" height="18px" padding="0px"     className="dark:hidden"/>
              <OjoIconoDark   className="dark:block hidden w-[18px] h-[18px] !p-0"/>
              
              {/*
              <CarpetaIcono width="18px" height="18px" padding="0px"     className="dark:hidden"/>
              <CarpetaIconoDark width="18px" height="18px"  className="dark:block hidden !p-0"/>
              */}
              
            </button>
          </div>
        </div>
      </div>
      <p className="dark:text-blanco dark:!font-semibold  text-gris-azulado-profundo lg:text-base text-xs mt-1 mb-[6px] font-sans font-normal hover:font-medium">
       {t('hace')} {horaNotificacion}
      </p>
    </div>
  );
};

export default MenuItemNotificaciones;
