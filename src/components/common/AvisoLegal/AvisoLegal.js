import React from 'react';
import { useTranslation } from 'react-i18next';


const AvisoLegal = () => {
  
  const { t } = useTranslation();

  return (
    <div className="object-contain lg:bg-none lg:bg-plata-suave px-[5%] lg:px-[10%] 2xl:px-0 py-5 h-auto flex  dark:bg-color-dark">
      <div className="2xl:max-w-[1152px] justify-center mx-auto flex flex-col lg:flex-row w-full gap-5">
        <div className="flex-1">
          <p className="font-sans text-[10px] leading-[16px] font-normal text-justify dark:text-blanco">
            {t('terminosCondiciones')}

          </p>
        </div>
        
        {/*<div className="flex-shrink-0 flex justify-center lg:justify-end items-center">
          <img className="w-[375px] h-[164px] object-fill" src="/assets/images/img_avisoLegal.png" alt="Img Aviso Legal" />
        </div>
        
        
        https://www.youtube.com/embed/LlxtDbosfrE?autoplay=1&mute=1&controls=0&loop=1&playlist=LlxtDbosfrE&rel=0
        
        */}
        
        <div className="flex-shrink-0 flex justify-center lg:justify-end items-center">
          <iframe
            width="375"
            height="164"
            src="https://www.youtube-nocookie.com/embed/LlxtDbosfrE?autoplay=0&mute=1&controls=0&loop=1&playlist=LlxtDbosfrE&rel=0"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AvisoLegal;