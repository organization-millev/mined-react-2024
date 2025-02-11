import React, { useState,useEffect } from 'react';
import YunoPay from '../common/Pasarelas/Yuno/Yuno'
import {useYuno} from '../../hooks/useYuno'
import {useBinance} from '../../hooks/useBinance'
import {useNuvei} from '../../hooks/useNuvei'
import {usePagos} from '../../hooks/usePagos'


import YunoItem from './yunoItem/yunoItem'
import BinancePayItem from './binancePayItem/binancePayItem'
import NuveiPayItem from './NuveiPayItem/NuveiPayItem'
import ResumenCompra from './resumenCompra/resumenCompra'
import CarritoFinalModal from '../common/CarritoFinalModal/CarritoFinalModal'
import Modal from '../common/Modal/Modal'

import Navbar from '../Navbar/Navbar'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal';
import Footer from '../Footer/Footer';
import { useLoading } from '../../providers/LoadingContext';
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const Pagos = () => {
    
    const { t } = useTranslation();
    const { showLoadingForAWhile } = useLoading();
    useEffect(() => {
        showLoadingForAWhile();
    }, []);
    const navigate = useNavigate();
    const {yunoCliente,yunoSesion,yunoPay,obtenerClienteYuno,obtenerSesion,obtenerPay} = useYuno()
    const {binanceOrden,obtenerOrden,binanceStatus,obtenerStatus} = useBinance()
    const {nuveiOrden,obtenerOrdenNuvei} = useNuvei()
    const {orden,getOrden} = usePagos()
    
    const [estadoPago,setEstadoPago] = useState("");
    const [estadoYuno,setEstadoYuno] = useState(""); 
    const [resultadoPay,setResultadoPay] = useState("");
    
    const [isOpenYuno,setIsOpenYuno] = useState(false)
    const [isOpenBinance,setIsOpenBinance] = useState(false)
    const [yunoPagoSeleccionado,setYunoPagoSeleccionado] = useState(false)
    const [yunoCheckOut,setYunoCheckOut] = useState(null)
    const [showYuno,setShowYuno] = useState(false)
    const [showBinance,setShowBinance] = useState(false)
    const [showNuvei,setShowNuvei] = useState(false)
    const [isOpenNuvei,setIsOpenNuvei] = useState(false)
    const [checkear,setcheckear] = useState(false)
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    
    const [mostrarModalFinal,setMostrarModalFinal] = useState(false)
    const [mensajeModalFinal,setMensajeModalFinal] = useState({
        titulo:"",
        mensaje:""
    }) 
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const draft = queryParams.get('draft'); 

    const order_draft = localStorage.getItem("orden_boceto")
    
    useEffect(()=>{
        
        if(order_draft != draft){
            navigate('/carrito', { replace: true })
        }
        
    },[])
    
    const yunoFunciones = {
        
        accionPago : (oneTimeToken,checkoutsession) => {
            
            if(yunoSesion.error == null && yunoSesion.mensaje != null){
               obtenerPay(checkoutsession,oneTimeToken,yunoSesion.data.merchant_order_id,order_draft) 
            }
            
        },
        accionResultado : (data) => {
            setEstadoYuno(data)
        },
        accionSelector : (data) => {
            setYunoPagoSeleccionado(true)
        },
        accionError : (data) => {
            if(data == "CANCELED_BY_USER"){
                resultado(data)
            }
            else{
                resultado("ERROR")
            }
        }
    }
    
    const handleClickOpenYuno = () => {
        setIsOpenYuno(!isOpenYuno)
        setShowBinance(false)
        setShowNuvei(false)
    }
    
    const handleClickOpenBinance = () => {
        setIsOpenBinance(!isOpenBinance)
        setShowYuno(false)
        setShowNuvei(false)
        setShowBinance(true)
    }
    
    const handleClickOpenNuvei = () => {
        setIsOpenNuvei(!isOpenNuvei)
        setShowYuno(false)   
        setShowBinance(false)
        setShowNuvei(true)
    }

    const handleClickPayYuno = () => {
        
        setShowYuno(true)
    }
    
    const pasarelaCerrar = () => {
        setShowYuno(false)
        setShowBinance(false)
        setShowNuvei(false)
        setIsOpenYuno(false)
        setIsOpenBinance(false)
        setIsOpenNuvei(false)
    }
    
    const mostrarStatusFinal = (status) => {

        let estado = ""

        switch (status) {
            case "accepted" :
                estado = "PENDING"
                break;
            case "completed" :
                estado = "SUCCESS"
            case "pending":
                estado = "BINANCEPENDING";
                break;
            default:
                estado = "ERROR"
                break;
        }
        
        resultado(estado)
        
    }
    
    useEffect(() => {
        if (isOpenYuno) {
          obtenerClienteYuno();
          setYunoPagoSeleccionado(false)
        }
    }, [isOpenYuno]);
    
    useEffect(()=>{
            
        if(yunoCliente.data.id != null){
            obtenerSesion(yunoCliente.data.id,order_draft)
        }
        else if (yunoCliente.error != null){
           resultado("ERROR") 
        }
        
    },[yunoCliente])
    
    useEffect(()=>{
        if (yunoSesion.error != null){
           resultado("ERROR") 
        }
    },[yunoSesion])
    
    useEffect(()=>{
        if(binanceOrden.error != null){
           resultado("ERROR")  
        }
    },[binanceOrden])
    
    useEffect(()=>{
        if(nuveiOrden.error != null){
           resultado("ERROR")  
        }
    },[nuveiOrden])
    
    
    
    useEffect(()=>{
      if (isOpenBinance) {
          obtenerOrden(language_code,order_draft) 
      }  
    },[isOpenBinance])
    
    useEffect(()=>{
      if (isOpenNuvei) {
          obtenerOrdenNuvei(order_draft) 
      }  
    },[isOpenNuvei])
    
    useEffect(()=>{
        
        if(estadoYuno != ""){
            if(estadoYuno == "SUCCEEDED" && yunoPay.data.order_status == "completed"){
               resultado(estadoYuno) 
            }
            else if(estadoYuno == "SUCCEEDED" && yunoPay.data.order_status == "accepted"){
               resultado("PENDING") 
            }
            else if (estadoYuno == "SUCCEEDED" && yunoPay.data.order_status == "error"){
               resultado("PENDING") 
            }
            else if (estadoYuno == "SUCCEEDED" && yunoPay.data.order_status == "sent"){
               resultado("PENDING") 
            }
            else{
               resultado("ERROR")  
            }
        }
        
        
        
    },[estadoYuno])
    
    
    useEffect(()=>{
        getOrden()
    },[])
    
    useEffect(()=>{

        if(!orden.cargando && orden.estado != "active" && orden.mensaje != null){

            localStorage.setItem("orden_boceto",null)
            navigate('/carrito', { replace: true }) 
            setMostrarModalFinal(false)
        }
        
    },[orden])
    
    const cerrarModal = () => {
        setMostrarModalFinal(false)
        localStorage.setItem("orden_boceto",null)
        if( estadoPago != "BINANCEPENDING"){
            navigate('/carrito', { replace: true }) 
        }
        setEstadoPago("")
        
    }
    
    const resultado = (status) => {
        if(status === "ERROR"){
            setIsOpenYuno(false)
            setShowYuno(false)
            setEstadoPago("ERROR")
            setMostrarModalFinal(true)
            setMensajeModalFinal({
                titulo:t("shopBannerTitleBad"),
                mensaje:t("shopBannerMessageBad")
            })
        }
        if(status == "CANCELED_BY_USER"){
            setIsOpenYuno(false)
            setShowYuno(false) 
        }
        else{
            
            if (status == "PENDING"){
                setIsOpenYuno(false)
                setShowYuno(false)
                setEstadoPago("PENDING")
                setMostrarModalFinal(true)
                setMensajeModalFinal({
                    titulo:t("shopBannerTitleAccepted"),
                    mensaje:t("shopBannerMessageAccepted")
                })
            }
            
            else if (status == "BINANCEPENDING"){
                setIsOpenYuno(false)
                setShowYuno(false)
                setEstadoPago("BINANCEPENDING")
                setMostrarModalFinal(true)
                setMensajeModalFinal({
                    titulo:t("shopBannerTitlePending"),
                    mensaje:t("shopBannerMessagePending")
                })
            }

            else if(status == "SUCCESS" || status == "SUCCEEDED"){
                setIsOpenYuno(false)
                setShowYuno(false)
                setEstadoPago("SUCCESS")
                setMostrarModalFinal(true)
                setMensajeModalFinal({
                    titulo:t("shopBannerTitleComplete"),
                    mensaje:t("shopBannerMessageComplete")
                })
                
            }
            
        }
    }
    
    useEffect(()=>{
        
        
        if(!yunoPay.cargando && yunoPay.mensaje != null){
            setResultadoPay(yunoPay)
        }
        
    },[yunoPay])
    
    useEffect(()=>{
        
        
        if(!binanceStatus.cargando && binanceStatus.mensaje != null && binanceStatus.error == null){
            setResultadoPay(binanceStatus)
        }
        
    },[binanceStatus])
    
    
    return(<>
        <Navbar  logoAlt="Logo"/>
        <div className="min-h-[calc(100vh-120px)]">
            <div className="semi-full-container dark:text-white flex flex-col gap-3 mt-[60px]">
                <span className="text-3extra font-semibold">{t('finalizaCompra')}</span>
                <p className="text-largeB">{t('adquiereHerramienta')} </p>
            </div>
            <div className="semi-full-container dark:text-white mt-[30px] mb-[30px]">
                <span className="text-large">{t('metodoPago')} </span>
                <div className="w-full grid grid-row-flow-dense lg:grid-cols-2 mt-2 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="w-full flex flex-col">
                            <YunoItem 
                            isOpenBinance={isOpenBinance} 
                            isOpenYuno={isOpenYuno} 
                            isOpenNuvei={isOpenNuvei}
                            pagoSeleccionado={yunoPagoSeleccionado}
                            onClickItem={handleClickOpenYuno} onClickPay={handleClickPayYuno} cargandoYuno={yunoSesion.cargando} />
                            
                            <BinancePayItem 
                            isOpenBinance={isOpenBinance} 
                            isOpenYuno={isOpenYuno}
                            isOpenNuvei={isOpenNuvei}
                            onClickItem={handleClickOpenBinance}
                            cargandoBinance = {binanceOrden.cargando}
                            dataBinance = {binanceOrden.data}
                            errorBinance = {binanceOrden.error || binanceStatus.error}
                            binanceStatus = {binanceStatus}
                            checkstatus = {obtenerStatus}
                            accionError = {pasarelaCerrar}
                            accionFinal = {mostrarStatusFinal}
                            checkeandoEstado={checkear}
                            />
                            
                            <NuveiPayItem 
                            isOpenBinance={isOpenBinance} 
                            isOpenYuno={isOpenYuno}
                            isOpenNuvei={isOpenNuvei}
                            onClickItem={handleClickOpenNuvei}
                            cargandoNuvei = {nuveiOrden.cargando}
                            dataNuvei = {nuveiOrden.data}
                            errorNuvei = {nuveiOrden.error}
                            accionError = {pasarelaCerrar}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <ResumenCompra orden={orden} />
                    </div>
                </div>
            </div>
        </div>
        <AvisoLegal/>
        <Footer/>
        <YunoPay checkoutsession={yunoSesion.data.checkout_session} pais={yunoCliente.data.country}
        AccionPago={yunoFunciones.accionPago} AccionResultado = {yunoFunciones.accionResultado}
        AccionSelector={yunoFunciones.accionSelector} AccionError={yunoFunciones.accionError}
        contenedorMedios=".Yuno-container-medios" abrirPasarela={showYuno} YunoResultado={yunoPay} /> 
        <Modal show={mostrarModalFinal} className="modal-size-xl" showClose={false} center={false} >
            <CarritoFinalModal titulo={mensajeModalFinal.titulo} mensaje={mensajeModalFinal.mensaje} tipo={estadoPago} orden={orden} opsdate={resultadoPay}  /> 
            <Modal.Footer>
                <button className="rounded-full boton-primario text-medium " onClick={cerrarModal}> {t("Aceptar")} </button>
            </Modal.Footer>
        </Modal>
    </>)
}
 
export default Pagos