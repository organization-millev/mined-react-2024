import React, { useState , useEffect} from 'react';
import FlechaAbajo from '../iconos/keyboard_arrow_up'; 
import Navbar from '../Navbar/Navbar'; 
import BannerCarousel from '../BannerCarousel/BannerCarousel'; 
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores'; 
import CardsEducadores from '../CardsEducadores/CardsEducadores'; 
import CardVerMas from '../common/CardVerMas/CardVerMas';
import ListaCurso from '../common/ListaCurso/ListaCurso';
import CardKPICurso from '../common/CardKPICurso/CardKPICurso'; 
import DetalleProductoAcademia from '../common/DetalleProductoAcademia/DetalleProductoAcademia'; 
import CardPrecioCurso from '../common/CardPrecioCurso/CardPrecioCurso'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal'; 
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
//import CarouselCurso from '../CarouselCurso'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import CardAcademia from '../CardAcademia/CardAcademia'; 
import CardCurso from '../CardCurso/CardCurso'; 
  
import Footer from '../Footer/Footer'; 

import {useMediaQuery} from '../../hooks/useMediaQuery';
import { useParams, useNavigate } from 'react-router-dom';
import { useAcademia } from '../../providers/AcademiaContext';
import { useEcommerceProducts } from '../../hooks/ecommerce/useEcommerceProducts';
import { useCarrito } from '../../hooks/useCarrito';
import { useUser } from '../../providers/UserContext';
import { obtenerInfoDispositivo } from '../../utils/funciones';
import { TAG } from '../../utils/tag';
import { useTranslation } from 'react-i18next';
import { useAlert  } from '../../providers/AlertContext';
import { useLoading } from '../../providers/LoadingContext';

const reorderComponents = (components, order) => {
  // Crear un mapa de componentes para un acceso rápido
  const componentMap = {};
  components.forEach(item => {
    componentMap[item.key] = item.component;
  });

  // Generar la nueva lista de componentes ordenada
  return order.map(key => ({
    key: key,
    component: componentMap[key]
  }));
};

