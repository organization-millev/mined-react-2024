import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; 
import BannerStatic from '../common/BannerStatic/BannerStatic';
import CardAcademy from '../common/CardAcademy/CardAcademy';
import CardAcademySolid from '../common/CardAcademySolid/CardAcademySolid';
import CardDescription from '../common/CardDescription/CardDescription';
import CardVerMas from '../common/CardVerMas/CardVerMas';
import CardCursos from '../common/CardCursos/CardCursos';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import Footer from '../Footer/Footer'; 
//import { useAcademias } from '../../hooks/useAcademias';
import { useUser } from '../../providers/UserContext';
import { useParams } from 'react-router-dom';
import { useAcademia } from '../../providers/AcademiaContext';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';
import { useNavigation } from '../../providers/NavigationContext';
import { useCourseFavoriteList } from '../../hooks/favorite/useCourseFavoriteList';

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



const AcademyTv = () => {
    
    const { showLoadingForAWhile } = useLoading();
    
    const { goToAcademyCurso } = useNavigation();
    const { GetCourseFav, courseFav,apiMessage  } = useCourseFavoriteList();
    
    useEffect(() => {
        showLoadingForAWhile();
        GetCourseFav()
    }, []);
    
    const [idProgram, setIdProgram] = useState();
    const { id } = useParams();
    const { academias, GetAcademias,getVistaAcademias,getTeachers ,formatFromURL , getIdsByName } = useAcademia();
    const [programData, setProgramData] = useState([]);
    //
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const { userData , isCourseType  , asynchronous  , courseTypeValue} = useUser();
    const [programsData, setProgramsData] = useState([]);
    
    localStorage.setItem('languageModules', "ES");
    
    
    const { t } = useTranslation();
    const isAsync = isCourseType(asynchronous);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    
    // los id de academias deberan de salisr del api d eproductos validar y solicitara ruben que cambie el id para bsuacr el producto
    const selectedIds = [1, 2, 3, 12];
    
    const ids = getIdsByName(id, null , language_code);
  
    useEffect(() => {
        
        const ids = getIdsByName(id, null , language_code);
        if (id && academias.length > 0 && ids && ids.programId) {
            const data = getVistaAcademias(Number(ids.programId));
            setIdProgram(ids.programId);
            setProgramData(data);
            setProgramsData(getVistaAcademias(ids.programId));
            setLoadingTeachers(true);
            const teachersData = getTeachers(Number(ids.programId),courseTypeValue);
            setTeachers(teachersData);
            setLoadingTeachers(false);
            
            //si slo es un curso redigir
            if(data[0].courses.length===1){
                
                goToAcademyCurso(id, data[0].courses[0].name, {})
              
            }
        }
    }, [id, academias, isCourseType]);
    
    if (!ids || !ids.programId) {
        console.warn('ids is null or does not have programId:', ids);
        return null;
    }
    
    
    
    const orderAsynchronous = ['A','B','H','G','E','F']; // Orden para Asincrónico
    const orderSynchronous = ['J', 'B', 'C','I','D','E','F']; // Orden para Sincrónico
    let components = [
        /*{ key: 'A', component:  <div className="semi-full-container 2xl:container-extraLarge py-[16px] lg:py-[40px]">
                                    <CardAcademy data={teachers} />
                                </div>  },*/
                                
        { key: 'B', component:  <div className="hidden md:block px-[5%] lg:px-[10%] 2xl:container-extraLarge pb-[16px] lg:py-[40px]">
                                    {programData.map(item =>(
                                       <CardDescription nombreAcademia={t('descripcionAcademia')} descriptionAcademy={item.description}/>
                                    ))}
                                </div>  },
        { key: 'C', component:  programData.length > 0 && programData[0].courses.length > 0 && (
                                <div className="px-[5%] bg-plata-suave dark:!bg-color-dark2  lg:px-[10%] 2xl:px-0 py-[16px] lg:py-[40px]">
                                    <div className="2xl:max-w-[1152px] justify-center mx-auto">
                                        <p className="font-sans text-xl font-semibold text-gris-azulado-profundo mb-[10px] lg:mb-[24px] lg:text-2extra dark:!text-blanco">{t('listadoCurso')} </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[16px] lg:gap-[24px]">
                                            {programData[0].courses.map((curso, index) => {
                                                const isFavorite = courseFav.some(favCourse => {
                                                    //console.log("Comparando favoritos: favCourse.courseId:", favCourse.courseId, "curso.course_id:", curso.course_id, "courseFav", courseFav);
                                                    return favCourse.courseId == curso.course_id;
                                                });
                                                if (curso.isSynchronous === 1) {
                                                    return (
                                                        <CardCursos 
                                                            key={index} 
                                                            program_id={id}
                                                            course_id={curso.course_id}
                                                            imageSrc={curso.miniaturaUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL} 
                                                            titulo={curso.name} 
                                                            modulo={`Módulos ${curso.count_modules}`} 
                                                            clases={`Clases ${curso.count_classes}`}
                                                            duracion={curso.total_duration} 
                                                            tagCurso={programData[0].name}
                                                            favorite_is_enabled={isFavorite ? 1 : 0}
                                                            isSynchronous={curso.isSynchronous}
                                                        />
                                                    );
                                                }
                                                return null;
                                            })}
                                            {programData[0].courses.every(curso => curso.isSynchronous !== 1) && (
                                                <p>{t('nohayCursosDiscponibles')}</p>
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>)},
                                
        { key: 'I', component:  <div className="lg:hidden"><CarouselAcademia tituloCarouselAcademia={t('tusAcademias')} /></div> },
        { key: 'D', component:  <NuestrasHerramientas key={`NuestrasHerramientas ${ids.programId}`} titulo={t('herramientasAcademia')}  filter={true} ids={selectedIds} programId={ids.programId}/>  },
        { key: 'E', component:  <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')}/> },
        { key: 'F', component:  <NuestrasHerramientas titulo={t('nuestrasHerramientas')}  filter={false} /> },
        { key: 'G', component:  programData.length > 0 && programData[0].courses.length > 0 && (
                                <div className="px-[5%] bg-plata-suave dark:!bg-color-dark2  lg:px-[10%] 2xl:px-0 py-[16px] lg:py-[40px]">
                                    <div className="2xl:max-w-[1152px] justify-center mx-auto">
                                        <p className="font-sans text-xl font-semibold text-gris-azulado-profundo mb-[10px] lg:mb-[24px] lg:text-2extra dark:!text-blanco">{t('listadoCurso')}</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-[16px] lg:gap-[24px]">
                                            {/*{programData.length > 0 && programData[0].courses.length > 0 ? programData[0].courses.map((curso, index) => (
                                                <CardCursos 
                                                    key={curso.course_id}
                                                    program_id={id}
                                                    course_id={curso.course_id}
                                                    imageSrc={curso.miniaturaUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                                    titulo={curso.name}
                                                    modulo={`Mód ${curso.count_modules}`}
                                                    moduloCompleto={`Módulo ${curso.count_modules}`}
                                                    clases={`Clases ${curso.count_classes}`}
                                                    clasesCompletas={`Clases ${curso.count_classes}`}
                                                    duracion={curso.total_duration}
                                                    duracionCompletas={curso.total_duration}
                                                    favorite_is_enabled={curso.isAsynchronousFavorite}
                                                    isAsynchronous={curso.isAsynchronous}
                                                    isSynchronous={curso.isSynchronous}
                                                />
                                            )) : <p>{t('nohayCursosDiscponibles')} </p>}*/}
                                            {programData[0].courses.map((curso, index) => {
                                                const isFavorite = courseFav.some(favCourse => {
                                                    //console.log("Comparando favoritos: favCourse.courseId:", favCourse.courseId, "curso.course_id:", curso.course_id, "courseFav", courseFav);
                                                    return favCourse.courseId == curso.course_id;
                                                  });
                                                if (curso.isAsynchronous === 1) {
                                                    return (
                                                        <CardCursos 
                                                            key={curso.course_id}
                                                            program_id={id}
                                                            course_id={curso.course_id}
                                                            imageSrc={curso.miniaturaUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL }
                                                            titulo={curso.name}
                                                            modulo={`Mód ${curso.count_modules}`}
                                                            moduloCompleto={`Módulo ${curso.count_modules}`}
                                                            clases={`Clases ${curso.count_classes}`}
                                                            clasesCompletas={`Clases ${curso.count_classes}`}
                                                            duracion={curso.total_duration}
                                                            duracionCompletas={curso.total_duration}
                                                            favorite_is_enabled={isFavorite ? 1 : 0}
                                                            isAsynchronous={curso.isAsynchronous}
                                                        />
                                                    );
                                                }
                                                return null;
                                            })}
                                            {programData[0].courses.every(curso => curso.isSynchronous !== 1) && (
                                                <p>{t('nohayCursosDiscponibles')}</p>
                                            )}
                                        </div>
                                    </div>
                                </div> )},
        { key: 'H', component:  <div className="md:hidden px-[5%] pb-[16px] lg:pb-[40px]">
                                    {programData.map(item =>(
                                       <CardVerMas titleDescription={t('descripcionAcademia')} description={item.description}/>
                                    ))}
                                </div>  },
        /*{ key: 'J', component:  <div className="semi-full-container 2xl:container-extraLarge py-[16px] lg:py-[40px]">
                                   
                                    <CardAcademy data={teachers} />
                                </div>  },*/
    ];
    
    if (teachers && teachers.length > 0) {
        components.push({
          key: 'A',
          component: (
            <div className="semi-full-container 2xl:container-extraLarge py-[16px] lg:pt-[40px]">
                <CardAcademy data={teachers} />
            </div>
          ),
        });
    }
    
    if (teachers && teachers.length > 0) {
        components.push({
          key: 'J',
          component: (
            <div className="semi-full-container 2xl:container-extraLarge py-[16px] lg:py-[40px]">
                <CardAcademy data={teachers} />
            </div>
          ),
        });
    }
       
    // Aplicar el orden basado en is_type_curse
    components = isCourseType(asynchronous)  ? 
      reorderComponents(components, orderAsynchronous) : 
      reorderComponents(components, orderSynchronous);
    

    
  return (
      
    <>
    
    <Navbar logoAlt="Logo"/>
    
    {programData.map(item => (
        <BannerStatic key={item.program_id} contenidoBanner={[item]} useSubtitle={isAsync}/>
    ))}
    
    {components.map(({ component }) => component)}
    
    <AvisoLegal/>
    <Footer/>
    
      

    
    
    </>
  );
};

export default AcademyTv;

