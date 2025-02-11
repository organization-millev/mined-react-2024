import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Navbar/Navbar'; 
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";
import MenuItemNotificaciones from '../../MenuItemNotificaciones/MenuItemNotificaciones';
import Folder from '../../iconos/folder_open.js';
import FolderDark from '../../iconos/folder_open_dark.js';
import Visibility from '../../iconos/visibility_white';
import VisibilityDark from '../../iconos/visibility_dark';
import Check from '../../iconos/check_verde';
import Close from '../../iconos/close';
import CloseWhite from '../../iconos/closeWhite';
import { useNotificaciones } from '../../../hooks/support/useNotificaciones';
import AvisoLegal from '../AvisoLegal/AvisoLegal';
import Footer from '../../Footer/Footer'; 
import { useTranslation } from 'react-i18next';

const MenuNotificaciones = () => {
    
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("BandejaEntrada");
    const [notifications, setNotifications] = useState({
        BandejaEntrada: true,
        Archivadas: true,
        Todas: true
    });
    const [isComponentVisible, setIsComponentVisible] = useState(true);
    const dropdownRef = useRef(null);
    const [unreadCount, setUnreadCount] = useState(0);
    
    const { GetNotifications,notificaciones,paginacion,loading} = useNotificaciones();

    useEffect(() => {
        GetNotifications();
    }, []);
    
    
    //
    //


    useEffect(() => {
        const handleClickOutside = (event) => {
            // Verificar si el clic ocurrió fuera del dropdownRef
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsComponentVisible(false);
            }
        };
    
        // Usar mouseup en lugar de mousedown para evitar que el cierre se dispare al hacer clic
        document.addEventListener("mouseup", handleClickOutside);
    
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, []);

    
    useEffect(() => {
        if (notificaciones) {
            const unread = notificaciones.filter(notificacion => notificacion.is_viewed === 0).length;
            setUnreadCount(unread);
        }
    }, [notificaciones]);




    const archiveAll = () => {
        setNotifications({
            ...notifications,
            [activeTab]: false
        });
    };
    
    const toggleVisibility = () => {
        setIsComponentVisible(!isComponentVisible);
    };
    
    const calcularTiempoTranscurrido = (fechaNotificacion) => {
        const fechaActual = new Date();
        const fechaRegistro = new Date(fechaNotificacion);
        const diferenciaMilisegundos = fechaActual - fechaRegistro;
        const diferenciaHoras = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60));

        if (diferenciaHoras < 1) {
            const diferenciaMinutos = Math.floor(diferenciaMilisegundos / (1000 * 60));
            return `${diferenciaMinutos} ${diferenciaMinutos === 1 ? t('minuto') : t('minutos')}`;
        } else if (diferenciaHoras < 24) {
            return `${diferenciaHoras} ${diferenciaHoras === 1 ? t('hora') : t('horas')} `;
        } else {
            const diferenciaDias = Math.floor(diferenciaHoras / 24);
            return `${diferenciaDias} ${diferenciaDias === 1 ? t('día') : t('días')} `;
        }
    };
    
    
    return (
        <div className="!h-auto w-[5]">
            
        
       <div className=" dark:bg-color-dark2 lg:ml-[32px]">
            {isComponentVisible && (
                <div ref={dropdownRef} className="px-[5%] lg:px-0 ">
                    <div className="md:flex z-10 items-end justify-end hidden md:block  mr-[20px] relative " style={{ top: '21px', right:'20px' }}>
                        <button onClick={toggleVisibility}>
                            <Close className="dark:!hidden !mt-2"/>
                            <CloseWhite className="dark:!block !hidden icono-mini-sm !mt-2" />
                        </button>
                    </div>
                    <p className="font-sans text-gris-azulado-profundo text-extra font-semibold py-4 md:hidden">Notificaciones</p>
                    
                    <Tabs value={activeTab}>
                        <TabsHeader className="lg:max-w-[548px] lg:max-h-[559px] lg:min-w-[548px] w-full gap-[10px] lg:gap-0" indicatorProps={{className:"bg-transparent border-b-[3px]  w-[40px] lg:w-[52px] dark:border-blanco border-gris-azulado-profundo shadow-none rounded-none flex  justify-start"}}>
                            <Tab
                              key="BandejaEntrada"
                              value="BandejaEntrada"
                              onClick={() => setActiveTab("BandejaEntrada")}
                              className={activeTab === "BandejaEntrada" ? "justify-start  flex text-gris-azulado-profundo-900 text-small font-semibold p-0 pb-[5px]" : "pb-[5px] p-0 lg:justify-start justify-center flex text-small font-semibold "}
                            >
                                <div className="flex flex-row items-center lg:justify-start  mb-[5px] lg:gap-3  ">
                                    <span className="w-[11em] lg:w-[auto]">{t('bandejaEntrada')} </span>
                                    <div className="w-[30px] h-[18px] rounded-[6px] bg-rojo-notificacion text-white font-bold text-center">{unreadCount}</div>
                                </div>
                                
                                
                                
                            </Tab>
                            
                            
                            
                            {/*
                            <Tab
                              key="Archivadas"
                              value="Archivadas"
                              onClick={() => setActiveTab("Archivadas")}
                              className={activeTab === "Archivadas" ? "lg:w-[270px] lg:justify-start justify-center flex text-gray-900 text-small font-semibold p-0 pb-[5px]" : "pb-[5px] p-0 w-[270px] lg:justify-start justify-center flex text-small font-semibold"}
                            >
                                <div className=" mb-[5px] ">
                                  <p className="hidden lg:block"> {t('Archivadas')}  </p>
                                  <p className="lg:hidden"> {t('todas')} </p>    
                                </div>
                            </Tab>
                            
                            <Tab
                              key="Todas"
                              value="Todas"
                              onClick={() => setActiveTab("Todas")}
                              className={activeTab === "Todas" ? "lg:justify-start justify-center flex text-gray-900 text-small font-semibold p-0 pb-[5px]" : "pb-[5px] p-0 lg:justify-start justify-center flex text-small font-semibold"}
                            >
                                <div className=" mb-[5px]">
                                    <p className="hidden lg:block">{t('todas')} </p>
                                    <p className="lg:hidden"> {t('Archivadas')} </p>
                                     
                                </div>
                            </Tab>
                            */}
                            
                        </TabsHeader>
                        
                       
                        {activeTab !== "Todas" && (
                        <div className="flex justify-start gap-5 lg:mb-[35px] mt-[28px] mb-[10px]">
                            <div className="hidden lg:block">
                                <button className="boton-primario dark:boton-secundario font-sans text-small md:text-medium font-bold flex items-center justify-center lg:gap-3  !rounded-[40px] "><Visibility className="dark:!hidden" padding="8px"/><VisibilityDark className="!hidden dark:!block" padding="8px"/>   {t('marcarTodoLeido')}</button>
                            </div>
                            
                            <button className="boton-primario dark:!boton-secundario font-sans text-small md:text-medium font-bold flex items-center justify-center !py-[10px] lg:py-0  !px-[10px] gap-[10px] w-[58%] !rounded-[40px] lg:hidden"><Visibility className="w-[24px] h-[24px]" padding="0px"/>{t('marcarLeido')}</button>
                            {/*
                            <button className="boton-secundario dark:!border-blanco dark:bg-color-dark2 dark:text-blanco  hover:bg-plata-suave hover:text-gris-oscuro transition duration-300 py-[10px] !px-[5px] gap-[5px] lg:gap-none lg:px-0 lg:py-0 ease-in-out font-sans text-small md:text-medium font-bold flex items-center justify-center lg:gap-3 w-[42%] !rounded-[40px]" onClick={archiveAll}><Folder className="dark:!hidden"/><FolderDark className="!hidden dark:!block "/>{t('archivarTodo')}</button>
                            */}
                        </div>
                        )}
                     
                        
                        <TabsBody className="!overflow-y-auto h-auto lg:!h-[369px] ">
                            <TabPanel key="TradingPro" value="BandejaEntrada" className="p-0  ">
                                {
                                        loading ? (
                                            <div className="flex items-center justify-center flex-col gap-3 lg:min-h-[300px]">
                                                <p className="dark:text-blanco text-center text-gris-azulado-profundo text-large font-semibold">
                                                    cargando..
                                                </p>
                                            </div>
                                        ) : (
                                            notificaciones.map((notificacion) => (
                                                
                                                    
                                                <MenuItemNotificaciones
                                                    key={notificacion.not_int_id}
                                                    tituloNotificacion={notificacion.not_txt_title}
                                                    descripcionNotificacion={notificacion.not_txt_desc}
                                                    horaNotificacion={calcularTiempoTranscurrido(notificacion.not_dt_registration)}
                                                    isViewed={notificacion.is_viewed}
                                                />
                                                
                                            ))
                                        )
                                }
                                                                    
                                    {/*
                                    : (
                                        <div className="flex items-center justify-center flex-col gap-3 lg:min-h-[300px]">
                                            <Check className="w-16 h-16" />
                                            <p className="dark:text-blanco text-center text-gris-azulado-profundo text-large font-semibold">
                                                {t('estasAlDia')}<br />{t('notificaciones')}
                                            </p>
                                        </div>
                                    )}
                                    */}
                                
                            </TabPanel>
                            
                            {/*
                            <TabPanel key="Archivadas" value="Archivadas" className="p-0">
                                {notifications.Archivadas ? (
                                    <div className="overflow-hidden max-h-[320px] h-auto">
                                        <MenuItemNotificaciones />
                                        <MenuItemNotificaciones />
                                        <MenuItemNotificaciones />
                                        
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center flex-col gap-3 lg:min-h-[300px]">
                                        <Check className="w-16 h-16"/>
                                        <p className="dark:text-blanco text-center text-gris-azulado-profundo text-large font-semibold">{t('estasAlDia')}<br/>{t('notificaciones')}</p>
                                    </div>
                                )}
                            </TabPanel>
                            
                            <TabPanel key="Todas" value="Todas" className="p-0">
                                <div className="overflow-hidden max-h-[350px]">
                                    <MenuItemNotificaciones />
                                    <MenuItemNotificaciones />
                                    <MenuItemNotificaciones />
                                    <MenuItemNotificaciones />
                                </div>
                            </TabPanel>
                            */}
                            
                        </TabsBody>
                        
                    </Tabs>
                </div>
            )}
            
            <div className="block md:hidden">
                <AvisoLegal/>
                <Footer/>
            </div>
        </div>
        </div>
    );
};

export default MenuNotificaciones;