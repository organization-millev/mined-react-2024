import React, { useState, useEffect, useRef } from 'react';
import FlechaAbajo from '../../iconos/expand_more.js';
import FlechaAbajoWhite from '../../iconos/expand_more_white.js';
import FlechaArriba from '../../iconos/keyboard_arrow_up.js';
import FlechaArribaWhite from '../../iconos/keyboard_arrow_up_white.js';
import MiPerfil from '../../iconos/account_circle';
import MiPerfilWhite from '../../iconos/account_circle_white';
import MisLogros from '../../iconos/diamond.js';
import MisLogrosWhite from '../../iconos/diamond_white.js';
import Medalla from '../../iconos/workspace_premium.js';
import MedallaWhite from '../../iconos/workspace_premium_white.js';
import Ayuda from '../../iconos/headset_mic.js';
import AyudaWhite from '../../iconos/headset_mic_white.js';
import Certificados from '../../iconos/keyboard_arrow_up.js';
import CerrarSesion from '../../iconos/login_red.js';

import { useUser } from '../../../providers/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
//import { useGamificacion } from '../../../hooks/gamificacion/useGamificacion';
import { useGamificationGlobal } from '../../../hooks/gamificacion/useGamificationGlobal';


const Menu = () => {
    
    const { t } = useTranslation();
    const [openDropdown, setOpenDropdown] = useState(false);
    const { isCourseType, asynchronous , getInitials , getFullName , userData , logout,getProfilePicture } = useUser();
    //const { GetObtenerInfoNivelUsuario, data } = useGamificacion();
    const { GetGamificationGlobal, currentLevel } = useGamificationGlobal(500);
    useEffect(() => {
        GetGamificationGlobal();
    }, []);
    //const {translated_level_current} = data;
    const imgProfile = getProfilePicture();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    const dropdownBgClass = isCourseType(asynchronous) ? 'bg-azul-intenso' : 'bg-rojo-intenso';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        if (openDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);
    
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        window.location.reload();
    };
    
    const isImageUrl = imgProfile.startsWith('http');

    return (
        <div className="relative flex flex-col items-center" ref={dropdownRef}>
            <div className="flex flex-row items-center cursor-pointer" onClick={toggleDropdown}>
                {/*<div className={`h-[32px] w-[32px] ${dropdownBgClass} rounded-full font-sans text-blanco text-xs font-semibold flex justify-center items-center`}>
                    { getInitials() } 
                </div>*/}
                
                {isImageUrl ? (
                    <img
                        src={imgProfile}
                        alt="profile"
                        //className="absolute inset-0 w-full h-full rounded-full  transition-opacity duration-700 ease-in-out group-hover:opacity-20"
                        className={`h-[32px] w-[32px] ${dropdownBgClass} rounded-full font-sans text-blanco text-xs font-semibold flex justify-center items-center object-cover `}
                    />
                ) : (
                    <div className={`h-[32px] w-[32px] ${dropdownBgClass} rounded-full font-sans text-blanco text-xs font-semibold flex justify-center items-center object-cover`}>
                        {imgProfile}
                    </div>
                )}
                    
                {openDropdown ? (
                <>
                    <FlechaArriba width="20px" height="20px" padding="0px" className="dark:hidden"/>
                    <FlechaArribaWhite width="20px" height="20px" padding="0px" className="dark:block hidden"/>
                </>
                ) : (
                <>
                    <FlechaAbajo width="20px" height="20px" padding="0px" className="dark:hidden"/>
                    <FlechaAbajoWhite width="20px" height="20px" padding="0px" className="dark:block hidden"/>
                </>
                )}
            </div>

            {openDropdown && (
                <div className="absolute w-[170px] pt-4 pb-2 mt-10 bg-white dark:bg-gris-azulado-profundo dark:border-gris-azulado-profundo border border-gray-200 rounded-lg shadow-lg right-0 font-sans">
                    <div className="flex flex-row items-center mb-3 px-[10px]">
                        {/*<div className="h-[42px] w-[42px] bg-azul-oscuro-grisáceo dark:bg-white rounded-full flex justify-center items-center">
                            <p className="text-blanco dark:text-gris-azulado-profundo text-lg font-semibold"> { getInitials() } </p>
                        </div>*/}
                        {isImageUrl ? (
                            <img
                                src={imgProfile}
                                alt="profile"
                                //className="absolute inset-0 w-full h-full rounded-full  transition-opacity duration-700 ease-in-out group-hover:opacity-20"
                                className="h-[42px] w-[42px] bg-azul-oscuro-grisáceo dark:bg-white rounded-full flex justify-center items-center object-cover"
                            />
                        ) : (
                            <div className="h-[42px] w-[42px] bg-azul-oscuro-grisáceo dark:bg-white rounded-full flex justify-center items-center text-white dark:text-azul-oscuro-grisáceo text-largeB font-bold object-cover">
                                {imgProfile}
                            </div>
                        )}
                        <div className="ml-2 flex flex-col">
                            <p className="font-semibold text-xs font-semibold">{ getFullName(10) }</p>
                            <p className="text-small">{currentLevel?.levelTranslation.name}</p>
                        </div>
                    </div>

                    <div className="font-sans text-xs font-normal w-full flex flex-col">
                        <div className="hover:bg-plata-suave dark:hover:bg-gris-carbón">
                            <a href="/perfil" className="flex flex-row gap-[10px] px-[10px] py-1">
                                <MiPerfil className="w-[20px] h-[20px] dark:hidden" />
                                <MiPerfilWhite className="w-[20px] h-[20px] hidden dark:block" />
                                <p className="flex items-center">{t('miPerfil')} </p>
                            </a>
                        </div>
                        <div className="hover:bg-plata-suave dark:hover:bg-gris-carbón">
                            <a href="/logros" className="flex flex-row gap-[10px] px-[10px] py-1">
                                <MisLogros className="w-[20px] h-[20px] dark:hidden" />
                                <MisLogrosWhite className="w-[20px] h-[20px] hidden dark:block" />
                                <p className="flex items-center">{t('misLogros')}</p>
                            </a>
                        </div>
                        <div className="hover:bg-plata-suave dark:hover:bg-gris-carbón">
                            <a href="/centro_ayuda" className="flex flex-row gap-[10px] px-[10px] py-1">
                                <Ayuda className="w-[20px] h-[20px] dark:hidden" />
                                <AyudaWhite className="w-[20px] h-[20px] hidden dark:block" />
                                <p className="flex items-center">{t('ayuda')} </p>
                            </a>
                        </div>
                        <div className="hover:bg-plata-suave dark:hover:bg-gris-carbón">
                            <a href="/mis_constancias" className="flex flex-row gap-[10px] px-[10px] py-1">
                                <Medalla className="w-[20px] h-[20px] dark:hidden" />
                                <MedallaWhite className="w-[20px] h-[20px] hidden dark:block" />
                                <p className="flex items-center">{t('certificados')} </p>
                            </a>
                        </div>
                        <div className="hover:bg-plata-suave dark:hover:bg-gris-carbón">
                            <a href="#" className="flex flex-row gap-[10px] px-[10px] py-1" onClick={handleLogout} >
                                <CerrarSesion className="w-[20px] h-[20px]" padding="0" />
                                <p className="flex items-center text-rojo-coral">{t('btnCerrarSesion')}</p>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;