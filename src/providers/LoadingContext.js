import React, { createContext, useState, useContext,useCallback,useEffect} from 'react';
import Loader from '../components/Loader/Loader'


const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false); // Inicializar como falso
    const [isFadingOut, setIsFadingOut] = useState(false);
    const theme = localStorage.getItem('theme');
    
    const startLoading = () => {
        setIsFadingOut(false); // Reiniciar el estado de fade out
        setLoading(true);
    };

    const stopLoading = () => {
        setIsFadingOut(true); // Iniciar fade out
        setTimeout(() => {
            setLoading(false);
            setIsFadingOut(false); // Resetear el estado de fade out
        }, 1000); // Duración de la animación de fade out en milisegundos
    };

     useEffect(() => {
        // Al cargar el componente, seleccionamos todos los audios y videos
        const mediaElements = document.querySelectorAll('audio, video');
    
        // Recorremos todos los elementos de audio y video para reiniciarlos
        mediaElements.forEach(media => {
          media.pause();          // Pausa el audio o video
          media.currentTime = 0;   // Reinicia al principio
          media.src = '';          // Elimina la fuente (opcional si quieres detener por completo)
          media.load();            // Recarga el elemento para asegurarse de que se detiene
        });
      }, []);
    
    const showLoadingForAWhile = useCallback((duration = 3000) => {
        startLoading();
        const timer = setTimeout(() => {
          stopLoading();
        }, duration);
        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        // Aplicar o eliminar el estilo inline al body para ocultar el scroll
        document.body.style.overflow = loading ? 'hidden' : '';
        // Limpiar el efecto cuando el componente se desmonte
        return () => {
            document.body.style.overflow = '';
            window.scrollTo(0, 0);
        };
    }, [loading]);
    
 
    
    return (
        <LoadingContext.Provider value={{ loading, startLoading, stopLoading,showLoadingForAWhile }}>
            {loading && (
                <div
                    className={`loadingScreen animate__animated ${
                        isFadingOut ? 'animate__fadeOut' : 'animate__fadeIn'
                    }`}
                    style={{
                        backgroundColor: theme === 'dark' ? '#292735' : '#ffffff', // Color de fondo según el tema
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1000, // Asegurarse de que esté sobre todo el contenido
                    }}
                >
                    <Loader />
                </div>
            )}
            <div style={{ visibility: loading ? 'hidden' : 'visible', opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
                {children}
            </div>    
        </LoadingContext.Provider>
    );
};