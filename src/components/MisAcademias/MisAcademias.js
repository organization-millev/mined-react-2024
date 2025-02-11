import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import FlechaDer from '../iconos/arrow_forward.js';
import FlechaDerDark from '../iconos/FlechaDerBlanco.js';
import './MisAcademias.css';

import FlechaAbajoDark from '../iconos/expand_more_white';
import FlechaArribaDark from '../iconos/keyboard_arrow_up_white';

import FlechaArriba from '../iconos/keyboard_arrow_up.js';
import FlechaAbajo from '../iconos/expand_more';

import EstrellaOro from '../iconos/estrella_oro.js';
import LikePlata from '../iconos/like_plata.js';
import GraficoPastel from '../common/GraficoPastel/GraficoPastel.js';
import CardPrueba from '../common/CardPrueba/CardPrueba.js';
import CarouselCursoV2 from './CarouselCursoV2.js';

import CarouselAcademia from '../CarouselAcademia/CarouselAcademia';
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas.js';

import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';
import { useTranslation } from 'react-i18next';
import { useArchievements } from '../../hooks/academy/useArchievements';
import { useAcademia } from '../../providers/AcademiaContext';
import { useLoading } from '../../providers/LoadingContext';

import { ErroresContext } from '../../providers/ErroresContext';
import Medallas from './Medallas';
import { useNavigate } from 'react-router-dom';

