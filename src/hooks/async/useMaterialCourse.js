import React, { useEffect, useState } from 'react';
import { apiAsyncMaterialCourse } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useMaterialCourse = () => {
    
    const [materialesCurso, setMaterialesCurso] = useState([]);
    const [courseId, setCourseId] = useState();
    const [trigger, setTrigger] = useState(false);
    const { data, error, cargando } = apiAsyncMaterialCourse(trigger,courseId);
    
    
    //console.log("id curso 2",idCurso);
    
    
    // Función para disparar la carga de materiales
    const GetCursoMaterials = (courseId) => {
        setCourseId(courseId);
        setTrigger(true);
    };
    
    {/* 
        useEffect(() => {
        if (idCurso !== courseId) {
            setCourseId(idCurso);
        }
    }, [idCurso, courseId]);
    
    */}
    
    useEffect(() => {
        if (data) {
            if (Array.isArray(data) && data.length > 0) {
                const cursoFiltrado = data.find(curso => curso.cour_int_id === courseId);

                if (cursoFiltrado) {
                    if (Array.isArray(cursoFiltrado.lessons) && cursoFiltrado.lessons.length > 0) {
                        const todosMateriales = cursoFiltrado.lessons.flatMap(leccion => {
                            if (Array.isArray(leccion.materials) && leccion.materials.length > 0) {
                                return leccion.materials.map(material => ({
                                    material_id: material.file_int_id,
                                    material_title: material.file_txt_tag,
                                    material_type: material.file_txt_extension,
                                    material_url: material.file_txt_url,
                                    material_device_type: material.file_txt_device_type,
                                    material_entity: material.file_txt_entity,
                                    material_redirect_url: material.file_txt_redirect_url,
                                    material_language_code: material.lng_txt_code,
                                }));
                            } else {
                                return [];
                            }
                        });

                        setMaterialesCurso(todosMateriales);
                    }
                }
            }
        } else if (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [data, error, courseId]);

    return { GetCursoMaterials, materialesCurso, cargando,error};
};
