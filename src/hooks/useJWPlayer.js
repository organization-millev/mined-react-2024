
import React, { useEffect, useState } from 'react';

const ID_MEDIA = "MmkN3maa"
export const useJWPlayer = () => {
    
    const [triggerAgregarScripts, setTriggerAgregarScripts] = useState(false);
    
    const [jwObject, setJwObject] = useState({
        scriptCargado1: false,
        scriptCargado2: false
    });
    
    const AgregarScriptsJW = () => {
        setTriggerAgregarScripts(true);
    }
    
    useEffect(() => {
        let scriptLibrary;
        let scriptChannelEmbed;
    
        if (triggerAgregarScripts) {
            // Verificar si los scripts ya existen en el DOM para no cargarlos dos veces
            if (!document.querySelector(`#jw-library-${ID_MEDIA}`)) {
                scriptLibrary = document.createElement('script');
                scriptLibrary.id = `jw-library-${ID_MEDIA}`;  // Asignar un ID único
                scriptLibrary.src = `https://cdn.jwplayer.com/libraries/${ID_MEDIA}.js`;
                scriptLibrary.onload = () => {
                    setJwObject(prevState => ({
                        ...prevState,
                        scriptCargado2: true
                    }));
                    //
                };
                scriptLibrary.onerror = () => {
                    setJwObject(prevState => ({
                        ...prevState,
                        scriptCargado2: false
                    }));
                    //console.error('Error al cargar el script Library');
                };
                document.body.appendChild(scriptLibrary);
            }
            
            if (!document.querySelector('#jw-channel-embed')) {
                scriptChannelEmbed = document.createElement('script');
                scriptChannelEmbed.id = 'jw-channel-embed';  // Asignar un ID único
                scriptChannelEmbed.src = `${process.env.REACT_APP_URL_IMG}/assets/jwplayer/channel-embed.js?v=1rgfsd`;
                scriptChannelEmbed.onload = () => {
                    setJwObject(prevState => ({
                        ...prevState,
                        scriptCargado1: true,
                        autostart: true
                    }));
                    //
                };
                scriptChannelEmbed.onerror = () => {
                    setJwObject(prevState => ({
                        ...prevState,
                        scriptCargado1: false
                    }));
                    //console.error('Error al cargar el script Embed');
                };
                document.body.appendChild(scriptChannelEmbed);
            }
            
            setTriggerAgregarScripts(false);
        }
        
        return () => {
            // Cleanup para asegurarte de que no queden scripts residuales
            if (scriptLibrary && document.querySelector(`#jw-library-${ID_MEDIA}`)) {
                document.body.removeChild(scriptLibrary);
                //
            }
            if (scriptChannelEmbed && document.querySelector('#jw-channel-embed')) {
                document.body.removeChild(scriptChannelEmbed);
                //
            }
        };

    }, [triggerAgregarScripts]);
    
    return { AgregarScriptsJW, jwObject };   
}


/*import React, {  useEffect,useState  } from 'react';

const ID_MEDIA = "MmkN3maa"
export const useJWPlayer = () => {
    
    const [triggerAgregarScripts,setTriggerAgregarScripts] = useState(false)
    
    const [jwObject,setJwObject] = useState({
        scriptCargado1:false,
        scriptCargado2:false
    })
    
    const AgregarScriptsJW = () => {
        setTriggerAgregarScripts(true)
    }
    
    useEffect(()=>{
         let scriptLibrary;
         let scriptChannelEmbed;
    
        if(triggerAgregarScripts){
            scriptLibrary = document.createElement('script');
            scriptChannelEmbed = document.createElement('script');
            
            //scriptChannelEmbed.src = 'https://ssl.p.jwpcdn.com/live/channel-embed.js';
            scriptChannelEmbed.src = `${process.env.REACT_APP_URL_IMG}/assets/jwplayer/channel-embed.js?v=1rgfsd`;
            scriptChannelEmbed.onload = () => { 
              setJwObject(prevState => ({
                  ...prevState,
                  scriptCargado1:true,
                  autostart: true,
              }))
              
            }
            scriptChannelEmbed.onerror = () => {
              setJwObject(prevState => ({
                  ...prevState,
                  scriptCargado1:false
              }))
              console.error('Error al cargar el script Embed');
            };
          
            scriptLibrary.src = 'https://cdn.jwplayer.com/libraries/'+ID_MEDIA+'.js';
            scriptLibrary.onload = () => { 
              setJwObject(prevState => ({
                  ...prevState,
                  scriptCargado2:true
              }))
              
            }
            
            scriptLibrary.onerror = () => {
                setJwObject(prevState => ({
                  ...prevState,
                  scriptCargado2:false
              }))
              console.error('Error al cargar el script Library');
            };
            
            document.body.appendChild(scriptLibrary);
            document.body.appendChild(scriptChannelEmbed);
            
            setTriggerAgregarScripts(false)
        }
        
         // Cleanup function: se ejecuta cuando el componente se desmonta
        return () => {
          if (scriptLibrary) {
            document.body.removeChild(scriptLibrary);
            
          }
          if (scriptChannelEmbed) {
            document.body.removeChild(scriptChannelEmbed);
            
          }
          
         
        };

    },[triggerAgregarScripts])
    

    
    
    return {AgregarScriptsJW,jwObject}   
}*/