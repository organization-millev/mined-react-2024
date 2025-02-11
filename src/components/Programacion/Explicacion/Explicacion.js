import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Explicacion = (props) => {
    const { t } = useTranslation();

    const [mostrar,setMostrar] = useState(false)
    const [breakPointLG,setBreakpointLG] = useState(300)
    
    const handleVerMas = (event) => {
        setMostrar(!mostrar) 
    }
    
    useEffect(() => {
    const handleResize = () => {
        const isMobile = window.innerWidth >= 1024; 
        
            if(isMobile){
               setBreakpointLG(1000); 
            }
            else{
               setBreakpointLG(300)
            }
            
        };
    
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return(<>
        <div className="shadow-2xl text-justify rounded-2xl p-[1rem] bg-white flex flex-col lg:p-[2rem]">
            <span className="text-[20px] font-bold">{props.obj.descripcion.subtitulo}</span>
            <p className="mt-[10px]">{(mostrar) ? props.obj.descripcion.parrafo : props.obj.descripcion.parrafo.substring(0, breakPointLG) + (props.obj.descripcion.parrafo.length > breakPointLG ? "...": "")}</p>
             {
            (props.obj.descripcion.parrafo.length > breakPointLG) ?
            <span className="font-bold text-center w-[100%]" onClick={handleVerMas}>{(!mostrar) ? t('verMas'): t('verMenos')}</span>
            :""}
        </div>
        
    </>)
}

export default Explicacion