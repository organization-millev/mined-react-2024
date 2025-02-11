import React, { useState, useEffect, useRef } from 'react';
import CustomSaberMas from '../common/CustomSaberMas/CustomSaberMas';
import { useTranslation } from 'react-i18next';

const BannerCarousel = ({ banners }) => {
  const { t } = useTranslation();
  const buttonClasses = 'text-blanco bg-zinc-800 bg-opacity-50 hover:bg-zinc-700 p-2 rounded-full';

  const [currentIndex, setCurrentIndex] = useState(0); // Start from 1 instead of 0
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);

  const totalBanners = banners.length - 1;
  
  
  const currentIndexRef = useRef(0);
  
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  /*const handleNextClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };*/
  
  const handleNextClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      const nextIndex = currentIndexRef.current + 1;
      setCurrentIndex(nextIndex > totalBanners ? 0 : nextIndex);
    }
  };
  
  /*useEffect(() => {
    if(currentIndex > totalBanners){
       setCurrentIndex(0);
    }
  }, [currentIndex]);*/
  

  const handlePrevClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = currentIndexRef.current - 1;
      setCurrentIndex(prevIndex < 0 ? totalBanners : prevIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNextClick, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
    };

    const container = containerRef.current;
    container.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, totalBanners]);

  useEffect(() => {
    if (isTransitioning) {
      containerRef.current.style.transition = 'transform 0.5s ease';
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    } else {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'transform 0.5s ease';
        }
      }, 50);
    }
  }, [currentIndex, isTransitioning]);

  return (
   
    <div className="flex flex-col gap-[40px] lg:px-[10%] 2xl:px-0 2xl:max-w-[1152px] justify-center mx-auto lg:my-[40px]">
      <div className="relative bg-black lg:rounded-[20px] overflow-hidden h-[224px] lg:h-[360px]">
        <div
          className="absolute inset-0 flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          ref={containerRef}
        >
          {/* Clone the last banner at the beginning 
          <div className="flex-none w-full h-full relative">
            <img src={banners[totalBanners - 1].src} alt={banners[totalBanners - 1].alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="w-auto lg:w-1/2 relative top-3rem left-[0.1rem] lg:top-[3.6rem] lg:left-[2rem]">
                <p className="text-xs font-semibold font-sans text-blanco">{banners[totalBanners - 1].empresa}</p>
                <h2 className="text-[24px] lg:text-[32px] font-bold font-sans text-white mt-2">{banners[totalBanners - 1].titulo}</h2>
                <p className="text-blanco mt-4 font-sans text-xs lg:text-sm max-w-[400px] pb-[1.5em]">{banners[totalBanners - 1].descripcion}</p>
                <CustomSaberMas
                  text={t('btnSaberMas')}
                  className=""
                  onClick={() => window.open(banners[totalBanners - 1].enlace, '_blank')}
                />
              </div>
            </div>
          </div>*/}

          {banners.map((banner, index) => (
            <div key={index} className="flex-none w-full h-full relative">
              <img src={banner.src} alt={banner.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="w-auto lg:w-1/2 relative top-3rem left-[0.1rem] lg:top-[3.6rem] lg:left-[2rem]">
                  <p className="text-xs font-semibold font-sans text-blanco">{banner.empresa}</p>
                  <h2 className="text-[24px] lg:text-[32px] font-bold font-sans text-white mt-2">{banner.titulo}</h2>
                  <p className="text-blanco mt-4 font-sans text-xs lg:text-sm max-w-[400px] pb-[1.5em]">{banner.descripcion}</p>
                  <CustomSaberMas
                    text={t('btnSaberMas')}
                    className=""
                    onClick={() => window.open(banner.enlace, '_blank')}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Clone the first banner at the end 
          <div className="flex-none w-full h-full relative">
            <img src={banners[0].src} alt={banners[0].alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="w-auto lg:w-1/2 relative top-3rem left-[0.1rem] lg:top-[3.6rem] lg:left-[2rem]">
                <p className="text-xs font-semibold font-sans text-blanco">{banners[0].empresa}</p>
                <h2 className="text-[24px] lg:text-[32px] font-bold font-sans text-white mt-2">{banners[0].titulo}</h2>
                <p className="text-blanco mt-4 font-sans text-xs lg:text-sm max-w-[400px] pb-[1.5em]">{banners[0].descripcion}</p>
                <CustomSaberMas
                  text={t('btnSaberMas')}
                  className=""
                  onClick={() => window.open(banners[0].enlace, '_blank')}
                />
              </div>
            </div>
          </div>*/}
        </div>

        <div className="hidden lg:absolute lg:bottom-4 lg:right-4 lg:flex lg:space-x-2">
          <button onClick={handlePrevClick} className={buttonClasses}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={handleNextClick} className={buttonClasses}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerCarousel;
