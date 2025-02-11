import React, { useEffect } from 'react';
import edit from '../iconos/edit_white.js'; // Asegúrate de que este componente existe y se usa correctamente
import SubscriptionList from '../common/SubscriptionList/SubscriptionList.js'; 
import ProfilePhoto from '../common/ProfilePhoto/ProfilePhoto.js'; 
import Nivel from '../common/Nivel/Nivel.js'; 
import { useUser } from '../../providers/UserContext';
import { useTranslation } from 'react-i18next';
import { useGamificationGlobal } from '../../hooks/gamificacion/useGamificationGlobal';

const PerfilSeccion = () => {
  
  //const profileImageSrc = "../assets/images/perfil-color.png"; // Cambia la ruta a la imagen de perfil
  const profileIcon = edit; // Cambia a tu icono
  const { userData , isCourseType  , asynchronous,getProfilePicture } = useUser();
  const { t } = useTranslation();
  const imgProfile = getProfilePicture();
  const currentTitles = userData?.profiles?.[0]?.current_titles || '';
  //
  const { GetGamificationGlobal, currentLevel, lastUserAchievements } = useGamificationGlobal(500);
  useEffect(() => {
    GetGamificationGlobal();
  }, []);
  
  const isValidCurrentLevel = currentLevel && currentLevel.levelId;
  
  return (
      
    <div className="semi-full-container 2xl:container-extraLarge">
      <p className="mb-5 font-sans font-semibold text-extra text-center w-full dark:text-blanco text-gris-azulado-profundo lg:text-4xl lg:text-[#4A4A4A] lg:font-bold flex justify-center items-center lg:justify-start lg:mb-5">
        {t('miPerfil')} 
      </p>
    
    <div className="w-full lg:flex lg:flex-row">
      <div className="mb-[24px] lg:mb-0 lg:w-[70%] lg:flex lg:flex-row lg:gap-5">
          <ProfilePhoto icon={profileIcon} src={imgProfile} nombreUser={userData.first_name} etiqueta={currentTitles}/>
          <SubscriptionList codigo={userData.provider_id} nombreUser={userData.first_name} etiqueta={currentTitles}/>
      </div>
      
      {isValidCurrentLevel && (
        <div className="lg:w-[40%] ">
          <Nivel currentLevel={currentLevel} lastUserAchievements={lastUserAchievements}/>
        </div>
      )}
    </div>
      
      
    </div>
    
  );
};

export default PerfilSeccion;

