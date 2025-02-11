import React, { useEffect, useState } from 'react';
import { apiAsyncCoursesModules } from '../../api/apiConfig';
import { toast } from 'react-toastify';

export const useCoursesModules = () => {
    const [modules, setModules] = useState([]);
    const [idiomas, setIdiomasModulo] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [courseId, setCourseId] = useState(null);
    const { data, error } = apiAsyncCoursesModules(trigger, courseId);
    const language_code_modules = (localStorage.getItem('languageModules') || 'es').toUpperCase();
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
   
    const GetModules = () => {
        setTrigger(true);
    };

    const updateCourseId = (id) => {
            setModules([]);
            setCourseId(id);
            setTrigger(true);
    };
    
    useEffect(() => {
        if (trigger) {
            setTrigger(false);
        }
    }, [trigger]);

    useEffect(() => {
        if (courseId !== null) {
            GetModules(); 
        }
    }, [courseId]);
    
    
    useEffect(() => {
        if (data) {
            if (data && Array.isArray(data) && data.length > 0) {
                const formattedModules = data
                    .filter(module => {
                        //const firstSubmodule = module.submodules?.[0];
                        //const classes = firstSubmodule?.classes || [];
                        //return classes.length > 0; // Filtra módulos con al menos una clase
                        const allClasses = module.submodules?.flatMap(submodule => submodule.classes || []);
                        return allClasses.length > 0;
                    })
                    .map(module => {
                        //const firstSubmodule = module.submodules?.[0];
                        const allClasses = module.submodules?.flatMap(submodule => submodule.classes || []) || [];
                        //const classes = allClasses?.classes || [];
    
                        const totalClasses = allClasses.length;
                        const viewedClasses = allClasses.filter(clase => clase.viewed > 0).length;
                        
                        let descriptionText;
                        switch (language_code) {
                            case 'ES':
                                descriptionText = `Contiene ${totalClasses} sesiones ${module.translations?.[1]?.trn_txt_subtitle || ''}`;
                                break;
                            case 'EN':
                                descriptionText = `Contains ${totalClasses} sessions ${module.translations?.[0]?.trn_txt_subtitle || ''}`;
                                break;
                            default:
                                // Manejar cualquier código de idioma desconocido como español por defecto
                                descriptionText = `Contiene ${totalClasses} sesiones ${module.translations?.[0]?.trn_txt_subtitle || ''}`;
                        }
                        const descripcion = descriptionText.trim();
                        /*const descripcion = module.translations?.[0]?.trn_txt_subtitle
                                            ? `Contiene ${totalClasses} clases ${module.translations[0].trn_txt_subtitle}`
                                           : `Contiene ${totalClasses} clases`;*/
                        //const moduleTranslations = getTranslationsByLanguage(module.translations, language_code);                   
                        //const subModuleTranslations = getTranslationsByLanguage(submodule.translations, language_code);   
                        //const claseTranslations = getTranslationsByLanguage(clase.translations, language_code);   
                        
                        return {
                            id: module.module_id,
                            moduloIdioma: module.mod_txt_lng_code,
                            titulo: getTranslationsByLanguage(module.translations, language_code)?.trn_txt_name  || '',
                            descripcion: descripcion,
                            tiempoTotal: formatTotalDuration(calculateTotalDuration(allClasses)), // Format total duration
                            viewedTotal: `${viewedClasses}/${totalClasses}`, // Visto/Total
                            subtitulos: module.submodules?.map(submodule => ({
                                id: submodule.sub_mod_int_id,
                                nombre: getTranslationsByLanguage(submodule.translations, language_code)?.trn_txt_name || '',
                                clases: submodule.classes?.map(clase => ({
                                    idModulo: clase.class_id,
                                    habilitado: clase.viewed > 0,
                                    nombre: getTranslationsByLanguage(clase.translations, language_code)?.trn_txt_name,
                                    descripcion: getTranslationsByLanguage(clase.translations, language_code)?.trn_txt_description,
                                    subtitle: getTranslationsByLanguage(clase.translations, language_code)?.trn_txt_subtitle,
                                    duracion: formatDuration(clase.class_duration),
                                    duracionDesktop: formatDurationDesktop(clase.class_duration),
                                    viewed: clase.viewed,
                                    ordenListaModules: clase.less_int_order,
                                })) || []
                            })) || []
                        };
                    });
                    //setRefreshModule(true);
                    setModules(filterModulesByLanguage(formattedModules,language_code_modules));
                    setIdiomasModulo(getUniqueLanguages(data));
            } else {
                
                //setRefreshModule(false);
            }
        } else if (error) {
            console.error('Error fetching tools');
            //setRefreshModule(false);
        }
    }, [data, error]);
    
    
    
    
    
    // Función para filtrar módulos por idioma
    const filterModulesByLanguage = (modulesList, moduloIdioma) => {
        return modulesList.filter(module => module.moduloIdioma === moduloIdioma);
    };
    
    const getTranslationsByLanguage = (translations, lngCode) => {
    // Intentar filtrar las traducciones por el primer idioma
    let filteredTranslations = translations.filter(translation => translation.lng_txt_code === language_code_modules);

    // Si no se encuentran traducciones, intentar con el segundo
    if (filteredTranslations.length === 0) {
        filteredTranslations = translations.filter(translation => translation.lng_txt_code === lngCode);
    }

    // Si aún no se encuentran traducciones, usar español por defecto
    if (filteredTranslations.length === 0) {
        filteredTranslations = translations.filter(translation => translation.lng_txt_code === 'ES');
    }

    // Retornar la traducción encontrada o null si no hay ninguna
    return filteredTranslations.length > 0 ? filteredTranslations[0] : null;
};


    /*const getTranslationsByLanguage = (translations, lngCode) => {
        const filteredTranslations = translations.filter(translation => translation.lng_txt_code === lngCode);
    
        // Si no se encuentran traducciones en el idioma especificado, filtrar por español (ES)
        if (filteredTranslations.length === 0) {
            return translations.filter(translation => translation.lng_txt_code === 'ES');
        }
    
        // Retornar las traducciones encontradas en el idioma especificado
        return filteredTranslations[0];
    };*/

    const getUniqueLanguages = (modules) => { 
        // Crear un Set para almacenar los códigos de idiomas únicos
        const languages = new Set();
    
        // Recorrer cada módulo y agregar su código de idioma al Set
        modules.forEach(module => {
            languages.add(module.mod_txt_lng_code);
        });
    
        // Convertir el Set a un array de objetos con el formato { language_code: 'XX' }
        return Array.from(languages).map(language => ({
            language_code: language.trim()
        }));
    };
    
    // Función para formatear la duración de la clase
    const formatDurationDesktop = (duration) => {
        if (!duration) return ''; // Verifica si duration es null o undefined y retorna una cadena vacía si lo es
        const parts = duration.split(':');
        // Elimina la hora si es '00'
        if (parts[0] === '00') {
            return parts.slice(1).join(':');
        }
        return duration;  // Devuelve el formato original si la hora no es '00'
    };
    
    const formatDuration = (duration) => {
        if (!duration || typeof duration !== 'string') return ''; // Verifica si es nulo, vacío o no es una cadena
    
        // Divide la duración en partes
        const parts = duration.split(':').map(part => parseInt(part, 10));
    
        // Verifica cuántas partes existen
        if (parts.length === 3) {
            // Formato esperado "HH:MM:SS"
            const [hours, minutes, seconds] = parts;
            if (hours === 0) {
                return `${minutes} min ${seconds} seg`.trim();
            }
            return `${hours}horas ${minutes}min ${seconds}seg`.trim();
        } else if (parts.length === 2) {
            // Formato "MM:SS" (sin horas)
            const [minutes, seconds] = parts;
            return `${minutes} min ${seconds} seg`.trim();
        } else if (parts.length === 1) {
            // Formato "SS" (solo segundos)
            const [seconds] = parts;
            return `${seconds} seg`.trim();
        }
    
        return ''; // Si el formato no coincide, devuelve vacío
    };



    // Function to calculate total duration in minutes
    const calculateTotalDuration = (classes) => {
        const totalSeconds = classes.reduce((total, clase) => {
            // Verifica si clase.class_duration es válido y no null o undefined
            if (!clase.class_duration) return total;
            const durationParts = clase.class_duration.split(':');
            // Asegúrate de que durationParts tiene exactamente tres elementos
            if (durationParts.length !== 3) return total;

            const durationInSeconds = parseInt(durationParts[0], 10) * 3600 +
                                      parseInt(durationParts[1], 10) * 60 +
                                      parseInt(durationParts[2], 10);
            return total + durationInSeconds;
        }, 0);
        return Math.round(totalSeconds / 60); // Convertir segundos totales a minutos
    };

    // Function to format total duration as "X horas Y min"
    const formatTotalDuration = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
    
        const hourLabel = hours === 1 ? 'hora' : 'horas';
        const minuteLabel = minutes === 1 ? 'minuto' : 'minutos';
    
        return `${hours > 0 ? hours + ' ' + hourLabel : ''} ${minutes > 0 ? minutes + ' ' + minuteLabel : ''}`.trim();
    };

    return { GetModules, modules , setModules,updateCourseId ,idiomas , filterModulesByLanguage };
};
