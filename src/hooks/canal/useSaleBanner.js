import { useEffect, useState } from 'react';
import { apiLiveSaleGet,apiLiveSaleTools,apiLiveSaleSet,apiLiveSaleDeactivate } from '../../api/apiConfig';
import { useAlert } from '../../providers/AlertContext';
import {mapeoArrayItems} from '../../utils/funciones'
import { useTranslation } from 'react-i18next';

const BASE_URL = process.env.REACT_APP_CHANNEL_BUCKET

export const useSaleBanner = (channel_id) => {
    
    const { t } = useTranslation();
    const { warn, success } = useAlert();
    const [saleBanner,setSaleBanner] = useState(
        {
            banner:{},
            cargando:false,
            mensaje:false,
            error:null
        }
    )
    
    const [saleTools,setSaleTools] = useState(
        {
            tools:[],
            periods:{mapped:[],periods:[]},
            cargando:false,
            mensaje:false,
            error:null
        }
    )
    
    const [saleSet,setSaleSet] = useState({
            results:{},
            cargando:false,
            mensaje:false,
            error:null,
            params:{}
    })
    
    const [saleDeactivate,setSaleDeactivate] = useState({
            banner:{},
            cargando:false,
            mensaje:false,
            error:null,
            params:{}
    })
    
    
    const getBanner = () => {
        setTriggerSaleBanner(true)
    }
    
    const getSaleTools = () => {
        setTriggerSaleTools(true)
    }
    
    const getSaleSet = (params) => {
        setSaleSet(prevState => ({
            ...prevState,
            params:params
        }))
        setTriggerSaleSet(true)
    }
    
    const getSaleDeactivate = (params) => {
        setSaleDeactivate(prevState => ({
            ...prevState,
            params:params
        }))
        setTriggerSaleDeactivate(true)
    }
    
    const [triggerSaleBanner,setTriggerSaleBanner] = useState(false)
    const [triggerSaleTools,setTriggerSaleTools] = useState(false)
    const [triggerSaleSet,setTriggerSaleSet] = useState(false)
    const [triggerSaleDeactivate,setTriggerSaleDeactivate] = useState(false)
    
    const mapaPeriods = {
        stl_int_time:"label",
        stl_int_id:"value",
    }
    
    const {data:SaleBannerData,error:SaleBannerError,cargando:SaleBannerCargando,mensaje:SaleBannerMensaje} = apiLiveSaleGet(triggerSaleBanner,channel_id)
    useEffect(()=>{
        
         if(triggerSaleBanner){
            if(SaleBannerCargando){
                setSaleBanner(prevState => ({
                  ...prevState,
                    banner:{},
                    error: null,
                    cargando: SaleBannerCargando,
                    mensaje:null
                }));
            }
            else{
                if(SaleBannerMensaje != null){
                    
                    setTriggerSaleBanner(false)
                    setSaleBanner(prevState => ({
                      ...prevState,
                        banner:SaleBannerData.sale_banner,
                        error: SaleBannerError,
                        cargando: SaleBannerCargando,
                        mensaje:SaleBannerMensaje
                    }));
                    
                    if(SaleBannerError){
                        
                    }
                    
                    
                }
            }
        }
        
        
    },[SaleBannerData,SaleBannerError,SaleBannerCargando,SaleBannerMensaje])
    
    const {data:toolsData,error:toolsError,cargando:toolsCargando,mensaje:toolsMensaje} = apiLiveSaleTools(triggerSaleTools)
    useEffect(()=>{
        
         if(triggerSaleTools){
            if(toolsCargando){
                setSaleTools(prevState => ({
                  ...prevState,
                    tools:[],
                    periods:{mapped:[],periods:[]},
                    error: null,
                    cargando: toolsCargando,
                    mensaje:null
                }));
            }
            else{
                if(toolsMensaje != null){
                    
                    setTriggerSaleTools(false)
                    setSaleTools(prevState => ({
                      ...prevState,
                        tools:toolsData.tools,
                        periods:{mapped:[],periods:toolsData.periods},
                        error: toolsError,
                        cargando: toolsCargando,
                        mensaje:toolsMensaje
                    }));
                    
                    if(toolsError){
                        
                    }
                    else{
                        let mappedPeriods = mapeoArrayItems(toolsData.periods,mapaPeriods)
                        let periods = mappedPeriods.map((obj,ind)=>{
                            return {value: obj.value, label: obj.label + " " + t('minutes')}
                        }) 
                        
                        setSaleTools(prevState => ({
                          ...prevState,
                            periods:{mapped:periods,periods:toolsData.periods},
                        }));
                    }
                }
            }
        }
        
        
    },[toolsData,toolsError,toolsCargando,toolsMensaje])
    
    const {data:saleSetData,error:saleSetError,cargando:saleSetCargando,mensaje:saleSetMensaje} = apiLiveSaleSet(triggerSaleSet,saleSet.params)
    useEffect(()=>{
        
         if(triggerSaleSet){
            if(saleSetCargando){
                setSaleSet(prevState => ({
                  ...prevState,
                    results:{},
                    error: null,
                    cargando: saleSetCargando,
                    mensaje:null
                }));
            }
            else{
                if(saleSetMensaje != null){
                    
                    setTriggerSaleSet(false)
                    setSaleSet(prevState => ({
                      ...prevState,
                        results:saleSetData,
                        error: saleSetError,
                        cargando: saleSetCargando,
                        mensaje:saleSetMensaje
                    }));
                    
                    if(saleSetError){
                        
                        warn("an error happened while setting the banner, please try again")
                    }else{
                        success(t("saleBannerSetSuccess"))
                    }
                    
                    
                }
            }
        }
        
        
    },[saleSetData,saleSetError,saleSetCargando,saleSetMensaje])
    
    const {data:saleDeactivateData,error:saleDeactivateError,cargando:saleDeactivateCargando,mensaje:saleDeactivateMensaje} = apiLiveSaleDeactivate(triggerSaleDeactivate,saleDeactivate.params)
    useEffect(()=>{
        
         if(triggerSaleDeactivate){
            if(saleDeactivateCargando){
                setSaleDeactivate(prevState => ({
                  ...prevState,
                    banner:{},
                    error: null,
                    cargando: saleSetCargando,
                    mensaje:null
                }));
            }
            else{
                if(saleDeactivateMensaje != null){
                    
                    setTriggerSaleDeactivate(false)
                    setSaleDeactivate(prevState => ({
                      ...prevState,
                        banner:saleDeactivateData,
                        error: saleDeactivateError,
                        cargando: saleDeactivateCargando,
                        mensaje:saleDeactivateMensaje
                    }));
                    
                    if(saleDeactivateError){
                        
                        warn("an error happened while setting the banner, please try again")
                    }else{
                        success(t("saleBannerdeactivatedSuccess"))
                    }
                    
                    
                }
            }
        }
        
        
    },[saleDeactivateData,saleDeactivateError,saleDeactivateCargando,saleDeactivateMensaje])
    
    
    const getBannerStatus = async () => {

        try {
            const response = await fetch(`${BASE_URL}${channel_id}.status`);

            if (!response.ok) {
              return true
            }
        
            const data = await response.text();
            
            return parseInt(data) === 1 ? true : false; 
        
          } catch (error) {
            //temp
            return true
            // return false
          }
        
    }
    
    return {saleBanner,saleTools,saleSet,saleDeactivate,getBanner,getSaleTools,getSaleSet,getSaleDeactivate,getBannerStatus}
    
}