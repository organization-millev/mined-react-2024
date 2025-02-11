import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import CarouselReels from '../CarouselReels/CarouselReels';
import InputSearch from '../common/InputSearch/InputSearch';
import PreguntasFrecuentes from '../common/PreguntasFrecuentes/PreguntasFrecuentes';
import Contactanos from '../common/Contactanos/Contactanos';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import CloseWhite from '../iconos/closeWhite';
import Footer from '../Footer/Footer';


import { usePreguntas } from '../../hooks/help/usePreguntas';
import { useReels } from '../../hooks/help/useReels';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';


const CentroAyuda = () => {
    const { showLoadingForAWhile } = useLoading();
    
    useEffect(() => {
      showLoadingForAWhile();
    }, []);
    
    const [searchValue, setSearchValue] = useState('');
    const { GetPreguntas, faqs } = usePreguntas();
    const [filteredFaqs, setFilteredFaqs] = useState([]);
    const { GetReels, reels, cargando } = useReels();
    const { t } = useTranslation();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        GetPreguntas();
        GetReels();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const normalizedSearchValue = searchValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            setFilteredFaqs(
                faqs.filter(faq => {
                    const normalizedQuestion = faq.question.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
                    const normalizedAnswer = faq.answer.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
                    return normalizedQuestion.includes(normalizedSearchValue) || normalizedAnswer.includes(normalizedSearchValue);
                })
            );
        } else {
            setFilteredFaqs(faqs);
        }
    }, [searchValue, faqs]);
    
    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl); // Establece el video seleccionado
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentVideo(null); // Resetea el video cuando se cierra el modal
    };
    
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
  
    return (
        <>
            <Navbar/>
            <div className="relative w-full h-[219px] lg:h-[255px]">
                <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('../assets/images/BANNER_atencion_al_cliente.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="relative z-10 flex items-center justify-center w-full h-full">
                    <div className="flex flex-col justify-center gap-3 p-4 w-full h-full md:w-[572px] font-sans">
                        <p className="text-small font-medium text-white text-center lg:text-large">{t('necesitasAyuda')} </p>
                        <p className="font-bold text-extra text-white text-center lg:text-3extra">{t('tituloCentroAyuda')} </p>
                        <InputSearch
                            placeholder={t('buscar')}
                            name="search"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="border-white text-white focus:bg-transparent focus:border-white"
                            iconType="search_white"
                            placeholderColor="placeholder-white"
                        />
                    </div>                                                                                                                                                                                                                                                       
                </div>
            </div>

            
            <div className="px-[5%] lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 justify-center mx-auto py-[40px]">
                <h2 className="text-xl lg:text-3xl font-semibold text-center lg:mb-8 font-sans text-gris-azulado-profundo mb-[20px] dark:text-blanco">{t('preguntasFrecuentes')}</h2>
                {filteredFaqs.length > 0 ? (
                    <PreguntasFrecuentes faqs={filteredFaqs} />
                ) : (
                    <p className="text-center text-gray-500">
                        {t('noSeEncontroBusqueda')} "{searchValue}".
                    </p>
                )}
            </div>
            
            {reels && reels.length > 0 &&
                <div className="px-[5%] mb-[40px] lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 justify-center mx-auto">
                    <p className="font-sans text-largeB font-semibold text-center lg:text-2extra lg:font-semibold dark:text-blanco">{t('reelsAyuda')} </p>
                    <CarouselReels openModal={openModal} reels={reels}/>
                </div>
            }
            
            <div className="px-[5%] mb-[40px] lg:px-[142px] 2xl:max-w-[1152px] 2xl:px-0 justify-center mx-auto">
                <Contactanos/>
            </div>
            
            <AvisoLegal/>
            
            <Footer/>
            
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="bg-white  overflow-hidden w-auto max-w-[90%] h-auto">
                        
                        <div className="rounded-lg">

                                <div className="!w-[300px] z-50  absolute h-[30px] flex justify-end px-5 pt-2">
                                    <CloseWhite onClick={closeModal} className="!p-[6px]" />
                                </div>
                            
                            {currentVideo && (
                                <iframe
                                
                                
                                    width="100%"
                                    height="500"
                                    src={currentVideo}
                                    title="Video Reel"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    classNa="m-0"
                                ></iframe>
                            )}
                            
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CentroAyuda;