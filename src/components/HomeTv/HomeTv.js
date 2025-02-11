import React, { useState , useEffect} from 'react';
import FlechaAbajo from '../iconos/keyboard_arrow_up'; 
import Navbar from '../Navbar/Navbar'; 
import BannerCarousel from '../BannerCarousel/BannerCarousel'; 
import CarouselEducadores from '../CarouselEducadores/CarouselEducadores'; 
import CardsEducadores from '../CardsEducadores/CardsEducadores'; 
import AvisoLegal from '../common/AvisoLegal/AvisoLegal'; 
import NuestrasHerramientas from '../common/NuestrasHerramientas/NuestrasHerramientas'; 
import CarouselCurso from './CarouselCurso'; 
import CarouselAcademia from '../CarouselAcademia/CarouselAcademia'; 
import CardAcademia from '../CardAcademia/CardAcademia'; 
import CardCurso from '../CardCurso/CardCurso'; 
import Footer from '../Footer/Footer'; 
import WelcomeMessage from '../common/WelcomeMessage/WelcomeMessage';
import Loader from '../Loader/Loader'
import ModalHome from '../ModalHome/ModalHome';

//import { useAcademias } from '../../hooks/useAcademias';
import { useUser } from '../../providers/UserContext';
import { obtenerInfoDispositivo } from '../../utils/funciones';
import { TAG } from '../../utils/tag';
import {useMediaQuery} from '../../hooks/useMediaQuery';
import { useLoading  } from '../../providers/LoadingContext';
import { useAcademia } from '../../providers/AcademiaContext';
import { useKeepWatching } from '../../hooks/academy/useKeepWatching';
import { useTranslation } from 'react-i18next';
import { useLiveSessions } from '../../hooks/useLiveSessions';


const reorderComponents = (components, order) => {
  
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

const HomeTv = () => {
  
  const { sessionList} = useLiveSessions();
  const [isLive, setIsLive] = useState([]);
  useEffect(() => {
    if (sessionList && sessionList.length > 0) {
      const liveValues = sessionList.map(session => session.is_live);
      setIsLive(liveValues);
    }
  }, [sessionList])
  const restringirVisualizacion = isLive.every(value => value === 0);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showLoadingForAWhile } = useLoading();
  

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    localStorage.setItem('modalShown', 'true'); 
  };
  
  
  
  const { GetKeepWatching, cursosKeepWatching } = useKeepWatching();


  useEffect(() => {
    showLoadingForAWhile(1800);
    GetKeepWatching();
    
    const modalShown = localStorage.getItem('modalShown');

    if (!modalShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
    
    

  const tipoDispositivo = obtenerInfoDispositivo().tipoDispositivo;
  const { userData , isCourseType  , asynchronous } = useUser();
  
  const { banners , academies, loading: academiesLoading, error , getFilteredBanners , GetAcademias } = useAcademia();
  
  //const { banners , academies, loading: academiesLoading, error , getFilteredBanners , GetAcademias } = useAcademias();
  //useEffect(() => { GetAcademias(); }, []);  
  
  const { t } = useTranslation();
  
    
  const [ bannersForDisplay, setBannersForDisplay ] = useState([]);
  const isLg = useMediaQuery('(min-width: 1024px)');
  //const { loading, startLoading,stopLoading } = useLoading();
  
  const tituloCarouselCurso = isCourseType(asynchronous)
    ? (isLg ? t('continuarReproduciendo') : t('continúaAcademy'))
    : t('continuaMinedAcademy');
  
  //ordenar componentes segun academia
  const orderAsynchronous = ['D', 'B', 'C', 'A']; // Orden para Asincrónico
  const orderSynchronous = ['A', 'B', 'C', 'D']; // Orden para Sincrónico
  let components = [
    { key: 'A', component: !restringirVisualizacion && <CarouselEducadores titulo={t('ahoraMinedTV')}  showBackground={true}/>  },
    { key: 'B', component: <CarouselAcademia tituloCarouselAcademia={t('nuestrasAcademias')} /> },
    { key: 'C', component: <NuestrasHerramientas titulo={t('nuestrasHerramientas')} filter={false}/> },
  /*{ key: 'D', component: <div className="lg:mb-[40px]">
                          <CarouselCurso tituloCarouselCurso={tituloCarouselCurso} cursos={cursosKeepWatching}/>
</div>}*/
  ];
  
  if (cursosKeepWatching && cursosKeepWatching.length > 0) {
    components.push({
      key: 'D',
      component: (
        <div className="lg:mb-[40px]">
          <CarouselCurso tituloCarouselCurso={tituloCarouselCurso} cursos={cursosKeepWatching} />
        </div>
      ),
    });
  }
     
  // Aplicar el orden basado en is_type_curse
  components = isCourseType(asynchronous)  ? 
    reorderComponents(components, orderAsynchronous) : 
    reorderComponents(components, orderSynchronous);
  
  
 
  return (
    <>
      
      <Navbar  logoAlt="Logo"/>
      
            
            <WelcomeMessage firstname={userData.first_name}/>
              
              <ModalHome isOpen={isModalOpen} onClose={handleCloseModal} />
              
              {banners && banners.length > 0 && (
                  <BannerCarousel banners={banners} />
              )}
              
              {components.map(({ key, component }) => (
                <div key={key}>{component}</div>
              ))}
              
      <AvisoLegal/>
      <Footer/>
     
   
    </>
  );
};

export default HomeTv;

