import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import CarouselCurso from '../HomeTv/CarouselCurso'; 
import IconoMislogros from '../iconos/open_in_new.js';
import IconoAbrirDark    from '../iconos/open_in_new_blanco.js';
import PerfilSeccion from '../PerfilSeccion/PerfilSeccion'; 
import Footer from '../Footer/Footer'; 

import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLoading } from '../../providers/LoadingContext';
import { useTeacherFavorite } from '../../hooks/sync/useTeacherFavorite';
import { useKeepWatching } from '../../hooks/academy/useKeepWatching';

const Perfil = () => {
  const { showLoadingForAWhile } = useLoading();
  const { GetTeacherFavorite, teacherFavorite } = useTeacherFavorite();
  const { GetKeepWatching, cursosKeepWatching } = useKeepWatching();

  useEffect(() => {
      showLoadingForAWhile();
      GetTeacherFavorite();
      GetKeepWatching();
  }, []);
  const { t } = useTranslation();
  const isLg = useMediaQuery('(min-width: 1024px)');
  const tituloCarouselEducadores = (isLg ? t('carouselEducadoresAcademy') : t('carouselEducadoresTV'));
  const tituloHerramientas = (isLg ? t('misHerramientas') : t('nuestrasHerramientas'));
  
  return (
      
    <>
    
    <Navbar logoSrc="../assets/images/MINED TV.png" logoAlt="Logo"/>
    
    <div className=" mt-[24px] lg:my-[40px]">
      <PerfilSeccion/>
    </div>
    
    {teacherFavorite && teacherFavorite.length > 0 && (
      <CarouselEducadores titulo={tituloCarouselEducadores} showBackground={false} teacherFavorite={teacherFavorite}/>
    )}
    
    {cursosKeepWatching && cursosKeepWatching.length > 0 && (
      <CarouselCurso tituloCarouselCurso={t('ultimosCursos')} subtitulo={t('misAcademias')} icono={<><IconoMislogros className="icono-sm block dark:hidden"/> <IconoAbrirDark className="icono-sm hidden dark:block"/></>} showArrows={false} cursos={cursosKeepWatching} />
    )}
    <div className=" block md:hidden">
    <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')}/>
    </div>
    
    <NuestrasHerramientas titulo={tituloHerramientas}  filter={false} />
    
    {/*<CarouselAcademia/>*/}
    
    <AvisoLegal/>
    <Footer/>
    
      
    </>
  );
};

export default Perfil;

