import React, { createContext, useContext ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes'; // Asegúrate de importar correctamente tu objeto ROUTES

// Crea el contexto
const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
    const navigate = useNavigate();
    
    
    const goToLogin = (state = {}) => navigate(ROUTES.login, { state });
    const goToHome = (state = {}) => navigate(ROUTES.home, { state });
    const goToPerfil = (state = {}) => navigate(ROUTES.perfil, { state });

    const goToAcademy = (id, state = {}) => navigate(id ? ROUTES.academy.replace(':id', id) : ROUTES.academy.replace('/:id', ''), { state });
    
    const goToAcademyCurso = (nameProgram, nameCurso, state = {}) => {
        if (nameProgram && nameCurso) {
            navigate(ROUTES.academyCurso.replace(':nameProgram', nameProgram).replace(':nameCurso', nameCurso), { state });
        } else {
            navigate(ROUTES.academyCurso.replace('/:nameProgram/curso/:nameCurso', ''), { state });
        }
    };

    const goToEcommerceAcademyNoComprada = (nameProgram, state = {}) => navigate(nameProgram ? ROUTES.ecomerceAcademyNoComprada.replace(':nameProgram', nameProgram) : ROUTES.ecomerceAcademyNoComprada.replace('/:nameProgram', ''), { state });
    const goToEcommerceHerramientaNoComprada = (idTool, state = {}) => navigate(idTool ? ROUTES.ecomerceHeramientaNoComprada.replace(':idTool', idTool) : ROUTES.ecomerceHeramientaNoComprada.replace('/:idTool', ''), { state });

    const goToAcademyCursoGuardado = (state = {}) => navigate(ROUTES.academyCursoGuardado, { state });
   
    const goToAcademyCursoClase = (nameProgram, nameCurso,nameClase, state = {}) => {
        navigate(ROUTES.academyCursoClase.replace(':nameProgram', nameProgram).replace(':nameCurso', nameCurso).replace(':nameClase', nameClase), { state });
    };

    const goToAcademyCertificados = (state = {}) => navigate(ROUTES.academyCertificados, { state });
    const goToAcademyCentroAyuda = (state = {}) => navigate(ROUTES.academyCentroAyuda, { state });
    const goToAcademyAvances = (state = {}) => navigate(ROUTES.academyAvances, { state });
    const goToLogros = (state = {}) => navigate(ROUTES.logros, { state });
    
    //redirecttv
    const goToAcademyCursoCanal = (nameProgram, nameCurso, nameCanal, state = {}) => {
        //navigate(ROUTES.academyCursoCanal.replace(':nameProgram', nameProgram).replace(':nameCurso', nameCurso).replace(':nameCanal', nameCanal), { state });
        const { sessionId ,idCanal } = state || {}
        localStorage.setItem('hasReloaded', 'false'); 
        localStorage.setItem('sessionId', sessionId);
        localStorage.setItem('idCanal', idCanal);
        
        window.location.href = ROUTES.academyCursoCanal.replace(':nameProgram', nameProgram).replace(':nameCurso', nameCurso).replace(':idCanal', idCanal).replace(':idSesion', sessionId).replace(':nameCanal', nameCanal) ;
        //window.location.reload(); 
    };

    const goToEcommerceCarrito = (state = {}) => navigate(ROUTES.ecomerceCarrito, { state });
    const goToEcommerceCarritoPago = (state = {}) => navigate(ROUTES.ecomerceCarritoPago, { state });
    const goToEcommerceCarritoPlayground = (state = {}) => navigate(ROUTES.ecomerceCarritoPlayground, { state });
    
    useEffect(() => {
        
        // Función para pausar y limpiar todos los medios
        const cleanMediaElements = () => {
          const mediaElements = document.querySelectorAll('audio, video');
          mediaElements.forEach(media => {
            media.pause();          // Pausa el audio o video
            media.currentTime = 0;   // Reinicia al principio
            media.src = '';          // Elimina la fuente
            media.load();            // Recarga el elemento para detener completamente
          });
        };
        
        // Verifica si hay algún elemento en modo Picture-in-Picture y lo cierra
        if (document.pictureInPictureElement) {
          document.pictureInPictureElement.pause();
          document.exitPictureInPicture().catch((error) => {
            
          });
        }
        
         // Asignar el evento para detectar cuándo se sale del modo Picture-in-Picture
        const handleLeavePiP = () => {
          
          
          //cleanMediaElements();  // Pausar y limpiar todos los elementos multimedia
        };
        
        
        
        // Agregar event listener para cuando se sale del modo PiP
        document.addEventListener('leavepictureinpicture', handleLeavePiP);
        
        // Limpieza antes de desmontar el componente
        window.onbeforeunload = () => {
          cleanMediaElements();  // Limpiar y detener todos los elementos multimedia
        };
        
      
        // Eliminar service workers si hay alguno registrado
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
              registration.unregister();
            }
          });
        }

        // Cleanup: asegurarse de que PiP y otros recursos se cierren correctamente cuando el componente se desmonte
        return () => {
          // Salir del modo Picture-in-Picture si aún está activo
          if (document.pictureInPictureElement) {
            // Pausar el video antes de cerrar el PiP
            document.pictureInPictureElement.pause();
            // Salir del modo Picture-in-Picture
            document.exitPictureInPicture().catch((error) => {
              
            });
          }
          // Limpiar todos los medios cuando el componente se desmonte
          cleanMediaElements();
          // Remover el evento leavepictureinpicture
          document.removeEventListener('leavepictureinpicture', handleLeavePiP);
        };
        
    }, [goToLogin,
                goToHome,
                goToPerfil,
                goToAcademy,
                goToAcademyCurso,
                goToEcommerceAcademyNoComprada,
                goToEcommerceHerramientaNoComprada,
                goToAcademyCursoGuardado,
                goToAcademyCursoClase,
                goToAcademyCertificados,
                goToAcademyCentroAyuda,
                goToAcademyAvances,
                goToLogros,
                goToAcademyCursoCanal,
                goToEcommerceCarrito,
                goToEcommerceCarritoPago,
                goToEcommerceCarritoPlayground]);
    


    return (
        <NavigationContext.Provider
            value={{
                goToLogin,
                goToHome,
                goToPerfil,
                goToAcademy,
                goToAcademyCurso,
                goToEcommerceAcademyNoComprada,
                goToEcommerceHerramientaNoComprada,
                goToAcademyCursoGuardado,
                goToAcademyCursoClase,
                goToAcademyCertificados,
                goToAcademyCentroAyuda,
                goToAcademyAvances,
                goToLogros,
                goToAcademyCursoCanal,
                goToEcommerceCarrito,
                goToEcommerceCarritoPago,
                goToEcommerceCarritoPlayground,
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

// Hook para usar el contexto de navegación
export const useNavigation = () => useContext(NavigationContext);
