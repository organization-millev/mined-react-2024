import React, { useState , useEffect,useRef,useMemo } from 'react';
import Navbar from '../Navbar/Navbar'; 
import BannerStatic from '../common/BannerStatic/BannerStatic';
import CardAcademy from '../common/CardAcademy/CardAcademy';
import CardVerMas from '../common/CardVerMas/CardVerMas';
import ListaEnVivo from '../Programacion/ListaEnVivo/ListaEnVivo';
import Horario from '../Programacion/Horario/Horario';
import CardCursos from '../common/CardCursos/CardCursos';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import Footer from '../Footer/Footer'; 
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores'; 
import CarouselCurso from './CarouselCurso'; 
import CardKPICurso from '../common/CardKPICurso/CardKPICurso';
import CardIdioma from '../common/CardIdioma/CardIdioma';
import CardDescription from '../common/CardDescription/CardDescription';
import Valoraciones from '../Canal/Valoraciones/Valoraciones.js';
import ValoracionCurso from '../ValoracionCurso/ValoracionCurso.js';
import ClasesListado from '../ClasesListado/ClasesListado.js';
import { useHorario } from '../../hooks/sync/useHorario';
import { useCoursesModules } from '../../hooks/async/useCoursesModules.js';

import { useLiveSessions } from '../../hooks/useLiveSessions';
import { useParams,useLocation  } from 'react-router-dom';
import { useUser } from '../../providers/UserContext';
import { obtenerInfoDispositivo } from '../../utils/funciones';
import { TAG } from '../../utils/tag';
import {useCanal} from '../../hooks/useCanal';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useRecommended } from '../../hooks/academy/useRecommended';
import { useAcademia } from '../../providers/AcademiaContext';
import { useLoading } from '../../providers/LoadingContext';

import { useEnrollment } from '../../hooks/useEnrollment';
//import { useSaveRatingCourse } from '../../hooks/async/useSaveRatingCourse';
//import Resenas from '../Canal/Resenas/Resenas.js';

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

