import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../providers/NavigationContext';

const DropdownMenu = ({ isOpen, listaAcademias, listaCursos, formatForURL, closeDropdown }) => {

  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [activeAcademiaId, setActiveAcademiaId] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { goToAcademyCurso ,goToAcademy ,goToEcommerceAcademyNoComprada} = useNavigation();
  
  
  const handleMouseEnter = (programId) => {
    setSubmenuOpen(true);
    setActiveAcademiaId(programId);
  };

  /*const handleMouseLeave = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setSubmenuOpen(false);
      setActiveAcademiaId(null);
    }
  };*/
  
  //
  //c
  
  const handleMouseLeave = (e) => {
    if (e.relatedTarget && dropdownRef.current && dropdownRef.current.contains(e.relatedTarget)) {
      return;
    }
    /*if (
      e.relatedTarget &&
      dropdownRef.current &&
      dropdownRef.current.contains &&
      typeof dropdownRef.current.contains === 'function' &&
      e.relatedTarget instanceof Node
    ) {
      dropdownRef.current.contains(e.relatedTarget);
    }*/
    setSubmenuOpen(false);
    setActiveAcademiaId(null);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSubmenuOpen(false);
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  const handleClick = (programName, courseName, isEnabled) => {
    if (Number(isEnabled) === 1) {
      goToAcademyCurso(programName, courseName);
    } else {
      goToEcommerceAcademyNoComprada(programName);
    }
    closeDropdown();
    window.scrollTo(0, 0);
  };

  const handleClickLink = (is_enabled, name) => (event) => {
        event.preventDefault()
        if (Number(is_enabled) === 1) {
            goToAcademy(formatForURL(name));
        } else {
            goToEcommerceAcademyNoComprada(formatForURL(name));
        }
        closeDropdown();
  };

  return (
    <div 
      className={`absolute !overflow-hidden dark:!overflow-hidden left-0 mt-1 shadow-custom-strong rounded-b-lg !rounded-t-lg bg-white dark:bg-gris-azulado-profundo ${isOpen ? 'block' : 'hidden'}`} 
      ref={dropdownRef} 
      style={{ top: '100%' }}
      
    >
      <div className="flex divide-x divide-plata-suave dark:divide-color-dark">
       
        <div className="flex flex-col">
          
          {listaAcademias.map(item => (
            <div
              key={item.program_id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.program_id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                className="block w-[120px] h-[33px]  border-b-[1px] border-plata-pálido dark:border-color-dark   px-3 py-2 text-xs min-h-[33px] font-sans text-púrpura-grisáceo dark:text-color-dark-texto hover:bg-plata-pálido dark:hover:bg-gris-carbón"
                onClick={handleClickLink(item.is_enabled,item.name)}
              >
                {item.name}
              </Link>
            </div>
          ))}
          
        </div>

       
       {isSubmenuOpen && (
          <div className="flex flex-col">
            {listaCursos(activeAcademiaId).map(course => {
              const activeAcademia = listaAcademias.find(item => item.program_id === activeAcademiaId);
              //
              return (
                <a
                  key={course.course_id}
                  onClick={() => handleClick(formatForURL(activeAcademia.name), formatForURL(course.nameUrl), activeAcademia.is_enabled)}
                  className="whitespace-nowrap block border-b-[1px] !min-w-[120px] !max-w-[100%] h-[33px] dark:border-color-dark border-plata-pálido px-3 py-2 text-xs font-sans text-púrpura-grisáceo dark:text-color-dark-texto hover:bg-plata-pálido dark:hover:bg-gris-carbón cursor-pointer"
                  data-is-asynchronous-enabled={course.isAsynchronousEnabled}
                  data-is-synchronous-enabled={course.isSynchronousEnabled}
                >
                  {course.name}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
