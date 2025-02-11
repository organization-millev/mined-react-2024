import './App.css';
import './colors.css';

import './i18n';

import React, { useEffect } from 'react';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Test from './components/MediaItems/test'

import Login from './components/LoginDark/Login'; // Importa el componente Input
import Navbar from './components/Navbar/Navbar'; // Importa el componente Input
import HomeTv from './components/HomeTv/HomeTv'; // Importa el componente Input
import Perfil from './components/Cursos/Perfil'; // Importa el componente Input
import Logros from './components/Logros/Logros'; // Importa el componente Input
import useObtenerIP from './api/useObtenerIP';
import useObtenerPais from './api/useObtenerPais';

import AcademyTv from './components/AcademyTv/AcademyTv';
import CursoTv from './components/CursoTv/CursoTv';
import AcademiaNoComprada from './components/AcademiaNoComprada/AcademiaNoComprada';
import HerramientaNoComprada from './components/HerramientaNoComprada/HerramientaNoComprada';
import CursosVideo from './components/CursosVideo(Academy)/CursosVideo';
import MisCertificados from './components/MisCertificados/MisCertificados';
import ClasesListado from './components/ClasesListado/ClasesListado';
import CursosGuardados from './components/CursosGuardados/CursosGuardados';
import MisAcademias from './components/MisAcademias/MisAcademias';
import Canal from './components/Canal/Canal'
import Programacion from './components/Programacion/Programacion'
import Calendario from './components/Calendario/Calendario'
import Pagos from './components/Pagos/Pagos'
import CarritoCompra from './components/CarritoCompra/CarritoCompra'
import CentroAyuda from './components/CentroAyuda/CentroAyuda'; // Importa el componente Input
import TestComponents from './components/common/testComponents';
import GraficoPastel from './components/common/GraficoPastel/GraficoPastel';
import ListadoElementos from './components/ListadoElementos/ListadoElementos';

 


import Playground from './playground/playground';

import { ROUTES } from './utils/routes';
import SessionTimeOut from './utils/SessionTimeOut.js';

import 'react-toastify/dist/ReactToastify.css';
import { AlertProvider } from './providers/AlertContext';
import { NavigationProvider } from './providers/NavigationContext';

import { ToastContainer } from 'react-toastify';
import { useUser } from './providers/UserContext';
import { UserProvider } from './providers/UserContext';
import { AuthProvider } from './providers/AuthContext';
import { AcademiaProvider } from './providers/AcademiaContext';
import { EcommerceToolsProvider } from './providers/EcommerceToolsContext'; // Ajusta la ruta de importación
import { LoadingProvider } from './providers/LoadingContext';
import { ErroresProvider } from './providers/ErroresContext';

//import { onMessageListener,requestForToken } from './firebase';
 // Escuchar mensajes entrantes en primer plano

      
//import { initializeFirebaseServices } from './utils/Firebase/firebaseConfig';
import CookieConsent from './utils/Firebase/CookieConsent';
import PrivateRoute from './routers/PrivateRoute';
import PublicRoute from './routers/PublicRoute';
import 'animate.css/animate.min.css';

const App = () => {
    const {logout} = useUser()|| {};
    
  
    const handleSessionTimeout = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null || accessToken === 'null' || accessToken.length > 0) {
          
          return;
        }
        
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('typeToken');
        localStorage.removeItem('courseType');
        //window.location.assign('/');
        if (logout) logout();
    };
    
    const ip = useObtenerIP();
    //console.log('version 13102024--1.6');
    const pais = useObtenerPais();
    
    /*useEffect(() => {
     initializeFirebaseServices();
    }, []);*/
  
    
    return (
        
        <div>
            
            <AuthProvider>
            <UserProvider>
            <AcademiaProvider>
            <EcommerceToolsProvider>
            <AlertProvider>
            <LoadingProvider>
            <BrowserRouter>
          
                <NavigationProvider>
                <Routes>
                    
                    {/* Rutas publicas */}
                    <Route path={ROUTES.login} element={<PublicRoute><Login /></PublicRoute>} />
                    
                    
                    {/* Rutas protegidas */}
                    <Route path="/" element={<PrivateRoute />}>
                        <Route path={ROUTES.home} element={<HomeTv />} />
                        <Route path={ROUTES.perfil} element={<Perfil />} />
                        <Route path={ROUTES.academy} element={<AcademyTv />} />
                        <Route path={ROUTES.academyCurso} element={<CursoTv />} />
                        <Route path={ROUTES.ecomerceAcademyNoComprada} element={<AcademiaNoComprada />} />
                        <Route path={ROUTES.ecomerceHeramientaNoComprada} element={<HerramientaNoComprada />} />
                        <Route path={ROUTES.academyCursoGuardado} element={<CursosGuardados />} />
                        <Route path={ROUTES.academyCursoClase} element={<CursosVideo />} />
                        <Route path={ROUTES.academyCertificados} element={<MisCertificados />} />
                        <Route path={ROUTES.academyCentroAyuda} element={<CentroAyuda />} />
                        <Route path={ROUTES.academyAvances} element={<MisAcademias />} />
                        <Route path={ROUTES.logros}  element={<Logros />} />
                        <Route path={ROUTES.academyCursoCanal} element={<Canal />} />
                        <Route path={ROUTES.ecomerceCarrito} element={<CarritoCompra />} />
                        <Route path={ROUTES.ecomerceCarritoPago} element={<Pagos />} />
                        <Route path={ROUTES.academyCalendario} element={<Calendario />} />
                    </Route>
                </Routes>
                </NavigationProvider>
             
                <SessionTimeOut onSessionTimeout={handleSessionTimeout} />
                
                <CookieConsent />
                
            </BrowserRouter>
            <ToastContainer />
            </LoadingProvider>
            </AlertProvider>
            </EcommerceToolsProvider>
            </AcademiaProvider>
            </UserProvider>
            </AuthProvider>
            
            
        </div>
    );
};

export default App;
