import React, { useEffect, useState } from 'react';
import IconoMislogros from '../../iconos/open_in_new.js'; // Asegúrate de que este componente existe y se usa correctamente
import LikePlata      from '../../iconos/like_plata.js';
import EstrellaOro    from '../../iconos/estrella_oro.js';
import Bloqueado    from '../../iconos/candado_blanco.js';
import IconoAbrirDark    from '../../iconos/open_in_new_blanco.js';
import Icono from '../../iconos/iconos';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProgressBar = ({ currentPoints, maxPoints, imgProfile }) => {
  // Calcular el progreso como porcentaje.
  const progress = Math.min((currentPoints / maxPoints) * 100, 100); // Limitar a 100% máximo.
  const totalPoints = currentPoints + maxPoints; // Aunque este cálculo parece raro, lo mantuve.

  return (
    <div className="flex flex-row items-center gap-1">
      <div className="w-full h-[25px] bg-gris-medio progressBar gap-[15px] justify-between rounded-full relative my-2 flex flex-row dark:bg-[#5d5b66]">
        <div
          className="bg-gris-azulado-profundo dark:bg-blanco h-[25px] rounded-full flex items-center justify-end pr-[10px] text-white text-sm"
          style={{ width: `${Math.max(progress, 20)}%` }}
        >
          <div className="flex">
            <div className="flex flex-row items-center gap-[2px]">
              <Icono icono="fuegoNegro" className="icono-sm block dark:hidden" />
              <Icono icono="fuegoBlanco" className="icono-sm hidden dark:block" />
            </div>
            <p className="font-sans text-sm font-semibold dark:text-color-dark">
              {currentPoints ?? 0} / {totalPoints ?? 0}
            </p>
          </div>
        </div>

        <div>
          <div className="relative icono-semi-md hover:cursor-pointer group rounded-full bg-gris-claro">
            <img
              src={imgProfile}
              alt="profile"
              className="absolute inset-0 icono-semi-md rounded-full grayscale"
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <Bloqueado className="icono-mini relative inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Nivel = ({currentLevel,lastUserAchievements}) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/logros');
  };
  const { t } = useTranslation();
  
  
  
  const medalCounts = { oro: 0, plata: 0, bronce: 0 };
  const medalIcons = { oro: '', plata: '', bronce: '' };

  if (lastUserAchievements) {
    lastUserAchievements.forEach(item => {
      if (item.points === 100) {
        medalCounts.oro++;
        medalIcons.oro = item.iconUrl;
      }
      if (item.points === 50) {
        medalCounts.plata++;
        medalIcons.plata = item.iconUrl;
      }
      if (item.points === 25) {
        medalCounts.bronce++;
        medalIcons.bronce = item.iconUrl;
      }
    });
  }
  
  
  
  

  return (
    <div className="w-full h-auto  bg-blanco dark:bg-color-dark2 p-3 rounded-[20px] shadow-custom-strong my-3	">
      <div className="flex flex-row gap-2">
        <div className="bg-[#5d5b66] dark:bg-[#403E4BBF] font-sans border-[7px] dark:border-[#65647280]  border-[#b1b1b8] p-5 rounded-full w-[40px] h-[40px] text-blanco flex items-center justify-center text-2xl font-semibold">
          <p>{currentLevel?.levelId}</p>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between	">
            <p className="font-sans text-2xl font-bold dark:text-blanco">{currentLevel?.levelTranslation.name}</p>
            <div className="flex flex-row items-center gap-[8px] cursor-pointer" onClick={handleClick}>
              <span className="text-small font-sans font-medium lg:font-bold lg:underline underline-offset-1 flex items-center dark:text-blanco">
               {t('misLogros')}
              </span>
                <IconoMislogros className="icono-semi-sm lg:icono-semi-md block dark:hidden" />
                <IconoAbrirDark  width="24px" height="24px"  className="!p-0 hidden dark:block"/>
            </div>
          </div>  
          <p className="font-sans font-medium text-small lg:text-sm text-gris-azulado-profundo lg:text-[#808080] lowercase">{currentLevel?.remainingPoints} {t('siguienteNivel')} {currentLevel?.levelTranslation.description}</p>
        </div>
        
      </div>
      {currentLevel && (
        <ProgressBar currentPoints={currentLevel.currentPoints} maxPoints={currentLevel.nextRequiredPoints} imgProfile={currentLevel.nextAvatar}/>
      )}
      <p className="font-sans text-small lg:text-sm max-w-[90%] font-normal lg:font-medium text-gris-azulado-profundo lg:text-[#808080]">{t('textoDesbloquea')} {currentLevel?.nextLevelTranslation.name} {t('textoDesbloquea2')}</p>
      
      {lastUserAchievements &&   lastUserAchievements.length > 0 &&
        <div className="">
          <p className="text-largeB lg:text-base	font-bold font-sans mt-3 dark:text-blanco">{t('perfilLogros')}  </p>
           
          <div className="flex-row flex  gap-[20px] mt-2">
            
           {Object.entries(medalCounts).map(([key, count]) => (
              count > 0 && (
                <div key={key} className="relative flex items-end">
                  <img src={medalIcons[key]} className="w-[64px] h-[64px] p-0" alt={`Medalla ${key}`} />
                  <span className="text-xl font-semibold dark:text-white">x{count}</span>
                </div>
              )
            ))}
            
          </div>
        </div>
      }
    </div>
  );
};

export default Nivel;
