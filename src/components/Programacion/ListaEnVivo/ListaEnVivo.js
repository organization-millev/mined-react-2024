import React, { useState, useEffect, useRef } from 'react';
import IconosProgramacion from '../../iconos/iconosProgramacion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { useLiveSessions } from '../../../hooks/useLiveSessions';
import { useParams,useLocation,useNavigate  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './ListaEnVivo.css';
import { useNavigation } from '../../../providers/NavigationContext';

const ListaEnVivo = (props) => {
  
  const { goToAcademyCursoCanal } = useNavigation();  
  const { nameProgram , nameCurso } = useParams();
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [slidesToShow, setSlidesToShow] = useState(1.5);
  const { t } = useTranslation();
  
  /*useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      // Ensure the containerRef is valid before accessing its children
      if (!containerRef.current) return;

      const children = container.children;
      const visible = [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const containerRect = container.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();

        if (
          childRect.left >= containerRect.left &&
          childRect.right <= containerRect.right
        ) {
          visible.push(i);
        }
      }

      setVisibleItems(visible.length > 0 ? visible : [0]);
    };

    handleScroll();

    //container.addEventListener('scroll', handleScroll);
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);*/
  useEffect(() => {
    const container = containerRef.current;
  
    const handleScroll = () => {
      if (!containerRef.current) return;
  
      const children = container.children;
      const visible = [];
  
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const containerRect = container.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
  
        if (childRect.left >= containerRect.left && childRect.right <= containerRect.right) {
          visible.push(i);
        }
      }
  
      setVisibleItems(visible.length > 0 ? visible : [0]);
    };
  
    handleScroll();
  
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);
  
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 2133) {
        setSlidesToShow(4.3);
      } else if (width >= 1920) {
        setSlidesToShow(7);
      } else if (width >= 1600) {
        setSlidesToShow(3.3);
      } else if (width >= 1440) {
        setSlidesToShow(6);
      } else if (width >= 1280) {
        setSlidesToShow(5);
      } else if (width >= 1040) {
        setSlidesToShow(4);
      } else if (width >= 1024) {
        setSlidesToShow(4);
      } else if (width >= 900) {
        setSlidesToShow(1.8);
      } else if (width >= 800) {
        setSlidesToShow(1.6);
      } else if (width >= 768) {
        setSlidesToShow(3);
      } else if (width >= 425) {
        setSlidesToShow(2);
      } else if (width >= 375) {
        setSlidesToShow(1.9);
      } else if (width >= 320) {
        setSlidesToShow(1.4);
      } else {
        setSlidesToShow(1.5);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);

    return () => {
      window.removeEventListener('resize', updateSlidesToShow);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
  };

  //const handleNavigate = (nameProgram , nameCurso, channelId,session_id) => {
  //  // Aquí puedes definir la lógica para utilizar los parámetros si es necesario
  //  navigate(`/academy/${nameProgram}/curso/${nameCurso}/canal/${channelId}`,{ state: { sessionId: session_id }});
  //};
  
    const handleGoToAcademyCursoCanal = (nameProgram, nameCurso, nombreCanal, idCanal, sessionId) => {
        const canalName = nombreCanal && nombreCanal.trim() !== '' ? nombreCanal : 'Sin_Nombre';
        goToAcademyCursoCanal(nameProgram, nameCurso, convertSpacesToUnderscores(canalName), { sessionId, idCanal });
    };
  
    const convertSpacesToUnderscores = (name) => {
      return name.split(' ').join('_');
    };
  
  
  
  const liveSessions = props.obj?.listado?.filter(obj => obj.is_live) || [];
  if (liveSessions.length === 0) {
    return null;
  }
  
  return (
    <>
      <div className="w-[100%] py-[0.5rem] md:px-[10%] flex gap-4">
        <div className="w-[150px] lg:w-[30%] shrink-0 flex flex-col justify-center">
          <span className="text-extra text-center lg:text-2extra font-semibold dark:text-blanco">{t('ahora')} </span>
          <div className="flex items-center justify-center">
            <IconosProgramacion icono="EnVivo" className="icono-md me-[8px]" />
            <span className="text-small dark:text-blanco">{t('enVivo')} </span>
          </div>
        </div>

        <div className="relative inline-block w-[100%] overflow-auto h-[100%] whitespace-nowrap  " ref={containerRef}>
          <Slider {...settings} className="flex flex-row justify-center items-center">
            {/*.map((obj, ind) => {*/}
            {liveSessions.map((obj, ind) => {
              const fileMinedTv = obj.files.find(file => file.file_tag === 'minedtv_en_vivo');
              return (
              
                <div key={ind} className="inline-block w-[75%] h-[100%] md:w-[30%] lg:w-[20%] lg:max-w-[140px] shrink-0 cursor-pointer" onClick={() => handleGoToAcademyCursoCanal(nameProgram, nameCurso, obj.instructor_name, obj.channel_id, obj.session_id)} >

                  <div className="flex p-[10px] flex-col w-[100%] items-center justify-center">
                    {/* Usar file_url del archivo filtrado en lugar de instructor_photo */}
                    <img className="rounded-full w-[90px] h-[90px] object-cover bg-white" src={fileMinedTv ? fileMinedTv.file_url : obj.instructor_photo} alt="canal" />
                    
                    <div className="lg:mt-[5px] flex items-center justify-around text-center w-[80%] overflow-hidden">
                      <div className="flex justify-start absolute pr-[7em]">
                        <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-color-dark ${obj.is_live ? 'bg-rojo-coral' : 'bg-green-500'}`}></div>
                      </div>
                      
                      <div className="!m-0 whitespace-normal">
                        <span className="text-medium font-semibold line-clamp-2 dark:text-blanco">{obj.courseName ? obj.courseName : "Sesion en Vivo" }</span>
                      </div>
                      
                    </div>
                    
                    <span className="text-small dark:text-blanco font-normal text-center line-clamp-2">
                      {obj.instructor_name.split(' ').map((word, index) => (
                        <span key={index}>
                          {word}
                          {index === 0 ? <br /> : null}
                        </span>
                      ))}
                    </span>
                  
                  
                  </div>
                  
                </div>
              );
            })}
          </Slider>

        </div>
      </div>
    </>  
  );
}

export default ListaEnVivo;
