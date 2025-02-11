import React, { useState,useEffect } from 'react';
import { useParams,useNavigate , useLocation  } from 'react-router-dom';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas';
import Navbar from '../Navbar/Navbar'; 
import SeccionDescarga from '../SeccionDescarga/SeccionDescarga';
import ListadoElementos from '../ListadoElementos/ListadoElementos';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal'; 
import Footer from '../Footer/Footer'; 
import  './CursosVideo.css'; 
import Modal from '../common/Modal/Modal';
import ClaseAnterior from '../iconos/skip_next_blanco'; 
import ClaseSiguiente from '../iconos/skip_previous_blanco'; 

import ClaseSiguienteDark  from '../iconos/skip_next_dark'; 
import ClaseAnteriorDark from '../iconos/skip_previous_dark'; 

import { useCoursesModules } from '../../hooks/async/useCoursesModules.js';
import { useUser } from '../../providers/UserContext';
import { useAcademia } from '../../providers/AcademiaContext';
import { useCursoVideo } from '../../hooks/async/useCursoVideo';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';
import { useNavigation } from '../../providers/NavigationContext';

const CursosVideo = () => {
    const { showLoadingForAWhile } = useLoading();
    
    useEffect(() => {
      showLoadingForAWhile();
    }, []);
    
    const { t } = useTranslation();
    const location = useLocation();
    const { goToAcademyCursoClase } = useNavigation();
    const { getTeachers,academias , getIdsByName,formatForURL,getCoursesDetails } = useAcademia();
    const { courseTypeValue } = useUser();
    const { GetCursoVideo, videos } = useCursoVideo();
    const { nameProgram, nameCurso , nameClase } = useParams();
    const { idClass } = location.state || {};
    const { modules ,setModules, updateCourseId } = useCoursesModules();
    
    const navigate = useNavigate();
    const [programCurso, setProgramCurso] = useState([]);
    const [idProgram, setIdProgram] = useState();
    const [idCurso, setIdCurso] = useState();
    const [storedIdClass, setStoredIdClass] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);
    const [currentClass, setCurrentClass] = useState(null);
    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const teachers = getTeachers(idProgram,courseTypeValue);
    const teachersNames = teachers.map(item => item.name).join(" / ");
    //console.log('teachersNames',teachers)
    const findClassPosition = (classes) => {
        let allClasses = [];
        for (const module of modules) {
            for (const subtitulo of module.subtitulos) {
                allClasses = [...allClasses, ...subtitulo.clases];
            }
        }
        return allClasses;
    };
    
    const handlePreviousClass = () => {
        const allClasses = findClassPosition();
        const currentIndex = allClasses.findIndex(clase => clase.idModulo === parseInt(storedIdClass));

        if (currentIndex > 0) {
            const previousClass = allClasses[currentIndex - 1];
            const idClass = previousClass.idModulo;
            const encodedClassName = encodeURIComponent(formatForURL(previousClass.nombre));
            goToAcademyCursoClase(formatForURL(nameProgram), formatForURL(nameCurso), encodedClassName , { idClass });
        }
    };
     
    const handleNextClass = () => {
        const allClasses = findClassPosition();
        const currentIndex = allClasses.findIndex(clase => clase.idModulo === parseInt(storedIdClass));
    
        if (currentIndex < allClasses.length - 1) {
            const nextClass = allClasses[currentIndex + 1];
            const nextClassId = nextClass.idModulo;
    
            // Si la siguiente clase no está habilitada, la habilitamos
            if (!nextClass.habilitado) {
                // Actualiza el estado de la clase para habilitarla
                nextClass.habilitado = true;
    
                // Encuentra el módulo al que pertenece la clase
                const updatedModules = modules.map(module => {
                    const updatedSubtitulos = module.subtitulos.map(subtitulo => {
                        return {
                            ...subtitulo,
                            clases: subtitulo.clases.map(clase => 
                                clase.idModulo === nextClassId ? { ...clase, habilitado: true } : clase
                            )
                        };
                    });
    
                    const completedCount = module.subtitulos.reduce((acc, subtitulo) => {
                        return acc + subtitulo.clases.filter(clase => clase.habilitado).length;
                    }, 0);
    
                    const totalCount = module.subtitulos.reduce((acc, subtitulo) => acc + subtitulo.clases.length, 0);
    
                    return {
                        ...module,
                        subtitulos: updatedSubtitulos,
                        viewedTotal: `${completedCount}/${totalCount}` // Actualiza el progreso
                    };
                });
    
                setModules(updatedModules); // Actualiza el estado de los módulos
            }
    
            // Navegar a la siguiente clase
            const encodedClassName = encodeURIComponent(formatForURL(nextClass.nombre));
            goToAcademyCursoClase(formatForURL(nameProgram), formatForURL(nameCurso), encodedClassName , { idClass: nextClassId });
        }
    };
    
    const isFirstClass = () => {
        const allClasses = findClassPosition();
        return allClasses.findIndex(clase => clase.idModulo === parseInt(storedIdClass)) === 0;
    };
    
    const isLastClass = () => {
        const allClasses = findClassPosition();
        return allClasses.findIndex(clase => clase.idModulo === parseInt(storedIdClass)) === allClasses.length - 1;
    };
    
    const processDescriptionWithLineBreaks = (description) => {
        if (description && typeof description === 'string') {
            return description; 
        }
        return description;
    };
    
    

    const areAllModulesComplete = () => {
        return videos.every(item => item.module_completed === 1);
    };
    
    const handleGenerateCertificate = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        // Cierra el modal
        setIsModalOpen(false);
    };
    
    const handleContinuar = () => {
        navigate('/mis_constancias', { state : {nameProgram}});
    };
    
    
    useEffect(() => {
        // Si idClass viene en el estado (es decir, de la navegación)
        if (idClass && !isNaN(idClass)) {
          // Guardamos el nuevo idClass en localStorage
          localStorage.setItem('idClass', idClass);
          setStoredIdClass(idClass); // Actualizamos el state con el idClass del estado
        } else {
          // Si no hay idClass en el estado, intentamos recuperar el idClass del localStorage
          const storedValue = localStorage.getItem('idClass');
          const parsedStoredValue = parseInt(storedValue);  // Parseamos a entero
          if (!isNaN(parsedStoredValue)) {
            setStoredIdClass(parsedStoredValue);  // Actualizamos el state con el idClass del localStorage
          }
        }  
    }, [idClass]);
    
    
    //console.log("id cursoo",idCurso);


    useEffect(() => {
        if (academias && academias.length > 0 ) {
            const ids = getIdsByName(nameProgram, nameCurso , language_code);
            setIdProgram(ids?.programId);
            setIdCurso(ids.courseId);
            const data = getCoursesDetails(academias, ids.courseId);
            setProgramCurso([data]);
        }
    }, [ academias]);
    
    useEffect(() => {
        if (storedIdClass) {
            GetCursoVideo(storedIdClass);
        }
    }, [storedIdClass]);
    
    useEffect(() => {
        if (idCurso !== undefined) {
            updateCourseId(idCurso); 
        }
    }, [idCurso]);
  
    useEffect(() => {
        if (modules.length > 0 && storedIdClass) {
            let foundClass = null;
            for (const module of modules) {
                for (const subtitulo of module.subtitulos) {
                    foundClass = subtitulo.clases.find(clase => clase.idModulo === parseInt(idClass));
                    if (foundClass) {
                        setCurrentClass(foundClass);
                        break;
                    }
                }
                if (foundClass) break;
            }
        }
    }, [modules, storedIdClass]);
    
    
    
  return (
      
    <div>
        <Navbar  logoAlt="Logo"/>
        <div className="2xl:container-extraLarge">
            <div className="curso-video w-full lg:px-[10%] lg:flex lg:flex-row lg:gap-[20px] lg:mt-8  md:px-none 2xl:px-0 ">
                
                <div className="w-full lg:w-[70%] lg:pb-10">
                    <div>
                        
                        {videos.map(item => {
                            
                        
                            return (
                                <div className="relative w-full pb-[56.25%] h-0" key={item.id}>
                                    <iframe
                                        src={item.cont_txt_video_url}
                                        className="absolute top-0 left-0 w-full h-full"
                                        frameBorder="0"
                                        allowFullScreen
                                        moduleComplete={item.module_completed}
                                    ></iframe>
                                </div>
                            );
                        })}


                        
                        <div className="px-[5%] lg:px-0 flex flex-col gap-2">
                            
                            <div className="flex flex-col justify-center font-sans mt-4 md:hidden text-gris-azulado-profundo">
                                <p className="text-xl font-semibold mb-1 dark:text-blanco">{currentClass ? currentClass.nombre : "Nombre de video/Clase"}</p>
                                {videos.map(item => (
                                    <p key={item.sessIntId} className="text-medium font-medium mb-1 dark:text-blanco">
                                            {item.instructor_name}
                                    </p>
                                ))} 
                            </div>
                            
                            <div className="flex justify-center lg:flex md:justify-end gap-4 mt-4">
                                {!isFirstClass() && (
                                    <button
                                        className="btn-curso-clase-anterior dark:boton-secundario flex flex-row items-center justify-end lg:justify-center gap-[25px] md:gap-[19px] md:w-auto boton-primario font-bold !rounded-[40px] w-1/2 !py-[10px] !px-[16px] text-xs"
                                        onClick={handlePreviousClass}
                                    >
                                        <ClaseAnterior className="w-[20px] !p-0 block dark:hidden" />
                                        <ClaseAnteriorDark className="w-[20px] !p-0 hidden dark:block" />
                                        {t('btnAnteriorClase')}
                                    </button>
                                )}
                                {isLastClass() && areAllModulesComplete() && (
                                        <button
                                            className="btn-generar-certificado dark:boton-secundario flex flex-row items-center justify-end lg:justify-center gap-[25px] md:gap-[19px] md:w-auto boton-primario font-bold !rounded-[40px] w-1/2 !py-[10px] !px-[16px] text-xs"
                                            onClick={handleGenerateCertificate}
                                        >
                                            {t('generarCertificado')}
                                        </button>
                                    )}
                                {!isLastClass() && (
                                    <button
                                        className="btn-curso-clase-siguiente dark:boton-secundario flex flex-row items-center boton-primario font-bold gap-[6px] md:gap-0 !rounded-[40px] w-1/2 md:w-auto text-xs !py-[10px] !px-[16px]"
                                        onClick={handleNextClass}
                                    >
                                        {t('btnSiguienteClase')}
                                        <ClaseSiguiente className="w-[20px] !p-0 block dark:hidden" />
                                        <ClaseSiguienteDark className="w-[20px] !p-0 hidden dark:block" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="font-sans mb-8 hidden md:block">
                                
                                <p className="text-xl font-bold mb-2 text-[#403E4B] dark:text-blanco">{currentClass ? currentClass.nombre : "Nombre de video/Clase"}</p>
                                
                                    {videos.map(item => (
                                        <p key={item.sessIntId} className="text-medium font-medium mb-1 dark:text-blanco">
                                                {item.instructor_name}
                                        </p>
                                    ))} 
                                
                                    <p 
                                        className="text-sm lg:text-base dark:text-blanco font-normal"
                                        dangerouslySetInnerHTML={{ __html: processDescriptionWithLineBreaks(currentClass ? currentClass.descripcion : "descripcion") }}
                                    />                                
                            </div>
                            
                            <div className={`rounded-[20px] md:hidden overflow-hidden  flex ${showFullContent ? 'h-auto' : 'h-auto'} transition-height duration-300 ease-in-out`}>
                                <div className=" pb-4 pt-6 md:flex md:flex-col md:justify-center md:px-[5%]">
                                    <p className={`text-marron-oscuro text-small lg:text-medium font-sans dark:text-blanco ${showFullContent ? '' : 'line-clamp-4'}`}>
                                        {currentClass ? currentClass.descripcion : "descripcion"}
                                    </p>
                                    <p className="dark:text-blanco text-gris-azulado-profundo text-small text-center m-4 lg:text-medium font-sans font-bold cursor-pointer lg:hidden" onClick={toggleContent}>
                                        <u>{showFullContent ? t('verMenos')  : t('verMas') }</u>
                                    </p>
                                </div>
                            </div>    
                        </div>
    
                    </div>
                    
                    <div className="px-[5%] lg:px-0 ">
                        <SeccionDescarga idCurso={idCurso} xlGridCols={6}/>
                    </div>
                </div>
                
                <div className="lg:w-[373px] mt-9 lg:mt-0 px-[5%] lg:px-0">
                    <ListadoElementos idCurso={idCurso} modules={modules} 
                        nameProgram={nameProgram} 
                        nameCurso={nameCurso}
                        classId={storedIdClass}
                        formatForURL={formatForURL}
                        programCurso={programCurso}
                        setModules={setModules}
                    />
                    
                    
                </div>
                
                
            </div>
        </div>
        
        <Modal show={isModalOpen} onClose={handleCloseModal} className="font-sans">
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <p className="mt-2">{t('mensajeModalCertificado')}</p>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-row justify-end gap-2">
                    <button className="boton-warning" onClick={handleCloseModal}>{t('eliminarCerrar')}</button>
                    <button className="boton-primario" onClick={handleContinuar}>
                        {t('continuar')}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
            
        
        <AvisoLegal/>
        <Footer/>
    </div>
  );
};

export default CursosVideo;

