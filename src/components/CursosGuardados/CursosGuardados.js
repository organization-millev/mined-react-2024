import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import CardCurso from '../CardCurso/CardCurso';
import CardCursos from '../common/CardCursos/CardCursos';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';

import { useCourseFavoriteList } from '../../hooks/favorite/useCourseFavoriteList';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';
import { useUser } from '../../providers/UserContext';


const reorderComponents = (components, order) => {
  // Crear un mapa de componentes para un acceso rápido
  const componentMap = {};
    components.forEach(item => {
      componentMap[item.key] = item.component;
    });
  
  
  // Generar la nueva lista de componentes ordenada
  return order.map(key => ({
    key: key,
    component: componentMap[key]
  }));
};

const CursosGuardados = () => {
  
  const { showLoadingForAWhile } = useLoading();
  const { GetCourseFav, courseFav,apiMessage  } = useCourseFavoriteList();

  
  
  
  useEffect(() => {
    showLoadingForAWhile();
    GetCourseFav()
    
  }, []);
  
  

  
  const { t } = useTranslation();
  const { isCourseType  , asynchronous } = useUser();
  
  const orderAsynchronous = ['A'];
  const orderSynchronous = ['B'];
  
  let components = [
    
    { key: 'A', component:  courseFav.map((course, index) => (
                                <div className="font-sans">
                                    <CardCurso 
                                      title={course.name} 
                                      titleCurso={course.name}
                                      tag={course.academyName } 
                                      imageUrl= {course.curso_foto_miniatura || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                      modulo={course.count_modules} 
                                      clases={course.count_classes} 
                                      duracion={course.total_duration} 
                                      isFavorite={course.isFavorite}
                                      idCurso={course.courseId}
                                      programId={course.programId}
                                    />
                                </div>
                              ))},
                              
    { key: 'B', component:  courseFav.map((course, index) => (
                                <div key={index} className="font-sans">
                                    <CardCurso
                                      title={course.name}
                                      titleCurso={course.name}
                                      tag={course.academyName } 
                                      imageUrl= {course.curso_foto_miniatura || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                      //modulo={course.count_modules} 
                                      //clases={course.count_classes} 
                                      //duracion={course.total_duration} 
                                      isFavorite={course.isFavorite}
                                      idCurso={course.courseId}
                                      programId={course.programId}
                                    />
                                </div>
                            ))},                          
  ];
    
  components = isCourseType(asynchronous)  ? 
    reorderComponents(components, orderAsynchronous) : 
    reorderComponents(components, orderSynchronous);
    
    return(
    
    <>
        <Navbar  logoAlt="Logo"/>
        <div className="px-[5%] dark:!bg-color-dark2 lg:px-[10%] 2xl:px-0 py-[16px] lg:py-[40px]">
          <div className="2xl:max-w-[1152px] justify-center mx-auto">
            <p className="font-sans font-semibold text-extra text-gris-azulado-profundo text-left mb-[24px] dark:text-blanco">{t('cursosGuardados')} </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[16px] lg:gap-[24px]">
              {components.map(({ component }) => component)}
              {/*{courseFav.map((course, index) => (
                  <div key={index} className="font-sans">
                      <CardCurso title={course.name} 
                                 tag={course.academyName } 
                                 imageUrl= {course.curso_foto_miniatura || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                 modulo={course.count_modules} 
                                 clases={course.count_classes} 
                                 duracion={course.total_duration} 
                                 isFavorite={course.isFavorite}
                                 idCurso={course.courseId}
                      />
                  </div>
              ))}*/}
            </div>
          </div>
        </div>
        
        
        <AvisoLegal/>
        <Footer/>
        
    </>
    
    
    )
}

export default CursosGuardados;