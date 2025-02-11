import React, { useEffect, useState } from 'react';
import { apiAcademyCourseFavoriteList } from '../../api/apiConfig';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 
import { toast } from 'react-toastify';
import { useAcademia } from '../../providers/AcademiaContext';
import { useUser } from '../../providers/UserContext';

export const useCourseFavoriteList = () => {
    
    /*const { asynchronous } = useUser();
    const convertCourseType = (type) => {
        if (type.toLowerCase() === 'sincrónico') {
            return 1;
        } else if (type.toLowerCase() === 'asincrónico') {
            return 2;
        }
        return 1;
    };
    
    const initialCourseTypeString = localStorage.getItem('courseType') || asynchronous || 'sincrónico';*/
    const { getNameByIds, getCourseMetrics , academias} = useAcademia();
    const [courseFav, setCourseFav] = useState([]);
    const [courseType, setCourseType] = useState(2);
    const [trigger, setTrigger] = useState(false);
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const { data, error, cargando } = apiAcademyCourseFavoriteList(trigger,courseType );
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    /*useEffect(() => {
        const convertedType = convertCourseType(initialCourseTypeString);
        if (convertedType !== courseType) {
            setCourseType(convertedType);
            setTrigger(true);
        }
    }, [initialCourseTypeString, courseType]);*/
    
    useEffect(() => {
        if (trigger) {
            setTrigger(false);
        }
    }, [trigger]);
    
    const GetCourseFav = () => {
        setTrigger(true);
    };
    
    
    const formatAcademyName = (name) => {
        return name.replace(/_/g, ' ');
    };

    useEffect(() => {
        if (data) {
            
            if (Array.isArray(data) && data.length > 0) {
                const cursosConDetalles = data.map(curso => {
                    const imagenMiniatura = curso.files.find(file => 
                        file.tag === 'curso_foto_miniatura' && file.device_type === tipoDispositivo
                    );
                    
                   

                    // Asegúrate de acceder correctamente a programName
                    const nameInfo = getNameByIds(curso.program_id, curso.course_id, language_code) || {};
                    
                    
                    
                    
                    
                    const programName = nameInfo.programName || 'Sin academia';
                    const courseName = nameInfo.courseName || 'Sin curso';
                    const formattedProgramName = formatAcademyName(programName);
                    const formattedCourseName = formatAcademyName(courseName);
                    
                    // Asegúrate de manejar los datos de courseMetrics correctamente
                    const courseMetrics = getCourseMetrics(curso.program_id, curso.course_id) || {};

                    return {
                        courseId: curso.course_id,
                        programId: curso.program_id,
                        entityType: curso.entity_type,
                        name:formattedCourseName,
                        academyName: formattedProgramName, 
                        description: curso.translations.find(tr => tr.language_code == language_code)?.description || 'Sin descripción',
                        curso_foto_miniatura: imagenMiniatura ? imagenMiniatura.url : '', 
                        count_classes: courseMetrics.count_classes || 0,
                        total_duration: courseMetrics.total_duration || '',
                        count_modules: courseMetrics.count_modules || 0,
                        isFavorite: curso.is_favorite,
                    };
                });

                //
                setCourseFav(cursosConDetalles);
            } else {
                
            }
        } else if (error) {
            console.error('Error al obtener cursos recomendados');
        }
    }, [data, error, tipoDispositivo ,academias]);

    return { GetCourseFav, courseFav, cargando  };
}