import React, { useState,useRef,useEffect  } from "react";
import Flecha from '../../iconos/expand_more.js';
import Cerrar from '../../iconos/close.js';
import { useTranslation } from 'react-i18next';

const PerfilTop = (props) => {
    
    const { t } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef(null);

    const handleFlechaClick = (event) => {
        if (window.innerWidth >= 1024) {
            const rect = event.target.getBoundingClientRect();
            setModalPosition({ 
                top: rect.bottom + window.scrollY, 
                left: rect.left + window.scrollX 
            });
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };
    
    useEffect(() => {
        if (modalVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalVisible]);
    
    return(<>
       <div className=" w-full flex flex-col lg:flex-row flex-wrap font-sans">
           <div className="flex items-center justify-center mt-[16px] lg:mt-0 object-cover">
               <img src={props.obj.foto} className="w-[230px] h-[230px] rounded-full bg-[gray] object-cover"></img>
           </div>
           <div className="py-4 flex flex-col gap-2 lg:gap-1 justify-center lg:px-4">
               <span className="badge-primario dark:badge-secundario-dark  dark:font-semibold self-center justify-center lg:self-start">Trader</span>
               <span className="text-2extra self-center justify-center lg:self-start font-semibold text-marron-grisaceo dark:text-blanco">{props.obj.nombres} {props.obj.apellidos} </span>
               <span className="text-small dark:text-blanco">{t('codigo')}  {props.obj.codigo}</span>
               <span className="text-small dark:text-blanco">{t('paquetesActivos')} </span>
               <div className="flex flex-wrap lg:max-w-[500px] gap-2 flex-col lg:flex-row-reverse lg:gap-1 lg:items-center">
                    {/*<Flecha onClick={handleFlechaClick} className="cursor-pointer hidden lg:block"/>
                    
                    
                   {props.obj.paquetes.map((obj,ind)=>(
                    <div className="flex flex-col">
                       <span className="badge-primario text-small mb-[7px]">{obj.paquete}</span>
                       <div className="flex flex-row gap-[49px] mb-[3px] lg:hidden">
                           <span className="text-small">Dias restantes</span>
                           <span className="text-small">31 dias</span>
                       </div>
                       <div className="w-[100%] bg-[var(--color-gris-valoracion)] h-[6px] rounded lg:w-[50%] lg:hidden">
                            <div className="w-[20%] h-[100%] bg-[var(--color-gris-azulado-profundo)] rounded"></div>
                        </div>
                    </div>
                   ))}
                   */}
               </div>
           </div>
       </div>
       
       {modalVisible && (
            <div
                className={`absolute lg:block hidden bg-white border border-gray-300 shadow-custom-lg p-4 rounded-[10px] z-40 modal-size-md lg:top-[331px] lg:left-[402.875px] 2xl:top-[335px] 2xl:left-[625.875px] 4xl:left-[960.875px]`}
                //style={{ top: `${modalPosition.top}px`, left: `${modalPosition.left}px` }}
                ref={modalRef}
            >
                <button onClick={closeModal} className="absolute top-0 right-0 m-2"><Cerrar/></button>
                {props.obj.paquetes.map((obj, ind) => (
                    <div key={ind} className="flex flex-col my-2 gap-1">
                        <span className="badge-primario text-small">{obj.paquete}</span>
                        <div className="flex justify-start gap-4 font-sans">
                            <span className="text-small">{t('diasrestantes')}</span>
                            <span className="text-small">31 dias</span>
                        </div>
                        <div className="w-[100%] bg-[var(--color-gris-valoracion)] h-[5px] rounded">
                            <div className="w-[20%] h-[100%] bg-[var(--color-gris-azulado-profundo)] rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        )}
            
    </>)
}

export default PerfilTop