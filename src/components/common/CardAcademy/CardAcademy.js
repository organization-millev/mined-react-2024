import React, { useState, useEffect } from 'react';
import Iconos from '../../iconos/iconos';
import { useTeacherAcademyFavorite } from '../../../hooks/academy/useTeacherAcademyFavorite';
import BookmarkLoader from '../../iconos/bookmarkLoader.js';

const CardAcademy = ({ data: initialData }) => {
    
    
   
    
    const { marcarFavorito } = useTeacherAcademyFavorite();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState(initialData);
    const [isLoadingFavorite, setIsLoadingFavorite] = useState(false); // Estado de carga
    const [currentItem, setCurrentItem] = useState([]);
    const [currentImg, setCurrentImg] = useState(process.env.REACT_APP_DEFAULT_NO_IMAGE_URL);
    
    
    // Nuevo estado para controlar si está marcado como favorito
    const [isFavorited, setIsFavorited] = useState(data[activeIndex]?.isFavorited || false);

    const buttonClasses = 'text-blanco dark:bg-color-dark bg-gris-claro bg-opacity-50 p-1 rounded-full';

    useEffect(() => {
        setData(initialData);
        setIsFavorited(initialData[activeIndex]?.isFavorited || 0);
        setCurrentItem(initialData[activeIndex]);
        const imageUrl = initialData[activeIndex]?.imageUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL;
        setCurrentImg(imageUrl);
    }, [initialData]);
    
    useEffect(() => {
        setIsFavorited(data[activeIndex]?.isFavorited || 0);
        setCurrentItem(data[activeIndex]);
        const imageUrl = data[activeIndex]?.imageUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL;
        setCurrentImg(imageUrl);
    }, [ activeIndex]);
    
    
    useEffect(() => {
        const nextIndex = () => {
            setActiveIndex(prevIndex => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
        };

        if (data.length > 0) {
            const id = setInterval(nextIndex, 9000);
            return () => clearInterval(id);
        }
    }, [activeIndex , data.length]);

    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex(prevIndex => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    const handleFavoriteToggle = () => {
        setIsLoadingFavorite(true); 
        // Realizar la acción de favorito
        marcarFavorito(data[activeIndex].idTeacher, true);
        const updatedData = data.map((item, index) => {
            if (index === activeIndex) {
                return { ...item, isFavorited: item.isFavorited === 1 ? 0 : 1 };
            }
            return item;
        });
        setData(updatedData);
        setIsFavorited(prev => !prev);
        setTimeout(() => {
            setIsLoadingFavorite(false);
        }, 1000); 
    };

 
  

    if (data.length === 0) {
        return <div><br/></div>;
    }

    return (
        <div>
            <div className="hidden md:block rounded-[20px] overflow-hidden shadow-custom-strong md:flex lg:h-[280px] relative mb-4 dark:bg-color-dark2">
                <img className="w-full object-cover object-top h-[151px] md:w-[300px] md:h-auto" src={currentImg} 
                     style={{ background: currentItem?.fondo || 'transparent' }}  alt={currentItem?.cargo}/>
                <div className="px-6 py-4 md:flex md:flex-col md:justify-center md:px-[5%]">
                    <p className="hidden md:block font-bold text-xs mb-2 text-gris-azulado-profundo font-sans dark:text-blanco">{currentItem?.cargo}</p>
                    <div className="font-bold text-xl mb-2 text-gris-azulado-profundo font-sans lg:text-3xl dark:text-blanco">
                        <p>{currentItem?.name}</p>
                    </div>
                    <p className="text-marron-oscuro text-xs font-sans lg:text-sm dark:text-blanco">
                        {currentItem?.description}
                    </p>
                </div>
                {data.length > 1 && (
                    <div className="flex flex-row items-end gap-4 justify-end pr-[20px] pb-[20px] absolute inset-0">
                        <button className={buttonClasses} onClick={handlePrev}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className={buttonClasses} onClick={handleNext}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
                {currentItem?.resopnsabilidad !== 'directorAcademia' && currentItem?.showFavorite && (
                    <div className="dark:bg-color-dark absolute top-2 right-2 bg-gris-favorito rounded-full w-[32px] h-[32px] flex items-center justify-center cursor-pointer transition duration-300" 
                         onClick={(event) => {
                            event.stopPropagation();
                            handleFavoriteToggle();
                        }}>
                        
                        {isLoadingFavorite ? (
                            <BookmarkLoader className="m-[4px] transition-opacity duration-300 ease-in-out opacity-100" />
                        ) : isFavorited ? (
                            <Iconos icono="corazonRojo" className="icono-semi-md" padding="6" />
                        ) : (
                            <Iconos icono="corazonBlanco" className="icono-semi-md" padding="6" />
                        )}
                    </div>
                )}
            </div>

            <div className="rounded-[20px] overflow-hidden shadow-lg md:hidden dark:bg-color-dark2">
                <div className="w-full h-[151px] flex justify-center" style={{ background: currentItem?.fondo || 'transparent' }}>
                    <img className="max-w-[50%] object-cover" src={currentImg} alt={currentItem?.cargo} />
                </div>
                <div className="px-6 py-4 md:flex md:flex-col md:justify-center md:px-[5%]">
                    <p className="hidden md:block font-bold text-xs mb-2 text-gris-azulado-profundo font-sans dark:text-blanco">{currentItem?.cargo}</p>
                    <div className="font-bold text-xl mb-2 text-gris-azulado-profundo font-sans lg:text-3xl dark:text-blanco">
                        <p>{currentItem?.name}</p>
                    </div>
                    <p className="text-marron-oscuro text-xs font-sans lg:text-sm dark:text-blanco">
                        {currentItem?.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardAcademy;