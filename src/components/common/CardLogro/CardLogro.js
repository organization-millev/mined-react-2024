import React, { useState,useEffect,useRef } from 'react';
import Iconos from '../../iconos/iconos'

import { useTranslation } from 'react-i18next';

const CardLogro = ({achievement, currentClasses}) => {
    
    const { t } = useTranslation();
    
    
    const showIcon = achievement.progress === 1;


    return(<>
        
            <div className="min-h-[150px] w-full card item min-w-[235px] dark:bg-color-dark2">
                <div className="card-body flex flex-wrap">
                    <div className="flex flex-col items-center">
                        <img src={achievement.iconUrl} className="icono-2xl" alt={achievement.iconName}/>
                        <span className="text-small font-bold dark:text-blanco">{achievement.points} {t('puntos')} </span>
                    </div>
                    <div className="flex flex-col w-[calc(100%-80px)] justify-around ms-auto">
                        <div className="flex items-center w-full">
                            <span className="text-large font-semibold dark:text-blanco">{achievement.courseName}{achievement.languageCourse && `(${achievement.languageCourse})`}</span>
                            {showIcon && <Iconos icono="iconCheckLogros" className="icono-mini-sm ms-auto" />}
                        </div>
                        <p className="text-small text-left dark:text-blanco">
                            {achievement.translationDescription}
                        </p>
                        <div className="w-full flex flex-col">
                            <div className="w-full  h-[7px] rounded bg-plata-suave">
                                <div className="bg-verde-esmeralda h-[7px] rounded" style={{ width: `${achievement.progress * 100}%` }}></div>
                            </div>
                            <span className="text-small w-fit ms-auto dark:text-blanco mt-2">
                                {currentClasses !== undefined 
                                ? `${currentClasses}/${achievement.targetClasses}` 
                                : `${achievement.currentClasses}/${achievement.targetClasses}`} {t('clases')}
                            </span>
                        </div>
                    </div>
                    {/*
                    {(props.obj.desbloqueo) ? 
                    <div className="w-full flex flex-wrap items-center gap-4">
                        <span className="text-small dark:text-blanco"> {t('desbloqueaste')}</span>
                        <div className="badge-primario text-small dark:badge-secundario-dark  dark:text-blanco dark:font-semibold"> {props.obj.titulo}</div>
                    </div> : <></>}
                    */}
                </div>
            </div>

    </>)
}

export default CardLogro