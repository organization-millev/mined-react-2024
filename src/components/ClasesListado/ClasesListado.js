import React, { useState, useEffect } from 'react';
import ClaseItem from '../common/ClaseItem/ClaseItem'; 
import Reloj from '../iconos/nest_clock_farsight_analog.js';
import RelojWhite from '../iconos/nest_clock_farsight_analog_white.js';
import IconoExpandir from '../iconos/expand_more.js';
import IconoExpandirWhite from '../iconos/expand_more_white.js';
import IconoContraer from '../iconos/keyboard_arrow_up.js';
import IconoContraerWhite from '../iconos/keyboard_arrow_up_white.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PuntoVerde from '../iconos/circle_green.js';
import PuntoGris from '../iconos/circle_green.js';
import PuntoCeleste from '../iconos/circle_celeste.js';
import { useCoursesModules } from '../../hooks/async/useCoursesModules.js';


import { useLocation } from 'react-router-dom';
import { useAcademia } from '../../providers/AcademiaContext';

const ClasesListado = ({ courseId ,nameCurso,nameProgram}) => {
  
  const [modulosAbiertos, setModulosAbiertos] = useState([]); // Estado para módulos abiertos
  
  const { formatForURL } = useAcademia();
  const { modules , updateCourseId } = useCoursesModules();
  
  const icono = {
    puntoVerde: PuntoVerde,
  };
  
  
  useEffect(() => {
      updateCourseId(courseId);
  }, [courseId]);
    
    
  const toggleModulo = (id) => {
    if (modulosAbiertos.includes(id)) {
      setModulosAbiertos(modulosAbiertos.filter(moduloId => moduloId !== id));
    } else {
      setModulosAbiertos([...modulosAbiertos, id]);
    }
  };
  

  return (
    <>
        {/*desktop*/}
        <div className="w-full space-y-4 hidden lg:block">
          {modules.map((modulo,moduloIndex) => (
            <div key={modulo.id} className="bg-blanco dark:bg-color-dark2 rounded-xl shadow-custom-strong overflow-hidden">
              <div className="bg-blanco dark:bg-color-dark2 p-6 rounded-t-[20px] flex justify-between items-center cursor-pointer" onClick={() => toggleModulo(modulo.id)}>
                <div className="flex items-center  font-sans">
                  <p className="text-xl font-bold  mr-6 text-marron-grisaceo lg:text-negro dark:text-white">{modulo.titulo}</p>
                  <p className="text-sm font-medium text-gris-carbón hidden lg:block dark:text-color-dark-texto">{modulo.descripcion}</p>
                </div>
                
                <div className="flex flex-row items-center gap-[6px]">
                  <Reloj width="20px" height="20px" padding="0px"className="hidden md:block dark:hidden"/>
                  <RelojWhite width="20px" height="20px" padding="0px"className="hidden dark:block"/>
                  <p className="font-sans text-sm font-semibold hidden lg:block dark:text-white ">{modulo.tiempoTotal}</p>
                  {modulosAbiertos.includes(modulo.id) ? (
                    <>
                      <IconoContraer width="30px" height="30px" padding="0px" className="dark:hidden"/>
                      <IconoContraerWhite width="30px" height="30px" padding="0px" className="dark:block hidden"/>
                    </>
                  ) : (
                    <>
                      <IconoExpandir width="30px" height="30px" padding="0px" className="dark:hidden"/>
                      <IconoExpandirWhite width="30px" height="30px" padding="0px" className="dark:block hidden"/>
                    </>
                  )}
                </div>
              </div>
              
              
              {modulosAbiertos.includes(modulo.id) && (
                <div className="pl-[2.3rem] pr-4 py-4">
                  {modulo.subtitulos.map((subtitulo) => {
                    const clasesOrdenadas = subtitulo.clases.sort((a, b) => a.ordenListaModules - b.ordenListaModules);
                    return (
                      <div key={subtitulo.id}>
                        <p className="text-base font-bold font-sans text-gris-oscuro">{subtitulo.nombre}</p>
                        <div className="space-y-2 divide-y divide-gris-medio">
                          {clasesOrdenadas.map((clase, index) => (
                            <ClaseItem
                              key={index}
                              idModulo={clase.idModulo}
                              nombreClase={clase.nombre}
                              descripcionClase={clase.descripcion}
                              subtitleClase={clase.subtitle}
                              tiempoClase={clase.duracionDesktop}
                              habilitado={clase.habilitado}
                              classId={clase.idModulo}
                              formatForURL={formatForURL}
                              nameCurso={nameCurso}
                              nameProgram={nameProgram}
                              index={index}
                              moduloIndex={moduloIndex}
                              viewed={clase.viewed}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ))}
        </div>
        
      
      
      
      
      
      {/*mobile*/}
       <div className="w-full bg-blanco dark:bg-color-dark2 rounded-xl shadow-custom-strong overflow-hidden  lg:hidden"> {/* Contenedor principal */}
      {modules.map((modulo, moduloIndex) => {
        const [completed, total] = modulo.viewedTotal.split('/').map(Number);
        const percentage = (completed / total) * 100;
      
        return (
          <div key={modulo.id}>
            <div
              className="bg-blanco dark:bg-color-dark2 p-6 rounded-t-[20px] flex justify-between items-center cursor-pointer"
              onClick={() => toggleModulo(modulo.id)}
            >
              <div className="flex items-center font-sans">
                <div className="w-[43px] h-[36px] mr-2 flex justify-center items-center font-bold text-xs">
                  <div className="block dark:hidden">
                    <CircularProgressbar
                      value={percentage}
                      text={modulo.viewedTotal}
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
                      text={modulo.viewedTotal}
                      styles={buildStyles({
                        textSize: '30px',
                        pathColor: '#32CD32',
                        textColor: '#FFFFFF', // blanco
                        trailColor: '#d6d6d6',
                      })}
                    />
                  </div>
                </div>
      
                <p className="text-xl font-bold mr-6 text-marron-grisaceo lg:text-negro dark:text-white line-clamp-1">
                  {modulo.titulo}
                </p>
                <p className="text-sm font-medium text-gris-carbón hidden lg:block dark:text-color-dark-texto">
                  {modulo.descripcion}
                </p>
              </div>
      
              <div className="flex flex-row items-center w-[70px]">
                <Reloj width="20px" height="20px" padding="0px" className="hidden md:block dark:hidden" />
                <RelojWhite width="20px" height="20px" padding="0px" className="hidden dark:block" />
                {/*<p className="font-sans text-sm font-semibold dark:text-white">{modulo.tiempoTotal}</p>*/}
                {modulosAbiertos.includes(modulo.id) ? (
                  <>
                    <IconoContraer width="30px" height="30px" padding="0px" className="dark:hidden" />
                    <IconoContraerWhite width="30px" height="30px" padding="0px" className="dark:block hidden" />
                  </>
                ) : (
                  <>
                    <IconoExpandir width="30px" height="30px" padding="0px" className="dark:hidden" />
                    <IconoExpandirWhite width="30px" height="30px" padding="0px" className="dark:block hidden" />
                  </>
                )}
              </div>
            </div>
      
            {modulosAbiertos.includes(modulo.id) && (
                <div className="p-4">
                  {modulo.subtitulos.map((subtitulo) => {
                    const clasesOrdenadas = subtitulo.clases.sort((a, b) => a.ordenListaModules - b.ordenListaModules);
                    return (
                      <div key={subtitulo.id}>
                        <p className="text-base font-bold font-sans text-gris-oscuro">{subtitulo.nombre}</p>
                        <div className="">
                          {clasesOrdenadas.map((clase, index) => (
                            <ClaseItem
                              key={index}
                              idModulo={clase.idModulo}
                              nombreClase={clase.nombre}
                              descripcionClase={clase.descripcion}
                              subtitleClase={clase.subtitle}
                              tiempoClase={clase.duracion}
                              habilitado={clase.habilitado}
                              classId={clase.idModulo}
                              formatForURL={formatForURL}
                              nameCurso={nameCurso}
                              nameProgram={nameProgram}
                              index={index}
                              moduloIndex={moduloIndex}
                              viewed={clase.viewed}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        );
      })}
    </div>
    </>
  );
};

export default ClasesListado;
