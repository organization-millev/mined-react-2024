import React, { useState,useEffect,useRef } from 'react';

import Navbar from '../Navbar/Navbar';
import JWStreamPlayer from '../MediaItems/JWPlayer/JWStreamPlayer';
import JWPlayerEmbed from '../MediaItems/JWPlayer/JWPlayerEmbed';
import Millicast from '../MediaItems/DolbiMillicast/Millicast';
import Slido from '../MediaItems/Slido/Slido';
import Listas from './Listas/Listas';
import Valoraciones from './Valoraciones/Valoraciones';
import Resenas from './Resenas/Resenas';
import Preguntas from './Preguntas/Preguntas';
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia';
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer'; 
import BannerInstructor from '../common/BannerInstructor/BannerInstructor';
import BannerPromocional from '../common/BannerPromocional/BannerPromocional'; 

import { useParams,useLocation  } from 'react-router-dom';
import {useJWPlayer} from '../../hooks/useJWPlayer';
import {useLiveStreamming} from '../../hooks/canal/useLiveStreamming';
import {useCanal} from '../../hooks/useCanal';
import { useTranslation } from 'react-i18next';
import { useLoading } from '../../providers/LoadingContext';
import { useLiveSessions } from '../../hooks/useLiveSessions'; 
import { useUser } from '../../providers/UserContext';
import { useHorario } from '../../hooks/sync/useHorario';
import { useSaleBanner } from '../../hooks/canal/useSaleBanner';
import { useAcademia } from '../../providers/AcademiaContext';
import { useCarrito } from '../../hooks/useCarrito';
import {useNavigate} from 'react-router-dom';


const JWStreamPlayerClasses="w-[100%]  lg:w-[70%]"
const SlidoClasses="w-[100%] lg:w-[30%] lg:h-[auto]"

