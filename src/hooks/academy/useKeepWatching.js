import React, { useEffect, useState } from 'react';
import { apiAcademyKeepWatching } from '../../api/apiConfig';
import { toast } from 'react-toastify';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 
import { useAcademia } from '../../providers/AcademiaContext';


export const useKeepWatching = () => {
    
    const { getNameByIds, getCourseMetrics , academias} = useAcademia();
    const [cursosKeepWatching, setCursosKeepWatching] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [courseType, setCourseType] = useState(2);
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const { data, error, cargando } = apiAcademyKeepWatching(trigger,courseType);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const GetKeepWatching = () => {
        setTrigger(true);
    };

    const formatAcademyName = (name) => {
        return name.replace(/_/g, ' ');
    };
    
    function isFavorite(value) {
        return value === 1 || value === true || value === "true";
    }

    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                
                const cursosConDetalles = data.map(curso => {
                    const imagenMiniatura = curso.files.find(file => 
                        file.tag === 'curso_foto_miniatura' && file.device_type === tipoDispositivo
                    );

                    const nameInfo = getNameByIds(curso.program_id, curso.course_id, language_code ) || {};
                    const programName = nameInfo.programName || 'Sin academia';
                    const courseName = nameInfo.courseName || 'Sin curso';
                    const formattedProgramName = formatAcademyName(programName);
                    const formattedCourseName = formatAcademyName(courseName);

                    const courseMetrics = getCourseMetrics(curso.program_id, curso.course_id) || {};
                    const isFavoriteCourse = isFavorite(curso.is_favorite);

                    const lessons = curso.modules.flatMap(module =>
                        module.submodules.flatMap(submodule =>
                            submodule.classes.map(cls => {
                                
                                const idiomaModulo = module.mod_txt_lng_code;
                                const lessonName = cls.translations.find(tr => tr.lng_txt_code === idiomaModulo)?.trn_txt_name || 'Sin nombre';
                                const lessonDescription = cls.translations.find(tr => tr.lng_txt_code === idiomaModulo)?.trn_txt_description || 'Sin descripción';
                                
                                return {
                                    lessonId: cls.class_id,
                                    lessonName: lessonName,
                                    lessonDescription: lessonDescription,
                                    classDuration: cls.class_duration,
                                    viewed: cls.viewed,
                                    orden: cls.less_int_order,
                                    moduleOrder: module.mod_int_order,
                                    idiomaModulo: idiomaModulo
                                };
                            })
                        )
                    );
                    
                    
                    const firstLesson = lessons.length > 0 ? lessons[0] : {};
                    
                    return {
                        courseId: curso.course_id,
                        programId: curso.program_id,
                        entityType: curso.entity_type,
                        nameCurso: formattedCourseName,
                        academyName: formattedProgramName,
                        description: curso.translations.find(tr => tr.language_code === language_code)?.description || 'Sin descripción',
                        curso_foto_miniatura: imagenMiniatura ? imagenMiniatura.url : '',
                        count_classes: firstLesson.orden || 0,
                        total_duration: firstLesson.classDuration || '',
                        count_modules: firstLesson.moduleOrder || 0,
                        is_favorite: isFavoriteCourse,
                        lessonId: firstLesson.lessonId,
                        lessonName: firstLesson.lessonName,
                        idiomaModulo: firstLesson.idiomaModulo,
                    };
                });

                setCursosKeepWatching(cursosConDetalles);
            } else {
                
            }
        } else if (error) {
            
        }
    }, [data, error, tipoDispositivo , academias  ]);

    return { GetKeepWatching, cursosKeepWatching, cargando };
};
