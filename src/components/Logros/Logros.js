import React, { useState,useEffect } from 'react';
import {useUsuario} from '../../hooks/useUsuario';
//import { Swiper, SwiperSlide } from 'swiper/react';
//import 'swiper/swiper-bundle.min.css';
//import 'swiper/swiper.min.css';


import UltimosLogros from './UltimosLogros/UltimosLogros'
import Navbar from '../Navbar/Navbar';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';
import Fire from '../iconos/fire';
import FireDark    from '../iconos/icono_fuego_blanco.js';

import Expandir from '../iconos/expand_more';
import Extraer from '../iconos/keyboard_arrow_up';

import ExpandirDark from '../iconos/expand_more_white';
import ExtraerDark from '../iconos/keyboard_arrow_up_white';


import CardPrueba from '../common/CardPrueba/CardPrueba';
import CardLogro from '../common/CardLogro/CardLogro';
import { useAcademia } from '../../providers/AcademiaContext';

import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import './CarouselLogro.css';



//import { useGamificacion } from '../../hooks/gamificacion/useGamificacion';
//import { useAchievementsDetail } from '../../hooks/gamificacion/useAchievementsDetail';
//import { useAchievementsRecent } from '../../hooks/gamificacion/useAchievementsRecent';
import { useGamificationGlobal } from '../../hooks/gamificacion/useGamificationGlobal';

