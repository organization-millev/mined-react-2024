import React, { useState,useEffect } from "react";
import Edit from '../../iconos/edit.js'; // Asegúrate de que este componente existe y se usa correctamente
import Iconos from '../../iconos/iconos';
import ModalPerfil from '../../ModalPerfil/ModalPerfil.js';

import { useTranslation } from 'react-i18next';
import { useGamificacionTitle } from '../../../hooks/gamificacion/useGamificacionTitle';
import { useGamificacionAvatar } from '../../../hooks/gamificacion/useGamificacionAvatar';
import { useUser } from '../../../providers/UserContext';

const ProfilePhoto = ({ icon, src , nombreUser,etiqueta}) => {
    
    const { GetObtenerTituloGamificacion , titulos } = useGamificacionTitle();
    const { GetObtenerAvatar , avatar } = useGamificacionAvatar();
    const { userData } = useUser();
    const currectAvatarId = userData.profiles[0]?.current_avatar_id
    useEffect(() => {
        GetObtenerTituloGamificacion();
        GetObtenerAvatar();
    }, []);
    let Icon = icon;
    const { t } = useTranslation();
    
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
    const isImageUrl = src.startsWith('http');
    
    const toCapitalize = (str) => {
        return str
          .toLowerCase() 
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '); 
    };


    return (
        <div >
            <div className="hidden lg:block flex flex-row">
                <div className="relative w-[229px] h-[229px] hover:cursor-pointer group rounded-full bg-[#000000e8] font-sans">
                    {isImageUrl ? (
                        <img
                            src={src}
                            alt="profile"
                            className="absolute inset-0 w-full h-full rounded-full  transition-opacity duration-700 ease-in-out group-hover:opacity-20 object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex justify-center items-center bg-[#000000e8] rounded-full text-white text-5xl font-bold object-cover">
                            {src}
                        </div>
                    )}
                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100" onClick={openModal}>
                      <Icon className="bg-black bg-opacity-50 rounded-full text-white p-4 transition duration-300 ease-in-out transform hover:scale-110" />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center lg:hidden">
                <div class Name="flex flex-col items-center mt-4 lg:hidden gap-[10px] relative">
                    
                    <div className="relative w-[229px] h-[229px] hover:cursor-pointer group rounded-full bg-[#000000e8] font-sans">
                        {isImageUrl ? (
                            <img
                                src={src}
                                alt="profile"
                                className="absolute inset-0 w-full h-full rounded-full  transition-opacity duration-700 ease-in-out group-hover:opacity-20 object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 flex justify-center items-center bg-[#000000e8] rounded-full text-white text-5xl font-bold object-cover">
                                {src}
                            </div>
                        )}
                        <div className="bg-blanco !w-12 !h-12 rounded-full shadow-lg flex justify-center items-center absolute" style={{ bottom: '-0.5em', right: '1.5em' }} onClick={openModal}>
                            <Iconos icono="edit" className="icono-sm"/>
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-2 mt-4">
                        <button className="boton-cuarto font-semibold text-small">
                            {toCapitalize(etiqueta)}
                            
                        </button>
                        <p className="font-sans text-2extra text-gris-azulado-profundo lg:text-3xl font-semibold dark:text-blanco">{nombreUser}</p>
                    </div>
                    
                </div>
            </div>
            
            {isModalOpen && (
                <ModalPerfil closeModal={closeModal} titulos={titulos} avatar={avatar} currectAvatarId={currectAvatarId}/>
            )}
      
        </div>
    );
};

export default ProfilePhoto;
