import React, { useState,useEffect,useRef } from 'react';
import IconosProgramacion from '../../iconos/calendar_add_white';
import IconoProgramacionDark from '../../iconos/calendar_add_on';

import IconoHora from '../../iconos/nest_clock_farsight_analog';
import IconoHoraBlanco from '../../iconos/nest_clock_farsight_analog_white.js';


import IconoStream from '../../iconos/en_vivo';

import { useCalendarioAgendar } from '../../../hooks/sync/useCalendarioAgendar';
import { toast } from 'react-toastify';
import { useNavigation } from '../../../providers/NavigationContext';

import { useTranslation } from 'react-i18next';


const Horario = ({props, color , horario , nameProgram ,nameCurso , colorAcademia } ) => {
    
   
    const { GetCalendarioAgendar, calendarAdd } = useCalendarioAgendar(); // Usa tu hook personalizado

    const { goToAcademyCursoCanal } = useNavigation();  
    
    const { t } = useTranslation();
    
    //alert(colorAcademia);
    
    

    const handleGoToAcademyCursoCanal = (nameProgram,nameCurso,nombreCanal,idCanal , sessionId ) => {
        goToAcademyCursoCanal(nameProgram, nameCurso, convertSpacesToUnderscores(nombreCanal), {  sessionId , idCanal });
    };
    
    
    const handleSchedule = (id) => {
        GetCalendarioAgendar(id);
    };
    
    
    const getWeekDates = () => {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay() + 1; // 1 es para lunes
        return Array.from({ length: 7 }, (_, index) => new Date(today.setDate(firstDayOfWeek + index)).getDate());
    };
    
    const weekDates = getWeekDates();
    
    const convertSpacesToUnderscores = (name) => {
      return name.split(' ').join('_');
    };
    
    
    const classSchedule = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    
    
    const getClassesByDay = (day) => {
        return horario.filter(item => new Date(item.calDateStart).getDay() === daysOfWeek.indexOf(day));
    };
    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    
    /*const getDayName = (weekday) => {
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return days[weekday] || "Día desconocido";
    };*/
    const getDayName = (weekday) => {
        const days = [t('domingo'), t('lunes'), t('martes'), t('miercoles'), t('jueves'), t('viernes'), t('sabado')];
        const index = weekday % 7;
        return days[index] || "Día desconocido";
    };


    
    const convertTo12HourFormat = (time24h) => {
        let [hours, minutes, seconds] = time24h.split(':').map(Number);
        let period = 'a.m.';
        if (hours >= 12) {
            period = 'p.m.';
            if (hours > 12) hours -= 12;
        } else if (hours === 0) {
            hours = 12; // 12 AM
        }
        minutes = minutes.toString().padStart(2, '0');
        return `${hours}:${minutes} ${period}`;
    };

    
    const sortedHorario = horario.slice().sort((a, b) => {
        const nameA = a.instructorNombre ? a.instructorNombre.toLowerCase() : '';
        const nameB = b.instructorNombre ? b.instructorNombre.toLowerCase() : '';
        return nameA.localeCompare(nameB);
    });
      
    
    return (<>
        <div className="w-[100%] text-center pb-[16px] lg:pb-[40px]">
            <span className="text-extra lg:text-3extra font-semibold dark:text-blanco">{t('programacion')}</span>
        </div>
        <div className="w-[100%] flex flex-col gap-4">
            <div className="hidden lg:grid lg:grid-row-flow-dense lg:grid-cols-8 lg:gap-[10px] text-center text-large">
                <span></span>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('lunes')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('martes')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('miercoles')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('jueves')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('viernes')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('sabado')} </div>
                <div className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:text-color-dark dark:bg-blanco dark:font-semibold">{t('domingo')} </div>
            </div>
            <div className="hidden lg:grid lg:grid-row-flow-dense lg:grid-cols-8 lg:gap-[10px] text-center text-small dark:text-blanco">
                <span>{t('educadores')} </span>
                {weekDates.map((date, index) => (
                        <div key={index} className="text-center">
                            {date}
                        </div>
                    ))}
            </div>
            
            {sortedHorario.map((canal, index) => {
                    
                    const sortedDays = canal.days.sort((a, b) => a.weekday - b.weekday);
                    const getFirstSessIntId = (sortedDays) => {
                        for (const day of sortedDays) {
                            if (day.sessions && day.sessions.length > 0) {
                                return day.sessions[0].sessIntId;
                            }
                        }
                        return null;
                    };
                    
                    const firstSessIntId = getFirstSessIntId(sortedDays);
                    //console.log('firstSessIntId',firstSessIntId);
                
                     return (
                         <div key={index} className="flex flex-col lg:grid lg:grid-row-flow-dense lg:grid-cols-8 lg:gap-[10px]">
                             <div className="h-[105px] w-[100%] rounded-[10px]">
                                {/*
                                <div className="flex flex-col h-[100px] xl:h-[145px] lg:h-[145px] cursor-pointer relative">
                                    <div className="lg:w-[100px] lg:h-[145px] xl:h-[130px] xl:!w-[130px] relative z-[1] lg:z-[5]" onClick={() => handleGoToAcademyCursoCanal(nameProgram, nameCurso, canal.instructorNombre, canal.chnlIntId, firstSessIntId)}>
                                         <img src={canal.instructorPhoto} className="absolute object-contain w-[100px] h-[105px] lg:!h-[145px] lg:w-[100px] xl:!h-[145px] xl:!w-[130px] lg:rounded-[10px]" alt="Imagen del Canal" />
                                         <div className="absolute w-[100%] lg:w-auto h-[105px] bg-gradient-to-b from-slate-50 to-90% to-slate-900 opacity-50 lg:opacity-0 lg:rounded-[10px] lg:h-[145px]"></div>
                                    </div>
                                    <div className="lg:!w-[100px] xl:!w-[130px] lg:flex z-[1] lg:z-[10] relative">
                                         <div className="flex items-end px-2 py-2 lg:!p-0 h-[100px] lg:h-auto">
                                             <span className="text-white text-large lg:hidden font-semibold dark:text-blanco">{canal.instructorNombre}</span>
                                             <button onClick={() => handleSchedule(canal.chnlIntId)} className="lg:!w-[100px] xl:!w-[130px] ms-auto boton-primario dark:boton-secundario dark:lg:rounded-b-[10px] dark:font-bold dark:text-sm dark:lg:rounded-t-[0px] h-[fit-content] shrink-0 !w-[fit-content] flex items-center lg:shrink-1 lg:z-[initial] lg:ms-0 lg:!w-[100%] lg:rounded-b-[10px] lg:rounded-t-[0px] justify-center">
                                                {t('btnAgendar')}
                                                <IconosProgramacion icono="calendarAdd" className="dark:hidden icono-sm ms-[4px]" />
                                                <IconoProgramacionDark className="hidden dark:block icono-sm ms-[4px]" />
                                             </button>
                                         </div>
                                    </div>
                                </div>*/}
                                
                                <div className="flex flex-col h-full xl:h-[145px] lg:h-[145px] cursor-pointer relative">
                                    <div className="relative w-full h-full lg:w-[100px] xl:w-[130px] z-[5]" onClick={() =>handleGoToAcademyCursoCanal(nameProgram,nameCurso,canal.instructorNombre,canal.chnlIntId,firstSessIntId)}>
                                        <img
                                            src={canal.instructorPhoto}
                                            //className="absolute object-contain w-full h-full lg:rounded-[10px]"
                                            className="absolute object-contain w-[100px] h-[105px] lg:!h-[145px] lg:w-[100px] xl:!h-[145px] xl:!w-[130px] lg:rounded-[10px]"
                                            alt="Imagen del Canal"
                                        />
                                        <div className="absolute w-full h-full bg-gradient-to-b from-slate-50 to-slate-900 opacity-50 lg:opacity-0 lg:rounded-[10px]"></div>
                                    </div>
                            
                                    <div className="absolute bottom-0 left-0 w-full lg:w-auto flex items-center px-2 py-2 lg:py-0 lg:px-0 z-[10] ">
                                    
                                        <span className="text-white text-large lg:hidden font-semibold dark:text-blanco">
                                            {canal.instructorNombre}
                                        </span>
                                        <button
                                            onClick={(e) => {e.stopPropagation();handleSchedule(canal.chnlIntId);}}
                                            //className="ms-auto boton-primario dark:boton-secundario dark:lg:rounded-b-[10px] dark:font-bold dark:text-sm h-[fit-content] shrink-0 flex items-center lg:!w-[100px] xl:!w-[130px] lg:ms-0 lg:rounded-b-[10px] justify-center"
                                            className="lg:!w-[100px] xl:!w-[130px] ms-auto boton-primario dark:boton-secundario dark:lg:rounded-b-[10px] dark:font-bold dark:text-sm dark:lg:rounded-t-[0px] h-[fit-content] shrink-0 !w-[fit-content] flex items-center lg:shrink-1 lg:z-[initial] lg:ms-0 lg:!w-[100%] lg:rounded-b-[10px] lg:rounded-t-[0px] justify-center"
                                        >
                                            {t('btnAgendar')}
                                            <IconosProgramacion icono="calendarAdd" className="dark:hidden icono-sm ms-[4px]" />
                                            <IconoProgramacionDark className="hidden dark:block icono-sm ms-[4px]" />
                                        </button>
                                    </div>
                                </div>



                             </div>
                             {sortedDays.map((day, dayIndex) => (
                                 <div key={dayIndex}>
                                     {day.sessions.length > 0 ? (
                                         <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                                            <span className="flex lg:hidden text-medium font-semibold dark:text-blanco">{getDayName(day.weekday)}</span>
                                             <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                                                 {day.sessions.sort((a, b) => {
                                                        const [hourA, minuteA] = a.calTimeStart.split(':').map(Number);
                                                        const [hourB, minuteB] = b.calTimeStart.split(':').map(Number);
                                                        return hourA !== hourB ? hourA - hourB : minuteA - minuteB;
                                                    })
                                                    .map((session, sessionIndex) => (
                                                     <div key={sessionIndex} className="flex w-100 rounded-[10px] bg-[#ECECEC] dark:bg-[#353340] min-h-[20px] lg:overflow-hidden cursor-pointer"
                                                         onClick={() => handleGoToAcademyCursoCanal(nameProgram, nameCurso, canal.instructorNombre, canal.chnlIntId, session.sessIntId)}>
                                                         <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{ "backgroundColor": colorAcademia }}></div>
                                                         <div className="dark:bg-[#353340] w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                                             <div className="flex w-100 items-center">
                                                                 {session.isLive ?
                                                                     <IconoStream className="icono-sm me-[4px]" />
                                                                     :
                                                                     <>
                                                                         <IconoHora className="dark:hidden icono-sm me-[4px]" />
                                                                         <IconoHoraBlanco className="hidden dark:block icono-sm me-[4px]" />
                                                                     </>
                                                                 }
                                                                 <span className="text-small lowercase dark:text-blanco">{convertTo12HourFormat(session.calTimeStart)}</span>
                                                             </div>
                                                             <span className={`text-small dark:text-blanco font-semibold ${day.sessions.length > 2 ? "lg:text-nowrap" : ""}`}>
                                                                 {session.sessionName || "Sesión sin nombre"}
                                                             </span>
                                                         </div>
                                                     </div>
                                                 ))}
                                             </div>
                                         </div>
                                     ) : (
                                         <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                                             <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                                                 <div className="flex w-100 rounded-[10px] bg-[#ECECEC] dark:bg-color-dark2 min-h-[20px] lg:overflow-hidden">
                                                     <span className="m-auto text-small font-semibold dark:text-blanco">-</span>
                                                 </div>
                                             </div>
                                         </div>
                                     )}
                                 </div>
                             ))}
                         </div>
                     );
                 })}

                
             
            {/*
            
            {props.obj.programacion.map((obj,ind)=>(
            <div className="flex flex-col lg:grid lg:grid-row-flow-dense lg:grid-cols-8 lg:gap-[10px]">
                <div className="h-[105px] w-[100%] rounded-[10px]">
                    <div className="flex flex-col h-[105px] lg:h-[145px]">
                        <div className="flex relative">
                            <img src={obj.imagen_educador} className=" absolute object-cover h-[105px] w-[100%] lg:h-[145px] lg:rounded-[10px]"></img>
                            <div className="absolute w-[100%] h-[105px] bg-gradient-to-b from-slate-50 to-90% to-slate-900 opacity-50 lg:opacity-0 lg:rounded-[10px] lg:h-[145px]">
                                
                            </div>
                        </div>
                        <div className="w-[100%] h-[100%] lg:flex z-[1] ">
                            <div className="flex h-full items-end px-2 py-2 lg:!p-0 lg:w-full">
                                <span className="text-white text-large lg:hidden font-semibold">{obj.nombre_educador}</span>
                                <button className="ms-auto boton-primario h-[fit-content] shrink-0 !w-[fit-content] flex items-center lg:shrink-1 lg:z-[initial] lg:ms-0 lg:p-[0.25rem] lg:!w-[100%] lg:rounded-b-[10px] lg:rounded-t-[0px] justify-center"> 
                                    Agendar 
                                    <IconosProgramacion icono="calendarAdd" className="icono-sm ms-[4px]"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {(obj.clases.lunes?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Lunes</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.lunes.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                   {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.lunes.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                        
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                    <span className="m-auto text-small font-semibold">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {(obj.clases.martes?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Martes</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.martes.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.martes.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                }
                {(obj.clases.miercoles?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Miércoles</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.miercoles.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.miercoles.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                }
                {(obj.clases.jueves?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Jueves</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.jueves.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.jueves.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                }
                {(obj.clases.viernes?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Viernes</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.viernes.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.viernes.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                }
                {(obj.clases.sabado?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Sábado</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.sabado.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.sabado.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase}
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                } 
                {(obj.clases.domingo?.length > 0) ? 
                    <div className="py-[0.5rem] px-[1rem] lg:!p-[0]">
                        <span className="flex lg:hidden text-medium font-semibold">Domingo</span>
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px]">
                        {
                        obj.clases.domingo.map((objx,indx)=>(
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{"background-color": props.color}}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center">
                                    <div className="flex w-100 items-center">
                                     {objx.envivo ? <IconoStream className="icono-sm me-[4px]" /> : <IconoHora className="icono-sm me-[4px]" />}
                                    <span className="text-small lowercase">{objx.hora}</span>
                                    </div>
                                    <span className={"text-small font-semibold " + ((obj.clases.domingo.length > 2) ? "lg:text-nowrap" : "")}>
                                        {objx.nombre_clase} 
                                    </span>
                                </div>
                            </div>
                        ))
                        }
                        </div>
                    </div>:
                    <div className="hidden py-[1rem] px-[1rem] lg:!p-[0] lg:block">
                        <div className="grid grid-row-flow-dense gap-4 lg:h-[100%] lg:gap-[5px] lg:h-[145px] w-full">
                            <div className="flex w-100 rounded-[10px] bg-[#ECECEC] min-h-[20px] lg:overflow-hidden ">
                                <span className="m-auto text-small font-semibold">-</span>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            
            ))}
            */}    
            
            
           
            
        </div>
    </>)
}

export default Horario