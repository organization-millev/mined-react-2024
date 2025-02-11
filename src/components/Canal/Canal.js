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
import { useAlert } from '../../providers/AlertContext'; 
import {useNavigate} from 'react-router-dom';
import { obtenerInfoDispositivo } from '../../utils/funciones'; 

const JWStreamPlayerClasses="w-[100%]  lg:w-[70%]"
const SlidoClasses="w-[100%] lg:w-[30%] lg:h-[auto]"

const Canal = () => {
    const { showLoadingForAWhile } = useLoading();
    useEffect(() => {
      showLoadingForAWhile(5000);
    }, []);
    const navigate = useNavigate();
    const { warn, success } = useAlert();

    const { roleUser, userData, isEducator } = useUser();
    
    
    
    
    const [ permisoInstructor , setPermisoInstructor ] = useState();
    
    /*useEffect(() => {
        const hasReloaded = localStorage.getItem('hasReloaded');
    
        if (!hasReloaded || hasReloaded === 'false') {
            const reloadPage = () => {
                localStorage.setItem('hasReloaded', 'true');
                window.location.reload();
            };
            const timer = setTimeout(() => {
                reloadPage();
            }, 1);
            return () => clearTimeout(timer);
        }
    }, []);*/


    const [loadedStream,setLoadedStream] = useState(false)
    
    
    const { nameProgram , nameCurso , idCanal: pidCanal , idSesion: pidSesion } = useParams();
    
    const [ imgStreamingEspera , setImgStreamingEspera ] = useState([]);
    const [ imgStreamingEsperaMini , setImgStreamingEsperaMini ] = useState([]);
    
    const location = useLocation();
   
    const sessionId =  parseInt(pidSesion) ;
    const idCanal = parseInt(pidCanal) ;
    
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const { academias, getIdsByName } = useAcademia();
    const ids = getIdsByName(nameProgram, nameCurso , language_code);
    
    
    
    const { GetHorario, horario } = useHorario();
    const { getImgStreamingEspera ,getFilesCanal ,sessionList} = useLiveSessions();
    const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
    const [ instructor, setInstructor] = useState([]);
    
    const [ courseId, setCourseId] = useState();

    useEffect(() => {
        if (ids && academias.length > 0) {
            GetHorario(ids.courseId);
            setCourseId(ids.courseId);
        }
    }, [nameCurso, academias]);
    
   
    
    
    
    
    
    useEffect(() => {
        if (horario && horario.length > 0) {
            const channel = horario.find(channel => channel.chnlIntId == idCanal);
            const instructorInfo = buscarSesionPorId(channel, sessionId);
            if (instructorInfo) {
                setInstructor(instructorInfo);
            } else {
                
            }
            
            if (channel) {
                const files = channel.files || [];
                const streamingEsperaImage = files.find(file => file.fileTxtTag === "img_streaming_espera"); //&& file.device_type === tipoDispositivo
                setImgStreamingEspera(streamingEsperaImage ? streamingEsperaImage.fileTxtUrl : '');
                
                const streamingEsperaImageMini = files.find(file => file.fileTxtTag === "minedtv_miniatura");//&& file.device_type === tipoDispositivo
                setImgStreamingEsperaMini(streamingEsperaImageMini ? streamingEsperaImageMini.fileTxtUrl : '');
            }
        }
    }, [horario]);

    const { t } = useTranslation();

    const {AgregarScriptsJW,jwObject} = useJWPlayer();
    
    const {GetLiveStreamming,liveStreamming} = useLiveStreamming();
    const [usrIntIds, setUsrIntIds] = useState(null);
    const [userId, setUserId] = useState([]);
   
    useEffect(() => { 
        GetLiveStreamming(idCanal); 
    }, []);
    
    useEffect(() => {
        if(userData && userData.user_id){
            setUserId(userData.user_id);
        }
    },[userData])
    
    const compareId = (usrIntIds,userId,isEducator) => {
        if (!isEducator) {
            return false;
        }
        if(Array.isArray(usrIntIds)){
            return usrIntIds.includes(userId);
        } else {
            return usrIntIds == userId;
        }
        
    }
    
    const handleCompare = () => {
        const result = compareId(usrIntIds, userId,isEducator);
        setPermisoInstructor(result);
    };
    /*console.log('permisoInstructor',usrIntIds)
    console.log('permisoInstructor',userId)
    console.log('permisoInstructor',isEducator)
    console.log('permisoInstructor',permisoInstructor)*/
    
    useEffect(() => {
        if (usrIntIds && userId) {
            handleCompare();
        }
    }, [usrIntIds, userId]);
    
    
    const {saleBanner,getBanner,saleTools,saleDeactivate,getSaleTools,saleSet,getSaleSet,getSaleDeactivate,getBannerStatus} = useSaleBanner(idCanal)
    const [isBannerActive,setIsBannerActive] = useState(false)
    const [isBannerActiveFromDB,setIsBannerActiveFromDB] = useState(false)
    useEffect(()=>{
        setIsBannerActiveFromDB(getBannerStatus) 
    },[])
    
    useEffect(() => {
        const checkBannerStatus = async () => {
            const isBannerActiveInDB = await getBannerStatus(); 
    
            if (isBannerActiveInDB) {
                getBanner();
            }
            else{
                // setIsBannerActive(false) temporal, sera removido cuando se agregue la funcionalidad del s3 
            }
        };
    
        checkBannerStatus();
    }, [isBannerActiveFromDB]);
    
    useEffect(()=>{
        if(permisoInstructor){
            getSaleTools()
        }
    },[permisoInstructor])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(!permisoInstructor){
                setIsBannerActiveFromDB(getBannerStatus)  
            }
           
        }, 60000);
    
        return () => clearInterval(interval);
    }, [permisoInstructor]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (saleBanner?.banner && Object.keys(saleBanner.banner).length > 0) {
                let timestamp_end = Date.parse(saleBanner.banner.sale_dt_end + "Z");
    
                if (timestamp_end < Date.now()) {
                    setIsBannerActive(false);
                }
            }
        }, 1000);
    
        if (!saleBanner?.banner || Object.keys(saleBanner.banner).length === 0) {
            setIsBannerActive(false);
            clearInterval(interval);
            return;
        } else {
            setIsBannerActive(true);
        }
    
        return () => clearInterval(interval);
    }, [saleBanner.cargando, saleBanner.banner]);

    
    const activarBanner = (price_id,period_id) => {
        
        if(permisoInstructor){
            let params = {price_id:price_id,period_id:period_id,channel_id:idCanal}
            getSaleSet(params)
        }

    }
    
    useEffect(()=>{
        if(!saleSet.cargando && saleSet.mensaje != null && saleSet.error == null){
           getBanner() 
        }

    },[saleSet.results])
    const [cargandoDesactivar,setCargandoDesactivar]=useState(false)
    const desactivarBanner = () => {
        if(permisoInstructor){
            let params = {channel_id:idCanal,sale_id:saleBanner.banner.sale_int_id}
            getSaleDeactivate(params)
            setCargandoDesactivar(true)
        }
         
    }
    
    useEffect(()=>{
        if(!saleDeactivate.cargando && saleDeactivate.mensaje != null && saleDeactivate.error == null){
           getBanner() 
           setCargandoDesactivar(false)
        }

    },[saleDeactivate.banner,saleDeactivate.cargando])
    
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
        if(extractedUsrIntIds.length === 1){
            setUsrIntIds(extractedUsrIntIds[0]);
        }else{
            setUsrIntIds(extractedUsrIntIds);
        }
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
            return null;
        }
        
        for (const day of channel.days) {
            if (day.sessions) {
                for (const session of day.sessions) {
                    if (session.sessIntId == sessIntId) {
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
                <div className="w-full fixed lg:static lg:w-2/3 z-50 lg:!z-[1] " ref={headerRef}>{/*z-50 lg:z-[50]*/}
                        {
                        (streamming?.providers[0]?.provider_name == "MILLICAST")
                        ?
                            (imgStreamingEspera && imgStreamingEspera != '') ? 
                            <Millicast millicast_account_id={streamming.chsp_txt_url} poster={ imgStreamingEspera } className="h-full" millicast_stream_name={streamming.chsp_txt_code}></Millicast>
                            : 
                            <div className="aspect-video bg-gris-claro dark:bg-color-dark2 animate-tw-pulse">
                            
                            </div>
                        :
                        ((streamming?.providers[0]?.provider_name == "JW PLAYER" ) ?
                        <>
                            <JWStreamPlayer
                                key={`player-${streamming.channel_id}`}
                                channelID={streamming.chsp_txt_custom_id == null ? "" : streamming.chsp_txt_custom_id}
                                poster={ imgStreamingEspera }
                                cargado={jwObject.scriptCargado1 && jwObject.scriptCargado2}
                                className="w-full"
                                streamReady={setLoadedStream}
                            />
                        </>:
                        <div className="aspect-video bg-gris-claro dark:bg-color-dark2 animate-tw-pulse">
                            
                        </div>)
                        }
                            
                        
                </div>
                <div className="w-full lg:w-1/3 lg:relative  " ref={contentRef}>
                        {(streamming.chat_url != null && !canal.cargando ) ?
                        <Slido
                                key={`chat-${streamming.channel_id}`}
                                src={streamming.chat_url}
                                datos={objetoSlido}
                                className="w-[100%] h-full"
                                estado={canal.cargando}
                                
                        />:<div className="bg-gris-claro dark:bg-color-dark2 animate-tw-pulse h-auto">
                            
                        </div>}
                </div>
        </div>
            
        {
        (permisoInstructor) ?
            <div className="flex-wrap w-[100%] px-[1rem] md:px-[10%] 2xl:container-extraLarge font-sans">
                <BannerInstructor
                tools={saleTools.tools}
                periods={saleTools.periods.mapped}
                activarBanner={activarBanner}
                bannerActive={isBannerActive}
                saleBanner={saleBanner.banner}
                cargando={saleBanner.cargando || saleSet.cargando || saleDeactivate.cargando || cargandoDesactivar}
                desactivar={desactivarBanner}
                />
            </div>
        :
        (isBannerActive) ?
        <div className="flex-wrap w-[100%] px-[1rem] md:px-[10%] 2xl:container-extraLarge font-sans relative">
            <BannerPromocional
                titulo={saleBanner.banner.trans_txt_title_sale}
                precio={saleBanner.banner.trans_txt_desc_prom_sale}
                precioTachado={saleBanner.banner.price_cat_txt_name_lng}
                descripcion={saleBanner.banner.trans_txt_desc_sale}
                img={saleBanner.banner.media_txt_url}
                boton={setearOrden}
                cargando={saleBanner.cargando||directo.cargando}
            />
        </div> : ""
        }
        <div className="flex-wrap w-[100%] px-[1rem] py-[40px]  md:px-[10%] 2xl:container-extraLarge font-sans relative  ">
            <Listas obj={listasReproduccion} idCanal={idCanal}  imgStreamingEspera={imgStreamingEsperaMini}  instructor={instructor} permisoInstructor={permisoInstructor} sessionId={sessionId} idCurso={courseId}/>
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] pb-[40px] md:px-[10%] 2xl:container-extraLarge font-sans relative">
            <Valoraciones 
                obj={canal.valoraciones} 
                calificacion={canal.calificacion} 
                idCanal={idCanal} 
                sessionId={sessionId}
            />
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] md:pb-[40px] md:px-[10%] 2xl:container-extraLarge font-sans relative">
            <Resenas 
                obj={resenas}  
                idCanal={idCanal} 
                instructor={instructor}
                permisoInstructor={permisoInstructor}
            />
        </div>
        <div className="flex-wrap w-[100%] px-[1rem] pb-[20px] md:px-[10%] 2xl:container-extraLarge font-sans relative">
            <Preguntas obj={preguntasRespuestas} canal={canal} instructor={instructor} permisoInstructor={permisoInstructor}/> 
        </div>
        <div className="pb-[20px] relative z-0">
            <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')} />
        </div>      
        <AvisoLegal/>
        <Footer/>
    </>)
}

export default Canal  