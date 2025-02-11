import React, { useState,useEffect } from 'react';
import CardCertificado from '../../common/CardCertificado/CardCertificado';
import Select from '../../common/Select/Select'

import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../../providers/LoadingContext';
import { useCertificados } from '../../../hooks/certificados/useCertificados';
import { useDownloadCertificates } from '../../../hooks/certificados/useDownloadCertificates';
import { useAcademia } from '../../../providers/AcademiaContext';
import { useLocation } from 'react-router-dom';

const Certificados = () => {
    
    const [selectedAcademyId, setSelectedAcademyId] = useState('');
    const [filteredCertificates, setFilteredCertificates] = useState([]);

    const { GetCertificates,listaCertificates,groupedCertificates } = useCertificados();
    const { showLoadingForAWhile } = useLoading();
    const { academias,listaAcademias } = useAcademia();
    const { obtenerIdCertificado, cargandoDownloadCertificates } = useDownloadCertificates();
    const [activeTab, setActiveTab] = useState("");
    const [downloadingCertificateId, setDownloadingCertificateId] = useState(null);
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const location = useLocation();
    const { nameProgram } = location.state || {};
    
    useEffect(() => {
       showLoadingForAWhile();
       GetCertificates();
    }, []);
    
    useEffect(() => {
        if (academias.length > 0 && !activeTab) {
            const matchingAcademy = academias.find(academy =>
                academy.translations?.find(translation =>
                    translation.language_code === language_code && translation.name === nameProgram
                )
            );
            if (matchingAcademy) {
                setActiveTab(matchingAcademy.program_id);
            } else {
                setActiveTab(academias[0].program_id);
            }
        }
    }, [academias, activeTab, nameProgram, language_code]);

    const handleDownload = (cert_int_id) => {
        setDownloadingCertificateId(cert_int_id); 
        obtenerIdCertificado(cert_int_id,true);
    };
    
    const handleSelectChange = (event) => {
        setSelectedAcademyId(event.target.value);
    };
    
    const { t } = useTranslation();
    
    const getCourseNameFromTranslations = (courseId, academy) => {
        const course = academy.courses.find(c => c.course_id === courseId);
        if (course && course.translations) {
            const translation = course.translations.find(t => t.language_code === language_code);
            return translation ? translation.name : 'Nombre no disponible';
        }
        return 'Nombre no disponible';
    };
    
    const getCertificatesByAcademyCourses = (academy) => {
        const enabledAsyncCourses = academy.courses.filter(course => 
            course.asynchronous && course.asynchronous.some(asyncData => asyncData.is_enabled === 1)
        );
        const academyCourseIds = enabledAsyncCourses.map(course => course.course_id);
        const certificatesByAcademy = listaCertificates.filter(cert => academyCourseIds.includes(cert.certificate_course_id));

        return enabledAsyncCourses.map(course => {
            const cert_fondo = course.tmpl_txt_miniature_url;
            const cert = certificatesByAcademy.find(cert => cert.certificate_course_id === course.course_id);
            const courseName = getCourseNameFromTranslations(course.course_id, academy);
            return cert ? {
                ...cert,
                cert_txt_course_name: courseName,
                isEnabled: true,
                cert_fondo: cert_fondo
            } : {
                cert_txt_course_name: courseName,
                certificate_description: '',
                certificate_url: '',
                isEnabled: false,
                cert_fondo: cert_fondo
            };
        });
    };

    
    const renderMobileCertificates = (academyId) => {
        const academy = academias.find(a => a.program_id === parseInt(academyId));
        if (!academy) return null;

        const certificates = getCertificatesByAcademyCourses(academy);
        
        return (
            <div className="grid grid-cols-1 gap-4 mt-4">
                {certificates.map((certificate, index) => (
                    <CardCertificado
                        key={index}
                        titulo={certificate.cert_txt_course_name}
                        description={certificate.certificate_description}
                        url={certificate.certificate_url}
                        isEnabled={certificate.isEnabled}
                        handleDownload={() => handleDownload(certificate.cert_int_id)}
                        cert_fondo = {certificate.cert_fondo}
                        disabled={downloadingCertificateId === certificate.cert_int_id}
                        cargando={cargandoDownloadCertificates}
                    />
                ))}
                {certificates.length === 0 && (
                    <p>{t('No hay certificados disponibles para esta academia')}</p>
                )}
            </div>
        );
    };


    return (
        <>
            <div className="lg:px-[10%] px-[5%] 2xl:container-extraLarge 2xl:flex 2xl:flex-col hidden md:block ">
            <p className="font-sans text-4xl font-semibold lg:mb-4 lg:mt-8 text-marron-grisaceo dark:text-blanco">{t('misCertificados')} </p> 
                <Tabs key={activeTab} value={activeTab}>
                    <TabsHeader
                        className="w-3/4 rounded-none border-b dark:!border-b-0 border-blue-gray-50 bg-transparent p-0 h-[50px] !text-sm"
                        indicatorProps={{
                            className: "bg-transparent dark:!border-blanco border-b-4 border-gris-azulado-profundo shadow-none rounded-none !text-sm"
                        }}
                    >
                        {academias.map((academy) => (
                            <Tab
                                key={academy.program_id}
                                value={academy.program_id}
                                onClick={() => setActiveTab(academy.program_id)}
                                className={activeTab === academy.program_id ? "dark:text-blanco text-gris-azulado-profundo-900 font-semibold !text-sm" : "dark:text-blanco !text-sm font-semibold"}
                            >
                                {academy.translations?.find(translation => translation.language_code === language_code)?.name} 
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {academias.map((academy) => (
                            <TabPanel key={academy.program_id} value={academy.program_id} className="pl-0 pr-0 mb-5">
                                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[2%] h-auto lg:mb-4">
                                    {getCertificatesByAcademyCourses(academy).map((certificate, index) => (
                                        <CardCertificado
                                            key={index}
                                            titulo={certificate.cert_txt_course_name}
                                            description={certificate.certificate_description}
                                            url={certificate.certificate_url}
                                            isEnabled={certificate.isEnabled}
                                            handleDownload={() => handleDownload(certificate.cert_int_id)}
                                            disabled={downloadingCertificateId === certificate.cert_int_id}
                                            cert_fondo = {certificate.cert_fondo}
                                            cargando={cargandoDownloadCertificates}
                                        />
                                    ))}
                                    {getCertificatesByAcademyCourses(academy).length === 0 && (
                                        <p>{t('No hay certificados disponibles para esta academia')}</p>
                                    )}
                                </div>
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
            
            
            <div className="md:!hidden px-[5%] md:semi-full-container flex-col flex mb-[1.5em]">
                <p className="font-sans text-2xl font-semibold text-gris-azulado-profundo my-6 dark:text-white">
                    {t('certificados')}
                </p>

                <div className="flex flex-col">
                    <p className="font-sans text-sm mb-2 font-medium dark:text-white">{t('academia')}</p>
                    <Select
                        className={"md:min-w-[230px] lg:min-w-[230px] "}
                        style={{ color: 'var(--color-gris-claro)' }}
                        onChange={handleSelectChange}
                        value={selectedAcademyId}
                    >
                        <option value="">Seleccionar</option>
                        {academias.map((academy) => (
                            <option key={academy.program_id} value={academy.program_id}>
                                {academy.translations?.find(translation => translation.language_code === language_code)?.name}
                            </option>
                        ))}
                    </Select>
                </div>
                
                {selectedAcademyId && renderMobileCertificates(selectedAcademyId)}
            </div>
            
            
            
            
        </>
       
    );
};

export default Certificados;
