import React, { useState, useEffect } from 'react';
import DescargarIcon from '../../iconos/download_blanco';
import DescargarIconDark from '../../iconos/download_dark';
import Deshabilitado from '../../iconos/candado_blanco';
import { useTranslation } from 'react-i18next';

const CardCertificado = ({ isEnabled, titulo, url, handleDownload , cert_fondo, cargando}) => {
    const { t } = useTranslation();
    const [isDownloading, setIsDownloading] = useState(false);
    
    
    const defaultImage = process.env.REACT_APP_DEFAULT_NO_IMAGE_URL;
    
    useEffect(() => {
        if (!cargando) {
            setIsDownloading(false);
        }
    }, [cargando]);
    
    const onDownloadClick = () => {
        setIsDownloading(true);  // Deshabilitar el botón y cambiar el texto
        handleDownload();  // Llamar a la función de descarga
    };

    if (!isEnabled) {
        return (
            // Código para el estado deshabilitado
            <div className="md:w-[330px] lg:w-[365px] h-[290px] gap-2 flex flex-col">
                <div className="relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[53px] h-[53px] rounded-full flex justify-center items-center z-10" style={{ backgroundColor: '#00000066' }}>
                        <Deshabilitado width="40px" height="40px" />
                    </div>
                    <img src={cert_fondo || defaultImage}  alt={`Certificado deshabilitado ${titulo}`} className="grayscale opacity-20" style={{ height: '210px', objectFit: 'cover' }} />
                </div>
                <div className="font-sans flex flex-col items-start gap-1">
                    <p className="font-sans font-semibold text-xl dark:text-blanco">{titulo}</p>
                    <button className="flex flex-row items-center boton-primario dark:boton-secundario font-semibold opacity-50 !text-xs !py-0 !px-4 !rounded-[40px]" disabled>
                        {t('btnDescargar')}
                        <DescargarIcon className="block dark:hidden" />
                        <DescargarIconDark className="hidden dark:block" />
                    </button>
                </div>
            </div>
        );
    }
    
    // Código para el estado habilitado y cuando se está descargando
    return (
        <div className="md:w-[330px] lg:w-[365px] h-[290px] gap-2 flex flex-col">
            <div>
                  <img src={cert_fondo || defaultImage} alt={`Certificado ${titulo}`}  style={{ height: '210px' }}  />
            </div>
            <div className="font-sans flex flex-col items-start gap-1">
                <p className="font-sans font-semibold text-xl dark:text-blanco line-clamp-1">{titulo}</p>
                <button 
                    className="flex flex-row items-center boton-primario dark:boton-secundario font-semibold !text-xs !py-0 !px-4 !rounded-[40px]"
                    onClick={onDownloadClick}
                    disabled={isDownloading}
                >
                    {isDownloading ? t('descargando') : t('btnDescargar')}
                    <DescargarIcon className="block dark:hidden" />
                    <DescargarIconDark className="hidden dark:block" />
                </button>
            </div>    
        </div>
    );
};

export default CardCertificado;