const CursoTv = () => {
    
   
    
    const { showLoadingForAWhile } = useLoading();
    //const { valoracionList , GetRatingsList} = useRatingCourse();
    
    useEffect(() => {
        showLoadingForAWhile();
        //GetRatingsList()
    }, []);
    
    
    
    
    
    const { nameProgram , nameCurso } = useParams();
    //
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const { academias, getCoursesDetails, getTeachers , getIdsByName,getTeachersByCourseId } = useAcademia();
    const [programCurso, setProgramCurso] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const { userData , isCourseType  , asynchronous, courseTypeValue,setCourseType,synchronous } = useUser();
    const {canal,loadCanal,resenas,preguntasRespuestas,listasReproduccion} = useCanal()
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const [kpi, setKpi] = useState([]);
    const [idiomasDisponibles, setIdiomasDisponibles] = useState([]);
    const { t } = useTranslation();
    const synchronousRef = useRef(null);
    const { modules , updateCourseId ,idiomas } = useCoursesModules();
    const { GetHorario, horario } = useHorario();
    const { enviarRollment } = useEnrollment();
    const [ colorAcademia, setColorAcademia] = useState([]);
    
    //
    
    const ids = getIdsByName(nameProgram, nameCurso , language_code);
        

    useEffect(() => {
        if (ids && academias.length > 0) {
            const data = getCoursesDetails(academias, ids.courseId);
            setProgramCurso([data]);
            const teachersData = getTeachersByCourseId(ids.programId, ids.courseId);
            setTeachers(teachersData);
            setLoadingTeachers(false);
            setKpi(data.kpi);
            setIdiomasDisponibles(data.idiomas);
            updateCourseId(ids.courseId);
            GetHorario(ids.courseId);
            setColorAcademia(data.color);
            //
        }
    }, [nameCurso, academias]);
    
    const [ academyType, setAcademyType ] = useState(() => localStorage.getItem('courseType') || asynchronous);
    function getAcademyType(){
        if(academyType === 'Asincrónico'){
            return 2;
        }else if(academyType === 'Sincrónico'){
            return 1;
        }
        return 0
    }
    const academyValue = useMemo(() => getAcademyType(), [academyType]);
    //
    useEffect (() => {
        if (ids?.courseId && academyValue > 0 && academias.length > 0) {
            enviarRollment(ids.courseId,academyValue,ids.programId,true);
        }else{
            
        }
    },[academyValue, ids?.courseId, academias])
    
    
    
    
    const { GetCursoRecommended, cursosRecommended } = useRecommended(ids ? ids.courseId : null);
    useEffect(() => {
        if (ids && ids.courseId) {
            //
            //GetRatingsList();
            GetCursoRecommended();
        }
    }, [ids]);
    
    const [selectedIdModulo, setSelectedIdModulo] = useState(null);
    //const { registrarValoracionCourse } = useSaveRatingCourse();
    useEffect(() => {
        if (modules && modules.length > 0) {
            const firstClassWithIdModulo = modules
                .flatMap(module => module.subtitulos)
                .flatMap(subtitulo => subtitulo.clases)
                .find(clase => clase.idModulo);

            if (firstClassWithIdModulo) {
                setSelectedIdModulo(firstClassWithIdModulo.idModulo);
                //
            }
        }
    }, [modules]);
    //const handleSubmitComentarios = () => {
        //registrarValoracionCourse(3,"comentario prueba",selectedIdModulo,true);
        //alert(formValues.tipoConsulta)
    //};
    
    

    const [showDropdownPais, setShowDropdownPais] = useState(false);
    
    useEffect(() => {
        setShowDropdownPais(academyType === 'Sincrónico');
    }, [academyType]);
    
    
    const { sessions, cargando , getSessionDetailsMinLittle,sessionList } = useLiveSessions();
    
    const [listado, setListado] = useState([]);
    useEffect(() => {
        setListado(sessionList);
    }, [sessions]);
    



 
    
    const isMobile = useMediaQuery({ maxWidth: 767 });
    
    const orderAsynchronous = ['D','E','F','G','H','J','K','M']; // Orden para Asincrónico
    const orderSynchronous = ['A', 'B', 'C']; // Orden para Sincrónico
    let components = [
        { key: 'A', component:  <div className="md:block semi-full-container 2xl:container-extraLarge py-[40px]">
                                    {programCurso.map(item => (
                                        <CardVerMas titleDescription={item.subtitle} description={item.description}/>
                                    ))}
                                </div>  },
        { key: 'B', component:  <div className="dark:bg-color-dark2 bg-plata-suave font-sans">
                                    {listado && listado.length > 0 && (
                                         <ListaEnVivo obj={{ listado }}/>
                                    )}
                                </div> },
        { key: 'C', component:  <div className="lg:px-[10%] 2xl:container-extraLarge 2xl:flex-col font-sans py-[16px] lg:py-[40px]">
                                    {horario && horario.length > 0 && (
                                        <Horario horario={horario} color="#292735"  nameProgram={nameProgram} nameCurso={nameCurso}   colorAcademia={colorAcademia} />
                                    )}
                                </div> },
                                
        { key: 'D', component:  <div className="semi-full-container 2xl:container-extraLarge py-[40px]">
                                    <CardKPICurso items={kpi} />
                                </div> },
        
        { key: 'E', component:  idiomas && idiomas.length > 0 && (
                                <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
                                     <CardIdioma codigos={idiomas}  />
                                </div> )},
        
        /*{ key: 'F', component:  <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
                                    <CardAcademy data={teachers}    />
                                </div> },*/
        
        { key: 'G', component:  <div className="hidden md:block semi-full-container 2xl:container-extraLarge pb-[40px]">
                                {programCurso.map(item => (
                                    <CardDescription nombreAcademia={t('descripcionCurso')} descriptionAcademy={item.description}/>
                                ))}
                                </div> },
                                
        { key: 'H', component:  <div className=" w-full semi-full-container 2xl:container-extraLarge pb-[40px]">
                                    {ids && ids.courseId && (
                                        <ClasesListado  courseId={ids.courseId} nameCurso={nameCurso} nameProgram={nameProgram}/>
                                    )}
                                </div> },                        
                                
        /*{ key: 'I', component:  <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
                                    <Valoraciones obj={canal.valoraciones} calificacion={canal.calificacion} />
                                </div> },*/
                                
        { key: 'J', component:  <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
                                    <ValoracionCurso courseId={ids ? ids.courseId : null} selectedIdModulo={selectedIdModulo} />
                                </div> },
                                
        { key: 'K', component:  <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
                                    <div className="flex flex-col items-center lg:flex-row lg:justify-between w-full 2xl:gap-[136px]">
                                        <div className="flex flex-col items-center justify-center mb-6 lg:mb-0 w-[171px] lg:w-[317px]">
                                            <p className="font-sans text-largeB lg:text-2extra font-semibold text-gris-azulado-profundo text-center mb-3 dark:text-blanco">{t('complementaEducacion')}</p>
                                            <button className="boton-cuarto  dark:boton-secundario text-medium font-bold h-[40px]" onClick={() => {
                                                setCourseType(synchronous);
                                                window.scrollTo(0, 0);
                                            }}>{t('minedEnVivo')} </button>
                                        </div>
                                        <div className="!w-full lg:max-w-[600px] 2xl:max-w-[715px] h-[298px] object-cover grid place-items-center">
                                            {programCurso.map(item => (
                                            <div
                                                key={item.program_id}  // Asegúrate de usar una clave única para cada elemento mapeado
                                                className="h-full w-full bg-center bg-cover grid place-items-center"
                                                style={{ backgroundImage: `url(${item.bannerUrl})` }}  // Interpolación correcta de la URL de fondo
                                            >
                                                <img src={item.logoUrl} className="max-w-full max-h-full w-[219px] " />
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                 },
                                
        { key: 'M', component:  <div className="mb-[40px]">
                                    <CarouselCurso tituloCarouselCurso={t('cursosRecomendados')}  cursos={cursosRecommended} isDetail={false}/>
                                </div> },
    ];
    
    if (teachers && teachers.length > 0) {
        components.push({
          key: 'F',
          component: (
            <div className="semi-full-container 2xl:container-extraLarge pb-[40px]">
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
    
    <Navbar logoSrc="../assets/images/MINED TV.png" logoAlt="Logo" showDropdownPais={showDropdownPais} />
    
    
    {programCurso.map(item => (
        <BannerStatic key={item.program_id} contenidoBanner={[item]} />
    ))}
    
    {components.map(({ component }) => component)}
    
    <AvisoLegal/>
    <Footer/>
    
      

    
    
    </>
  );
};

export default CursoTv;

