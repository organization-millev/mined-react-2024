import React, { useState, useEffect } from 'react';
import CardDescargas from '../../common/CardDescargas/CardDescargas'; 
import UploadDocuments from '../../common/UploadDocuments/UploadDocuments';
import { useUploadMaterialEducator } from '../../../hooks/sync/useUploadMaterialEducator.js';
import { useDeleteMaterialEducator } from '../../../hooks/sync/useDeleteMaterialEducator';
import { useTranslation } from 'react-i18next';
import Lista from '../../iconos/format_list_bulleted.js';
import ListaDark from '../../iconos/format_list_dark.js';
import CuadriculaDark from '../../iconos/vista_grilla_dark.js';
import Cuadricula from '../../iconos/grid_view.js';
import './SeccionDocumentosEducador.css'; 


const SeccionDocumentoEducador = ({ idCurso, materials = [], titleMaterials, channelId, sessionId, GetLiveMaterials, setLiveMaterials }) => {
    const { t } = useTranslation();
    const { subirArchivos, cargandoUpload, isUpdateSuccess, setIsUpdateSuccess } = useUploadMaterialEducator();
    const { eliminarArchivos, cargandoDelete, isDeleteSuccess } = useDeleteMaterialEducator();
    const [viewType, setViewType] = useState('grid');
    const [isUploadMode, setIsUploadMode] = useState(false); 
    const [isSelectMode, setIsSelectMode] = useState(false); 
    const [selectedFiles, setSelectedFiles] = useState(''); 

    const fetchAndSetArchivo = () => {
        GetLiveMaterials();
    };

    useEffect(() => {
        if (isUpdateSuccess) {
            fetchAndSetArchivo();
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        if (isDeleteSuccess === true) {
            fetchAndSetArchivo();
        }
    }, [isDeleteSuccess]);

    // Función para cambiar entre vista de cuadrícula y lista
    const handleViewChange = (type) => {
        setViewType(type);
    };

    // Función para seleccionar un archivo
    const handleDocumentSelect = (base64String, fileExtension, materialName) => {
        subirArchivos(channelId, base64String, fileExtension, materialName,sessionId);
    };

    const handleSubirArchivosClick = () => {
        setIsUploadMode(!isUploadMode);
    };

    const handleSeleccionarArchivosClick = async () => {
        if (isSelectMode && selectedFiles.length > 0) {
            await eliminarArchivos(channelId, selectedFiles, true);
            setSelectedFiles('');
        }
        setIsSelectMode(!isSelectMode); // Alterna el modo de selección
    };

    const handleFileSelectToggle = (materialId) => {
        const selectedFileIds = selectedFiles ? selectedFiles.split(',') : [];
        if (selectedFileIds.includes(materialId.toString())) {
            setSelectedFiles(selectedFileIds.filter(id => id !== materialId.toString()).join(','));
        } else {
            setSelectedFiles([...selectedFileIds, materialId.toString()].join(','));
        }
    };

    const isFileSelected = (materialId) => {
        return selectedFiles.split(',').includes(materialId.toString());
    };

    const handleCancelarSeleccion = () => {
        setIsSelectMode(false); // Desactiva el modo de selección
        setSelectedFiles('');   // Limpia todas las selecciones
    };

    return (
        <div className="">
            <div className="flex flex-col rounded-[20px] dark:bg-color-dark2 justify-between p-4 font-sans">
               
                    <div className="flex flex-row gap-2 items-center mb-[10px]">
                        <p className="text-sm lg:text-extra font-semibold dark:text-blanco">
                            {titleMaterials}
                        </p>
                        
                         {/* Botones para cambiar entre vista de lista y cuadrícula */}
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
                    
                   
                

                <div className="my-3">
                    {isUploadMode ? (
                        <UploadDocuments fileSeleccionado={handleDocumentSelect} channelId={channelId} cargandoUpload={cargandoUpload} />
                    ) : (
                        <div className={`seccion-descarga-columnas grid gap-4 w-full ${viewType === 'grid' ? 'columnas-vista-grid lg:grid-cols-3 2xl:grid-cols-9' : 'md:grid-cols-2'}`}>
                            {materials.map((archivo) => (
                                
                               
                               <div className={`${viewType === 'grid' ? 'flex justify-center' : ''}`}>
                               
                               
                               
                                <div
                                    key={archivo.material_id}
                                    className={`
                                        
                                        
                                        ${viewType === 'grid' ? 'relative w-auto flex justify-center' : 'relative  '}
                                        
                                        ${isFileSelected(archivo.material_id) ? 'border-[1px] dark:border-blanco border-black rounded-[10px]' : ''}
                                        ${isSelectMode ? 'opacity-50' : ''}
                                    `}
                                    onClick={() => isSelectMode && handleFileSelectToggle(archivo.material_id)}
                                >
                                    <CardDescargas
                                        fileName={archivo.material_title}
                                        type={archivo.material_type}
                                        url={archivo.material_url}
                                        viewType={viewType}
                                        materialId={archivo.material_id}
                                        showDownloadButton={true}
                                        showModal={!isSelectMode} 
                                        downloadShow={!isSelectMode}
                                        enableHoverEffect={true}
                                    />
                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-row justify-start gap-2 mt-2">
                    {!isSelectMode && (
                        <button
                            className="dark:boton-secundario bg-gris-azulado-profundo transition-opacity duration-300 hover:opacity-40 text-white !text-xs font-bold !py-2 !px-[18px] rounded-full font-sans mt-[8px]"
                            onClick={handleSubirArchivosClick}
                        >
                            {isUploadMode ? t('Cancelar') : t('Subir archivo')}
                        </button>
                    )}

                    {!isUploadMode && (
                        <>
                            {!isSelectMode && (
                                <button
                                    className="text-xs font-bold !py-2 !px-[18px] rounded-full font-sans mt-[8px] bg-gris-azulado-profundo dark:boton-secundario hover:opacity-40 text-white"
                                    onClick={handleSeleccionarArchivosClick}
                                >
                                    {t('Seleccionar')}
                                </button>
                            )}

                            {isSelectMode && (
                                <>
                                    <button
                                        className="text-xs font-bold !py-2 !px-[18px] transition-opacity duration-300 rounded-full font-sans mt-[8px] bg-gris-azulado-profundo hover:opacity-40 text-white text-white"
                                        onClick={handleCancelarSeleccion}
                                    >
                                        {t('Cancelar')}
                                    </button>
                                    <button
                                        className="text-xs font-bold !py-2 transition-opacity duration-300 !px-[18px] rounded-full font-sans mt-[8px] bg-red-500 hover:bg-red-600 text-white"
                                        onClick={handleSeleccionarArchivosClick}
                                    >
                                        {selectedFiles.length > 0 ? t('Eliminar archivos') : t('Eliminar archivos')}
                                    </button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeccionDocumentoEducador;
