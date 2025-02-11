import React, { useState,useEffect } from 'react';
import {useUsuario} from '../../hooks/useUsuario';
import edit from '../iconos/edit_white.js'; // Asegúrate de que este componente existe y se usa correctamente
import {useCalendario} from '../../hooks/useCalendario';
import Navbar from '../Navbar/Navbar';
import PerfilTop from '../common/PerfilTop/PerfilTop';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal.js'
import Footer from '../Footer/Footer';
import Calendarios from './Calendarios/Calendarios';
import PerfilSeccion from '../PerfilSeccion/PerfilSeccion';
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores';
import SubscriptionList from '../common/SubscriptionList/SubscriptionList.js'; 
import ProfilePhoto from '../common/ProfilePhoto/ProfilePhoto.js'; 
import { useParams } from 'react-router-dom';
import {useMediaQuery} from '../../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../providers/UserContext';
import {useCurso} from '../../hooks/useCurso';
import { useTeacherFavorite } from '../../hooks/sync/useTeacherFavorite';
import { useLoading  } from '../../providers/LoadingContext';
import { useAcademia } from '../../providers/AcademiaContext';

const Calendario = () => {
    
    const { t } = useTranslation();
   
    const { academias,getCoursesDetails ,getIdsByName} = useAcademia();

    const {usuario,loadUsuario} = useUsuario()
    const {calendario,loadCalendario} = useCalendario()
    const { showLoadingForAWhile } = useLoading();
    const { GetTeacherFavorite, teacherFavorite } = useTeacherFavorite();


    useEffect(()=>{
        showLoadingForAWhile(1800);
        loadCalendario()
        GetTeacherFavorite();

        //loadUsuario()
    },[])
    
    
 
    
        

    const isLg = useMediaQuery('(min-width: 1024px)');
    
    const tituloCarouselEducadores = (isLg ? t('carouselEducadoresTV') : t('carouselEducadoresTV'));
     
    const profileIcon = edit; // Cambia a tu icono
    const { userData , isCourseType  , asynchronous,getProfilePicture } = useUser();
    const imgProfile = getProfilePicture();
    //
    const currentTitles = userData?.profiles?.[0]?.current_titles || '';
    console.log('currentTitles',academias)
    
    return(
        
    <>
        <Navbar  showDropdownPais={true} />
        
        <div className="hidden lg:flex lg:semi-full-container 2xl:container-extraLarge py-[40px] !justify-start">
            <div className="text-3extra font-sans font-semibold text-gris-azulado-profundo dark:text-blanco">{t('miCalendario')} </div>
        </div>
        <div className="semi-full-container pb-[40px]">
         <div className="mb-[24px] w-full lg:mb-0 lg:w-[70%] lg:flex lg:flex-row lg:gap-5">
          <ProfilePhoto icon={profileIcon} src={imgProfile} nombreUser={userData.first_name} etiqueta={currentTitles}/>
          <SubscriptionList codigo={userData.provider_id} nombreUser={userData.first_name} etiqueta={currentTitles}/>
      </div>
        </div>
        
        {/*<CarouselEducadores obj={usuario} titulo={tituloCarouselEducadores} showBackground={true}/>*/}
        {teacherFavorite && teacherFavorite.length > 0 && (
          <CarouselEducadores titulo={tituloCarouselEducadores} showBackground={true} teacherFavorite={teacherFavorite}/>
        )}
        
        <div className="semi-full-container 2xl:container-extraLarge py-[16px] lg:py-[40px]">
            <Calendarios obj={calendario} />
        </div>
        
        <AvisoLegal/>
        
        <Footer/>
    </>)
}

export default Calendario