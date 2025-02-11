import React, { useState, useEffect } from 'react';
import Iconos from '../../iconos/iconos';

import IconoStream from '../../iconos/en_vivo';
import IconoHora from '../../iconos/nest_clock_farsight_analog';
import IconoHoraBlanco from '../../iconos/nest_clock_farsight_analog_white.js';

import IconoExpandir from '../../iconos/expand_more.js';
import IconoContraer from '../../iconos/keyboard_arrow_up.js';
import { useParams } from 'react-router-dom';
import { useAcademia } from '../../../providers/AcademiaContext';
import { useTranslation } from 'react-i18next';
import { useCalendarioLista } from '../../../hooks/sync/useCalendarioLista';
import { useCalendarioEliminar } from '../../../hooks/sync/useCalendarioEliminar';
import { useNavigation } from '../../../providers/NavigationContext';

const Calendarios = () => {
    
    const { GetCalendarioLista, days: initialDays } = useCalendarioLista();
    const { GetCalendarioEliminar } = useCalendarioEliminar();
    const { t, i18n } = useTranslation();
    const monthInLanguage = new Date().toLocaleString(i18n.language, { month: 'long' });
    const { goToAcademyCursoCanal } = useNavigation();  
    const [days, setDays] = useState([]);

    const { nameProgram, nameCurso } = useParams();
    const { getTeachersByCourseId, getProgramDetailsByCourseId } = useAcademia();
    
    
    useEffect(() => {
        GetCalendarioLista();
    }, [GetCalendarioLista]);

    useEffect(() => {
        setDays(initialDays);
    }, [initialDays]);

    const handleGoToAcademyCursoCanal = (courseId, instructor, idCanal, sessionId) => {
        const programDetails  = getProgramDetailsByCourseId(courseId);
        goToAcademyCursoCanal( programDetails.programName, programDetails.courseName, convertSpacesToUnderscores(instructor), { sessionId, idCanal });
    };
  
    const convertSpacesToUnderscores = (name) => {
      return name.split(' ').join('_');
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();  
        e.preventDefault();   
        await GetCalendarioEliminar(id);
        const updatedDays = days.map(day => ({
            ...day,
            sessions: day.sessions.filter(session => session.id !== id)
        }));
        setDays(updatedDays);
    };
    
      
    const [maximo, setMaximo] = useState(6);

    const teachers = getTeachersByCourseId();
    const fondo = teachers.length > 0 ? teachers[0].color : '';

    const [hoveredIndex, setHoveredIndex] = useState(null);
    
    const [abiertos, setAbiertos] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false
    });

    const handleClick = (event) => {
        const dia = event.currentTarget.getAttribute("dia");
        setAbiertos(prevAbiertos => ({
            ...prevAbiertos,
            [dia]: !prevAbiertos[dia]
        }));
    };

    const getWeekDates = () => {
        const today = new Date();
        const firstDayOfWeek = today.getDate() - today.getDay() + 1; // 1 es para lunes
        return Array.from({ length: 7 }, (_, index) => new Date(today.setDate(firstDayOfWeek + index)).getDate());
    };

    const weekDates = getWeekDates();
    
    const dayNames = {
        1: 'lunes',
        2: 'martes',
        3: 'Miércoles',
        4: 'jueves',
        5: 'viernes',
        6: 'sabado',
        7: 'domingo'
    };

    const convertTo12HourFormat = (time24h) => {
        let [hours, minutes] = time24h.split(':').map(Number);
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
    
    
    const getMaxSessions = () => {
    return Math.max(6, ...Object.keys(dayNames).map(dayKey => {
        const sessionsForDay = days.filter(day => day.weekday === parseInt(dayKey)).flatMap(day => day.sessions);
        return sessionsForDay.length;
    }));
    };
    
   
    const renderDay = (dia, nombreDia, calendarioDia) => {
        const sortedSessions = calendarioDia.slice().sort((a, b) => {
            const nameA = a.instructor ? a.instructor.toLowerCase() : '';
            const nameB = b.instructor ? b.instructor.toLowerCase() : '';
            return nameA.localeCompare(nameB);
        });

        
        
    const maximo = getMaxSessions();
    
    
    
    
    
        return (
            <div className="flex rounded-2xl shadow-custom-strong p-[1rem] mb-[1rem] lg:gap-[10px] flex-col lg:p-0 lg:rounded-0 lg:shadow-none">
                <div className="lg:hidden flex justify-between">
                    <span className="text-large font-semibold">{nombreDia}</span>
                    <button dia={dia} onClick={handleClick}>
                        {abiertos[dia] ? (
                            <IconoContraer width="30px" height="30px" padding="0px" />
                        ) : (
                            <IconoExpandir width="30px" height="30px" padding="0px" />
                        )}
                    </button>
                </div>
                <div className={`${abiertos[dia] ? "h-full mt-[10px]" : "h-0 overflow-hidden !gap-0"} lg:!gap-[10px] flex flex-col gap-[10px] lg:mt-0 lg:h-full`}>
                    {sortedSessions.map((obj, ind) => (
                        <div key={ind} className="lg:h-[100%] lg:h-[90px]" onMouseEnter={() => setHoveredIndex(`${ind} ${obj.startDate}`)} onMouseLeave={() => setHoveredIndex(null)} onClick={() => handleGoToAcademyCursoCanal( obj.courseId, obj.instructor, obj.channelId, obj.id)}>
                            <div className="flex w-100 rounded-[10px] bg-[#e6e6e6] dark:bg-[#353340] min-h-[20px] lg:overflow-hidden h-full">
                                <div className="w-[10px] min-w-[10px] min-h-[inherit] rounded-s-lg" style={{ backgroundColor: obj.color }}></div>
                                <div className="w-[100%] py-[8px] px-[4px] flex flex-col justify-center dark:bg-[#353340]">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex w-100 items-center">
                                            {obj.isLive ?
                                                <IconoStream className="icono-sm me-[4px]" />
                                                :
                                                <>
                                                    <IconoHora className="dark:hidden icono-sm me-[4px]" />
                                                    <IconoHoraBlanco className="hidden dark:block icono-sm me-[4px]" />
                                                </>
                                            }
                                            <span className="text-small dark:text-blanco">{convertTo12HourFormat(obj.startTime)} </span>
                                        </div>
                                        <div className="lg:hidden" style={{ pointerEvents: 'auto' }}>
                                            <Iconos
                                                icono="eliminar"
                                                onClick={(e) => handleDelete(obj.id, e)}
                                                className="icono-sm me-[4px] cursor-pointer"
                                            />
                                        </div>
                                        <div className="hidden lg:block" style={{ pointerEvents: 'auto' }}>
                                            {hoveredIndex === `${ind} ${obj.startDate}` && (
                                                <div onClick={(e) => handleDelete(obj.id, e)}>
                                                    <Iconos icono="eliminar" className="icono-sm me-[4px] cursor-pointer"/>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="line-clamp-2 text-small font-bold mt-2 dark:text-blanco !max-h-[31px] !min-h-[31px]"> {obj.name ? obj.name : '-'}</span>
                                    <div className="flex flex-row gap-2 items-center mt-1">
                                        {obj.photo ? (
                                            <img src={obj.photo} className="w-[20px] h-[20px] rounded-full object-cover bg-gris-medio" alt="educador" />
                                        ) : null}
                                        <span className="text-small dark:text-blanco">{obj.instructor}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {(maximo - sortedSessions.length > 0) ? [...Array(maximo - sortedSessions.length)].map((_, ind) => (
                        <div key={ind} className="hidden lg:block lg:h-[100%] lg:h-[90px]">
                            <div className="flex w-100 rounded-[10px] bg-[#F0F0F2] dark:bg-color-dark2 min-h-[20px] lg:overflow-hidden h-full">
                                <span className="m-auto text-small font-semibold dark:text-blanco">-</span>
                            </div>
                        </div>
                    )) : <></>}
                </div>
            </div>
        );
    };

    return (
        <div className="w-[100%] flex flex-col gap-4">
            <div className="flex w-[100%] py-[0.5rem]">
                <span className="text-extra lg:text-3extra font-sans font-semibold capitalize dark:text-blanco">{`${weekDates[0]}-${weekDates[6]} ${monthInLanguage}`}</span>
            </div>
            <div className="hidden lg:grid lg:grid-row-flow-dense lg:grid-cols-7 lg:gap-[10px] text-center text-large w-full mb-[10px]">
                {Object.values(dayNames).map(dayName => (
                    <div key={dayName} className="w-full bg-gris-azulado-profundo text-white p-2 rounded-[10px] dark:bg-blanco dark:text-color-dark dark:font-semibold">
                        {t(dayName)}
                    </div>
                ))}
            </div>
            <div className="hidden lg:grid lg:grid-row-flow-dense lg:grid-cols-7 lg:gap-[10px] text-center text-small">
                {weekDates.map((dia, index) => (
                    <div key={index} className="text-center font-sans dark:text-blanco dark:font-normal">{dia}</div>
                ))}
            </div>
            <div className="lg:grid lg:grid-row-flow-dense lg:grid-cols-7 lg:gap-[10px] text-large w-full">
                {Object.keys(dayNames).map(dayKey => renderDay(dayNames[dayKey], t(dayNames[dayKey]), days.filter(day => day.weekday === parseInt(dayKey)).flatMap(day => day.sessions)))}
            </div>
        </div>
    );
};

export default Calendarios;
