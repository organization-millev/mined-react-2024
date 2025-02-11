import React, { useState,useEffect } from 'react';
import Input from '../common/Input/Input';
import PasswordInput from '../common/PasswordInput/PasswordInput';
//import CustomButton from '../common/CustomButton/CustomButton';
import Traduccion from '../common/Traduccion/Traduccion';
import Loader from '../Loader/Loader'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
//import { useAlert } from '../../providers/AlertContext';
import { toast } from 'react-toastify';

const Login = () => {
  
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const { warn } = useAlert();
  
  const { error, loading, login,setU,setP } = useLogin();
  
  const isButtonDisabled = !email || !password;
  
  const location = useLocation();
    // Captura de parámetros de la URL
  
  useEffect(() => {
    // Obtenemos el valor directamente de sessionStorage
    const deviceLimit = parseInt(sessionStorage.getItem('deviceLimit')) || 0;

    if (deviceLimit === 1) {
      toast.warn("Dispositivos máximos permitidos por usuario: 1");
      // Cambiamos el valor en sessionStorage a 0
      sessionStorage.setItem('deviceLimit', 0);
    }
  }, []); // Ejecuta solo una vez al montar el componente
  
  const handleLoginClick = () => {
    login(email,password);
  };
  
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isButtonDisabled) {
      handleLoginClick();
    }
  };
  
  
  useEffect(() => {
      if (error.username || error.password) {
          setEmail('');
          setPassword('');
      }
  }, [error]);
    
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative min-h-screen flex justify-end items-center bg-cover bg-center bg-[url('/assets/images/loginMobile.png')] lg:bg-[url('/assets/images/loginDesktop.jpg')] md:justify-center md:pr-0 lg:justify-end lg:pr-[110px] 2xl:pr-[179px]"
          onKeyDown={handleKeyDown} >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="w-full max-w-[500px] lg:w-[500px]  lg:justify-end md:justify-center justify-center p-4 relative z-10">
            <div className="bg-[#0D0D14] lg:w-[500px] flex justify-center items-center rounded-t-[20px] h-[93px] lg:h-[122px]">
              <div className="h-[48px] lg:h-[57px] ">
                <img 
                  src="../assets/images/Logo_Mined_Academy.png" 
                  className="h-full object-contain" 
                  alt="Logo" 
                />
              </div>
            </div>

            <div className="bg-gris-grafito-claro lg:w-[500px] rounded-b-[20px] px-[24px] py-[12px] lg:px-8 lg:py-4 w-[100%] h-auto shadow-2xl">
              <div className="mb-[12px]">
                <label className="text-[#292735]  font-sans text-sm mb-[4px] font-medium">{t('correoElectronico')} </label>
                <Input
                  type="text"
                  name="email"
                  placeholder={t('ingresaCorreo')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error.username ? 'border-rojo-coral placeholder-rojo-coral' : ''}
                />
              </div>
              <div className="mb-[20px]">
                <label className="text-[#292735] font-sans text-sm mb-[4px] font-medium">{t('contraseña')} </label>
                <PasswordInput
                  type="password"
                  name="password"
                  placeholder={t('ingresaContraseña')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error.password ? 'border-rojo-coral placeholder-rojo-coral' : ''}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className={`boton-primario !bg-[#0D0D14] hover:opacity-70 transition ease-in-out duration-300 text-small lg:text-medium font-bold w-full h-[36px] lg:w-[145px] lg:h-[40px] ${isButtonDisabled ? 'opacity-50 ' : ''}`}                  
                  onFocus={(e) => e.target.style.transform = 'scale(1.05)'}
                  onBlur ={(e) => e.target.style.transform = 'scale(1)'}
                  onClick={handleLoginClick}
                  //disabled={isButtonDisabled}
                >
                  {t('btnInciarSesion')}
                </button>              
                </div>
                
              {/*
              <div className="mt-4 text-center font-sans text-gris-azulado-profundo text-small lg:text-sm font-bold">
                <a href="https://mined.vip/registro.php" className="underline" target="_blank" rel="noopener noreferrer">{t('btnRegistrarse')} </a>
              </div>
              */}
              
              <div className="text-right">
                <Traduccion />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
