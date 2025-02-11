import React, {useState, useRef, useEffect } from 'react';
//import { Modal, Button } from 'react-bootstrap';
import Modal from "../components/common/Modal/Modal";
import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';


const SessionTimeOut = ({ onSessionTimeout  }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const showModalRef = useRef(showModal);
  const [remainingTime, setRemainingTime] = useState(10);
  let timer = null;
  let modalTimer = null;
  let countdownTimer = useRef(null);
  const SESSION_TIMEOUT = 2 * 60 * 60 * 1000;
  //const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 min
  //const SESSION_TIMEOUT = 2 * 60 * 1000; //2min


  
  useEffect(() => {
    showModalRef.current = showModal;
  }, [showModal]);
  
  const seccionTimeOutRedirect = ()=>{ 
    clearInterval(modalTimer);
    clearInterval(countdownTimer.current);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('typeToken');
    localStorage.removeItem('courseType');
    localStorage.removeItem('sessionExpiration');
    handleCloseModal();
    navigate('/');
  }
  
  
  const resetTimer = () => {
    const expirationTime = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('sessionExpiration', expirationTime);
    
    
    // Usar la referencia actualizada para verificar si el modal está visible
    if (showModalRef.current) {
      return; // No hacer nada si el modal está visible
    }

    clearTimeout(timer);
    clearTimeout(modalTimer);
    clearInterval(countdownTimer.current);
    
    // Recuperar el valor una vez y usarlo en las comprobaciones
    const accessToken = localStorage.getItem('accessToken');
     
    if (accessToken && accessToken !== "null" && accessToken !== "false") {
      timer = setTimeout(() => {
          setShowModal(true);
          setRemainingTime(10);
          modalTimer = setInterval(() => {
            setRemainingTime(prevTime => {
              //if (prevTime <= 1 ) {
                //window.location.reload();
                //seccionTimeOutRedirect()
                //
              //}
              if (prevTime <= 1 ) {
                seccionTimeOutRedirect();
                clearInterval(modalTimer);
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
      }, SESSION_TIMEOUT);//7200000

      let countdown = SESSION_TIMEOUT / 100;//7200
      //
      countdownTimer.current = setInterval(() => {
          countdown--;
          //console.log(`El modal aparecerá en ${Math.floor(countdown / 60)} minutos y ${countdown % 60} segundos`);
          if (countdown <= 0) {
              clearInterval(countdownTimer.current);
          }
      }, 1000);
      
    }
    
  };
  
  const checkSessionExpiration = () => {
    const expirationTime = localStorage.getItem('sessionExpiration');
    if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
      seccionTimeOutRedirect(); // Si la sesión ha expirado, redirige al login
    }
  };
  
  /*useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timer);
      clearInterval(modalTimer);
      clearInterval(countdownTimer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);*/
  
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkSessionExpiration(); // Verifica si la sesión ha expirado cuando la página vuelve a ser visible
      }
    });

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // Restablece el temporizador al cargar la página
    
    return () => {
      clearTimeout(timer);
      clearInterval(modalTimer);
      clearInterval(countdownTimer.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, []);

  
  const handleCloseModal = () => {
    clearInterval(modalTimer);
    setShowModal(false);
    resetTimer();
  };

  return (
    <div>
      <Modal show={showModal} onClose={handleCloseModal} className="font-sans flex flex-col gap-2">
        <Modal.Header onClose={handleCloseModal}>
          <h2 className="font-bold">{t('inactividadTitle')}</h2>
        </Modal.Header>
        <p>{t('inactividadSubTitle')}</p>
        <div className="flex flex-col gap-2 md:flex-row justify-between">
          <button onClick={handleCloseModal} className="boton-primario">{t('continuar')} ({remainingTime} {t('segundos')})</button>
          <button onClick={seccionTimeOutRedirect} className="boton-primario">{t('btnCerrarSesion')}</button>
        </div>
      </Modal>
    </div>
  );
};

export default SessionTimeOut;