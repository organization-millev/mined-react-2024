import React, { useState, useEffect, useRef } from 'react';
import FlechaAbajo from '../iconos/expand_more'; // Asegúrate de que este componente exista y se use correctamente
import FlechaAbajoWhite from '../iconos/expand_more_white.js';
import FlechaArriba from '../iconos/keyboard_arrow_up';
import FlechaArribaWhite from '../iconos/keyboard_arrow_up_white.js';
import Cerrar from '../iconos/close.js';
import CloseWhite from '../iconos/closeWhite';
import Guardados from '../iconos/bookmark'; // Asegúrate de que este componente exista y se use correctamente
import GuardadosWhite from '../iconos/bookmark_white';
import GuardadosFill from '../iconos/bookmark__fill';
import Carrito from '../iconos/shopping_cart';
import CarritoWhite from '../iconos/shopping_cart_white';
import Campana from '../iconos/notifications';
import CampanaFill from '../iconos/notifications__fill';
import CampanaWhite from '../iconos/notifications_white';
import CampanaAlerta from '../iconos/BellNotification';
import ModoClaro from '../iconos/dark_mode';
import ModoOscuro from '../iconos/icono_modo_claro';
import Menu from '../iconos/menu';
import MenuDesplegable from '../common/Menu/Menu';
import ExpandirMasDark from '../iconos/expand_more_blanco.js';
import SideBar from './SideBar';
import ButtonNav from '../common/ButtonNav/ButtonNav';
import InputSearch from '../common/InputSearch/InputSearch';
import DropdownMenu from '../common/DropdownMenu/DropdownMenu';
import DropdownPais from '../common/DropdownPais/DropdownPais';




import MenuNotificaciones from '../common/MenuNotificaciones/MenuNotificaciones.js'
import Iconos from '../iconos/iconos';

import { useNavigate,useLocation  } from 'react-router-dom';
import { TAG } from '../../utils/tag';
import { useUser } from '../../providers/UserContext';
//import { useAcademias } from '../../hooks/useAcademias';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '../../providers/NavigationContext';
import { useAuth } from '../../providers/AuthContext';
import { useAcademia } from '../../providers/AcademiaContext';





