import React, { useEffect, useState } from 'react';
import { apiAcademyRecommended } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 
import { useAcademia } from '../../providers/AcademiaContext';

export const useRecommended = (courseId) => {
    const { getNameByIds, getCourseMetrics,academias } = useAcademia();
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const [cursosRecommended, setCursosRecommended] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [limit, setLimit] = useState(10);
    //const [courseId, setcourseId] = useState('');
    const { data, error, cargando } = apiAcademyRecommended(trigger, limit, courseId);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    
    const GetCursoRecommended = () => {
        setTrigger(true);
    };

    const formatAcademyName = (name) => {
        return name.replace(/_/g, ' ');
    };
    
    function isFavorite(value) {
        // Esta función determinará si el curso es favorito
        return value === 1 || value === true || value === "true";
    }

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                const cursosConDetalles = data.map(curso => {
                    const imagenMiniatura = curso.files.find(file => 
                        file.tag === 'curso_foto_miniatura' && file.device_type === tipoDispositivo
                    );

                    // Asegúrate de acceder correctamente a programName
                    const nameInfo = getNameByIds(curso.program_id, curso.course_id, language_code ) || {};
                    const programName = nameInfo.programName || 'Sin academia';
                    const courseName = nameInfo.courseName || 'Sin curso';
                    const formattedProgramName = formatAcademyName(programName);
                    const formattedCourseName = formatAcademyName(courseName);
                    
                    // Asegúrate de manejar los datos de courseMetrics correctamente
                    const courseMetrics = getCourseMetrics(curso.program_id, curso.course_id) || {};
                    
                    const isFavoriteCourse = isFavorite(curso.is_favorite);

                    return {
                        courseId: curso.course_id,
                        programId: curso.program_id,
                        entityType: curso.entity_type,
                        name:formattedCourseName,
                        nameCurso:formattedCourseName,
                        academyName: formattedProgramName, 
                        description: curso.translations.find(tr => tr.language_code === language_code )?.description || 'Sin descripción',
                        curso_foto_miniatura: imagenMiniatura ? imagenMiniatura.url : '', 
                        count_classes: courseMetrics.count_classes || 0,
                        total_duration: courseMetrics.total_duration || '',
                        count_modules: courseMetrics.count_modules || 0,
                    };
                });

                
                setCursosRecommended(cursosConDetalles);
            } else {
                
            }
        } else if (error) {
            console.error('Error al obtener cursos recomendados');
        }
    }, [data, error, tipoDispositivo,academias]);

    return { GetCursoRecommended, cursosRecommended, cargando };
};
