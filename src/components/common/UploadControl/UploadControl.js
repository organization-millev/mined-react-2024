import React, { useState, useRef } from 'react';
import Iconos from '../../iconos/iconos';
import { useTranslation } from 'react-i18next';

const UploadControl = ({ imgSeleccionada, soloImagenes = false }) => {
    const { t } = useTranslation();
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState(null);
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChangeImg = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            imgSeleccionada(selectedFile);
            setSelectedFileName(selectedFile.name);
            if (soloImagenes) {
                setPreviewSrc(URL.createObjectURL(selectedFile));
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-full">
            <div className="lg:min-h-[200px] lg:min-w-[300px] w-full h-full rounded-2xl border-dashed-custom flex items-center justify-center">
                {previewSrc && soloImagenes ? (
                    <img
                        src={previewSrc}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-2xl"
                    />
                ) : (
                    <div className="flex flex-col p-4">
                        <Iconos icono="subir_archivo" className="w-[59px] h-[59px] !p-0 m-auto" />
                        <span className="text-large m-auto">{t('subeTuImagen')}</span>
                        <button
                            onClick={handleButtonClick}
                            className="text-xs bg-gris-azulado-profundo hover:opacity-40 text-white font-bold py-3 px-4 rounded-full font-sans mt-[8px]"
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
                accept={soloImagenes ? 'image/*' : '*'}
                onChange={handleChangeImg}
            />

            {selectedFileName && (
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        {t('archivoSeleccionado')} : {selectedFileName}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadControl;