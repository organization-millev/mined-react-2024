import React, { useState }  from 'react';
import Navbar from '../Navbar/Navbar';
import Certificados from './Certificados/Certificados';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';

const MisCertificados = () => {
    
    return (
        <>
            <Navbar />
            <Certificados /> 
            <AvisoLegal />
            <Footer />
        </>
    );
};

export default MisCertificados;