const Logros = () => {
    
    //const { listaAcademias } = useAcademia();
    const { showLoadingForAWhile } = useLoading();
    const { t } = useTranslation();
    //const { GetObtenerInfoNivelUsuario, data } = useGamificacion();
    const { GetGamificationGlobal, currentLevel, lastUserAchievements, academyAchievements, cargando } = useGamificationGlobal(8);
    const [expandedCard, setExpandedCard] = useState(null);
    

    useEffect(() => {
      showLoadingForAWhile();
      //GetAchievementDetail();
      //GetAchievementsRecent();
      GetGamificationGlobal();
    }, []);
    //
    //
  
    /*useEffect(() => {
        GetObtenerInfoNivelUsuario();
    }, []);*/
      
    //const {translated_level_current, translated_next_level, level, avatar_next_level, recent_achievements} = data;

    /*const {logros,loadLogros} = useUsuario()
    
    useEffect(()=>{
        loadLogros()
    },[])*/
    
    const totalPoints = currentLevel ? currentLevel.currentPoints + currentLevel.remainingPoints : 0;
    
    const toggleExpandCard = (index) => {
        setExpandedCard(expandedCard === index ? null : index); // Expande o colapsa el card
    };
    
    
    
    const formatDuration = (duration) => {
      if (!duration || typeof duration !== 'string') {
        return '0hs 0min'; // Default value for invalid duration
      }
    
      const [hours, minutes] = duration.split(':').map(Number);
      return `${hours || 0}hs ${minutes || 0}min`;
    };

    
    const progressPercentage = (currentLevel?.currentPoints / totalPoints) * 100;

    const isValidCurrentLevel = currentLevel &&
                                currentLevel.levelId /*&& 
                                currentLevel.requiredPoints !== undefined &&
                                currentLevel.nextLevel !== undefined &&
                                currentLevel.remainingPoints &&
                                currentLevel.levelTranslation.name*/;
    
    const [itemsPerPage, setItemsPerPage] = useState(6); // Valor por defecto

    // Detectar el tamaño de la pantalla y ajustar items por página
    useEffect(() => {
        const updateItemsPerPage = () => {
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                setItemsPerPage(4);
            } else if (window.innerWidth >= 1024) {
                setItemsPerPage(6);
            }
        };

        updateItemsPerPage(); // Ejecutar al inicio
        window.addEventListener('resize', updateItemsPerPage); // Escuchar cambios de tamaño

        // Cleanup del event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', updateItemsPerPage);
        };
    }, []);

    const chunkArray = (array, size) =>
        array.reduce((acc, _, i) => 
            (i % size ? acc[acc.length - 1].push(array[i]) : acc.push([array[i]])) && acc, []);     


    const [theme, setTheme] = useState('light'); // Estado para el tema

    // Leer el tema desde localStorage al cargar el componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);
   
    
    
    const settings = {
        dots: true, 
        infinite: false, 
        speed: 500, 
        slidesToShow: 1, 
        slidesToScroll: 1, 
    };
    
    
    const settingsMobile = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.2, // Número de tarjetas visibles al mismo tiempo
        slidesToScroll: 1, // Desplazamiento por clic
        
    };
    
    
    console.log("Ancho de pantalla: " , window.innerWidth );
    
    return(
    
    <>
        
        <Navbar/>
        
        {isValidCurrentLevel && (
            <div className=" semi-full-container font-sans mt-[4%]">
            <div className="w-full card item dark:bg-color-dark2">
                <div className="card-body">
                    <div className="flex flex-row gap-2">
                        <div className="bg-gris-oscuro dark:bg-[#403E4BBF]  dark:border-[#65647280] font-sans !border-[7px] border-gris-medio p-5 rounded-full w-[40px] h-[40px] text-blanco flex items-center justify-center text-2xl font-semibold">
                          {/*<p>{translated_level_current?.ent_int_foreign_key}</p>*/}
                          <p>{currentLevel?.levelId}</p>
                        </div> 
                        <div className="flex flex-col w-full">
                            <div className="flex flex-row gap-[35%] justify-between	">
                                <p className="font-sans text-2xl font-semibold dark:text-blanco">{currentLevel?.levelTranslation.name}</p>
                            </div>  
                            <p className="font-sans text-sm dark:text-gris-claro lowercase">{currentLevel?.remainingPoints} {t('siguienteNivel')} {currentLevel?.levelTranslation.description}</p>
                        </div>
                    </div> 
                    <div className="w-full h-[25px] bg-naranja-cremoso-claro overflow-hidden rounded-full  relative my-2 flex justify-between">
                        <div
                            className="bg-naranja-cremoso h-[25px] rounded-full flex items-center justify-start text-white text-sm"
                            style={{ width: `${progressPercentage}%` }}
                        >
                            <div className="flex items-center">
                                <Fire className="block dark:hidden"/>
                                <FireDark className="hidden dark:block"/>
                                <p className="font-sans text-sm font-semibold dark:text-color-dark">
                                    {currentLevel?.currentPoints} / {totalPoints}
                                </p>
                            </div>
                        </div>
                        <div className="flex md:hidden">
                            {currentLevel && (
                                <img
                                    src={currentLevel.nextAvatar}
                                    className="w-[26px] h-[26px] rounded-full"
                                    alt={currentLevel.levelId}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-medium dark:text-gris-claro">{t('textoDesbloquea')} {currentLevel?.nextLevelTranslation.name} <span className="lowercase">{currentLevel?.nextLevelTranslation.description}</span></p>
                        <div className="hidden md:flex">
                            {/*{avatar_next_level?.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.avatar_txt_icon_url}
                                    className="w-[26px] h-[26px] rounded-full"
                                    alt={item.trn_txt_name}
                                />
                            ))}*/}
                            {currentLevel && (
                                <img
                                    src={currentLevel.nextAvatar}
                                    className="w-[26px] h-[26px] rounded-full dark:text-white"
                                    alt={currentLevel.levelId}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        
        {lastUserAchievements && lastUserAchievements.length > 0 && (
            <div className="semi-full-container  font-sans lg:mt-[40px]">
                <UltimosLogros lastUserAchievements={lastUserAchievements} />
            </div>
        )}
        
        <div className="semi-full-container flex flex-col font-sans lg:my-[40px] my-[20px]">
            <p className="font-sans text-marron-grisaceo text-largeB lg:text-3extra font-semibold pb-4 lg:pb-8 dark:text-blanco">{t('todosLosLogros')} </p>
            {academyAchievements.map((academy, index) => {
                const colorTag = academy.academyTags.find(tag => tag.name === "color");

                return (
                <CardPrueba color={colorTag ? colorTag.value : ""} key={index}>
                    <div className="flex flex-col md:flex-row w-full items-top justify-between gap-4 px-[10px] py-[5px] lg:px-[33px] lg:py-[13px]">
                        <div className="flex flex-row md:hidden">
                            <div className="flex-1">
                                <p className="text-small text-gris-intenso dark:text-blanco">{t('academia')}</p>
                                <p className="text-medium text-gris-azulado-profundo font-semibold dark:text-blanco">{academy.academyName}</p>
                            </div>
                
                            <div className="flex-1">
                                <p className="text-small text-gris-intenso dark:text-blanco">{t('director')}</p>
                                {academy.directors.map((director, idx) => (
                                    <p key={idx} className="text-medium text-gris-azulado-profundo font-semibold dark:text-blanco">
                                        {director.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                        
                        <div className="flex-1 hidden md:block">
                            <p className="text-small text-gris-intenso dark:text-blanco">{t('academia')}</p>
                            <p className="text-medium text-gris-azulado-profundo font-semibold dark:text-blanco">{academy.academyName}</p>
                        </div>
            
                        <div className="flex-1 hidden md:block">
                            <p className="text-small text-gris-intenso dark:text-blanco">{t('director')}</p>
                            {academy.directors.map((director, idx) => (
                                <p key={idx} className="text-medium text-gris-azulado-profundo font-semibold dark:text-blanco">
                                    {director.name}
                                </p>
                            ))}
                        </div>
            
                        <div className="flex-1">
                            <p className="text-small text-gris-intenso dark:text-blanco">{t('tiempoDuracion')}</p>
                            <p className="text-medium text-gris-azulado-profundo font-semibold dark:text-blanco">
                                {formatDuration(academy.totalDuration)}
                            </p>
                        </div>
            
                        <div className="flex-1">
                            <p className="text-small text-gris-intenso dark:text-blanco">{t('progreso')}</p>
                            <p className="text-base font-semibold text-gris-azulado-profundo mb-[3%] lg:text-base dark:text-blanco">
                                {Math.floor(academy.progress)}%
                            </p>
                            <div className="w-full bg-gris-valoracion rounded-full h-1">
                                <div className="bg-verde-claro h-1 rounded-full" style={{ width: `${academy.progress}%` }}></div>
                            </div>
                        </div>
    
                        <div className="flex items-center justify-center">
                            <button onClick={() => toggleExpandCard(index)}>
                                {expandedCard === index ? (
                                    <Extraer className="dark:hidden" />
                                ) : (
                                    <Expandir className="dark:hidden" />
                                )}
                                {expandedCard === index ? (
                                    <ExtraerDark className="hidden dark:block" />
                                ) : (
                                    <ExpandirDark className="hidden dark:block" />
                                )}
                            </button>
                        </div>
                    </div>
                    
                   {expandedCard === index && (
                    
                    <>
                        {/**/}
                        
                        
                        <div className=" space-y-4 hidden md:block mb-[20px]">
                            <p className="font-sans font-semibold text-medium md:hidden dark:text-white">{t('onlyLogros')}</p>
                           <div        className={`${
                                theme === 'dark' ? 'tema-oscuro-dots' : 'tema-claro-dots'
                              } max-w-[300px] md:max-w-[667px] md:m-auto lg:max-w-[772px] xl:max-w-[970px] 2xl:max-w-[1105px] carousel-logros`}>
                            
                                 
                                 <Slider {...settings} className="">
                                    {chunkArray(academy.achievements, itemsPerPage).map((achievementGroup, groupIndex) => (
                                        <div key={groupIndex}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[210px] md:max-h-[344px] p-[20px]">
                                                {achievementGroup.map((achievement, idx) => (
                                                    <CardLogro
                                                        key={`${groupIndex}-${idx}`}
                                                        achievement={achievement}
                                                        currentClasses={achievement.currentClasses}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                        
                    
                           <div className="carousel-mobile md:hidden">
                              <div className="w-full">
                                  
                            <Slider {...settingsMobile}>
                                {academy.achievements.map((achievement, idx) => (
                                        <div className="p-[10px]">
                                            
                                          <CardLogro 
                                            key={idx} 
                                            achievement={achievement} 
                                            currentClasses={achievement.currentClasses} 
                                        />  
                                        
                                        </div>
                                    
                                    
                                ))}
                            </Slider>
                            
                              </div> 
                           </div>
                            
                        
                        
                    
                    </>
)}
                </CardPrueba>
             );
            })}

        </div>
        <AvisoLegal/>
        <Footer/>
    </>
    
    )
}

export default Logros




{
    

    
    
    
}



