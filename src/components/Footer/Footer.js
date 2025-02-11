import React from 'react';
//import Web from '../iconos/twitterFooter'; 
import YouTube from '../iconos/YoutubeFooter'; 
import Facebook from '../iconos/FacebookFooter'; 
import Instagram from '../iconos/InstagramFooter'; 
import LinkedIn from '../iconos/LinkedinFooter'; 
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const logo = `${process.env.REACT_APP_URL_IMG}/assets/images/Logo_Mined_Academy.png`;
  const logoApp = `${process.env.REACT_APP_URL_IMG}/assets/images/AppStore.png`;
  const logoPlay = `${process.env.REACT_APP_URL_IMG}/assets/images/Playstore.png`;
  
  const { t } = useTranslation();
  
  
  return (
     <div className="bg-gris-azulado-profundo text-white font-sans px-[5%] lg:px-[10%] py-5">
      <div className="max-w-7xl mx-auto 2xl:max-w-[1152px] 2xl:px-0">
        <div className="mt-3 mb-5">
            <img src={logo} className="w-[204px] h-auto "   />
        </div>  
        <div className="flex justify-between md:border-t md:border-#C1C7CD mt-5 flex-col lg:flex-row">
          <div className="flex flex-wrap justify-between lg:flex-row gap-5 xl:gap-20 lg:ml-3">
                <div className="mt-4 lg:mt-8">
                  <h2 className="font-semibold text-base lg:text-xl mb-7">{t('compañiaSeccion')} </h2>
                  <ul>
                    <a href="https://mined.world/" target="_blank"><li className="mb-2 font-normal text-sm lg:text-base">{t('sobreMined')}</li></a>
                    <a href="/home"><li className="mb-2 font-normal text-sm lg:text-base">{t('academias')} </li></a>
                    <a href="/home"><li className="mb-2 font-normal text-sm lg:text-base">{t('herramientas')} </li></a>
                  </ul>
                </div>
                <div className="mt-4 lg:mt-8">
                  <h2 className="font-semibold text-base lg:text-xl mb-7">{t('contactanosSeccion')}</h2>
                  <ul>
                    <a href="https://mined.vip/LoginSalesForce.php" target="_blank"><li className="mb-2 font-normal text-sm lg:text-base">{t('oficinaVirtual')}</li></a>
                  </ul>
                </div>
                <div className="mt-4 lg:mt-8">
                  <h2 className="font-semibold text-base lg:text-xl mb-7">{t('ayudaSeccion')} </h2>
                  <ul>
                    <a href="/centro_ayuda"><li className="mb-2 text-sm lg:text-base">{t('contactanos')}</li></a>
                    <a href="/centro_ayuda"><li className="mb-2 text-sm lg:text-base">{t('preguntasFrecuentes')}</li></a>
                    <a href="https://mined.world/terminos-y-condiciones/" target="_blank"><li className="mb-2 text-sm lg:text-base">{t('politicasPrivacidad')}</li></a>
                  </ul>
                </div>
          </div>
          <div className="mt-8 lg:mr-3 md:flex md:justify-between lg:block">
              {/*
            <div className="hidden md:block">
              <h2 className="font-semibold text-xl mb-7">{t('disponibleEn')} </h2>
              <div className="flex mb-7 gap-3">
                <a href="#">
                  <img src={logoApp} alt="App Store" className="w-[120px] h-[40px]"/>
                </a>
                <a href="#">
                  <img src={logoPlay} alt="Google Play" className="w-[120px] h-[40px]"/>
                </a>
              </div>
            </div>
              */}
            
            <div>
              <h2 className="font-semibold text-lg lg:text-xl mb-3">{t('encuentranosEn')} </h2>
              <div className="flex">
                <a href="https://mined.world/" target="_blank" className=" cursor-pointer flex items-end">
                  <img src="/assets/images/web_mined.png" className="w-[24px] h-[24px] m-2"/>
                </a>
                
                <a href="https://www.facebook.com/minedworldoficial" target="_blank" className="">
                  <Facebook/>
                </a>
                
                <a href="https://www.instagram.com/mined_world_oficial/" target="_blank">
                  <Instagram/>
                </a>
                
                <a href="https://www.linkedin.com/company/mined-world" target="_blank">
                  <LinkedIn/>
                </a>
                
                <a href="https://www.youtube.com/channel/UC3YNr3D8JvQjwdUhcnpIjpw" target="_blank" className=" relative " style={{ top: '4px' }}>
                  <YouTube/>
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className="md:border-t md:border-#C1C7CD mt-5 pt-3 text-center font-normal text-sm flex justify-flex-start">
          <p className="mt-5">Mined World © 2024. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