const AcademiaNoComprada = () => {
  const { showLoadingForAWhile } = useLoading();
  useEffect(() => {
    showLoadingForAWhile();
  }, []);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { nameProgram } = useParams();
  const [idProgram, setIdProgram] = useState();
  const [redirectAfter,setRedirectAfter] = useState(null);
  const [selectedCart,setSelectedCart] = useState(false)
  const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
  const { userData , isCourseType  , asynchronous } = useUser();
  const { getVistaAcademias,academias,GetAcademias , getIdsByName } = useAcademia();
  const { GetProducts,filterMedia,getProductDetails,getProductDescription,getBeneficios,filterToolsByProduct , productsData,productsCargando, products, getIdsTools}
  = useEcommerceProducts( idProgram );

  const {agregar,eliminar,activarAgregar,activarEliminar,carrito,getCarrito} = useCarrito()
  const [programsData, setProgramsData] = useState([]);
  const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
  //obtenr id de ruta
  useEffect(() => {
        if (academias && academias.length > 0 ) {
            const ids = getIdsByName(nameProgram, null , language_code);
            setIdProgram(ids.programId);
            setProgramsData(getVistaAcademias(ids.programId));
            GetProducts();
        }
  }, [ nameProgram,academias]);
  
  //
    
  const { warn, success } = useAlert();
  const productDescription = getProductDescription();
  const productDetails = getProductDetails();
  const beneficios = getBeneficios();
  //const herramientas = filterToolsByProduct();
  const [warningShown, setWarningShown] = useState(false);
  
  //const [ bannersForDisplay, setBannersForDisplay ] = useState([]);
  const isLg = useMediaQuery('(min-width: 1024px)');
  
  const tituloNuestrasHerramientas = isCourseType(asynchronous) ? (isLg ? t('herramientaParaAcademia')  : t('nuestrasHerramientas') ) : t('herramientaParaAcademia') ;
  const tituloCarouselAcademia = isCourseType(asynchronous) ? (isLg ? t('nuestrasAcademias') : t('academiasRecomendadas')) : t('nuestrasAcademias');
  
  
  //ordenar componentes segun academia
  const orderAsynchronous = ['C', 'B']; // Orden para Asincrónico
  const orderSynchronous = ['A', 'B', 'C']; // Orden para Sincrónico
  let components = [
    //{ key: 'A', component: <NuestrasHerramientas key={idsTools.join(',')} titulo={tituloNuestrasHerramientas} filter={true} ids={idsTools}/>  },
    { key: 'B', component: <CarouselAcademia tituloCarouselAcademia={tituloCarouselAcademia}/> },
    { key: 'C', component: <NuestrasHerramientas titulo={t('nuestrasHerramientas')}  filter={false}/> },
  ];
  
  if (academias && academias.length > 0) {
    components.push({
      key: 'A',
      component: (
        <NuestrasHerramientas key={`NuestrasHerramientas ${idProgram}`} titulo={tituloNuestrasHerramientas} filter={true} programId={idProgram}/>
      ),
    });
  }
     
  // Aplicar el orden basado en is_type_curse
  components = isCourseType(asynchronous)  ? reorderComponents(components, orderAsynchronous) : reorderComponents(components, orderSynchronous);
  
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
    getCarrito()
  },[])
  
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
      //
      if(!carrito.cargando && products[0] != null){
        setSelectedCart(carrito.items.find(items => items.id_producto == products[0].product_id))
        if(redirectAfter == 'direct'){
          navigate('/carrito')
          window.location.reload();
        }
      }

  },[carrito,products])
  
  useEffect(()=>{
    //
    if(products.length <= 0 && !productsCargando){
      
      navigate('/home')
    }
    
  },[products])
  
  useEffect(() => {
    // Verifica primero que productDetails exista y sea un arreglo
    if (!Array.isArray(productDetails) || productDetails.length === 0) {
      //
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
    
    //
  }, [productDetails]);
  
  return (
    <>
      <Navbar  logoAlt="Logo"/>
        
        <div className="lg:my-[40px] lg:px-[10%] 2xl:max-w-[1152px] 2xl:px-0 flex flex-col justify-center mx-auto">
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
        
        <div className="px-[5%] lg:px-[10%] 2xl:px-0 my-[16px] lg:my-[40px] flex gap-4 flex-col md:flex-row lg:gap-8 2xl:gap-9 2xl:max-w-[1152px] justify-center mx-auto">
          {productDescription.map((product, index) => (
            <DetalleProductoAcademia
              key={index}
              logo={product.mediaLogoDescription}
              subtitle={product.translation[0]?.subtitle}
              itemNoComprada={product.product_id}
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
        
        {beneficios.length > 0 && (
          <div className="px-[5%] lg:px-[10%] 2xl:px-0 my-[30px] lg:mb-[40px] 2xl:max-w-[1152px] justify-center mx-auto">
            <CardKPICurso items={beneficios.flat()} />
          </div>
        )}
        
        {productDescription.some(product => product.translation[0]?.description) && (
          <div className="px-[5%] lg:px-[10%] 2xl:px-0 lg:mb-[40px] 2xl:max-w-[1152px] justify-center mx-auto">
            {productDescription.map((product, index) => (
              <CardVerMas key={index} titleDescription={`Más sobre ${product.translation[0]?.name}`} description={product.translation[0]?.description} />
            ))}
          </div>
        )}
        
        {programsData.length > 0 && programsData[0].courses.length > 0 && (
          <div className="px-[5%] lg:px-[10%] 2xl:px-0 mt-[16px] lg:mt-[40px] lg:mb-[40px] 2xl:max-w-[1152px] justify-center mx-auto dark:text-white">
            <p className="hidden lg:block text-extra font-semibold font-sans mb-[10px]">{t('cursosIncluidosAcademia')}</p>
            <ListaCurso cursos={programsData[0].courses} />
          </div>
        )}
        
        {components.map(({ component }) => component)}
        
      <AvisoLegal/>
      <Footer/>
    </>
  );
};

export default AcademiaNoComprada;