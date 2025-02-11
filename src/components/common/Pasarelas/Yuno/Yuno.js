import React, {  useEffect,useState,useRef  }  from 'react';
import ReactDOM from 'react-dom';

const PUBLIC_KEY = process.env.REACT_APP_YUNO_PUBLIC_KEY;
const SDK_REPO = process.env.REACT_APP_YUNO_SDK;

const YunoPay = ({checkoutsession,contenedorMedios,lenguaje = "es",
    onLoading = () =>{},renderizado = {tipo:"modal",elemento:""},
    AccionPago = () =>{},
    AccionResultado = () =>{},
    AccionError = () =>{} ,
    AccionSelector = () => {},
    abrirPasarela = false,
    YunoResultado,
    pais = "PE",
}) => {
    /* eslint-disable no-undef */
    const [selectedMethod,setSelectedMethod] = useState(false)
    const [yunoEnd,setYunoEnd] = useState(false)
    const yunoRef = useRef(null);
    
    useEffect(()=>{

        let yunos = document.getElementById("yuno_script_loaded")
        
        if(yunos  == undefined){
            const scriptYuno = document.createElement('script');
            scriptYuno.src = SDK_REPO
            scriptYuno.id="yuno_script_loaded"
            scriptYuno.onload = () => { 
                yunoRef.current = Yuno.initialize(PUBLIC_KEY);
                
            } 
            scriptYuno.onerror=(error)=>{
                
            }
            
            document.body.appendChild(scriptYuno);
        }
        else{
            yunoRef.current = Yuno.initialize(PUBLIC_KEY);
        }
        
        
        return () => {
            
            let yunos = document.getElementById("yuno_script_loaded")

        }
        
    },[])
    
    useEffect(()=>{
        try{
            if(checkoutsession && yunoRef.current != null){
                yunoRef.current.startCheckout({
                    checkoutSession:checkoutsession,
                    elementSelector:contenedorMedios,
                    countryCode: pais,
                    language: lenguaje,
                    showLoading: true,
                    issuersFormEnable: true,
                    showPaymentStatus: true,
                    keepLoader: true,
                    automaticallyUnmount: true,
                    onLoading: (args) => {
                        onLoading()
                    },
                    renderMode: {
                        type: renderizado.tipo,
                        elementSelector: renderizado.elemento,
                    },
                    card: {
                        type: "step",
                        styles: '',
                        cardSaveEnable: false,
                        texts: {}
                      },
                    yunoCreatePayment(oneTimeToken) {
                        yunoRef.current.showLoader()
                        AccionPago(oneTimeToken,checkoutsession)
                        
                    },
                    yunoPaymentMethodSelected(data) {
                        if(data != undefined){
                            setSelectedMethod(true)
                            AccionSelector(data)
                        }
                        
                    },
                    yunoPaymentResult(data) {
                        setYunoEnd(data)
                        yunoRef.current.hideLoader()
                    },
                    yunoError: (error) => {
                        
    
                        AccionError(error)
                        yunoRef.current.hideLoader()
                        
                    },
    
                })
                setSelectedMethod(false)
                yunoRef.current.mountCheckout()
            }
        }
        catch{
            
        }

        
    },[checkoutsession])
    
    useEffect(()=>{
        
        if(abrirPasarela && checkoutsession && selectedMethod){
            try{
                yunoRef.current.startPayment()
            }
            catch(error){
                
            }
        }
        
    },[abrirPasarela,selectedMethod])
    
    
    useEffect(()=>{
        
        if(abrirPasarela && checkoutsession && selectedMethod && YunoResultado.cargando){
            yunoRef.current.showLoader()
        }
        
        if(YunoResultado.data.order_status != null && YunoResultado.mensaje != null){
            yunoRef.current.continuePayment({ showPaymentStatus: true })
        }
        
        
    },[YunoResultado])
    
    useEffect(()=>{
        
        if(yunoEnd){
           AccionResultado(yunoEnd)
           setYunoEnd(false)
        }
        
        
    },[yunoEnd])
}

export default YunoPay
