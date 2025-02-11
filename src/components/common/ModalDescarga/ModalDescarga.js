import React from 'react';
import Close from '../../iconos/close.js';
import CloseDark from '../../iconos/closeWhite.js';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

const ModalDescarga = ({ isOpen, onClose, fileName, type, url, download }) => {
    if (!isOpen) return null;

    // Creamos un arreglo de documentos para DocViewer
    const docs = [
      { uri: url } // Puedes pasar otros documentos también
    ];

    const handlePrint = () => {
      // Como react-doc-viewer no provee una función de impresión nativa,
      // se puede abrir el documento en una nueva pestaña y usar la función de impresión del navegador
      window.open(url, '_blank');
    };

    return (
      <div className="fixed inset-0 z-[4000] overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-negro opacity-50"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
            <div className="rounded-[20px] dark:bg-color-dark bg-white px-2 py-4">
              <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <Close className="dark:hidden"/>
                  <CloseDark className="hidden dark:block !p-[5px]"/>
                </button>
              </div>

              <div className="pl-2 pr-4">
                <div className="flex justify-between my-2">
                  <h1 className="text-2xl font-semibold mb-2 font-sans dark:text-blanco">
                    {fileName}.{type}
                  </h1>
                  <div className="flex items-center !gap-2">
                    <button onClick={handlePrint} className="text-xs font-bold underline dark:text-blanco">
                      Imprimir
                    </button>
                    <button onClick={download} className="text-xs font-bold underline dark:text-blanco">
                      Descargar
                    </button>
                  </div>
                </div>

                <div className="file-viewer-container" style={{ width: '100%', height: '600px' }}>
                  <DocViewer
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ModalDescarga;


/*import React from 'react';
import Close from '../../iconos/close.js';
import CloseDark from '../../iconos/closeWhite.js';

import FileViewer from 'react-file-viewer';

const ModalDescarga = ({ isOpen, onClose, fileName, type, url,download }) => {
    
    
    if (!isOpen) return null; 

    const onError = (e) => {
        console.error('Error al cargar el archivo:', e);
        
    };
    
    
    const renderFileViewer = () => {
        switch (type) {
            case 'pdf':
                return (
                    <iframe
                        src={url}
                        title={fileName}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                    />
                );
            case 'doc':
            case 'docx':
            case 'xls':
            case 'xlsx':
            case 'txt':
            case 'rtf':
            case 'odt':
                return (
                    <iframe
                        src={`https://docs.google.com/gview?url=${url}&embedded=true`}
                        title={fileName}
                        width="100%"
                        height="600px"
                        frameBorder="0"
                    />
                );
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return (
                    <img
                        src={url}
                        alt={fileName}
                        style={{ maxWidth: '100%', maxHeight: '600px' }}
                    />
                );
            default:
                return <p>Este tipo de archivo no es compatible para la vista previa.</p>;
        }
    };
    const handlePrint = () => {
        if (type === 'pdf') {
            window.open(url, '_blank');
        } else if (['doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf', 'odt'].includes(type)) {
            window.open(`https://docs.google.com/gview?url=${url}&embedded=true`, '_blank');
        } else {
            window.open(url, '_blank');
        }
    };
    
    
    return (
        <>
            <div className="fixed inset-0 z-[4000] overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-negro opacity-50"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom   rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
                        <div className=" rounded-[20px] dark:bg-color-dark bg-white px-2 py-4">
                            <div className="flex justify-end">
                                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                    <Close     className="dark:hidden"/>
                                    <CloseDark className="hidden dark:block !p-[5px]"/>
                                </button>
                            </div>
                            
                            <div className="pl-2 pr-4">
                                <div className="flex  justify-between my-2">
                                    <h1 className="text-2xl font-semibold mb-2 font-sans dark:text-blanco"> {fileName}.{type}</h1>
                                    <div className="flex items-center !gap-2 ">
                                        <button onClick={handlePrint} className="text-xs font-bold underline dark:text-blanco">Imprimir</button>
                                        <button onClick={download} className="text-xs font-bold underline dark:text-blanco ">Descargar</button>
                                        
                                    </div>
                                </div>

                                <div className="">
                                    <div className="file-viewer-container">
                                        {renderFileViewer()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalDescarga;*/
