import React, { useState,useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CardDescargas from '../common/CardDescargas/CardDescargas'; 
import CarpetaAbierta from '../iconos/folder_open.js';
import CarpetaAbiertaDark from '../iconos/folder_open_dark.js';
import { useUser } from '../../providers/UserContext';


import Expandir from '../iconos/expand_more.js';
import ExpandirMasDark from '../iconos/expand_more_blanco.js';

import Extraer from '../iconos/keyboard_arrow_up.js';
import ExtraerDark from '../iconos/keyboard_arrow_up_white.js';

import './SeccionDescarga.css'; 
import Lista from '../iconos/format_list_bulleted.js';
import ListaDark from '../iconos/format_list_dark.js';

import CuadriculaDark from '../iconos/vista_grilla_dark.js';

import Cuadricula from '../iconos/grid_view.js';
import { useMaterialCourse } from '../../hooks/async/useMaterialCourse.js';
import { useTranslation } from 'react-i18next';

const SeccionDescarga = ({idCurso, materials = [] ,errorMaterials, titleMaterials,xlGridCols,permisoInstructor,defaultExpanded = false ,  showIconsWhenNoDocuments = true }) => {

  const { t } = useTranslation();
  const { GetCursoMaterials , materialesCurso, error } = useMaterialCourse();
  const { userData, setCourseType, isCourseType, synchronous, asynchronous, logout } = useUser();

  //console.log("id curso ",idCurso);
  
  
  useEffect(() => {
    if(isCourseType(asynchronous)) {
      GetCursoMaterials(idCurso);
    }

  }, [idCurso]);
  
  //const [isExpanded, setIsExpanded] = useState(materials.length > 0);    
  const [isExpanded, setIsExpanded] = useState(defaultExpanded); 
  
  
  const [viewType, setViewType] = useState('list');
  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };    
  
  const handleViewChange = (view) => {
    setViewType(view);
  };
  
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder('DocumentosCurso');

    const allMaterials = [...materials, ...materialesCurso];

    await Promise.all(allMaterials.map(async (archivo) => {
      const response = await fetch(archivo.material_url);
      const blob = await response.blob();
      folder.file(`${archivo.material_title}.${archivo.material_type}`, blob);
    }));

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'DocumentosCurso.zip');
    });
  };
  
  const [isLoading, setIsLoading] = useState(true);
  const imageUrl = `${process.env.REACT_APP_URL_IMG}/assets/images/imgSinDocumentosWhite.png`;

  //ocultar materiales si no hay
  useEffect(() => {
    if ((materialesCurso.length > 0 || materials.length > 0 || errorMaterials || error)) {
      setIsLoading(false);
    }
  }, [materialesCurso, materials, errorMaterials, error]);
  
  const allMaterials = [...materials, ...materialesCurso];
  
  let content;

    if (isLoading) {
      content = <div>Cargando materiales...</div>;
    
      
    } else if (allMaterials.length === 0) {
    content = (
      <div className={`flex flex-col rounded-[20px] dark:bg-color-dark2 justify-between p-5 font-sans font-semibold shadow-custom-strong`}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <CarpetaAbierta className="dark:hidden" />
            <CarpetaAbiertaDark className="!hidden dark:!block" />
            <p className="text-sm lg:text-base font-semibold dark:text-blanco">{titleMaterials || t('documentosCurso')}</p>
          </div>
          
          {showIconsWhenNoDocuments && materials.length === 0  && (
            <>
              {isExpanded ? (
                <>
                  <Extraer onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer dark:hidden" />
                  <ExtraerDark onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer !hidden dark:!block" />
                </>
              ) : (
                <>
                  <Expandir onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer dark:hidden"/>
                  <ExpandirMasDark onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0" className="cursor-pointer !hidden dark:!block"/>
                </>
              )}
            </>
          )}  
        </div>
        
        {isExpanded && (
          <div className="my-4">
            <div className="w-full flex flex-col items-center">
              <img src={imageUrl} alt="Imagen sin documentos blanca" className="w-[150px] h-[134px]" />
              <p className="text-center text-sm  md:text-large text-gris-azulado-profundo dark:text-blanco">{t('documentosDisponibles')}</p>
            </div>
          </div>
        )}
      </div>
    );
    
    } else {
      content = (
      <div className={`flex flex-col rounded-[20px] dark:bg-color-dark2 justify-between p-5 font-sans font-semibold ${materials.length === 0 ? 'shadow-custom-strong' : ''}`}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <CarpetaAbierta className="dark:hidden"/>
            <CarpetaAbiertaDark className="!hidden dark:!block"/>
            <p className="text-sm lg:text-base font-semibold dark:text-blanco">{titleMaterials || t('documentosCurso')}</p>
            <div className={`flex gap-2 items-center ${isExpanded ? 'visible' : 'invisible'}`}>
              {viewType === 'list' ? (
                <>
                  <Lista onClick={() => handleViewChange('grid')} className=" text-gray-500 cursor-pointer dark:hidden" />
                  <ListaDark onClick={() => handleViewChange('grid')} className=" text-gray-500 cursor-pointer hidden dark:block" />
                </>
              ) : (
              <>
                <Cuadricula onClick={() => handleViewChange('list')} className=" text-gray-500 cursor-pointer dark:hidden" />
                <CuadriculaDark onClick={() => handleViewChange('list')} className=" text-gray-500 cursor-pointer hidden dark:block" />
              </>
              )}
            </div>
          </div>
          
         {materials.length === 0 && (
            <>
              {isExpanded ? (
                <>
                  <Extraer onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer dark:!hidden" />
                  <ExtraerDark onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer !hidden dark:!block" />
                </>
              ) : (
                <>
                  <Expandir onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0px" className="cursor-pointer dark:!hidden"/>
                  <ExpandirMasDark onClick={() => setIsExpanded(!isExpanded)} width="30px" padding="0" className="cursor-pointer !hidden dark:!block"/>
                </>
              )}
            </>
          )}
        </div>
        
        
        {/* -----contenido extendido----- */}
        {isExpanded && (
          <div className="mt-3">
            <div className={`seccion-descarga-columnas grid gap-4 w-full ${viewType === 'grid' ? 'grid-cols-2 md:grid-cols-5  lg:grid-cols-6' : 'md:grid-cols-2'}`}>
              {allMaterials.map((archivo, index) => (
                <div className="flex justify-center">
                  <CardDescargas key={index} fileName={archivo.material_title} type={archivo.material_type} url={archivo.material_url} viewType={viewType} permisoInstructor={permisoInstructor} />
                  
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <div className="boton-primario dark:boton-primario-dark w-full lg:w-[20%] font-sans flex justify-center my-4 cursor-pointer" onClick={handleDownloadAll}>
                <button className="font-semibold text-xs p-2 lg:p-1 hidden lg:block ">{t('btnDescargarTodo')}</button>
                <button className="font-semibold text-xs p-2 lg:p-1 lg:hidden">{t('botonDescargarTodos')} </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    );
  }

  return (
    <div className="">
      {content}
    </div>
  );  
    

}

export default SeccionDescarga;