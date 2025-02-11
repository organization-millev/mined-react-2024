import React, { useEffect, useState } from 'react';
import { apiDownloadCertificates } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';
import { saveAs } from 'file-saver';

export const useDownloadCertificates = () => {
    const { warn, success } = useAlert();
    const [certificateId, setCertificateId] = useState('');
    const [trigger, setTrigger] = useState(false);

    const obtenerIdCertificado = (nuevoCertificadoId, nuevoTrigger) => {
        setCertificateId(nuevoCertificadoId);
        setTrigger(nuevoTrigger);
    };

    const { data, error, cargando:cargandoDownloadCertificates } = apiDownloadCertificates(trigger, certificateId);

    useEffect(() => {
        if (error) {
            warn('Ocurrió un error');
            setTrigger(false)
        } else if (data.pdf_base64) {
            success('Dentro de un momento se descargará tu certificado');
            setTrigger(false);
            const byteCharacters = atob(data.pdf_base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });

            saveAs(blob, 'certificado.pdf');

        }
    }, [data, error, success, warn]);

    return {
        obtenerIdCertificado, cargandoDownloadCertificates
    };
};