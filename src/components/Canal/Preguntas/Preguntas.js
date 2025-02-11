import React, { useState,useEffect } from 'react';
import IconosCanal from '../../iconos/iconos_canal';
import Iconos from '../../iconos/iconos';
import ResponderFlecha from '../../iconos/responder_flecha';
import ResponderFlechaDark from '../../iconos/responder_flecha_dark';

import { useLiveQuestionsList } from '../../../hooks/canal/useLiveQuestionsList'; 
import { useLiveQuestions } from '../../../hooks/canal/useLiveQuestions';
import { useDeleteQuestion } from '../../../hooks/sync/useDeleteQuestion';
import { useSubmitAnswer } from '../../../hooks/sync/useSubmitAnswer';
import { useParams,useLocation  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../providers/AlertContext';

const Preguntas = (props) => {
    const { permisoInstructor } = props;
    const { warn, success } = useAlert()
    const { nameProgram , nameCurso} = useParams();
    const location = useLocation();
    const sessionId = localStorage.getItem('sessionId') || 'defaultSessionId';
    const idCanal = localStorage.getItem('idCanal') || 'defaultIdCanal';
    
    const { registrarPregunta, isSuccessQuestion } = useLiveQuestions();
    const { eliminarPregunta,isDeleteQuestionSuccess } = useDeleteQuestion();
    const { registrarRespuesta, isSuccessAnswer } = useSubmitAnswer();
    const { GetLiveList,liveList=[], setLiveList } = useLiveQuestionsList();
    const [mostrar,setMostrar] = useState({id:null,tipo:null})
    const [abrirPregunta,setAbrirPregunta] = useState(false)
    const [comentario, setComentario] = useState('');
    const [ comentarioRefresh , setComentarioRefresh ] = useState(false);
    const [respuesta, setRespuesta] = useState('');
    const [responderId, setResponderId] = useState(null);
    const [visibleQuestionsCount, setVisibleQuestionsCount] = useState(3);
    const [showAll, setShowAll] = useState(false);
    
    useEffect(() => {
        GetLiveList(idCanal);
        setComentarioRefresh(false);
    }, [idCanal,comentarioRefresh]);
    
    useEffect(() => {
        if (isDeleteQuestionSuccess || isSuccessQuestion || isSuccessAnswer){
            GetLiveList(idCanal);
        }
    },[isSuccessAnswer, isDeleteQuestionSuccess, isSuccessQuestion, idCanal])

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date)) return 'Invalid Date';
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('es-ES', options);
    };

    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const formatNameCurso = (nameCurso) => {
        return nameCurso.replace(/_/g, ' ');
    }

    const handleVerMas = (event) => {
        
        let id = event.currentTarget.getAttribute("id")
        let tipo = event.currentTarget.getAttribute("tipo")

        if(id == mostrar.id && tipo == mostrar.tipo){
           setMostrar({id:null,tipo:null}) 
        }
        else{
           setMostrar({id:id,tipo:tipo}) 
        }
    }
    
    
    const handleClickOcultar = () =>{
        setAbrirPregunta(true)
    }
    
    
    const handleComentarioChange = (event) => {
        setComentario(event.target.value);
    }
    
    const handleSubmitPregunta = async () => {
        if (comentario.trim().length > 0){
            try{
                await registrarPregunta(comentario,'','',sessionId);
                setComentario('');
            }catch (error){
                warn('Ocurrió un error al enviar la pregunta');
            }
        }else{
            warn('Por favor, completa el campo antes de enviar tu pregunta.');
        }
    };
    
    const handleClickResponder = (question) => {
        if (question.answers && question.answers.length > 0) {
            warn('La pregunta ya tiene una respuesta.');
            return;
        }
        setResponderId(question.question_id);
        setRespuesta('');
    };
    
    
    const handleCancelarRespuesta = () => {
        setResponderId(null);
    };
    
    const handleRespuestaChange = (event) => {
        setRespuesta(event.target.value);
    };
    
    const handleSubmitRespuesta = async (questionId) => {
        if (respuesta.trim().length > 0) {
            try {
                await registrarRespuesta(respuesta,questionId,'', '');
                setRespuesta('');
                setResponderId(null);
            } catch (error) {
                warn('Ocurrió un error al enviar la respuesta.');
            }
        } else {
            warn('Por favor, completa el campo antes de enviar tu respuesta.');
        }
    };
    
    /*const handleClickEliminar = async (questionId) => {
        try {
            await eliminarPregunta(questionId, true);
        } catch (error) {
            warn(t('Ocurrió un error al eliminar la pregunta.'));
        }
    };*/
    
    const handleClickEliminar = async (questionId) => {
        try {
            await eliminarPregunta(questionId, true);
            if (liveList.length <= 1) {
                setLiveList([]);
            } else {
                const updatedList = await GetLiveList(idCanal);
                setLiveList(updatedList);
            }
    
            //success('Pregunta eliminada correctamente.');
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'data not found') {
                setLiveList([]);
                warn('No hay más preguntas disponibles.');
            } else {
                warn(t('Ocurrió un error al eliminar la pregunta.'));
            }
        }
    };
    
    useEffect(() => {
        setVisibleQuestionsCount(3);
    }, [liveList]);

    const toggleShowAll = () => {
        if (showAll) {
            setVisibleQuestionsCount(3);
        } else {
            setVisibleQuestionsCount(liveList.length);
        }
        setShowAll(!showAll);
    };
    
    const getInitials = (name) => {
        if (!name) return "";
        name = name.trim().replace(/\.+$/, '');
    
        const nameArray = name.split(' ').filter(Boolean);
        if (nameArray.length >= 2) {
            const firstName = nameArray[0];
            const firstLastName = nameArray[2] || nameArray[1];
            const initials = (firstName[0] || "") + (firstLastName[0] || "");
            return initials.toUpperCase();
        }
        return nameArray[0] ? nameArray[0][0].toUpperCase() : '';
    };





    
    return(
    <>
        <div className="grid gap-4 lg:shadow-custom-strong dark:bg-color-dark2 lg:p-[2rem] lg:rounded-2xl w-full">
            
             {permisoInstructor===false || permisoInstructor===undefined ? (
                <div className="grid grid-flow-row-dense gap-4 lg:flex lg:flex-wrap lg:gap-0">
                    <div className="lg:w-[30%]">
                        <div className="w-[100%] flex flex-col justify-content-center items-center">
                            <img src={props.instructor.instructorPhoto} className="rounded-full w-[150px] h-[150px] object-cover bg-white"></img>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-largeB text-center font-semibold dark:text-blanco mt-2">{props.instructor.instructorName} </span>
                            {currentLanguage === 'es' ? (
                                <span className="text-medium text-center dark:text-blanco">
                                    {`${t('educadorFuncion')} ${formatNameCurso(nameCurso)}`}
                                </span>
                            ) : (
                                <span className="text-medium text-center dark:text-blanco">
                                    {`${formatNameCurso(nameCurso)} ${t('educadorFuncion')}`}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={"flex-col " + (abrirPregunta ? "flex" : "hidden") + " lg:!flex lg:w-[70%]"}>
                        <span className={"text-left pb-[10px] font-bold lg:hidden dark:text-blanco "+(!abrirPregunta ? "hidden" : "block")}>{t('escribeTuConsulta')}</span>
                        <span className={"text-left pb-[10px] font-semibold hidden lg:block lg:h2 lg:mt-[32px] text-largeB dark:text-blanco"}>{t('dejaTuPregunta')}</span>
                        <textarea className={"h-[100%] w-[100%] dark:border-blanco dark:bg-color-dark2  dark:text-blanco  border-[var(--color-gris-azulado-profundo)] border-2 rounded-[20px] mb-[10px] p-[1rem] min-h-[150px] lg:h-[75px] lg:min-h-[75px] lg:mb-[10px]"} 
                                  placeholder={t('dejaTuOpinion')} 
                                  value={comentario}
                                  onChange={handleComentarioChange}>
                            
                        </textarea>
                        <button className={"boton-primario dark:boton-secundario dark:text-xs dark:font-bold dark:!py-2 " + (!abrirPregunta ? "hidden" : "block") +" lg:block lg:ms-auto lg:w-[auto]"}  onClick={handleSubmitPregunta}>{t('enviarbtn')}</button>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <span className={"text-center pb-[10px] lg:hidden dark:text-blanco  "+(abrirPregunta ? "hidden" : "block")}>{t('tienesDuda')} </span>
                        <button onClick={handleClickOcultar} className={"boton-primario " + (abrirPregunta ? "hidden" : "block") + " lg:hidden lg:ms-auto lg:w-[auto]"}>{t('dejaUnaConsulta')} </button>
                    </div>
                </div>
            
            ) : (
            
                <div className="grid grid-flow-row-dense gap-4 lg:flex lg:flex-wrap lg:gap-0">
                    <div className="lg:w-[30%] mx-auto">
                        <div className="w-[100%] flex flex-col justify-center items-center">
                            <img
                                src={props.instructor.instructorPhoto}
                                className="rounded-full w-[150px] h-[150px] object-cover bg-white"
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-largeB text-center font-semibold dark:text-blanco mt-2">
                                {props.instructor.instructorName}
                            </span>
                            {currentLanguage === 'es' ? (
                                <span className="text-medium text-center dark:text-blanco">
                                    {`${t('educadorFuncion')} ${formatNameCurso(nameCurso)}`}
                                </span>
                            ) : (
                                <span className="text-medium text-center dark:text-blanco">
                                    {`${formatNameCurso(nameCurso)} ${t('educadorFuncion')}`}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            
            )} 
            
            
            <div className="flex flex-col w-full">
                
                {liveList.length > 0 && (
                    <span className="text-largeB font-semibold text-center dark:text-blanco">{t('preguntasFrecuentes')}</span>
                )}
                

                    <div>
                        {liveList.slice(0, visibleQuestionsCount).map((question, ind) => (
                            <div  key={`liveList-${ind}`}>
                        <div className={"flex w-[100%] h-auto"} >
                            {/*<div className="w-[50px] h-[50px] p-[5px]">
                                <img src={question.photo} className="rounded-full w-[40px] h-[40px] object-cover"></img>
                            </div>*/}
                            <div className="w-[50px] h-[50px] p-[5px]">
                                    {question.photo ? (
                                        <img src={question.photo} className="rounded-full w-[40px] h-[40px] object-cover" alt="User Avatar" />
                                    ) : (
                                        <div className="rounded-full w-[40px] h-[40px] bg-gray-400 flex items-center justify-center">
                                            <p className="text-white text-xs font-semibold">{getInitials(question.user_name)}</p>
                                        </div>
                                    )}
                                </div>
                            <div className="w-[calc(100%-50px)]">
                                <div className="flex mt-[10px] font-medium text-small dark:text-blanco">
                                    {question.user_name}
                                </div>
                                <div className="my-[6px]">
                                    <div className="text-medium font-normal dark:text-blanco">
                                        {question.text && (mostrar.id === question.question_id && mostrar.tipo === t('pregunta')) 
                                                ? question.text 
                                                : question.text && (question.text.substring(0, 200) + (question.text.length > 200 ? "..." : ""))}
                                    </div>
                                </div>
                                {question.text && question.text.length > 200 &&
                                        <div className="text-right">
                                            <span className="font-bold cursor-pointer dark:text-blanco" onClick={handleVerMas} id={question.question_id} tipo={t('pregunta')}>
                                                {(mostrar.id === question.question_id && mostrar.tipo === t('pregunta') ) ? t('verMenos')  : t('verMas') }
                                            </span>
                                        </div>
                                    }
                                    <div className="text-small font-normal dark:text-blanco flex gap-4 items-center">
                                        <p>{formatDate(question.created_at)}</p>
                                        {permisoInstructor &&
                                            <>
                                                <div className="flex">
                                                    <div className="flex  items-center " onClick={() => handleClickResponder(question)}> 
                                                        <ResponderFlecha className="dark:!hidden !p-0 h-[20px] w-[25px] cursor-pointer"/>
                                                        <ResponderFlechaDark className=" hidden dark:block !p-0 h-[20px] w-[25px] cursor-pointer"/>
                                                        <p  className="dark:text-white cursor-pointer">{t('responder')}</p>
                                                        
                                                    </div>
                                                
                                                    <div className="flex items-center" onClick={() => handleClickEliminar(question.question_id)}>
                                                        <Iconos icono="eliminar" className="dark:!hidden !p-0 h-[20px] w-[25px] cursor-pointer"/>
                                                        <Iconos icono="Eliminar_white" className=" hidden dark:block !p-0 h-[20px] cursor-pointer"/>
                                                        <p className="dark:text-white cursor-pointer">{t('eliminarEliminar')}</p>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    
                                {responderId === question.question_id && question.answers.length === 0 && (
                                    <div className="flex flex-col mt-4 items-end">
                                        <textarea
                                            className="h-[100%] w-full dark:border-blanco dark:bg-color-dark2 dark:text-blanco border-2 rounded-[20px] p-[1rem] min-h-[75px]"
                                            value={respuesta}
                                            onChange={handleRespuestaChange}
                                            placeholder={t('dejarespuesta')}
                                        />
                                        <div className="flex flex-row gap-2 ">
                                            <button className="boton-primario dark:boton-secundario mt-2" onClick={() => handleSubmitRespuesta(question.question_id)}>
                                                {t('enviarbtn')}
                                            </button>
                                            <button className="boton-warning dark:boton-secundario mt-2" onClick={handleCancelarRespuesta}>
                                                {t('cancelar')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                                    
                                {question.answers.length > 0 && question.answers.map((answer, index) => (
                                    <div key={answer.answer_id} className="flex w-[100%] h-auto mt-3">
                                        <div className="w-[50px] h-[50px] p-[5px]">
                                            <img src={props.instructor.instructorPhoto} className="rounded-full w-[40px] h-[40px] object-cover" alt={`${props.instructor.instructorName}`}></img>
                                        </div> 
                                        <div className="w-[calc(100%-50px)]">
                                            <div className="flex mt-[10px] font-medium text-small dark:text-blanco">
                                                {props.instructor.instructorName}
                                            </div>
                                            <div className="px-[0.25rem] my-[6px] text-medium font-normal dark:text-blanco">
                                                {/*<p>{(mostrar.id == answer.answer_id && mostrar.tipo == t('respuesta') ) ? answer.text : (answer.text?.substring(0, 200) + (answer.text?.length > 200 ? "..." : ""))}</p>*/}
                                                <p>{answer.text}</p>
                                            </div>
                                            {/*
                                            {answer.text?.length > 200 &&
                                            <div className="text-right">
                                                <span className="font-medium text-medium cursor-pointer dark:text-blanco" onClick={handleVerMas} id={answer.answer_id} tipo="respuesta" >
                                                    {(mostrar.id == answer.answer_id && mostrar.tipo == t('respuesta')) ? t('verMenos') : t('verMas')}
                                                </span>
                                            </div>
                                            }
                                            */}
                                            <div className="text-small font-normal dark:text-blanco">
                                                {formatDate(answer.created_at)}
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                        ))}
                    </div>
               {liveList.length > 3 && (
                    <div className="flex justify-center mt-4">
                        <button className="boton-primario" onClick={toggleShowAll}>
                            {showAll ? t('verMenos') : t('verMas')}
                        </button>
                    </div>
                )}
                
            </div>
            
        </div>
    </>)
}

export default Preguntas