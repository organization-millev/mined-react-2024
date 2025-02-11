import React, { useEffect, useState } from 'react';
import { apiAcademyAchievements } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { useAcademia } from '../../providers/AcademiaContext';

export const useArchievements = () => {
    
    const [achievements, setAchievements] = useState([]);
    const [academyId, setAcademyId] = useState(null);
    const [listaAcademias, setListaAcademias] = useState(null);
    
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiAcademyAchievements(trigger, academyId);
    
    useEffect(() => { 
        if(trigger===true){
            setTrigger(false);
        }
    }, [trigger]);

    
    const GetArchievements = (listaAcademias) => {
        if(listaAcademias.length>0){
            const programIds = listaAcademias.map(program => program.program_id).join(', ');
            if (programIds) {
                setAcademyId(programIds);
                setListaAcademias(listaAcademias);
                setTrigger(true);
            } 
        }
    };
    
    const redorndear = (value) => {
        return Math.round(value);
    };
    
    // Formatear horas y minutos
    const formatHoursAndMinutes = (hours, minutes) => {
        // Sumar los minutos a las horas si hay más de 60 minutos
        const totalMinutes = Math.round(minutes); // Redondeamos los minutos
        const additionalHours = Math.floor(totalMinutes / 60); // Convertimos los minutos adicionales a horas
        const remainingMinutes = totalMinutes % 60; // Minutos que sobran
    
        // Sumamos las horas adicionales a las horas existentes
        const totalHours = Math.floor(hours) + additionalHours;
    
        return `${totalHours}hs ${remainingMinutes}min`;
    };

    /*useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            
            setAchievements(data.map(item => {
                const courseAchievements = item.course_achievements[0] || {};
                
                const viewedCoursesCount = Array.isArray(item.course_viewed) ? item.course_viewed.length : 0;

                
                const totalCourses = courseAchievements.count_courses || 0;
                const percentageCoursesViewed = totalCourses > 0 ? (viewedCoursesCount / totalCourses) * 100 : 0;
                
                const programInfo = listaAcademias.find(program => program.program_id === item.program_id);
                
                const formattedTime = formatHoursAndMinutes(
                    courseAchievements.sum_hours_all || 0, 
                    courseAchievements.sum_minutes_all || 0
                );


                return {
                    color: programInfo.color, // Puedes ajustar este color según la lógica de tu aplicación
                    program_id: item.program_id,
                    program_name: item.program_name,
                    count_courses: totalCourses,
                    avg_hours: courseAchievements.avg_hours || 0,
                    sum_hours: courseAchievements.sum_hours || 0,
                    min_total: courseAchievements.sum_minutes_all || 0,
                    hours_total: courseAchievements.sum_hours_all || 0,
                    formatted_time: formattedTime,
                    remainig_courses: courseAchievements.remainig_courses || 0,
                    progress_lessons: redorndear(courseAchievements.progress_lessons || 0),
                    courses_viewed: Array.isArray(item.courses) ? item.courses.map(course => ({
                      cour_int_id: course.cour_int_id,
                      course_name: course.course_name,
                      course_description: course.course_description,
                      course_subtitle: course.course_subtitle,
                      course_slogan: course.course_slogan
                    })) : [],
                    count_courses_viewed: Array.isArray(item.courses) ? item.courses.length : 0,
                    percentage_courses_viewed: percentageCoursesViewed.toFixed(2),
                    
                    medals: [], // No hay información sobre medallas en los datos proporcionados, así que se deja vacío
                    certificates: item.certificates // No hay información sobre certificados en los datos proporcionados, así que se deja vacío
                };
            }));
        } 
    }, [data, error]);*/
    
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            setAchievements(data.map(item => {
                const courseAchievements = item.course_achievements[0] || {};
                
                const viewedCoursesCount = Array.isArray(item.course_viewed) ? item.course_viewed.length : 0;
                const totalCourses = courseAchievements.count_courses || 0;
                const percentageCoursesViewed = totalCourses > 0 ? (viewedCoursesCount / totalCourses) * 100 : 0;
                
                const programInfo = listaAcademias.find(program => program.program_id === item.program_id);
                
                // Aseguramos que sum_hours_all y sum_minutes_all tengan un valor válido
                const hours_total = courseAchievements.sum_hours_all || 0; // Predeterminado a 0 si es undefined
                const min_total = courseAchievements.sum_minutes_all || 0; // Predeterminado a 0 si es undefined
    
                // Usamos la función formatHoursAndMinutes para formatear los valores
                const formattedTime = formatHoursAndMinutes(hours_total, min_total);
             
                return {
                    color: programInfo.color,
                    program_id: item.program_id,
                    program_name: item.program_name,
                    count_courses: totalCourses,
                    avg_hours: courseAchievements.avg_hours || 0,
                    sum_hours: courseAchievements.sum_hours || 0,
                    formatted_time: formattedTime, // Almacenamos el tiempo formateado
                    remainig_courses: courseAchievements.remainig_courses || 0,
                    progress_lessons: redorndear(courseAchievements.progress_lessons || 0),
                    courses_viewed: Array.isArray(item.courses) ? item.courses.map(course => ({
                        cour_int_id: course.cour_int_id,
                        course_name: course.course_name,
                        course_description: course.course_description,
                        course_subtitle: course.course_subtitle,
                        course_slogan: course.course_slogan
                    })) : [],
                    count_courses_viewed: Array.isArray(item.courses) ? item.courses.length : 0,
                    percentage_courses_viewed: percentageCoursesViewed.toFixed(2),
                    
                    medals: [],
                    certificates: item.certificates,
                    courseAchievements:item.course_user_achievements,
                };
            }));
        } 
    }, [data, error]);




    useEffect(() => {
        if (trigger) {
            setTrigger(false);
        }
    }, [trigger])  
    


    return { GetArchievements, achievements, cargando };
}