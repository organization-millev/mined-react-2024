import React, { useEffect, useState } from 'react';
import { apiMyCertificates } from '../../api/apiConfig';

export const useCertificados = () => {
    
    const [listaCertificates, setListaCertificates] = useState([]);
    const [groupedCertificates, setGroupedCertificates] = useState({});
    const [trigger, setTrigger] = useState(false);
    const [limit, setLimit] = useState(20);
    const { data, error, cargando } = apiMyCertificates(trigger,limit);
    
    const GetCertificates = () => {
        setTrigger(true);
    };
    
    const groupCertificatesByAcademyId = (certificates) => {
        return certificates.reduce((acc, certificate) => {
            const academyId = certificate.cert_txt_academy_name;
            if (!acc[academyId]) {
                acc[academyId] = [];
            }
            acc[academyId].push(certificate);
            return acc;
        }, {});
    };
    
    
    
    
    
    useEffect(() => {
        if (Array.isArray(data) && data.length > 0) {
            const formattedCertificates = data.map(item => ({
                cert_txt_academy_name:item.cert_txt_academy_name,
                cert_txt_course_name:item.cert_txt_course_name,
                cert_int_id:item.cert_int_id,
                certificate_description: item.certificate_description,
                certificate_title: item.certificate_title,
                certificate_date: item.certificate_date,
                certificate_academy_id: item.certificate_academy_id,
                certificate_course_id: item.certificate_course_id,
                certificate_url: item.certificate_url,
                certificate_logo_url: item.certificate_logo_url,
            }));

            setListaCertificates(formattedCertificates);

            const grouped = groupCertificatesByAcademyId(formattedCertificates);
            setGroupedCertificates(grouped);
        } else {
            
        }
    }, [data, error]);

    return {
        GetCertificates,
        listaCertificates,
        groupedCertificates,
        error,
        cargando,
        setTrigger
    };
}
