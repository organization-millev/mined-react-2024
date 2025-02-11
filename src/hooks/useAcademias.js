import { useState, useEffect } from 'react';
import { Academy , Banner , File , Educator , Translation , Course  } from './entities';
import { apiAcademyList } from '../api/apiConfig';
import { obtenerInfoDispositivo } from '../utils/funciones'; 
import { TAG } from '../utils/tag';
import { useUser } from '../providers/UserContext';
import { useTranslation } from 'react-i18next';

//apiAcademyList
export const useAcademias = () => {
    
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const { userData , isCourseType  , asynchronous } = useUser();
     
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const [triggerAcademies, setTriggerAcademies] = useState(false);
    
    const { data: dataAcademies, error: errorAcademies, cargando: cargandoAcademies } = apiAcademyList(triggerAcademies);
    const { t } = useTranslation();
    // Estado inicial para academias, banners y archivos
    const [academias, setAcademias] = useState([]);
    const [allNames, setAllNames] = useState([]);
    const [banners, setBanners] = useState([]); 
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [resetAcademias, setResetAcademias] = useState(false);
    
    const [listaAcademias, setListaAcademias] = useState([]);
    
    const GetAcademias = () => {
      setTriggerAcademies(true);
    };
    
    const recargarAcademias = () => {
      setTriggerAcademies(false);
      setResetAcademias(true);
    };
    
    useEffect(() => {
        if(resetAcademias===true){
          setTriggerAcademies(true);    
          alert(triggerAcademies);
        }
    }, [resetAcademias]);
    
    

    let tag = "";
    useEffect(() => {
        if (dataAcademies) {
            const { programs, banners } = dataAcademies;
            
            if (Array.isArray(banners) && banners.length > 0) {
                setFiles(banners);
                const tag = isCourseType(asynchronous) ? TAG.AsincronicoBannerHome : TAG.SincronicoBannerHome;
                const filteredBanners = getFilteredBanners(banners, tag, tipoDispositivo);
                
                setBanners(filteredBanners);
            } else {
                
            }
            if (Array.isArray(programs) && programs.length > 0) {
                setAllNames(getAllNames(programs));
                
                
                const programsOrdenadas = programs.sort((a, b) => {
                    return b.is_enabled - a.is_enabled;
                });
                setAcademias(programsOrdenadas);
                
                /*const academiasOrdenadas = getListaAcademias(programs).sort((a, b) => {
                    return b.is_enabled - a.is_enabled;
                });*/
                const academiasOrdenadas = getListaAcademias(programs); // La lista ya está ordenada
                setListaAcademias(academiasOrdenadas);
                setListaAcademias(academiasOrdenadas);
       
            }
        } else if (errorAcademies) {
            setError(errorAcademies);
        }
    }, [dataAcademies, errorAcademies]);
    
    
    /*const getListaAcademias = (academias) => {
        return academias
        .filter(program => 
            program.translations && program.translations.some(translation => translation.language_code == language_code)
        )
        .map((program) => {
            const { program_id, translations, is_enabled } = program;
            const esTranslation = translations.find(translation => translation.language_code == language_code );
            const name = esTranslation ? esTranslation.name : '';
            const color = getColorCode(program);
            const degradado = getDegradado(program);
            return { program_id, name, is_enabled , color , degradado };
        });
    };*/
    
    const getListaAcademias = (academias) => {
        return academias
            .filter(program => 
                program.translations && program.translations.some(translation => translation.language_code == language_code)
            )
            .map((program) => {
                const { program_id, translations, is_enabled, prg_int_order } = program;
                const esTranslation = translations.find(translation => translation.language_code == language_code );
                const name = esTranslation ? esTranslation.name : '';
                const color = getColorCode(program);
                const degradado = getDegradado(program);
                return { program_id, name, is_enabled, color, degradado, prg_int_order };
            })
            // Ordenar por prg_int_order de manera ascendente
            .sort((a, b) => a.prg_int_order - b.prg_int_order);
    };


    {/*const getVistaAcademias = (programId) => {
        const program = academias.find(program => Number(program.program_id) === Number(programId));
        if (!program) {
            return [];
        }
    
        const { program_id, translations, courses = [], files = [] } = program;
        const { description = '', name = '', subtitle = '', slogan = '' } = translations[0] || {};
    
        const coursesInfo = courses.map(course => {
            const { course_id, translations = [], asynchronous = [], synchronous = [], files = [] } = course;
            const { name = '', description = '' } = translations[0] || {};
    
            const isAsynchronous = asynchronous[0]?.is_enabled || 0;
            const isSynchronous = synchronous[0]?.is_enabled || 0;
    
            const isAsynchronousFavorite = course.is_favorite || false;
    
            const courseData = isAsynchronous ? asynchronous[0] : synchronous[0];
            
            
            let formattedTime = '';
            if (courseData.cour_time_total_time) {
                const [hours, minutes] = courseData.cour_time_total_time.split(':').map(Number);
                formattedTime = formatTime(hours, minutes).trim();
            }
            const countModules = courseData?.cour_txt_modules || 0;
            const countLessons = courseData?.cour_txt_classes || 0;
            const totalDuration = formattedTime.trim() || '';
            //const totalDuration = courseData?.sum_hours?.replace(" Hours", " horas") || '';
    
            // Asegúrate de que files sea un array antes de buscar en él
            const miniaturaFile = Array.isArray(files) && files.find(file => file.tag === 'curso_foto_miniatura' && file.device_type === 'desktop'); 
            const miniaturaUrl = miniaturaFile ? miniaturaFile.url : '';
            
            //
            //
    
            return {
                course_id,
                name,
                description,
                slogan,
                isAsynchronous,
                isSynchronous,
                isAsynchronousFavorite,
                count_modules: countModules,
                count_classes: countLessons,
                total_duration: totalDuration,
                miniaturaUrl
            };
        });
    
        // Asegúrate de que files sea un array antes de buscar en él
        const logoFile = Array.isArray(files) && files.find(file => file.tag === 'logo');
        const bannerFile = Array.isArray(files) && files.find(file => file.tag === (tipoDispositivo === 'mobile' ? 'banner' : 'banner') && file.device_type === tipoDispositivo);
        const logoUrl = logoFile ? logoFile.url : '';
        const bannerUrl = bannerFile ? bannerFile.url : '';
    
        return [{
            program_id,
            name,
            description,
            slogan,
            subtitle,
            courses: coursesInfo,
            logoUrl,
            bannerUrl
        }];
    };*/}
    const getVistaAcademias = (programId) => {
        const program = academias.find(program => Number(program.program_id) === Number(programId));
        if (!program) {
            return [];
        }
    
        const { program_id, translations, courses = [], files = [] } = program;
        const { description = '', name = '', subtitle = '', slogan = '' } = translations[0] || {};
    
        const coursesInfo = courses.map(course => {
            const { course_id, translations = [], asynchronous = [], synchronous = [], files = [], cour_int_order = null } = course;
            const { name = '', description = '' } = translations[0] || {};
    
            const isAsynchronous = asynchronous[0]?.is_enabled || 0;
            const isSynchronous = synchronous[0]?.is_enabled || 0;
    
            const isAsynchronousFavorite = course.is_favorite || false;
    
            const courseData = isAsynchronous ? asynchronous[0] : synchronous[0];
    
            let formattedTime = '';
            if (courseData.cour_time_total_time) {
                const [hours, minutes] = courseData.cour_time_total_time.split(':').map(Number);
                formattedTime = formatTime(hours, minutes).trim();
            }
            const countModules = courseData?.cour_txt_modules || 0;
            const countLessons = courseData?.cour_txt_classes || 0;
            const totalDuration = formattedTime.trim() || '';
    
            const miniaturaFile = Array.isArray(files) && files.find(file => file.tag === 'curso_foto_miniatura' && file.device_type === 'desktop');
            const miniaturaUrl = miniaturaFile ? miniaturaFile.url : '';
    
            return {
                course_id,
                name,
                description,
                slogan,
                isAsynchronous,
                isSynchronous,
                isAsynchronousFavorite,
                count_modules: countModules,
                count_classes: countLessons,
                total_duration: totalDuration,
                miniaturaUrl,
                cour_int_order: cour_int_order,
            };
        });
    
        const sortedCoursesInfo = coursesInfo.sort((a, b) => {
            if (a.cour_int_order === null) return 1;
            if (b.cour_int_order === null) return -1; 
            return a.cour_int_order - b.cour_int_order;
        });
    
        const logoFile = Array.isArray(files) && files.find(file => file.tag === 'logo');
        const bannerFile = Array.isArray(files) && files.find(file => file.tag === (tipoDispositivo === 'mobile' ? 'banner' : 'banner') && file.device_type === tipoDispositivo);
        const logoUrl = logoFile ? logoFile.url : '';
        const bannerUrl = bannerFile ? bannerFile.url : '';
    
        return [{
            program_id,
            name,
            description,
            slogan,
            subtitle,
            courses: sortedCoursesInfo,
            logoUrl,
            bannerUrl
        }];
    };

    
    
    function formatTime(hours, minutes) {
        let result = '';
        
        if (hours > 0) {
            result += `${hours} ${hours === 1 ? t('hora') : t('horas')} `;
        }
        if (minutes > 0) {
            result += `${minutes} ${t('minutos')}`; // Usamos "min" siempre para los minutos
        }
        
        return result.trim();
    }

    const getCourseDetails = (programId, courseId) => {
        const program = academias.find(program => program.program_id === programId);
        if (!program) {
            return null;
        }
    
        const course = program.courses.find(course => course.course_id === courseId);
        if (!course) {
            return null;
        }
    
        const isAsynchronous = course.asynchronous && course.asynchronous.length > 0 && course.asynchronous[0].is_enabled;
        const courseData = isAsynchronous ? course.asynchronous[0] : (course.synchronous && course.synchronous.length > 0 ? course.synchronous[0] : null);
    
        if (!courseData) {
            return null;
        }
        //
        
        const isAsincronico = course.asynchronous[0].is_enabled;
        const isSincronico = course.synchronous[0].is_enabled;
        
        const count_modules = courseData.cour_txt_modules || 0;
        const count_lessons = courseData.cour_txt_classes || 0;
        const sum_hours = courseData.cour_time_total_time || '';
        const is_favorite = course.is_favorite;
        const miniaturaFile = Array.isArray(course.files) && course.files.find(file => file.tag === 'curso_foto_miniatura' && file.device_type === tipoDispositivo);
        const curso_foto_miniatura = miniaturaFile ? miniaturaFile.url : '';
    
        return {
            curso_foto_miniatura,
            count_modules,
            count_lessons,
            sum_hours,
            is_favorite,
            isAsincronico,
            isSincronico
        };
    };


    const getCarouselListaAcademias = (deviceType) => {
    return academias
        .map((program) => {
            const { program_id, is_enabled, prg_int_order, translations, files } = program;
            const { name, slogan } = translations && translations[0] ? translations[0] : '';

            // Filtrar archivos por device_type y tag
            const logo = files.find(file => file.tag === 'logo') || {};
            const academiaCompradaFile = files.find(file => file.tag === 'nuestras_academias_activo' && file.device_type === deviceType) || {};
            const academiaNoCompradaFile = files.find(file => file.tag === 'nuestras_academias_inactivo' && file.device_type === deviceType) || {};
            const nuestrasAcademiasLogoFile = files.find(file => file.tag === 'nuestras_academias_logo' && file.device_type === deviceType) || {};

            const logoUrl = logo.url || '';
            const compradaUrl = academiaCompradaFile ? academiaCompradaFile.url : '';
            const noCompradaUrl = academiaNoCompradaFile ? academiaNoCompradaFile.url : '';
            const nuestrasAcademiasLogoUrl = nuestrasAcademiasLogoFile ? nuestrasAcademiasLogoFile.url : '';

            return {
                program_id,
                is_enabled,
                prg_int_order,
                name: name || '',
                logo_url: logoUrl,
                img_academia_comprada: compradaUrl,
                img_academia_noComprada: noCompradaUrl,
                nuestras_academias_logo_url: nuestrasAcademiasLogoUrl,
                subtitle: slogan || '',
            };
        })
        // Ordenar por prg_int_order y si is_enabledis_enabled es 0 lo coloca al final
        .sort((a, b) => {
            if (a.is_enabled === b.is_enabled) {
                return a.prg_int_order - b.prg_int_order;
            }
            return a.is_enabled ? -1 : 1;
        });
    };


    const getListaCursos = (programId) => {
        const program = academias.find(p => p.program_id === programId);
        if (!program) {
            return [];
        }
    
        return program.courses.map(course => {
            const { course_id, translations, asynchronous, synchronous, cour_int_order } = course;
            const { name } = translations[0] || {};
            const  nameUrl  = formatForURL(name);
            const isAsynchronousEnabled = asynchronous[0]?.is_enabled || 0;
            const isSynchronousEnabled = synchronous[0]?.is_enabled || 0;
            return { course_id, name , nameUrl, isAsynchronousEnabled, isSynchronousEnabled, cour_int_order };
        })
        .sort((a, b) => a.cour_int_order - b.cour_int_order);
    };

    
    const getListadoDeCursos = (programs) => {
        return academias.map(program => {
            const programId = program.program_id;
            const courses = program.courses.map(course => ({
                name: course.translations[0].name,
                description: course.translations[0].description
            }));
            const bannerUrl = program.files.find(file => file.tag === 'banner')?.url || '';
            const translationName = program.translations[0].name;
        
            return {
              programId,
              courses,
              bannerUrl,
              translationName
            };
        });
    };
    
    /*const getTeachers = (programId , typeId) => {
        
        const program = academias.find(program => program.program_id == programId);
        if (!program) {
            return [];
        }
        // Comprueba si el array de educators existe y no es undefined
        if (!program.educators) {
            console.error("No se encontraron educadores para este programa");
            return [];
        }
        
        return program.educators
            .filter(educator => educator.type_int_id === typeId)
            .map(educator => ({
                name: educator.translation_name || 'Nombre no disponible',
                description: educator.translation_description || 'Descripción no disponible',
                imageSrc: educator.usr_txt_photo || './assets/images/educador-azul-1.png',
                cargo: "Educador",
                showFavorite: true,
                files: educator.files.map(file => ({
                    url: file.file_txt_url,
                    tag: file.file_txt_tag,
                    type: file.file_txt_type
                })).filter(file => file.url !== null) // Filtrar para asegurar que solo se incluyen archivos con URL
            }));
    };*/

    const getTeachers = (programId, typeId) => {
        // Find the program by its ID
        const program = academias.find(program => program.program_id === programId);
        if (!program) {
            return [];
        }
        const degradado = getDegradado(program);
        // Determine if the program type is asynchronous
        //const isAsynchronous = isCourseType(asynchronous);
    
        if (!program.educators) {
            return [];
        }
    
        // Map through the educators, setting 'cargo' based on program type
        return program.educators
            .filter(educator =>  educator.is_director)
            .map(educator => {
                // Extraer la URL de la imagen del educador
                const imageUrl = educator.files?.find(file => file.file_txt_tag === 'educador_foto_descripcion')?.file_txt_url || './assets/images/educador-azul-1.png';
    
                return {
                    name: educator.name || 'Nombre no disponible',
                    description: educator.translation_description || 'Descripción no disponible',
                    imageUrl: educator.usr_txt_photo, // Usar imageUrl en lugar de imageSrc
                    cargo:  t('directorAcademia') ,
                    resopnsabilidad:"directorAcademia",
                    showFavorite: true,
                    fondo:degradado
                };
            });
    };
    
    const getTeachersByCourseId = (programId, courseId) => {
      // Encuentra el programa por su ID
      const program = academias.find(program => program.program_id === programId);
      if (!program || !Array.isArray(program.educators)) {
        return []; // Retornar un array vacío si no hay educadores
      }
      
      const degradado = getDegradado(program);
      const color = getColorCode(program);
      // Filtra los educadores que están asociados con el courseId específico
      return program.educators
        .filter(educator => Array.isArray(educator.courses) && educator.courses.some(course => course.cour_int_id === courseId))
        .map(educator => {
          // Extraer la URL de la imagen del educador
          const imageUrl = educator.files?.find(file => file.file_txt_tag === 'educador_foto_descripcion')?.file_txt_url || './assets/images/educador-azul-1.png';
    
          return {
            idTeacher: educator.usr_int_id,
            name: educator.name || 'Nombre no disponible',
            description: educator.translation_description || 'Descripción no disponible',
            imageUrl: educator.usr_txt_photo,
            cargo: t('educador'),
            showFavorite: true,
            isFavorited:educator.is_favorite,
            fondo: degradado,
            color: color
          };
          
        });
    };

    const getCoursesDetails = (programs, courseId) => {
        if (!Array.isArray(programs)) return {}; // Verifica que programs es un arreglo
    
        for (const program of programs) {
            if (!Array.isArray(program.courses)) continue; // Verifica que courses es un arreglo
    
            for (const course of program.courses) {
                if (course.course_id === parseInt(courseId)) {
                    // Extraer archivos de logo y banner
                    const logoFile = course.files?.find(file => file.tag === 'logo');
                    const bannerFile = course.files?.find(file => file.tag === 'banner');
                    
                    const translationsAvailableString = course.asynchronous[0].cour_txt_translations_available;
                    // Verifica si la cadena es nula o vacía
                    const translationsArray = translationsAvailableString 
                        ? translationsAvailableString.split(',').map(translation => ({
                            language_code: translation.trim()
                        }))
                        : []; // Si es nula o vacía, retorna un array vacío
                                        
                    
                    // Extraer datos de translations
                    const translation = course.translations?.find(translation => translation.language_code == language_code);
                    
                    const { description = '', name = '', subtitle = '', slogan = ''} = translation || {};
    
                    return {
                        
                       
                        course_id: course.course_id,
                        program_id: program.program_id,
                        logoUrl: logoFile ? logoFile.url : '',
                        bannerUrl: bannerFile ? bannerFile.url : '',
                        description,
                        name,
                        subtitle,
                        slogan,
                        kpi: obtenerKpiAcademia(translation),
                        idiomas: translationsArray,
                        color: getColorCode(program),
                        degradado: getDegradado(program)
                        
                         
                    };
                }
            }
        }
        return {}; // Si no se encuentra el curso, retorna un objeto vacío
    };

    const getCourseMetrics = (programId,courseId) => {
        // Encuentra el programa por su ID
        const program = academias.find(program => program.program_id === programId);
        if (!program) {
            return null; // Retorna null si no se encuentra el programa
        }
    
        // Encuentra el curso dentro del programa por su ID
        const course = program.courses.find(course => course.course_id === courseId);
        if (!course) {
            return null; // Retorna null si no se encuentra el curso
        }
    
        // Obtener detalles asincrónicos o sincrónicos
        const isAsynchronous = course.asynchronous && course.asynchronous.length > 0 && course.asynchronous[0].is_enabled;
        const courseData = isAsynchronous ? course.asynchronous[0] : (course.synchronous && course.synchronous.length > 0 ? course.synchronous[0] : null);
    
        if (!courseData) {
            return null; // Retorna null si no hay datos disponibles
        }
        
        let formattedTime = '';
        if (courseData.cour_time_total_time) {
            const [hours, minutes] = courseData.cour_time_total_time.split(':').map(Number);
            formattedTime = formatTime(hours, minutes).trim();
        }
        const count_classes = courseData.cour_txt_classes || 0;
        const total_duration = formattedTime.trim() || '';
        const count_modules = courseData.cour_txt_modules || 0;
    
        return {
            count_classes,
            total_duration,
            count_modules
        };
    };
    
    const getAllNames = (programs) => {
      let allItems = [];
    
      if (Array.isArray(programs)) {
        programs.forEach(program => {
          if (Array.isArray(program.translations)) {
            program.translations.forEach(translation => {
              if (translation.name) {
                allItems.push({
                  name: translation.name,
                  program_id: program.program_id,
                  course_id: null
                });
              }
            });
          }
    
          if (Array.isArray(program.courses)) {
            program.courses.forEach(course => {
              if (Array.isArray(course.translations)) {
                course.translations.forEach(translation => {
                  if (translation.name) {
                    allItems.push({
                      name: translation.name,
                      program_id: program.program_id,
                      course_id: course.course_id
                    });
                  }
                });
              }
            });
          }
        });
      }
    
      return allItems;
    };

  
    const [academies, setAcademies] = useState([]);
    // Función para filtrar y transformar banners según tag y device_type
    const getFilteredBanners = (files, tag, deviceType) => {
        const filteredByDeviceType = files.filter(item => 
            item.files.some(file => file.device_type === deviceType)
        );
        // Luego, filtra esos objetos por el tag especificado
        let filteredBanners = filteredByDeviceType.filter(item => 
            item.files.some(file => file.tag === tag && file.ent_txt_state === "true")
        ).map(item => {
            // Encuentra el primer archivo que cumpla ambas condiciones
            const file = item.files.find(file => file.tag === tag && file.device_type === deviceType);
            // Retorna el objeto reformateado
            return {
                id_banner: item.translation_id,
                src: `${file.url}`,
                alt: item.description,
                empresa: item.subtitle,
                titulo: item.name,
                descripcion: item.description,
                enlace: file.link, // Puede ser dinámico según necesidades
                slogan:item.slogan
            };
        });
        
        filteredBanners.sort((a, b) => a.slogan.localeCompare(b.slogan));
        
        return filteredBanners;
    };

   

    function getAcademyDetails(deviceFilter) {
        // Eh modificado esta función para alternar el estado de las academias,
        // para poder visualizar ambas vistas del componente CardAcademia.
        // de igual manera la primera version esta debajo. katy
        return academies.map((academy, index) => ({
            program_id: academy.program_id,
            description: academy.description,
            subtitle: academy.subtitle,
            isEnabled: index % 2 === 0, 
            prg_int_order:academy.orden,
            files: academy.files
                .filter(file => file.device_type === deviceFilter) 
                .map(file => ({
                    url: file.url 
                }))
        }));
    }
    
    const [idToDetailsMap, setIdToDetailsMap] = useState({});
    const [nameToIdMap, setNameToIdMap] = useState({});
    
    //codifica ruta
    const formatForURL = (name) => {
        if (!name) { return ''; }
        return name.replace(/\s+/g, '_');
    };
    //decodifica ruta
    const formatFromURL = (urlComponent) => {
        if (!urlComponent) { return ''; }
        return urlComponent.replace(/_/g, ' ');
    };

    const getNameByIds = (programId, courseId , lng) => {
        
        // Encuentra el programa directamente de la variable `program` (asegúrate de que esta variable esté disponible en este contexto)
        const programDetails = academias.find(p => Number(p.program_id) === Number(programId));
        
        if (!programDetails) return null; // Si no se encuentra el programa, devuelve null
        
        
        if (courseId) {
            // Encuentra el curso dentro del programa
            const course = programDetails.courses.find(c => Number(c.course_id) === Number(courseId));
            //const availableLng  =  getAvailableLanguageCode(course.translations_available, lng);
            if (!course) return null; // Si no se encuentra el curso, devuelve null
            const courseName = formatForURL(course.translations.find(t => t.language_code === lng)?.name);
            const programName = formatForURL(programDetails.translations.find(t => t.language_code === lng)?.name);
            return { programName, courseName }; // Devuelve los nombres del programa y curso
        }
    
        const programName = programDetails.translations.find(t => t.language_code === lng )?.name;
        return { programName }; // Solo devuelve el nombre del programa si no se especificó courseId
    };
    
    function getAvailableLanguageCode(translationsAvailable, code) {
        // Verifica si el código proporcionado está en la lista de traducciones disponibles
        const foundTranslation = translationsAvailable.find(translation => translation.language_code === code);
        if (foundTranslation) {
            return String(foundTranslation.language_code);
        }
        // Si no encuentra el código, retorna el primero de la lista de disponibles
        if (translationsAvailable.length > 0) {
            return String(translationsAvailable[0].language_code);
        }
        // Si no hay traducciones disponibles, retorna null o un valor por defecto si lo prefieres
        return "ES";
    }
    
    function getDegradado(program) {
        const defaultGradient = "linear-gradient(124.62deg, #FFFFFF 0.01%, #FFFFFF 100%)";
        // Verifica si el objeto program es válido y tiene el campo 'tags'
        if (!program || !Array.isArray(program.tags)) {
            return defaultGradient;
        }
        // Busca el tag de 'degradado'
        const degradadoTag = program.tags.find(tag => tag.tag_txt_name === "degradado");
        // Retorna el valor del degradado si existe, o el degradado por defecto si no
        return degradadoTag ? degradadoTag.tag_txt_value : defaultGradient;
    }
    
    function getColorCode(program) {
        const defaultGradient = "#292735";
        //
        // Verifica si el objeto program es válido y tiene el campo 'tags'
        if (!program || !Array.isArray(program.tags)) {
            return defaultGradient;
        }
        
        // Busca el tag de 'degradado'
        const degradadoTag = program.tags.find(tag => tag.tag_txt_name === "color");
        // Retorna el valor del degradado si existe, o el degradado por defecto si no
        //
        return degradadoTag ? degradadoTag.tag_txt_value : defaultGradient;
    }


    const getIdsByName = (programName, courseName , lng) => {
        programName = formatFromURL(programName);
        // Encuentra el programa por su nombre
        const programDetails = academias.find(p => p.translations.some(t => t.language_code == lng  && t.name == programName));
        if (!programDetails) return null; // Si no se encuentra el programa, devuelve null
        if (courseName != null) {
            courseName = formatFromURL(courseName);
            // Encuentra el curso dentro del programa por nombre
            const course = programDetails.courses.find(c => c.translations.some(t => t.language_code == lng  && t.name == courseName));
            if (!course) return null; // Si no se encuentra el curso, devuelve null
    
            return { programId: programDetails.program_id, courseId: course.course_id }; // Devuelve los IDs del programa y curso
        }
        return { programId: programDetails.program_id }; // Solo devuelve el ID del programa si no se especificó courseName
    };
    
    const obtenerKpiAcademia = (tags) => {
      return Object.keys(tags)
        .filter(key => key.startsWith("trn_txt_tag_")) // Filtrar las claves que comienzan con "trn_txt_tag_"
        .map(key => {
          const value = tags[key];
          // Verificar si el valor es válido antes de intentar dividirlo
          if (typeof value === 'string' && value.includes('_')) {
            const [title, description] = value.split('_');
            return { title, description };
          } else if (typeof value === 'string') {
            // Si el valor es una cadena pero no tiene guion bajo
            return { title: value, description: '' };
          } else {
            // En caso de que el valor no sea una cadena válida
            return { title: '', description: '' };
          }
        });
    }

    const getProgramDetailsByCourseId = (courseId) => {
        // Busca el programa que contiene el curso con el `courseId` proporcionado
        for (const program of academias) {
            const course = program.courses.find(c => c.course_id === courseId);
            
            if (course) {
                // Encuentra el nombre del programa en las traducciones
                const programName = program.translations.find(t => t.language_code === language_code)?.name || 'Nombre no disponible';
                
                // Encuentra el nombre del curso en las traducciones
                const courseName = course.translations.find(t => t.language_code === language_code)?.name || 'Nombre no disponible';
                
                // Formatea los nombres para las URLs
                const formattedProgramName = formatForURL(programName);
                const formattedCourseName = formatForURL(courseName);
                
                const cert_miniature_url = course.tmpl_txt_miniature_url || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL;


                return {
                    programId: program.program_id,
                    programName: formattedProgramName,  // Nombre formateado para URL
                    courseName: formattedCourseName ,    // Nombre formateado para URL
                    certMiniatureUrl: cert_miniature_url
                    
                };
            }
        }
        // Retorna null si no se encontró el curso
        return null;
    };

    

    return { recargarAcademias , banners , academies, loading, error , getFilteredBanners  , getAcademyDetails , GetAcademias, 
    listaAcademias, getListaCursos, getCarouselListaAcademias,getListadoDeCursos,academias,getVistaAcademias,getTeachers,getCoursesDetails, 
    getNameByIds, getIdsByName ,  formatForURL , formatFromURL,getCourseMetrics,allNames ,getTeachersByCourseId,getCourseDetails , getProgramDetailsByCourseId };
};
