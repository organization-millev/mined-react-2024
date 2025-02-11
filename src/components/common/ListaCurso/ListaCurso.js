import React from 'react';
import Reloj from '../../iconos/nest_clock_farsight_analog';
import './ListaCurso.css';

const ListaCurso = ({ cursos }) => {
  return (
    <div className="grid grid-row-2 gap-4 font-sans">
      <div className="flex flex-wrap w-[100%] md:divide-y md:divide-solid md:divide-gris-claro">
        {cursos.map((curso, index) => (
          <div
            className={`min-width[300px] w-[100%] md:flex md:gap-[26px] py-[10px] ${index === cursos.length - 1 ? 'last-divider' : ''}`}
            key={curso.course_id}
          >
            <img
              src={curso.miniaturaUrl || process.env.REACT_APP_DEFAULT_NO_IMAGE_URL}
              className="aspect-video object-cover rounded-[20px] w-full md:w-[254px] md:h-[143px]"
              alt={`Miniatura de ${curso.name}`}
            />
            <div className="flex flex-col w-full justify-center">
              <div className="flex gap-[5px] items-center">
                <span className="text-medium mt-2 lg:text-xl lg:mt-0 font-bold">{curso.name}</span>
              </div>
              <div className="hidden md:flex pb-[10px] items-center gap-5 text-medium text-gris-oscuro divide-x divide-solid divide-gris-oscuro">
                <span>{`Módulo ${curso.count_modules}`}</span>
                <span className="pl-4 custom-divider">{`Clases ${curso.count_classes}`}</span>
                <span className="pl-4 custom-divider">{curso.total_duration}</span>
              </div>
              <div className="flex text-small font-normal">
                {curso.description}
              </div>
              <div className="flex flex-row justify-between mt-1 items-center md:hidden">
                <p className="text-small font-medium">Jose lopez</p>
                <div className="flex flex-row items-center">
                  <Reloj className="w-[35px] h-[35px]" />
                  <p className="text-small font-normal">{curso.total_duration}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaCurso;
