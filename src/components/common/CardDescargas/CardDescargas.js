import React, { useState } from 'react';
import Descargar from '../../iconos/login.js'; // Asegúrate de que este componente existe y se usa correctamente
import Iconos from '../../iconos/iconos';
import { useTranslation } from 'react-i18next';
import { saveAs } from 'file-saver';
import ModalDescarga from '../ModalDescarga/ModalDescarga';
import DescargarIconDark from '../../iconos/download_blanco';
import Close from '../../iconos/close.js';
import CloseDark from '../../iconos/closeWhite.js';

const CardDescargas = ({ fileName, type, url,viewType,showDownloadButton = true, showModal = true ,enableHoverEffect= false,permisoInstructor, downloadShow}) => {
  
  const { t } = useTranslation();
  
  const contenedorDescargaGrid = "py-3 px-4 min-w-[100px] max-w-[120px] max-h-[120px] min-h-[120px] shadow-lg bg-plata-suave dark:bg-color-dark  flex flex-col justify-center items-center rounded-[10px] cursor-pointer";
  const contenedorDescargaList = "bg-plata-suave dark:bg-color-dark w-full p-2 rounded-[10px] cursor-pointer justify-between";
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  /*const handleDownload = () => {
    //saveAs(url, `${fileName}.${type}`);
    if (showDownloadButton) {
      saveAs(url, `${fileName}.${type}`);
    }
  };*/
  
  const sanitizeFileName = (name) => {
    return name.replace(/[^a-zA-Z0-9_\- ~áéíóúÁÉÍÓÚñÑüÜ]/g, '_');
  };

  const handleDownload = async () => {
    //console.log('handleDownload called');
    if (!showDownloadButton) {
      console.warn('Download button not enabled');
      return;
    }
  
    let extension = type.trim().toLowerCase();
    if (extension.startsWith('.')) {
      extension = extension.slice(1);
    }
  
    const sanitizedFileName = sanitizeFileName(fileName);
    const downloadName = sanitizedFileName.toLowerCase().endsWith(`.${extension}`)
      ? sanitizedFileName
      : `${sanitizedFileName}.${extension}`;
  
    try {
      //console.log('Fetching file from:', url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // Agrega encabezados aquí si es necesario
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }
  
      const blob = await response.blob();
      //console.log('File fetched successfully, initiating download...');
      saveAs(blob, downloadName);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };



  const convertirTexto = (texto) => {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
  
  
  const handleModalFile = () => {
    //setIsModalOpen(true); 
    if (showModal) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };
  
  
  const getFileExtension = (url) => {
    return url.split('.').pop().toLowerCase();
  };
  
  const getIconByExtension = (extension, isDarkMode) => {
    const iconDark = isDarkMode ? '_dark' : '';
    
    switch (extension) {
      case 'pdf':
        return `descarga_pdf${iconDark}`;
      case 'doc':
      case 'docx':
        return `descarga_word${iconDark}`;
      case 'xls':
      case 'xlsx':
        return `descarga_excel${iconDark}`;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return `descarga_imagen${iconDark}`;
      case 'txt':
      case 'rtf':
      case 'odt':
        return `descarga_documento${iconDark}`;
      default:
        return `descarga_documento${iconDark}`;
    }
  };

  const fileExtension = getFileExtension(url);
  
  const isDarkMode = document.documentElement.classList.contains('dark');
  const icono = getIconByExtension(fileExtension, isDarkMode);
  
  /*const handleDownloadClick = (e) => {
    e.stopPropagation(); // Previene que otros eventos interfieran
    e.preventDefault();
    console.log('Download button clicked');
    if (downloadShow) {
      console.log('Download permitted, initiating download...');
      handleDownload();
    } else {
      console.warn('Download not permitted');
    }
  };*/



  return (
     <>
      {showModal && ( 
        <ModalDescarga isOpen={isModalOpen} onClose={closeModal} fileName={fileName} type={type} url={url} download={handleDownload} />
      )}
      
      {viewType === 'grid' && (
        <div  className={`${contenedorDescargaGrid} group`}>
          <div className="flex justify-center flex-col items-center">
            <div onClick={handleModalFile}>
                
                {permisoInstructor && (
                    <div className={`flex justify-end transition-opacity duration-300 ${enableHoverEffect ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                      <Close className="dark:hidden" />
                      <CloseDark className="hidden dark:block !p-[5px]" />
                    </div>
                  )}
                  
                <div className="flex justify-center">
                  {/*<img src={`${process.env.REACT_APP_URL_IMG}/assets/images/IconPdf.png`} className="w-[53px] h-[53px] mb-2" alt="Icono PDF" />*/}
                  <Iconos icono={icono} className="icono-xl" />
                </div>
                <p className="dark:text-blanco font-sans text-xs font-semibold mb-1  text-center line-clamp-1 w-[90px] mt-[4px]">
                  {convertirTexto(fileName)}.{type}
                </p>
            </div>
            
            {showDownloadButton && (
              <div
                className={`flex flex-row items-center justify-center lg:transition-opacity lg:duration-300 ${enableHoverEffect ? 'lg:opacity-0 lg:group-hover:opacity-100' : ''}`}
                 onClick={downloadShow ? handleDownload : null}
              >
                <p className="dark:text-blanco font-sans text-xs font-semibold">{t('btnDescargar')}</p>
                <Descargar className="transform rotate-90 ml-1 dark:!hidden"   padding="0px" width="24px" height="24px" />
                <DescargarIconDark className="!hidden dark:!block"   padding="0px" width="24px" height="24px" />
              </div>
            )}
          </div>
        </div>
      )}

      {viewType === 'list' && (
        <div className={`${contenedorDescargaList} group flex flex-row items-center`}>
          <div className="flex items-center" onClick={handleModalFile}>
            {/*<img src={`${process.env.REACT_APP_URL_IMG}/assets/images/IconPdf.png`} className="w-[25px] h-[25px]" alt="Icono PDF" />*/}
            <Iconos icono={icono} className="icono-xl"/>
            
            <p className="dark:text-blanco font-sans text-xs font-semibold px-3 group-hover:font-bold !line-clamp-1">
               {convertirTexto(fileName)}.{type}
            </p>
          </div>
          
          
          {showDownloadButton && (
            <div className="flex justify-end min-w-[40px] ">
              <Descargar onClick={handleDownload} className="transform rotate-90 !w-[24px] !h-[24px] dark:!hidden"  padding="0px" width="24px" height="24px" />
              <DescargarIconDark  onClick={handleDownload}  className="!hidden dark:!block"   padding="0px" width="24px" height="24px" />
            </div>
          )}
          
        </div>
      )}
    </>
  );
}

export default CardDescargas;
