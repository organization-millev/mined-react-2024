import React, { useState , useEffect} from 'react';
import FlechaAbajo from '../iconos/keyboard_arrow_up'; 
import Navbar from '../Navbar/Navbar'; 
import BannerCarousel from '../BannerCarousel/BannerCarousel'; 
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores'; 
import CardKPICurso from '../common/CardKPICurso/CardKPICurso'; 
import DetalleProductoAcademia from '../common/DetalleProductoAcademia/DetalleProductoAcademia'; 
import CardPrecioCurso from '../common/CardPrecioCurso/CardPrecioCurso'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal'; 
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
import CardCurso from '../CardCurso/CardCurso'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import CardAcademia from '../CardAcademia/CardAcademia'; 
import Footer from '../Footer/Footer'; 
//import CarouselCurso from '../CarouselCurso'; 

import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { useEcommerceTools } from '../../hooks/ecommerce/useEcommerceTools';
import { useAlert  } from '../../providers/AlertContext'; 
import { useLoading } from '../../providers/LoadingContext';
import { useCarrito } from '../../hooks/useCarrito'; 


const HerramientaNoComprada = () => {
  const { showLoadingForAWhile } = useLoading();
  useEffect(() => {
    showLoadingForAWhile();
  }, []);
  
  const { t } = useTranslation();
  const { warn, success } = useAlert();
  
  const { idTool } = useParams();
  const {tools,products,getProductDescription,getProductDetails,getBeneficios,filterMedia,productsCargando,productsMensaje} = useEcommerceTools( idTool );
  const {agregar,eliminar,activarAgregar,activarEliminar,carrito,getCarrito} = useCarrito()
  const navigate = useNavigate();
 
  const productDescription = getProductDescription();
  const productDetails = getProductDetails();
  const beneficios = getBeneficios(); 
  const [warningShown, setWarningShown] = useState(false);
  const [redirectAfter,setRedirectAfter] = useState(null);
  const [selectedCart,setSelectedCart] = useState(false)
  
  useEffect(() => {
    // Verifica primero que productDetails exista y sea un arreglo
    if (!Array.isArray(productDetails) || productDetails.length === 0) {
      
      return; // Detiene la ejecución del useEffect si no hay datos válidos
    }

    // Verificar que cada elemento del array tenga precios no nulos
    const hasInvalidPrices = productDetails.some(detail => 
      detail.prices.some(price => 
        price.price_id === null || price.category === null || price.amount === null
      )
    );
    
    
    if (hasInvalidPrices && !warningShown) {
      setWarningShown(true); // Asegura que la advertencia solo se muestre una vez
      warn("No se encontraron productos válidos debido a datos incompletos o faltantes.");
      setTimeout(() => {
        navigate(-1);
      }, 2000); // Navega de regreso después de un retraso de 2 segundos
    }
    
    
  }, [productDetails]);
  
  
  const EliminarDelCarrito = (categoria) => {

    let params = {product_id:products[0].product_id,category_id:categoria}
    if(selectedCart){
      params.cart_id = selectedCart.id_item
    }
    
    activarEliminar(params)
    
  }
  
  const AgregarCarrito = (categoria,redirect) => {

    let params = {product_id:products[0].product_id,category_id:categoria}
    if(selectedCart){
      params.cart_id = selectedCart.id_item
    }
    
    activarAgregar(params)
    
    setRedirectAfter(redirect)
    
  }
  
  useEffect(()=>{
    if(!agregar.cargando && agregar.mensaje != null && agregar.error == null){
            
        getCarrito()
    }
    else if(!agregar.cargando && agregar.error != null){
        
    }
  },[agregar])
  
  useEffect(()=>{
    if(!eliminar.cargando && eliminar.mensaje != null && eliminar.deleted_item != null ){
            
        getCarrito()
    }
    else if(!eliminar.cargando && eliminar.error != null){
        
    }
  },[eliminar])
  
  useEffect(()=>{
      if(!carrito.cargando && products[0] != null){
        setSelectedCart(carrito.items.find(items => items.id_producto == products[0].product_id))
        if(redirectAfter == 'direct'){
          navigate('/carrito')
        }
      }

  },[carrito,products])
  
  useEffect(()=>{
    
    if(!products){
      
      navigate('/home')
    }
    
  },[products])
  
  useEffect(()=>{
    getCarrito()
  },[])
  

  return (
    <>
        <Navbar  logoAlt="Logo"/>

        <div className="lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 justify-center mx-auto pb-[40px] lg:py-[40px]">
            
          {filterMedia().map(item => (
            <div key={item.prod_int_id} className="mb-4">
              {item.type === "image" ? (
                <img
                  src={item.mediaUrl}
                  className="w-full h-[219px] lg:h-[662px] object-cover lg:rounded-[20px]"
                  alt="Default"
                />
              ) : (
                <iframe
                  src={item.mediaUrl}
                  className="!w-full h-[219px] lg:h-[662px] object-cover lg:rounded-[20px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Video ${item.prod_int_id}`}
                ></iframe>
              )}
            </div>
          ))}
        </div>
        <div className="px-[5%] lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 flex justify-center mx-auto gap-4 flex-col md:flex-row lg:gap-8 mb-[40px]">
            {productDescription.map((product, index) => (
              <DetalleProductoAcademia
                key={index}
                logo={product.mediaLogoDescription}
                subtitle={product.translation[0]?.subtitle}
                itemNoComprada={product.product_id}
                description={product.translation[0]?.description}
              />
            ))}
            
            {productDetails.map((details, index) => (
              <CardPrecioCurso
                key={index}
                prices={details.prices}
                fondoGradient={details.keyColorCssGradient}
                accionEliminar = {EliminarDelCarrito}
                accionAgregar = {AgregarCarrito}
                cargando={(agregar.cargando || carrito.cargando || eliminar.cargando)}
                itemSeleccionado={selectedCart}
                
              />
            ))}
        </div>
        
        <div className="px-[5%] lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 justify-center mx-auto mb-[20px]">
          <CardKPICurso items={beneficios.flat()} />
        </div>
        
          <NuestrasHerramientas titulo={t('nuestrasHerramientas')}  />
       
      
        <AvisoLegal/>
        <Footer/>
    </>
  );
};

export default HerramientaNoComprada;