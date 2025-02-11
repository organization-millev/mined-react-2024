import React, { useState, useEffect } from 'react';
import { useUser } from '../../../providers/UserContext';
import {useNavigate  } from 'react-router-dom';
import { useAcademia } from '../../../providers/AcademiaContext';
import { useParams } from 'react-router-dom';
import { useLocation, matchPath  } from 'react-router-dom';

const ButtonNav = ({ homeSwitch, isMisAcademias, isModules, isMiCalendario, isStreamming }) => {
  
  const navigateToHome = useNavigate();
  
  const { nameProgram , nameCurso } = useParams();
  const language_code = (localStorage.getItem('language') || 'es').toUpperCase();
  const { userData  , setCourseType  ,isCourseType , synchronous , asynchronous } = useUser(); 
  const { getCourseDetails,getIdsByName } = useAcademia();
  const [ isSync, setIsSync] = useState(false);
  const [ isAsync, setIsAsync] = useState(false);
  const names = getIdsByName(nameProgram, nameCurso, language_code);
  const programId = names?.programId;
  const courseId = names?.courseId;
  const location = useLocation();
  
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
    if (isMisAcademias || isModules) {
      setCourseType(asynchronous);
    } else if (isMiCalendario || isStreamming) {
      setCourseType(synchronous);
    }
  }, [isMisAcademias, isModules, isMiCalendario, isStreamming]);
  
  
  useEffect(() => {
    if (location.pathname === '/mis_constancias') {
      setCourseType(asynchronous); 
    }
  }, [location.pathname])
  
  
  const handleClick = (currentType) => {
    
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
  
  
 
  return (
    <div className={`dark:bg-[#00000033]  dark:border-transparent rounded-3xl text-xs border-4 inline-flex ${
        isCourseType(synchronous) ? 'bg-gray-200 border-gray-200 dark:bg-[#403E4F]' : 'dark:bg-[#403E4F] bg-[#292735] border-[#292735]'
      }`}>
      
      <button
        className={`flex items-center font-semibold justify-center px-6 py-2 w-1/2 rounded-3xl ${isCourseType(asynchronous) ? 'bg-blanco text-[#292735]  ' : '  dark:text-blanco text-[#B2B2B8]'}`}
        onClick={() => handleClick(asynchronous)}
        //onClick={() => setCourseType(asynchronous)}
        //disabled={disableSwitch}
      >
        Academy
      </button>
      <button
       className={`px-6 py-2 w-1/2 font-semibold  rounded-3xl ${isCourseType(synchronous) ? 'bg-[#C33032] text-white' : 'dark:text-[#FFFFFF80] text-[#B2B2B8]'}`}
        onClick={() => handleClick(synchronous)}
        //onClick={() => setCourseType(synchronous)}
        //disabled={disableSwitch}
      >
        Live
      </button>
    </div>
  );
};

export default ButtonNav;




