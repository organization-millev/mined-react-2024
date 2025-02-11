import React from 'react';
import FlechaDerBlanco from '../iconos/FlechaDerBlanco.js';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas.js';
import Deshabilitado from '../iconos/candado_blanco.js';
import DeshabilitadoBlack from '../iconos/lock.js';
import { Link } from 'react-router-dom';
import './CardAcademia.css'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const CardAcademia = ({ isEnabled,subtitle,logo,academiaLogo,fondoComprado,fondoNoComprado,id,formatForURL}) => {
  const { t } = useTranslation();
 const contenedor_card_academia = `card-academia w-[150px] xl:w-[218px] h-[365px]  rounded-[20px] flex justify-center items-end bg-[url("../assets/images/fondo-academiawem.png")]` ;
 const button_academia_clase="flex  flex-row items-center font-sans text-blanco font-semibold text-sm xl:text-base	"
 const contenedor_card_academia_deshabilitada = `card-academia w-[150px] xl:w-[218px] h-[285px] xl:h-[365px] rounded-[20px] flex justify-center items-end bg-no-repeat bg-center bg-cover`;
  //if (!isEnabled) {
  //
  
  
  if (!isEnabled) {
    return (
    <div>
      <div className="hidden lg:block">
        <div className={contenedor_card_academia_deshabilitada} style={{ backgroundImage: `url(${fondoNoComprado})` }}>
          <div className="!rounded-[18px]  w-[218px] lg:w-[218px] h-[285px]  xl:h-[365px] px-4 pt-[45px] pb-[39px] flex  items-end">
            <div className={`flex flex-col items-center ${id === 'Sales Mastery' ? '' : 'gap-[15px] xl:gap-[25px]'}`}>
              <div className="bg-[#15151F] rounded-full w-[42px] h-[42px] p-[8px] flex justify-center items-center ">
                  <Deshabilitado className="w-[15px] h-[19px] " padding="0px"  />
              </div>
              <div className={`!min-h-[28px] !max-h-[55px] flex items-center ${id === 'Sales Mastery' ? 'mb-[25px]' : ''}`}  >
               
               <img src={logo} className={`object-contain w-full ${id === 'Sales Mastery' ? 'h-[55px]' : 'h-[28px]'}`} alt="Logo" />
               
              </div>
              <div className="flex flex-col gap-[15px] items-center">
                
                <p className="font-sans text-xs text-blanco font-medium text-center line-clamp-2 !h-[32px]" >{subtitle}</p>
                  <Link to={`/academia_no_comprada/${formatForURL(id)}`}>
                    <button className="bg-[#15151F]  text-azul-oscuro-grisáceo lg:text-white text-xs lg:text-sm font-bold  font-sans py-2 px-4 rounded-2xl ">
                      {t('btnSaberMas')}
                    </button>
                    
                      
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/*--------------------Mobile-----------------------------------*/}
      
      <Link to={`/academia_no_comprada/${formatForURL(id)}`}>
          <div className="lg:hidden w-[286px] h-[134px] rounded-[20px] flex justify-center items-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${fondoNoComprado})` }}>
            <div className="flex flex-col justify-between h-full w-full py-4 px-3">
              <div className="w-[199px] h-[29px] flex items-center">
                <img src={logo} alt="Logo E-Commerce" className="max-w-full max-h-full object-contain" />
              </div>
              
              <div className="flex flex-row items-center justify-between w-full">
                <div className="flex flex-row items-center">
                  <DeshabilitadoBlack className="mr-2" padding="6px" />
                  <p className="font-sans text-xs text-gris-azulado-profundo font-semibold text-left">Academia bloqueada</p>
                </div>
                <div className="bg-gris-azulado-profundo p-2 rounded-2xl hover:bg-[#656472] flex items-center">
                  <Link to={`/academia_no_comprada/${formatForURL(id)}`}>
                    <FlechaDerBlanco width="18px" height="18px" padding="0px" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </Link>
      
    </div>
    );
  }
  
  // Código  para el estado habilitado
  return (
    
    <div>
        <Link  to={`/academy/${formatForURL(id)}`} className="hidden lg:block group cursor-pointer">
          <div className="relative card-academia w-[150px] xl:w-[218px] h-[285px] xl:h-[365px]  rounded-[20px] overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center transform transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url(${fondoComprado})` }}></div>
              <div className="relative flex justify-center items-end h-full px-4 py-[45px] ">
                <div className={`flex flex-col items-center ${id === 'Sales Mastery' ? '' : 'gap-[15px] xl:gap-[25px]'}`}>
                  {/*<div className="flex items-center">
                    <img src={academiaLogo} className="object-cover w-[65px]"/>
                  </div>*/}
                  <div className={`flex items-center justify-center w-[100px] h-[114px] ${id === 'Sales Mastery' ? '' : ''}`}>

                      <img
                        src={academiaLogo}
                        className="object-contain w-full h-full"
                        alt="Academia Logo"
                      />
                  </div>
                  {/*
                  <div className="h-[45px] flex items-center">
                    <img src={logo} className=" max-w-[131px] max-h-[45px] object-cover"/>
                  </div>*/}
                  
                  <div className={`w-full !min-h-[28px] !max-h-[55px] flex items-center justify-center ${id === 'Sales Mastery' ? 'mb-[22px]' : ''}`}>
                    <img
                      src={logo}
                      className={`object-contain w-full ${id === 'Sales Mastery' ? 'h-[55px]' : 'h-[28px]'}`}
                      alt="Logo"
                    />
                  </div>
                  
                  <p className={`font-sans text-xs text-blanco font-medium text-center line-clamp-2 !h-[32px] ${id === 'Sales Mastery' ? 'mb-[25px]' : ''}`}>{subtitle} </p>

                  <div  className={button_academia_clase}>
                    {t('btnIngresar')}
                    <FlechaDerBlanco 
                      width="15px" 
                      height="15px" 
                      padding="0px" 
                      className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </div>
              </div>
            </div>
        </Link>


        
          {/*----------------------Mobile---------------------------------*/}
          
          
        <Link  to={`/academy/${formatForURL(id)}`} className="lg:hidden cursor-pointer">  
            <div className=" w-[286px] h-[134px] rounded-[20px] flex justify-center items-center bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${fondoComprado})` }}>
              <div className="flex flex-col justify-between h-full w-full py-4 px-3">
                <div className="w-[199px] h-[29px] flex items-center">
                  <img src={logo} alt="Logo" className="max-w-full max-h-full object-contain"/>
                </div>
                <p className="font-sans text-xs text-blanco font-semibold text-left min-w-[257] line-clamp-2">{subtitle}</p>
                <Link to={`/academy/${formatForURL(id)}`} className={`text-large ${button_academia_clase}`}>{t('btnIngresar')} 
                  <FlechaDerBlanco width="15px" height="15px" padding="0px" className="ml-2"/>
                </Link>
              </div>
            </div>
        </Link>

    </div>
  );
};

export default CardAcademia;
