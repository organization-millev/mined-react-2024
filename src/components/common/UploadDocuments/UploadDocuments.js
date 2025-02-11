import React, { useState, useRef, useEffect } from 'react';
import Iconos from '../../iconos/iconos';
import LoaderCircular from '../LoaderCircular/LoaderCircular.js'

import { useTranslation } from 'react-i18next';
//import { useUploadMaterialEducator } from '../../../hooks/sync/useUploadMaterialEducator';
//import { useDeleteMaterialEducator } from '../../../hooks/sync/useDeleteMaterialEducator';

const UploadDocuments = ({ fileSeleccionado, channelId, sessionId,cargandoUpload}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  //const [loading, setLoading] = useState(false);

  //const { subirArchivos } = useUploadMaterialEducator();
  
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
   
    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'txt'];

    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        setErrorMessage(t('archivoNoPermitido'));
        setSelectedFileName(null);
        return;
      }

      const maxFileSize = 7 * 1024 * 1024;
      if (selectedFile.size > maxFileSize) {
        setErrorMessage(t('archivosLimit'));
        setSelectedFileName(null);
        return;
      } else {
        setErrorMessage('');
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result && reader.result.includes(',')) {
          const base64String = reader.result.split(',')[1];
          const materialName = selectedFile.name.replace(/\.[^/.]+$/, "");

          fileSeleccionado(base64String, fileExtension, materialName);
          setSelectedFileName(selectedFile.name);
        } else {
          console.error("Base64 conversion failed or no content found in file.");
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
      };

      reader.readAsDataURL(selectedFile);
    } else {
      console.error("No file selected or file read error.");
    }
  };

  /*const uploadFile = async (fileBase64, fileExtension, materialName) => {
    setLoading(true);
    
    try {
      await subirArchivos(channelId, fileBase64, fileExtension, materialName, true);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    } finally {
      setLoading(false); 
      
    }
  };*/

  return (
    <div className="flex flex-col items-center h-full ">
      <div
        className="2xl:min-h-[410px] lg:min-w-[300px] w-full h-full rounded-2xl border-dashed-custom flex items-center justify-center dark:bg-color-dark2"
      >
        {cargandoUpload  ? (
          <LoaderCircular size={120} strokeWidth={8} duration={5} />
        ) : (
          <div className="flex flex-col p-4">
            <Iconos icono="folder_abierto"  className="w-[59px] h-[59px] !p-0 m-auto dark:hidden" />
            <Iconos  icono="folder_abierto_dark"  className="w-[59px] h-[59px] !p-0 m-auto hidden dark:block" />
            
            <span className="text-large m-auto dark:text-blanco">{t('btnDragAndDrop')}</span>
            <button
              onClick={handleButtonClick}
              className="text-xs bg-gris-azulado-profundo dark:boton-secundario dark:!py-[12px] hover:opacity-40 text-white font-bold py-3 px-4 rounded-full font-sans mt-[8px]"
              disabled={cargandoUpload}  
            >
              {t('subirArchivos')}
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleChangeFile}
      />
      {selectedFileName && (
        <div className="mt-4 text-center ">
          <p className="text-sm text-gray-600 dark:text-white">
            {t('Archivo Seleccionado')} : {selectedFileName}
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 text-center text-red-500">
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default UploadDocuments;