const Navbar = ({ logoAlt, logoSideSrc, logoSideAlt,showDropdownPais }) => {
  
  const { accessToken } = useAuth();
  const { t, i18n } = useTranslation();
  const { userData, isCourseType, asynchronous , getInitials } = useUser();
  const { GetAcademias, listaAcademias, getListaCursos , formatForURL, allNames, getNameByIds } = useAcademia();
  const { goToAcademyCurso, goToAcademy } = useNavigation();
  
  //
  
  const [logoSrc, setLogoSrc] = useState(isCourseType(asynchronous) ? TAG.AsincronicoLogo : TAG.SincronicoLogo);
  const [logoDarkSrc, setLogoDarkSrc] = useState(isCourseType(asynchronous) ? TAG.AsincronicoLogoDark : TAG.SincronicoLogoDark);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [menuNotificacionesVisible, setMenuNotificacionesVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const iconRef = useRef(null);
  const menuRef = useRef(null);
  
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Actualizar el DOM según el tema actual al montar el componente
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]); // Efecto se ejecuta cuando cambia el tema
  
  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    /*if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }*/
    window.location.reload();
  };

  useEffect(() => {
    const tag = isCourseType(asynchronous) ? TAG.AsincronicoLogo : TAG.SincronicoLogo;
    setLogoSrc(tag);
    const tagDark = isCourseType(asynchronous) ? TAG.AsincronicoLogoDark : TAG.SincronicoLogoDark;
    setLogoDarkSrc(tagDark);
  }, [userData.is_type_curse]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleMenuNotificaciones = () => {
    setMenuNotificacionesVisible(!menuNotificacionesVisible);
  };

 const handleClickOutside = (event) => {
    if (
      iconRef.current && 
      !iconRef.current.contains(event.target) && 
      menuRef.current && 
      !menuRef.current.contains(event.target)
    ) {
      setMenuNotificacionesVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);  // Escucha los clics en toda la página
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);  // Limpia el evento al desmontar
    };
  }, []);

  const [inputBusqueda, setInputBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);
  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/home', { replace: true });
  };
  
  const handleCursosGuardados = () => {
    setIsSaved(true);
    navigate('/cursos_guardados', { replace: true });
  };
  
  const handleCarrito = () => {
    navigate('/carrito', { replace: true });
  };
  
  
  
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotificationMenu = () => {
      setIsNotificationOpen(!isNotificationOpen);
  };
    
  const handleClick = (programId, courseId) => {
    //
    const ids = getNameByIds(programId, courseId, 'ES'); // Suponiendo que 'ES' es el código de idioma requerido
  
    if (!ids) {
      //console.error('Error: No se pudieron obtener los nombres para la navegación. Verifica que los IDs sean correctos y que getNameByIds esté funcionando correctamente.');
      return;
    }
  
    const { programName, courseName } = ids;
  
    if (courseName) {
      //
      goToAcademyCurso(programName, courseName);
      //navigate(`/academy/${formatForURL(programName)}/${formatForURL(courseName)}`);
    } else if (programName) {
      //
      goToAcademy(programName);
      //navigate(`/academy/${formatForURL(programName)}`);
    } else {
      console.error('Error: No se pudieron obtener los nombres para la navegación.');
    }
    
    setInputBusqueda('');
    setResultadosBusqueda([]);
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputBusqueda(query);
  
    if (query.length > 0) {
      const resultadosFiltrados = allNames.filter(item => {
        // Verificar que item sea un objeto con una propiedad name que sea una cadena
        return item.name && typeof item.name == 'string' && item.name.toLowerCase().includes(query);
      });
      setResultadosBusqueda(resultadosFiltrados);
    } else {
      setResultadosBusqueda([]);
    }
  };
  
  
  const [idioma, setIdioma] = useState(() => localStorage.getItem('language') || 'es');// Idioma inicial
  useEffect(() => {
      i18n.changeLanguage(idioma); // Asegura que i18n use el idioma almacenado al cargar el componente
  }, []);
  
  const handleToggleLanguage = () => {
        const newLang = idioma === 'es' ? 'en' : 'es'; // Alterna entre 'es' y 'en'
        localStorage.setItem('language', newLang);
        setIdioma(newLang);
        //i18n.changeLanguage(newLang); // Cambia el idioma
        window.location.reload(); // Recarga la página
  }; 
  
  /*const matchPath = (pattern, pathname) => {
    const decodedPathname = decodeURIComponent(pathname);
    const regex = new RegExp(`^${pattern.replace(/:[^\s/]+/g, '([^/]+)')}$`);
    return regex.test(decodedPathname);
  };*/
  
  const matchPath = (pattern, pathname) => {
    const decodedPattern = decodeURIComponent(pattern).toLowerCase();
    const decodedPathname = decodeURIComponent(pathname).toLowerCase();
    
    const regex = new RegExp(`^${decodedPattern.replace(/:[^\s/]+/g, '([^/]+)')}$`);
    return regex.test(decodedPathname);
  };

   useEffect(() => {
    if (menuNotificacionesVisible) {
      // Deshabilitar el scroll del body cuando el menú esté visible
      document.body.style.overflow = 'hidden';
    } else {
      
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuNotificacionesVisible]);
  
  
  
  const isGuardadosPage = location.pathname === '/cursos_guardados';
  const isMisAcademias = location.pathname === '/academias';
  const isMiCalendario = location.pathname === '/live/calendario';
  //const isStreamming = matchPath('/academy/:nameProgram/:nameCurso/canal/:idCanal/:idSesion/:nameCanal', location.pathname);
  const isStreamming = matchPath('/academy/:nameProgram/:nameCurso/canal/:idCanal/:idSesion/:nameCanal', location.pathname);
  const isModules = matchPath('/academy/:nameProgram/:nameCurso/:nameClase', location.pathname);
  
  const homeSwitch = isMisAcademias || isMiCalendario || isStreamming || isModules;
  const [isHovered, setIsHovered] = useState(false);
  
  
  return (
    <div className="sticky top-0 w-full z-[3000] bg-white dark:bg-color-dark dark:text-white font-sans font-medium lg:border-b"> 
      <nav className="flex items-center justify-between px-4 md:py-3 lg:px-[20px] w-full h-[63px]">
        <div className="flex flex-row justify-between items-center gap-[32px]">
          <div className="flex items-center space-x-4 lg:hidden">
            <button className="text-white  lg:hidden" onClick={toggleSidebar} aria-label="Toggle Sidebar">
              <Iconos icono="menu" className="icono-md dark:hidden"/>
              <Iconos icono="menuWhite" className="icono-semi-md dark:block hidden"/>
            </button>
          </div>

          <img src={`${process.env.REACT_APP_URL_IMG}${logoSrc}`} alt={logoAlt} className="!hidden dark:!hidden w-[131px] h-[26px] object-cover w-auto lg:!block cursor-pointer" onClick={handleGoHome} />
          <img src={`${process.env.REACT_APP_URL_IMG}${logoDarkSrc}`} alt={logoAlt} className="lg:dark:!block !hidden w-[131px] h-[26px] object-cover w-auto dark:!lg:hidden cursor-pointer" onClick={handleGoHome} />

          <div className="hidden lg:flex md:items-center md:space-x-8">
            <div className="relative group inline-flex items-center">
              <button className="font-sans text-sm relative" onClick={toggleDropdown} aria-label="Toggle Dropdown">{t('academias')} </button>
              <div className="relative">
                <FlechaArriba
                  onClick={toggleDropdown}
                  className={`cursor-pointer transition-opacity duration-300 dark:hidden ${isDropdownOpen ? 'opacity-100' : 'opacity-0 absolute'}`}
                />
                <FlechaArribaWhite
                  onClick={toggleDropdown}
                  className={`cursor-pointer transition-opacity duration-300 dark:block hidden ${isDropdownOpen ? 'opacity-100' : 'opacity-0 absolute'}`}
                />
                <FlechaAbajo
                  onClick={toggleDropdown}
                  className={`cursor-pointer transition-opacity duration-300 dark:hidden ${isDropdownOpen ? 'opacity-0 absolute' : 'opacity-100'}`}
                />
                <FlechaAbajoWhite
                  onClick={toggleDropdown}
                  className={`cursor-pointer transition-opacity duration-300 dark:block hidden ${isDropdownOpen ? 'opacity-0 absolute' : 'opacity-100'}`}
                />
              </div>
              <DropdownMenu isOpen={isDropdownOpen} listaAcademias={listaAcademias} listaCursos={getListaCursos} formatForURL={formatForURL} closeDropdown={closeDropdown}/>
            </div>
            
            <a href="https://minedebooks.com/login" target="_blank" rel="noopener noreferrer" className="font-sans text-sm">E-books</a>
            {isCourseType(asynchronous) ? (
              <a href="/academias" className={`font-sans text-sm ${isMisAcademias ? 'font-bold' : ''}`}>
                {t('misAcademias')}
              </a>
            ) : (
              <a href="/live/calendario" className={`font-sans text-sm ${isMiCalendario ? 'font-bold' : ''}`}>
                {t('miCalendario')}
              </a>
            )}
          </div>
        </div>

        <div className="dark:hidden lg:hidden w-[136px] h-[28px]">
          <img src={logoSrc} alt={logoAlt} className="w-full h-full object-cover" onClick={handleGoHome}/>
        </div>
        <div className="dark:flex hidden dark:lg:hidden w-[136px] h-[28px]">
          <img src={logoDarkSrc} alt={logoAlt} className="w-full h-full object-cover" onClick={handleGoHome}/>
        </div>

        <div className="flex flex-row justify-between gap-4 ">
          <div className="hidden lg:flex lg:hidden xl:block lg:items-center 2xl:min-w-[359px] ">
            <InputSearch
              type="text"
              name="busqueda"
              placeholder={t('buscarNav')}
              value={inputBusqueda}
              onChange={handleInputChange}
              className="border-gris-oscuro text-gris-oscuro focus:border-gris-oscuro placeholder-text-xs text-small"
              placeholderColor="placeholder-gris-oscuro"
              iconPosition="left"
              ref={inputRef}
              results={resultadosBusqueda}
              onResultClick={(programId, courseId) => handleClick(programId, courseId)}
              iconType={theme === 'dark' ? 'search_white' : 'search'}
            />
          </div>

          <div className="hidden lg:flex items-center">
            <ButtonNav homeSwitch={homeSwitch} isStreamming={isStreamming} isMisAcademias={isMisAcademias} isModules={isModules} isMiCalendario={isMiCalendario}/>
          </div>
          
          
           
               {showDropdownPais && <DropdownPais />}
          
            
          

          <div className="flex items-center space-x-2 space-x-4 lg:hidden" ref={iconRef}>
            <div onClick={toggleMenuNotificaciones} className="cursor-pointer">
              {menuNotificacionesVisible ? 
                <>
                  <Cerrar className="w-[24px] h-[24px] dark:hidden" />
                  <CloseWhite className="w-[24px] h-[24px] dark:block hidden icono-mini-sm" />
                </>
                : 
                <>
                  <CampanaAlerta className="w-[24px] h-[24px] dark:hidden" />
                  <CampanaWhite className="w-[24px] h-[24px] dark:block hidden" onClick={toggleNotificationMenu} />
                </>
              }
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center gap-2">
            {isGuardadosPage || isSaved ? (
              <>
                <GuardadosFill className="w-[24px] h-[24px] cursor-pointer dark:hidden" onClick={handleCursosGuardados} />
                <GuardadosWhite className="w-[24px] h-[24px] cursor-pointer hidden dark:block" onClick={handleCursosGuardados} />
              </>
            ) : (
              <>
                <Guardados className="w-[24px] h-[24px] cursor-pointer dark:hidden" onClick={handleCursosGuardados} />
                <GuardadosWhite className="w-[24px] h-[24px] cursor-pointer hidden dark:block" onClick={handleCursosGuardados} />
              </>
            )}
            
        
            <Carrito className="w-[24px] h-[24px] cursor-pointer dark:hidden" onClick={handleCarrito} />
            <CarritoWhite className="w-[24px] h-[24px] cursor-pointer dark:block hidden" onClick={handleCarrito} />
            
          
            <div
              ref={iconRef}
              onClick={toggleNotificationMenu}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cursor-pointer"
            >
              {isNotificationOpen || isHovered ? (
                <CampanaFill className="w-[24px] h-[24px] dark:hidden" />
              ) : (
                <Campana className="w-[24px] h-[24px] dark:hidden" />
              )}
              {isNotificationOpen || isHovered ? (
                <CampanaWhite className="w-[24px] h-[24px] dark:block hidden" />
              ) : (
                <CampanaWhite className="w-[24px] h-[24px] dark:block hidden" />
              )}
            </div>
            
            
           

            {isNotificationOpen && (
                <div className="absolute top-16	right-40 bg-white dark:bg-color-dark2   max-w-[550px] max-h-[559px]  rounded-[10px]  shadow-custom-strong z-50">
                    <MenuNotificaciones />
                </div>
            )}
            
            
            
            <div className="flex items-center justify-center text-xs bg-white dark:bg-color-dark rounded-[10px]">
              <MenuDesplegable />
          
              <button onClick={handleThemeChange} className="dark-mode flex items-center justify-center">
                {theme === 'dark' ? <ModoOscuro /> : <ModoClaro />}
              </button>
              
              <span
                className="uppercase text-marron-grisaceo dark:text-white cursor-pointer font-roboto text-small"
                onClick={handleToggleLanguage}
              >
                <span className={idioma === 'es' ? 'font-bold' : 'font-normal'}>
                    ES
                </span>/
                <span className={idioma === 'en' ? 'font-bold' : 'font-normal'}>
                    EN
                </span>
              </span>
            
            </div>
          </div>
        </div>
      </nav>
      
      {menuNotificacionesVisible && (
        <div   className="absolute top-[63px] right-0 bg-white dark:bg-color-dark2 w-full max-h-[80vh]   z-50 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 63px)', width: '100%' }} // Ajusta la altura máxima
        >
          <MenuNotificaciones />
        </div>
      )}

      
      {isSidebarOpen && <SideBar toggleSidebar={toggleSidebar} 
      logoSideSrc={logoSideSrc} 
      logoSideAlt={logoSideAlt} 
      isAsynchronous={isCourseType(asynchronous)} 
      listaAcademias={listaAcademias} 
      listaCursos={getListaCursos}
      formatForURL={formatForURL}
      getNameByIds={getNameByIds}
      inputBusqueda={inputBusqueda}
      handleInputChange={handleInputChange}
      resultadosBusqueda={resultadosBusqueda}
      handleClick={handleClick}
      homeSwitch={homeSwitch}
      isStreamming={isStreamming} 
      isMisAcademias={isMisAcademias} 
      isModules={isModules} 
      isMiCalendario={isMiCalendario}
      
      />}
      
     
      
    </div>
  );
};

export default Navbar;
