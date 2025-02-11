import React , {useEffect}from 'react';
import Close from '../iconos/close_blanco.js';

import { useBannerPromocional } from '../../hooks/academy/useBannerPromocional.js';

const ModalHome = ({ isOpen, onClose }) => {
    
    const {bannerProm , GetBannerPromocional} = useBannerPromocional()
    
    
    useEffect(() => {
        GetBannerPromocional();
    },[])
    
    if (!isOpen || !bannerProm) return null;
    //if (!isOpen) return null; // Si no está abierto, no renderiza nada

    return (
        <>
            <div className="fixed inset-0 z-[4000] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-negro opacity-50"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                       
                                <div className="absolute flex justify-end w-full !top-[1em] !right-[1em] cursor-pointer">
                                    <Close className=" hover:text-gray-900" onClick={onClose} />
                                </div>
                                
                            <div className="!shadow-custom-strong">
                                {bannerProm ? (
                                <a href={bannerProm.file_txt_redirect_url}>
                                        <img src={bannerProm.file_txt_url} alt="Promotional Banner" className="w-full" />
                                    </a>
                                ) : (
                                    <p>No banner available</p>
                                )}
                                
                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalHome;