const MisAcademias = () => {
    
    const { showLoadingForAWhile } = useLoading();
    
    useEffect(() => {
        showLoadingForAWhile();
    }, []);
      
    const { listaAcademias , getProgramDetailsByCourseId } = useAcademia();
    const { GetArchievements, achievements } = useArchievements();

    useEffect(() => {
        if (listaAcademias.length > 0) {
            GetArchievements(listaAcademias.filter(academia => academia.is_enabled === 1));
        }
    }, [listaAcademias]);
    
    const [mostrarContenido, setMostrarContenido] = useState({});
    const [mostrarCursos, setMostrarCursos] = useState({});

    
    //

    const toggleContenido = (index) => {
        setMostrarContenido(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const toggleCursos = (index) => {
        setMostrarCursos(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const { t } = useTranslation();
    
    const navigate = useNavigate();
    
    const handleCertificados = () =>{
        navigate('/mis_constancias');
    }
    
    function formatHoursAndMinutes(decimalHours) {
        const totalMinutes = Math.round(decimalHours * 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        return `${hours}hs ${minutes}min`;
    }
    
    function formatHours(decimalHours) {
        const hours = Math.floor(decimalHours); // Redondea hacia abajo para obtener las horas completas
        return `+${hours}hs`;
    }
    
    

    
    

    

    return (
        <>
            <Navbar />
            
            <div className="2xl:max-w-[1152px] 2xl:px-0 w-full justify-center mx-auto px-[5%] lg:px-[10%]">
                
                <div className="mt-[3%] flex flex-row justify-between items-center mb-[2%]">
                    <div className="text-extra lg:text-3extra font-semibold font-sans text-marron-grisaceo dark:text-blanco">{t('misAcademias')}</div>
                    
                    <div className="hidden md:flex flex-row items-center cursor-pointer" onClick={handleCertificados}>
                        <div className="font-sans font-bold text-large dark:text-blanco"><u>{t('misCertificados')}</u></div>
                        <FlechaDer className="block dark:hidden" />
                        <FlechaDerDark className="hidden dark:block w-[40px] h-[40px]" padding="13px" />
                    </div>
                </div>

                <div className="w-full h-auto font-sans mb-[3%]">
                    {achievements.map((academia, index) => (
                        <CardPrueba key={index} color={academia.color}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="col-span-6 md:col-span-1">
                                    <p className="text-small font-medium  text-gris-azulado-profundo dark:text-blanco">{t('academia')}</p>
                                    <p className="text-medium font-semibold text-gris-azulado-profundo lg:text-base max-w-[200px] dark:text-blanco">{academia.program_name}</p>
                                </div>
                            
                                <div className="col-span-6 md:col-span-1">
                                    <p className="text-small font-medium text-gris-azulado-profundo dark:text-blanco">{t('tiempoDuracion')}</p>
                                    <p className="text-medium font-semibold text-gris-azulado-profundo lg:text-base dark:text-blanco">{academia.formatted_time}</p>
                                </div>
                            
                                <div className="col-span-12 md:col-span-1">
                                    <p className="text-small font-medium text-gris-azulado-profundo dark:text-blanco">{t('progreso')}</p>
                                    <div className="desplegar-academia-estilo !flex-row !justify-between">
                                        <p className="text-medium font-semibold text-gris-azulado-profundo lg:text-base dark:text-blanco">{academia.progress_lessons}%</p>
                                        <div className="hidden lg:block" onClick={() => toggleContenido(index)}>
                                        {mostrarContenido[index] ? 
                                        <>
                                        <FlechaArriba className="cursor-pointer block dark:hidden" /> 
                                        <FlechaArribaDark className="cursor-pointer hidden dark:block" />     
                                        </>
                                        
                                        : 
                                        <>
                                        <FlechaAbajo className="cursor-pointer  block dark:hidden" />
                                        <FlechaAbajoDark className="cursor-pointer hidden dark:block" />     
                                        </>
                                        }
                                    </div>
                                    </div>
                                    
                                    <div className="w-[80%] bg-blanco rounded-full h-[4px]">
                                        <div className="bg-verde-claro h-[4px] rounded-full" style={{ width: `${academia.progress_lessons}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            
                            {mostrarContenido[index] && (
                                <div className="mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3">
                                        <div className="md:col-span-1 w-auto lg:w-auto overflow-hidden shadow-none  lg:flex lg:justify-end flex-row-reverse lg:gap-0">
                                            
                                            {(academia.count_courses > 0 || academia.remainig_courses > 0) && ( <GraficoPastel ClasesTomadas={academia.count_courses} ClasesRestantes={academia.remainig_courses} />)}
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mt-5 md:mt-0">
                                                <div className="col-span-1 md:col-span-2">
                                                    <p className="text-xs font-sans font-normal text-gris-azulado-profundo dark:text-blanco">{t('horasVisualizacion')}</p>
                                                        <p className="font-sans text-sm font-semibold lg:text-xl dark:text-blanco"> {formatHours(academia.sum_hours)}</p>
                                                </div>
                                                <div className="col-span-1 md:col-span-2">
                                                    <p className="text-xs font-sans font-normal text-gris-azulado-profundo dark:text-blanco">Horas visualizadas último mes</p>
                                                    <p className="font-sans text-sm font-semibold lg:text-xl dark:text-blanco"> {formatHours(academia.sum_hours)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="md:col-span-1 my-5 md:my-0">
                                            <div className="">
                                                <p className="text-sm font-sans font-semibold mt-1 dark:text-blanco">
                                                        
                                                        {t('tuCertificado')} ({`${Array.isArray(academia.certificates) ? academia.certificates.length : 0}`})
                                                </p>
                                                <div className="relative w-[270px] h-[180px] overflow-y-auto no-scrollbar">
                                                    <div className="flex flex-col space-y-3">
                                                        {Array.isArray(academia.certificates) && academia.certificates.map((certificate, index) => (
                                                            <div key={index} className="flex-shrink-0 w-[300px] h-[200px]">
                                                                <img src={getProgramDetailsByCourseId(certificate.cert_int_course_id).certMiniatureUrl } alt={`Certificado ${index + 1}`} className=" w-[260px] " />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        <div className="md:col-span-1 my-5 md:my-0">
                                            <p className="font-sans text-xs font-normal text-gris-azulado-profundo">{t('logrosMedallas')}</p>
                                            <p className="text-sm font-sans font-semibold mt-1 lg:text-base dark:text-blanco ">{t('tusMedallas')}</p>
                                            <div className="flex flex-wrap gap-2 justify-start py-2">
                                                
                                               <Medallas courseAchievements={academia.courseAchievements} />

                                                
                                            </div>
                                            
                                            {/*
                                            <div className="flex flex-wrap gap-2 justify-center mt-3">
                                                <EstrellaOro width="64px" height="64px" padding="0px" />
                                                <LikePlata width="64px" height="64px" padding="0px" />
                                                <LikePlata width="64px" height="64px" padding="0px" />
                                                <LikePlata width="64px" height="64px" padding="0px" />
                                                <EstrellaOro width="64px" height="64px" padding="0px" />
                                                <LikePlata width="64px" height="64px" padding="0px" />
                                            </div>
                                            */}
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="">
                                       <div className="flex items-center cursor-pointer" onClick={() => toggleCursos(index)}>
                                            <div className="font-sans font-bold text-large dark:text-gris-claro"><u>{mostrarCursos[index] ?  t('ocultarCursos') : t('verCursos')}</u></div>
                                            {mostrarCursos[index] ? 
                                            <>
                                                <FlechaArriba className="cursor-pointer block dark:hidden" /> 
                                                <FlechaArribaDark className="cursor-pointer hidden dark:block" />     
                                                </>
                                                
                                                : 
                                                <>
                                                <FlechaAbajo className="cursor-pointer  block dark:hidden" />
                                                <FlechaAbajoDark className="cursor-pointer hidden dark:block" />     
                                            </> 
                                            }
                                        </div>
                                        {mostrarCursos[index] && (
                                        
                                            <div className="contenedor-carousel-misacademias">
                                                {/*
                                                */}
                                                <CarouselCursoV2 tituloCarouselCurso={t('cursoCarousel')} courses={academia.courses_viewed} tag={academia.program_name} programId={academia.program_id}/>
                                            
                                            </div>
                                        
                                        )}
                                    </div> 
                                    
                                    
                                   
                                    
                                </div>
                            )}

                           
                            
                            
                            
                            
                         
                            
                            
                            <div className="flex items-center justify-center lg:hidden" onClick={() => toggleContenido(index)}>
                                {mostrarContenido[index] ? 
                               <>
                                    <FlechaArriba className="cursor-pointer block dark:hidden" /> 
                                    <FlechaArribaDark className="cursor-pointer hidden dark:block" />     
                                    </>
                                    
                                    : 
                                    <>
                                    <FlechaAbajo className="cursor-pointer  block dark:hidden" />
                                    <FlechaAbajoDark className="cursor-pointer hidden dark:block" />     
                                </>   
                                }
                            </div>
                            
                            
                        </CardPrueba>
                    ))}
                </div>
                
                
                
                
                
            </div>
            
            
           
            
            
            
            <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')}  />
            <NuestrasHerramientas titulo={t('nuestrasHerramientas')}  filter={false}/>
            <AvisoLegal />
            <Footer />
        </>
    );
};

export default MisAcademias;
