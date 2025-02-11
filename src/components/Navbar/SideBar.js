import React, { useState, useEffect } from 'react';
import Close from '../iconos/close';
import CloseWhite from '../iconos/closeWhite';
import FlechaAbajo from '../iconos/expand_more';
import FlechaArriba from '../iconos/keyboard_arrow_up';

import FlechaAbajoWhite from '../iconos/expand_more_white.js';
import FlechaArribaWhite from '../iconos/keyboard_arrow_up_white.js';

import InputSearch from '../common/InputSearch/InputSearch';
import Traduccion from '../common/Traduccion/Traduccion';
import Theme from '../common/Theme/Theme';
import { TAG } from '../../utils/tag';
import { useLoading } from '../../providers/LoadingContext';
import { useUser } from '../../providers/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '../../providers/NavigationContext';
import { useParams } from 'react-router-dom';
import { useAcademia } from '../../providers/AcademiaContext';
import { useLocation } from 'react-router-dom';


const SideBar = ({ homeSwitch,isMisAcademias, isModules, isMiCalendario, isStreamming ,toggleSidebar, logoSideAlt = 'Logo Side Bar', isAsynchronous, listaAcademias, listaCursos,formatForURL,getNameByIds,inputBusqueda,handleInputChange,resultadosBusqueda,handleClick }) => {
    
    const { nameProgram , nameCurso } = useParams();
    const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
    const { t } = useTranslation();
    const { userData, setCourseType, isCourseType, synchronous, asynchronous, logout } = useUser();
    const [logoSrc, setLogoSrc] = useState(isCourseType(asynchronous) ? TAG.AsincronicoLogo : TAG.SincronicoLogo);
    const [logoDarkSrc, setLogoDarkSrc] = useState(isCourseType(asynchronous) ? TAG.AsincronicoLogoDark : TAG.SincronicoLogoDark);
    //const [inputBusqueda, setInputBusqueda] = useState('');
    const [academiasDesplegadas, setAcademiasDesplegadas] = useState(false);
    const [categoriaDesplegada, setCategoriaDesplegada] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const [theme, setTheme] = useState('light');
    
    const { goToAcademyCurso ,goToAcademy ,goToEcommerceAcademyNoComprada} = useNavigation();
    const { getCourseDetails,getIdsByName } = useAcademia();
    const navigate = useNavigate();
    const [ isSync, setIsSync] = useState(false);
    const [ isAsync, setIsAsync] = useState(false);
    
    const names = getIdsByName(nameProgram, nameCurso, language_code);
    const programId = names?.programId;
    const courseId = names?.courseId;
     const location = useLocation();
    const navigateToHome = useNavigate();
    
     const { showLoadingForAWhile } = useLoading();
    
    useEffect(() => {
        const tag = isCourseType(asynchronous) ? TAG.AsincronicoLogo : TAG.SincronicoLogo;
        setLogoSrc(tag);
        const tagDark = isCourseType(asynchronous) ? TAG.AsincronicoLogoDark : TAG.SincronicoLogoDark;
        setLogoDarkSrc(tagDark);
    }, [userData.is_type_curse]);

    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    
    
    useEffect(()=>{
    if(programId && courseId){
      const data = getCourseDetails(programId, courseId);
      if (data?.isAsincronico === 0 && data?.isSincronico === 1) {
        setCourseType(synchronous);
        setIsSync(true)
      }else if (data?.isAsincronico === 1 && data?.isSincronico === 0) {
        setCourseType(asynchronous);
        setIsAsync(true)
      }
    }
  },[programId, courseId])
  
    
      
  useEffect(() => {
    if (location.pathname === '/mis_constancias') {
      setCourseType(asynchronous); 
    }
  }, [location.pathname])
  
  
  
   useEffect(() => {
    if (isMisAcademias || isModules) {
      setCourseType(asynchronous);
    } else if (isMiCalendario || isStreamming) {
      setCourseType(synchronous);
    }
  }, [isMisAcademias, isModules, isMiCalendario, isStreamming]);
  
    

    const toggleAcademias = () => {
        setAcademiasDesplegadas(!academiasDesplegadas);
    };

    const toggleCategoria = (id) => {
        setCategoriaDesplegada(categoriaDesplegada === id ? null : id);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    /*const handleCourseTypeChange = (type) => {
        setCourseType(type);
        setIsVisible(false);
        setTimeout(toggleSidebar, 500);
    };
    */
    
    
    
    const handleCourseTypeChange = (currentType) => {
    const currentPath = window.location.pathname; // Obtén la ruta actual
    if (currentPath === '/mis_constancias' && currentType === synchronous) {
        navigateToHome('/home');
        return; 
      }
    
    
    if (homeSwitch || isSync || isAsync){
      const oppositeTypeCourse = currentType === asynchronous ? asynchronous : synchronous;
      setCourseType(oppositeTypeCourse);
      setTimeout(() => {
        navigateToHome('/home')
      }, 100)
    }else{
      setCourseType(currentType)
    }
  }
  
    /*
    const handleClickCurso = (programId, courseId) => {
        const ids = getNameByIds(programId, courseId, 'ES');
        //navigate(`/academy/${programName}/curso/${courseName}`);
        const { programName, courseName } = ids;
        showLoadingForAWhile();
        goToAcademyCurso(programName,courseName);
        setIsVisible(false);
            
            setTimeout(() => {
                toggleSidebar(); 
            }, 300);
        //navigate(`/academy/${formatForURL(programName)}/curso/${formatForURL(courseName)}`);
    };
    */
    
    const handleClickCurso = (programId, courseId, is_enabled) => {
    const ids = getNameByIds(programId, courseId, 'ES',is_enabled);
    const { programName, courseName } = ids;

    showLoadingForAWhile();

    if (Number(is_enabled) === 1) {
        //
        goToAcademyCurso(programName, courseName);
    } else {
        //
        goToEcommerceAcademyNoComprada(formatForURL(programName));
    }

};

    
    

    
    
    const handleClickAcademia = (is_enabled, name) => (event) => {
      event.preventDefault();
       // Muestra un mensaje de alerta (opcional)
    //
    //

      
      showLoadingForAWhile();

      if (Number(is_enabled) === 1) {
        goToAcademy(formatForURL(name));
      } else {
        // Si la academia no está habilitada, redirige a la academia no comprada
        goToEcommerceAcademyNoComprada(formatForURL(name));
      }
      
      
      
    
      setIsVisible(false);
      
      setTimeout(() => {
        toggleSidebar(); 
      }, 300);
    };
 
    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        window.location.reload();
    };
    
    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
    };
    
    return (
        <div className={`!fixed inset-0  bg-black bg-opacity-50 z-50 flex lg:hidden transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`bg-white dark:bg-color-dark dark:text-white max-w-[222px] md:w-1/2 h-full p-6 overflow-y-auto transform transition-transform duration-500 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end items-center">
                    <Close onClick={() => { setIsVisible(false); setTimeout(toggleSidebar, 300); }} className="dark:hidden"/>
                    <CloseWhite onClick={() => { setIsVisible(false); setTimeout(toggleSidebar, 300); }} className="dark:block hidden icono-mini-sm"/>
                </div>
                
                <div className="">
                    <img src={logoSrc} alt={logoSideAlt} className="w-[121px] h-[20px] dark:hidden" onClick={handleGoHome} />
                    <img src={logoDarkSrc} alt={logoSideAlt} className="w-[121px] h-[20px] dark:block hidden" onClick={handleGoHome} />
                </div>
                
                {isAsynchronous ? 
                    <div className="flex items-center justify-center">
                        <button className="my-6 bg-rojo-intenso text-white font-bold py-1 px-4 rounded-full font-sans text-md" onClick={() => handleCourseTypeChange(synchronous)}>{t("minedTV")}</button>
                    </div>
                : 
                    <button className="my-6 bg-azul-intenso text-white font-bold py-1 px-4 rounded-full font-sans text-md w-full" onClick={() => handleCourseTypeChange(asynchronous)}>{t("minedAcademy")}</button>
                }
                
                <div className="h-[36px]">
                    <InputSearch
                        type="text"
                        name="busqueda"
                        placeholder={t('buscarNav')}
                        value={inputBusqueda}
                        onChange={handleInputChange}
                        className="border-gris-oscuro text-gris-oscuro focus:border-gris-oscuro placeholder-text-xs text-small"
                        placeholderColor="placeholder-gris-oscuro"
                        results={resultadosBusqueda}
                        onResultClick={(programId, courseId) => handleClick(programId, courseId)}
                        iconType={theme === 'dark' ? 'search_white' : 'search'}
                    />
                </div>
                
                <ul>
                    <li className="pt-[29px] font-sans flex flex-row items-center gap-1 font-semibold text-sm cursor-pointer " onClick={toggleAcademias}>
                       {t('academias')}   {academiasDesplegadas ? 
                           
                           <>
                                <FlechaArriba      className="dark:hidden" /> 
                                <FlechaArribaWhite className="hidden dark:!block" /> 
                           </>
                       :
                           <>
                                <FlechaAbajo      className="dark:hidden"/>
                                <FlechaAbajoWhite className="hidden dark:!block"/>
                           </>
                        }
                    </li>
                    
                        <div className={`transition-max-height duration-2000 ease-in-out overflow-hidden ${academiasDesplegadas ? 'max-h-[500px]' : 'max-h-0'}`}>
                            <ul className="pl-4 list-disc list-inside">
                                {listaAcademias.map(item => (
                                        <div key={item.program_id} className="py-1 font-sans font-semibold text-sm cursor-pointer" onClick={() => toggleCategoria(item.program_id)}> 
                                            <div className="flex  items-center h-[30px] ">
                                                <div className="w-[100px]" onClick={handleClickAcademia(item.is_enabled, item.name)}  >{item.name} {categoriaDesplegada === item.program_id} </div>
                                                
                                                <div>
                                                    {categoriaDesplegada === item.program_id ? 
                                                    
                                                    <>
                                                        <FlechaArriba      className="dark:hidden" /> 
                                                        <FlechaArribaWhite className="hidden dark:!block" /> 
                                                    </>
                                                    
                                                    : 
                                                    
                                                    <>
                                                        <FlechaAbajo      className="dark:hidden"/>
                                                        <FlechaAbajoWhite className="hidden dark:!block"/>
                                                    </>
                                                        
                                                    }
                                                </div>
                                            </div>
                                            
                                            {categoriaDesplegada === item.program_id && (
                                                <ul className="pl-4">
                                                    {listaCursos(item.program_id).map(course => (
                                                        
                                                        <li key={course.course_id} className="py-1 font-sans font-normal text-sm cursor-pointer">
                                                            <a onClick={() => handleClickCurso(item.program_id, course.course_id,item.is_enabled)}>{course.name}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                ))}
                            </ul>
                        </div>
                        
                        
                    <li className="py-[16px] font-sans font-semibold text-sm"><a href="https://minedebooks.com/login" target="_blank" rel="noopener noreferrer">Ebooks</a></li>
                    {isAsynchronous ?
                        <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/academias">{t('misAcademias')}</a></li>
                        :
                        <a href="/live/calendario"><li className="pb-[16px] font-sans font-semibold text-sm">{t('miCalendario')}  </li></a>
                    }
                    <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/cursos_guardados">{t('misGuardados')}</a></li>
                    <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/carrito">{t('miCarrito')}</a></li>
                    <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/perfil">{t('miPerfil')}</a></li>
                    <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/logros">{t('misLogros')}</a></li> 
                    <li className="pb-[16px] font-sans font-semibold text-sm"><a href="/mis_constancias">{t('certificados')}</a></li>
                    <li className="font-sans font-semibold text-sm"><a href="/centro_ayuda">{t('tituloCentroAyuda')}</a></li>
                </ul> 
                
                <div className="text-center mt-[29px]">
                    <Traduccion />
                </div>
                
                <div className="my-[29px]">
                    <Theme onThemeChange={handleThemeChange}/>
                </div>
                
                <p className="text-rojo-coral font-sans font-semibold text-sm" onClick={handleLogout}><u className="font-bold hover:text-gris-oscuro">{t('btnCerrarSesion')} </u></p>
            </div>
            <div className="w-auto md:w-1/2 h-full" onClick={() => { setIsVisible(false); setTimeout(toggleSidebar, 300); }}></div>
        </div>
    );
};

export default SideBar;