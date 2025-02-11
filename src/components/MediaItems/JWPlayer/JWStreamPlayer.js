import React, { useEffect,useState } from 'react';
import './JWStreamPlayer.css';

const JWStreamPlayer = ({cargado,channelID,poster,className}) => {
  /* eslint-disable no-undef */
  const [jwPlayerInstance,setJwPlayerInstance] = useState(null)
  const [cargadoTotal, setCargadoTotal] = useState(false)
  
  useEffect(() => {
    let jwPlayerInstance;
    if (cargado && !cargadoTotal) {
      try {
        //console.log("load")
        //console.log(poster)
        let videos = document.querySelectorAll("video")
        videos.forEach(video=>{
          
            video.remove()
        })
        
        const jwContainer = document.getElementById("jwContainer")
        if (jwContainer) {
          jwContainer.innerHTML = ""
        }
        // Inicializa el JW Player y almacena la instancia
        setJwPlayerInstance(jwLiveChannelSetup({
          channelId: channelID,
          embedContainer: 'jwContainer',
        }))

        // Manipula el DOM como lo haces ahora
        const icon = document.querySelector('.jw-live-icon');
        const text = document.querySelector('.jw-live-icon-text');
        const message = document.querySelector('.jw-live-placeholder-content .jw-status-message');
        // const bg = document.querySelector('.jw-embed-state-idle');
        
        if (icon) icon.remove();
        if (text) text.remove();
        if (message) message.remove();

        videos = document.querySelectorAll("video")
        //console.log(videos)
        
        setCargadoTotal(true)
        // props.streamReady(true)
        
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      if (jwPlayerInstance) {

        jwPlayerInstance.remove(); 
        
      }
      const bg = document.querySelector('#jwContainer');
      if (bg) {
        bg.style.backgroundImage = ''; 
      }
      const jwContainer = document.getElementById("jwContainer")
      if (jwContainer) {
        jwContainer.innerHTML = ""
      }
      
      const videos = document.querySelectorAll("video")
        
        videos.forEach(video=>{
            video.remove()
        })
    };
    
  }, [cargado, channelID]);
  
  useEffect(()=>{
    
    const bg = document.querySelector('#jwContainer');
    if (bg) {
      bg.style.backgroundImage = `url(${poster})`;
    }
    
  },[poster])
  
  useEffect(()=>{
    return () => {
      if (jwPlayerInstance) {
        // Detener y destruir el jugador de JWPlayer si existe una instancia
        jwPlayerInstance.remove(); // Este es el método de JWPlayer para eliminar la instancia del reproductor
        
      }

      // Limpiar cambios en el DOM (restaurar estilos o eliminar elementos que el componente haya agregado)
      const bg = document.querySelector('#jwContainer');
      if (bg) {
        bg.style.backgroundImage = ''; // Restablecer el estilo de fondo si fue modificado
      }
      
      const videos = document.querySelectorAll("video")
        
      videos.forEach(video=>{
          video.remove()
      })
    };
  },[])

  return (
    <>
      <div className={className + (!cargadoTotal ? " aspect-video bg-gris-claro dark:bg-color-dark2 animate-tw-pulse" : "")}>
        <div id="jwContainer" ></div>
      </div>
    </>
  );
};

export default React.memo(JWStreamPlayer);
