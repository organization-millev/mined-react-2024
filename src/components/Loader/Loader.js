import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="relative min-h-screen flex justify-center items-center bg-cover bg-center bg-[url('/assets/images/loaderLightDesktop.png')] dark:bg-[url('/assets/images/loader.jpg')] lg:bg-[url('/assets/images/loaderLightDesktop.png')] dark:lg:bg-[url('/assets/images/loader.png')] z-30">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="flex flex-col gap-[35px] w-[200px] md:w-[325px] justify-center relative z-10">
                
                <img src="/assets/images/Logo_Mined_Academy.png" alt="Logo Mined 2" className="hidden dark:block w-[200px] md:w-[325px]"/> {/*src={`${process.env.REACT_APP_URL_IMG}/Logo_Mined_Academy.png`}*/}
                <img src="/assets/images/logoAcademyNav.png" alt="Logo Mined" className="dark:hidden   w-[200px] md:w-[325px]"/>
                
                <div className="w-full h-[5px] bg-white dar:bg-gris-azulado-profundo rounded">
                    <div className="h-[5px] bg-gris-azulado-profundo dark:bg-white rounded progress-bar"></div>
                </div>
            </div>
        </div>

        /*
        <div className="relative min-h-screen flex justify-center items-center bg-cover bg-center bg-[url('/assets/images/fondo_mobile_login.png')] lg:bg-[url('/assets/images/fondo-login.png')] md:justify-center md:pr-0 lg:justify-end lg:pr-[110px] 2xl:pr-[179px]">
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <div className="flex flex-col gap-[35px] w-[200px] md:w-[325px] lg:justify-end md:justify-center justify-center relative z-10">
                <img src="../assets/images/logoacademy.png" alt="Logo Mined" className="w-[200px] md:w-[325px]"/>
                <div className="w-full h-[5px] bg-gris-claro rounded">
                    <div className="h-[5px] bg-azul-intenso rounded progress-bar"></div>
                </div>
            </div>
        </div>
*/
    );
};

export default Loader;