import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import IconoExpandir from '../iconos/expand_more.js';
import ExpandirMasDark from '../iconos/expand_more_blanco.js';
import IconoExtraer from '../iconos/keyboard_arrow_up.js';
import ExtraerDark from '../iconos/keyboard_arrow_up_white.js';
import ItemClase from '../common/ItemClase/ItemClase'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '../../providers/NavigationContext';


const ListadoElementos = ({ idCurso, modules, setModules, nameProgram, nameCurso, classId, formatForURL, programCurso }) => {
    
    const [openId, setOpenId] = useState(null);
    const [progress, setProgress] = useState({});
    const [isInitialLoad, setIsInitialLoad] = useState(true); 
    const { goToAcademyCursoClase } = useNavigation();

   
    useEffect(() => {
        if (isInitialLoad && modules.length > 0) {
            setOpenId(modules[0].id); 
            setIsInitialLoad(false); 
        }
    }, [modules, isInitialLoad]);
    

    const toggleAccordion = (id) => {
        setOpenId(openId === id ? null : id);  // Si el módulo ya está abierto, ciérralo. Si no, ábrelo.
    };
    
    const handleClassCompletion = (moduleId, newCompleted) => {
        setModules(prevModules =>
            prevModules.map(module => {
                if (module.id === moduleId) {
                    const total = parseInt(module.viewedTotal.split('/')[1]);
                    
                    const clase = module.subtitulos
                        .flatMap(subtitulo => subtitulo.clases)
                        .find(clase => clase.moduleId === classId)
                        
                    if (clase && !clase.completado){
                        clase.completado = true;
                        return {
                            ...module,
                            //viewedTotal: `${newCompleted}/${total}`,
                            viewedTotal: `${parseInt(module.viewedTotal.split('/')[0]) + 1}/${total}`,
                        };
                    }
                    
                }
                return module;
            })
        );
    };

    const getAdjustedProgress = (completed, total, moduleIndex) => {
        // Si es el primer módulo y no ha completado ninguna clase, ajustamos a 1/total.
        if (moduleIndex === 0 && completed === 0) {
            return 1;
        }
        return completed;
    };
    
    const gradientStyle = {   
        background: programCurso[0]?.degradado ||  'linear-gradient(180deg, #21D9FF -1.1%, #306795 100%)',
        display: 'flex', // Opcional: para centrar el contenido
        justifyContent: 'center', // Opcional: para centrar el contenido
        alignItems: 'center', // Opcional: para centrar el contenido
    }; 
    
    let globalClassIndex = 0;
    
    return (
        <div className="w-full rounded-[20px] shadow-custom-strong dark:bg-color-dark2">
            <div className="w-full px-8 py-4 rounded-tl-[20px] rounded-tr-[20px]" style={gradientStyle}>
                {programCurso.map(item => (
                    <div
                        key={item.program_id}
                        class Name="h-full w-full bg-center bg-cover grid place-items-center"
                    >
                        <img src={item.logoUrl} className="w-auto h-[40px]" />
                    </div>
                ))}
                {/*<img src="/assets/images/Acciones_blanco.png" className="w-[190px] h-[40px]" alt="Acciones" />*/}
            </div>

            {modules.map((module, moduleIndex) => {
                const [completed, total] = module.viewedTotal.split('/').map(Number);
                /*const isFirstModuleFirstClass = moduleIndex === 0;
                //const adjustedCompleted = isFirstModuleFirstClass ? 1 : completed;
                let adjustedCompleted;
                if (moduleIndex === 0) {
                    // Mostrar 1 solo si no se ha completado ninguna clase
                    adjustedCompleted = completed < 1 ? 1 : completed; 
                } else {
                    adjustedCompleted = completed; // Para los demás módulos, usar el valor real de 'completed'
                }
                const adjustedTotal = total;
                const percentage = (adjustedCompleted / total) * 100;*/
                //const percentage = (completed / total) * 100;
                //const moduleProgress = progress[module.id] || { completed: 0, total: 0, percentage: 0 };
                
                const adjustedCompleted = getAdjustedProgress(completed, total, moduleIndex);
                const percentage = (adjustedCompleted / total) * 100;
                
                
                return (
                    <div key={module.id} className="bg-white dark:bg-color-dark2 !rounded-bl-[20px] !rounded-br-[20px] bg-[#F0F0F2] overflow-hidden mb-5">
                        <button
                            className="flex justify-between items-center w-full p-5 font-sans text-sm lg:text-base text-left text-gray font-semibold"
                            onClick={() => toggleAccordion(module.id)}
                        >
                            <div className="w-[43px] h-[36px] mr-2 flex justify-center items-center font-bold text-xs">
                                <div className="block dark:hidden">
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${adjustedCompleted}/${total}`}
                                        styles={buildStyles({
                                            textSize: '30px',
                                            pathColor: '#32CD32',
                                            textColor: '#4A4A4A', // gris-oscuro
                                            trailColor: '#d6d6d6',
                                        })}
                                    />
                                </div>
                                
                                <div className="hidden dark:block">
                                    <CircularProgressbar
                                        value={percentage}
                                        text={`${adjustedCompleted}/${total}`}
                                        styles={buildStyles({
                                            textSize: '30px',
                                            pathColor: '#32CD32',
                                            textColor: '#FFFFFF', // blanco
                                            trailColor: '#d6d6d6',
                                        })}
                                    />
                                </div>
                            </div>
      
                            <p className="w-[90%] dark:text-blanco">{module.titulo}</p>
                           {openId === module.id ? (
                                <>
                                    <p><IconoExtraer width="40px" height="40px" padding="0px" className="block dark:hidden"/></p>
                                    <p><ExtraerDark width="40px" height="40px" padding="0px"  className="hidden dark:block"/></p>
                                </>
                            ) : (
                                <>
                                    <p><IconoExpandir width="40px" height="40px" padding="0px"   className="block dark:hidden"/></p>
                                    <p><ExpandirMasDark width="40px" height="40px" padding="0px" className="hidden dark:block"/></p>
                                </>
                            )}
                        </button>

                        <div
                            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                                openId === module.id ? 'h-auto' : 'max-h-0'
                            }`}
                        >
                            <div className="p-5 font-sans text-sm lg:text-base">
                                {module.subtitulos.map((subtitulo, index) => (
                                    <div key={index}>
                                        <p className="font-base font-bold text-gris-oscuro dark:text-blanco">{subtitulo.nombre}</p>
                                        <div className=" mt-0">
                                        {subtitulo.clases
                                                .sort((a, b) => a.ordenListaModules - b.ordenListaModules)
                                                .map((clase, indexClase) => {
                                                    // Usamos globalClassIndex para verificar si es la primera clase global
                                                    const habilitado = globalClassIndex === 0 || clase.habilitado;
                                                    globalClassIndex++; // Incrementamos el contador global
                                                    return (
                                                    <ItemClase
                                                        key={clase.idModulo}
                                                        nombreClase={clase.nombre}
                                                        tiempoClase={clase.duracion}
                                                        //habilitado={clase.habilitado}
                                                        habilitado={habilitado}
                                                        //habilitado={index === 0 && indexClase === 0 ? true : clase.habilitado}
                                                        nameProgram={nameProgram}
                                                        nameCurso={nameCurso}
                                                        classId={clase.idModulo}
                                                        formatForURL={formatForURL}
                                                    />
                                                );
                                                })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListadoElementos;