const Canal = () => {
    
    const navigate = useNavigate();

    const { roleUser, userData } = useUser();
    
    
    const { showLoadingForAWhile } = useLoading();
    
    
    const [ permisoInstructor , setPermisoInstructor ] = useState(false);
    
    
    useEffect(() => {
        // Verifica si ya se ha recargado anteriormente
        const hasReloaded = localStorage.getItem('hasReloaded');
    
        // Si no se ha recargado, establecer un timeout para recargar la página
        if (!hasReloaded || hasReloaded === 'false') {
            const reloadPage = () => {
                localStorage.setItem('hasReloaded', 'true'); // Marcar que ya se ha recargado
                window.location.reload(); // Recargar la página 
            };
    
            // Establecer un timeout para ejecutar el reload después de 1 milisegundo
            const timer = setTimeout(() => {
                reloadPage();  // Llamar la función de recarga
            }, 1);
    
            // Cleanup: limpiar el timeout cuando el componente se desmonte
            return () => clearTimeout(timer);
        }
    }, []);

    
   /* useEffect(() => {
        
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
          
          cleanMediaElements();  // Pausar y limpiar todos los elementos multimedia
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
        
    }, []);*/
    
      
    useEffect(() => {
      showLoadingForAWhile();
    }, []);
    const { nameProgram , nameCurso  } = useParams();
    
    const [ imgStreamingEspera , setImgStreamingEspera ] = useState([]);
    
    const location = useLocation();
    //const { sessionId ,idCanal } = location.state || {}
    
    // Obtener los valores predeterminados desde localStorage
    const sessionId = localStorage.getItem('sessionId') || 'defaultSessionId';  // Valor predeterminado si no existe en localStorage
    const idCanal = localStorage.getItem('idCanal') || 'defaultIdCanal';        // Valor predeterminado si no existe en localStorage
    //
    // Extraer las variables del estado de location o usar los valores de localStorage
    //const { sessionId = localSessionId, idCanal = localIdCanal } = location.state || {};
    
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const { academias, getIdsByName } = useAcademia();
    const ids = getIdsByName(nameProgram, nameCurso , language_code);
    const { GetHorario, horario } = useHorario();
    const { getImgStreamingEspera ,getFilesCanal ,sessionList} = useLiveSessions();
    
    const [ instructor, setInstructor] = useState([]);
     
    useEffect(() => {
        if (ids && academias.length > 0) {
            //
            GetHorario(ids.courseId);
        }
    }, [nameCurso, academias]);
    
    {/*useEffect(() => {
        
        
        
        if (horario && horario.length > 0) {
           const channel = horario.find(channel => channel.chnlIntId == idCanal);
           const instructorInfo = buscarSesionPorId(channel, sessionId);
           
           setInstructor(instructorInfo);
           
           const files = channel ? channel.files : [];
           
           
           
           const streamingEsperaImage = files.find(file => file.fileTxtTag === "img_streaming_espera");
           
           
           
           setImgStreamingEspera(streamingEsperaImage.fileTxtUrl);
        }
    }, [horario]);*/}
    
    useEffect(() => {
        //
        //
        
        if (horario && horario.length > 0) {
            const channel = horario.find(channel => channel.chnlIntId == idCanal);
            const instructorInfo = buscarSesionPorId(channel, sessionId);
            if (instructorInfo) {
                setInstructor(instructorInfo);
            } else {
                
            }
            
            if (channel) {
                const files = channel.files || [];
                const streamingEsperaImage = files.find(file => file.fileTxtTag === "img_streaming_espera");
                setImgStreamingEspera(streamingEsperaImage ? streamingEsperaImage.fileTxtUrl : '');
            }
        }
    }, [horario]);

    const { t } = useTranslation();

    const {AgregarScriptsJW,jwObject} = useJWPlayer();
    
    const {GetLiveStreamming,liveStreamming} = useLiveStreamming();
    const [usrIntIds, setUsrIntIds] = useState([]);
    
    useEffect(() => { 
        GetLiveStreamming(idCanal); 
    }, []);
    
    const {saleBanner,getBanner,saleTools,getSaleTools,saleSet,getSaleSet} = useSaleBanner(idCanal)
    const [isBannerActive,setIsBannerActive] = useState(false)
    useEffect(()=>{
        getBanner()
        getSaleTools()
    },[])
    useEffect(()=>{

        const interval = setInterval(() => {
            if(Object.keys(saleBanner.banner).length > 0){
                    
                let timestamp_end = Date.parse(saleBanner.banner.sale_dt_end)
                if (timestamp_end < Date.now()) {
                    setIsBannerActive(false);
                    
                } 
            }
        }, 1000)

        if(Object.keys(saleBanner.banner).length == 0 ){
            setIsBannerActive(false)
            return
        }else{
            setIsBannerActive(true)
        }
        
        return () => clearInterval(interval);
        
    },[saleBanner.cargando])
    
    useEffect(()=>{
        
        
        
    },[saleBanner])
    
    const activarBanner = (price_id,period_id) => {
        
        let params = {price_id:price_id,period_id:period_id,channel_id:idCanal}
        getSaleSet(params)
    }
    
    useEffect(()=>{
        
        
        
    },[saleSet])
    
    /*useEffect(() => { 
        
        setImgStreamingEspera(getImgStreamingEspera(getFilesCanal(sessionList,idCanal)));
    }, [sessionList]);*/
    
    
    useEffect(() => { 
       
    }, [imgStreamingEspera]);
    
    const {canal,loadCanal,resenas,preguntasRespuestas,listasReproduccion} = useCanal()
    
    const objetoSlido = {
        primer_nombre: localStorage.getItem("first_name") || "",
        apellido: localStorage.getItem("last_name") || "" ,
        email: localStorage.getItem("email") || ""
    }
    
    
    

      
    useEffect(()=>{
        AgregarScriptsJW()
        loadCanal() 
    },[])
    
    useEffect(()=>{
        
    },[jwObject.scriptCargado,canal.cargando])
    
    useEffect(()=>{
        
    },[canal])
    
    
    const [streamming, setStreamming] = useState({
      channel_id: '',
      chsp_txt_code: 'aaaaaaa',
      chat_url: '',
      providers:[]
    });
    
    useEffect(() => {
      if (liveStreamming && liveStreamming.length > 0) {
        setStreamming(liveStreamming[0]);
        
        const extractedUsrIntIds = liveStreamming.flatMap(session =>
                session.providers.map(provider => provider.usr_int_id)
            );
            setUsrIntIds(extractedUsrIntIds);
      } 
    }, [liveStreamming]);
    
    // Función para buscar una sesión por ID de sesión
    {/*function buscarSesionPorId(channel, sessIntId) {
        for (const day of channel.days) {
            for (const session of day.sessions) {
                if (session.sessIntId === sessIntId) {
                    return {
                        instructorName: session.instructorName,
                        instructorPhoto: session.instructorPhoto
                    };
                }
            }
        }
        return null;
    }*/}
    
    function buscarSesionPorId(channel, sessIntId) {
        if (!channel || !channel.days || channel.days.length === 0) {
            console.error('Channel or days not defined or empty:', channel);
            return null;
        }
        
        for (const day of channel.days) {
            if (day.sessions) {
                for (const session of day.sessions) {
                    //
                    if (session.sessIntId == sessIntId) {
                        //
                        return {
                            instructorName: session.instructorName,
                            instructorPhoto: session.instructorPhoto
                        };
                    }
                }
            }
        }
        
        return null;
    }
    
    //Ajuste mobile, video pegado al top de la pantalla siempre
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    function adjustContentMargin() {
        if (headerRef.current && contentRef.current) {
            if(window.innerWidth < 1024){
                const headerHeight = headerRef.current.offsetHeight;
                contentRef.current.style.marginTop = `${headerHeight}px`; 
            }
            else{
                contentRef.current.style.marginTop = `0px`; 
            }
            
        }
    }
    useEffect(() => {

        adjustContentMargin();
        window.addEventListener('resize', adjustContentMargin);

        return () => window.removeEventListener('resize', adjustContentMargin);
    }, []);
    
    const {directo,activarDirecto} = useCarrito()
    const setearOrden = () => {
        
        if(saleBanner.banner.prod_int_id != undefined && saleBanner.banner.prod_int_id != null){
            activarDirecto({category_id:saleBanner.banner.price_cat_int_id,product_id:saleBanner.banner.prod_int_id,origin:"channel",channel_id:idCanal,sale_id:saleBanner.banner.sale_int_id}) 
        }

    }
    
    useEffect(()=>{
        
        if(directo.order_id != null){
            localStorage.setItem("orden_boceto",directo.order_id)
            window.open(`/pago?draft=${directo.order_id}&origin=channel`,"_blank") 
            
        }
        
    },[directo.order_id]) 
    
    const [appKey, setAppKey] = useState(Math.random());
    
    return(<>
        
            <Navbar />
            
        
        
        <div  key={appKey}  className="relative flex flex-col lg:flex-row w-full">
                <div className="w-full fixed lg:static lg:w-2/3 z-50 lg:!z-0" ref={headerRef}>
                        {
                        (streamming?.providers[0]?.provider_name == "MILLICAST")
                        ?
                            <Millicast millicast_account_id={streamming.chsp_txt_url} className="h-full" millicast_stream_name={streamming.chsp_txt_code}></Millicast>
                        :
                            <JWStreamPlayer
                                key={`player-${streamming.channel_id}-${imgStreamingEspera}`}
                                channelID={streamming.chsp_txt_custom_id == null ? "64EyiyBU" : streamming.chsp_txt_custom_id}
                                poster={ imgStreamingEspera }
                                cargado={jwObject.scriptCargado1 && jwObject.scriptCargado2}
                                className="w-full z-[100]"
                                
                            />
                        }
                            
                        
                </div>
                <div className="w-full lg:w-1/3 lg:relative  " ref={contentRef}>
                        <Slido
                                key={`chat-${streamming.channel_id}-${imgStreamingEspera}`}
                                src={streamming.chat_url}
                                datos={objetoSlido}
                                className="w-[100%] h-full"
                                estado={canal.cargando}
                                
                        />
                </div>
        </div>
            
        {
        (permisoInstructor) ?
            <div className="flex-wrap w-[100%] px-[1rem] md:px-[10%] 2xl:container-extraLarge font-sans">
                <BannerInstructor
                tools={saleTools.tools}
                periods={saleTools.periods.mapped}
                activarBanner={activarBanner}
                />
            </div>
        :
        (isBannerActive) ?
        <div className="flex-wrap w-[100%] px-[1rem] md:px-[10%] 2xl:container-extraLarge font-sans">
            <BannerPromocional
                titulo={saleBanner.banner.trans_txt_title_sale}
                precio={saleBanner.banner.trans_txt_desc_prom_sale}
                precioTachado={saleBanner.banner.price_cat_txt_name_lng}
                descripcion={saleBanner.banner.trans_txt_title_sale}
                img={saleBanner.banner.media_txt_url}
                boton={setearOrden}
            />
        </div> : ""
        }
        <div className="flex-wrap w-[100%] px-[1rem] py-[40px]  md:px-[10%] 2xl:container-extraLarge font-sans">
            <Listas obj={listasReproduccion} idCanal={idCanal}  imgStreamingEspera={imgStreamingEspera}  instructor={instructor}/>
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] pb-[40px] md:px-[10%] 2xl:container-extraLarge font-sans">
            <Valoraciones 
                obj={canal.valoraciones} 
                calificacion={canal.calificacion} 
                idCanal={idCanal} 
                sessionId={sessionId}
            />
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] md:pb-[40px] md:px-[10%] 2xl:container-extraLarge font-sans">
            <Resenas 
                obj={resenas}  
                idCanal={idCanal} 
                instructor={instructor}
            />
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] pb-[20px] md:px-[10%] 2xl:container-extraLarge font-sans">
            <Preguntas obj={preguntasRespuestas} canal={canal} instructor={instructor} /> 
        </div>
        <div className="pb-[20px]">
            <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')} />
        </div>      
        <AvisoLegal/>
        <Footer/>
    </>)
}

export default Canal  