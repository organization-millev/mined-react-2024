import React, { useState,useEffect } from 'react';
import Input from '../common/Input/Input';
import PasswordInput from '../common/PasswordInput/PasswordInput';
//import CustomButton from '../common/CustomButton/CustomButton';
import Traduccion from '../common/Traduccion/Traduccion';
import Loader from '../Loader/Loader'
import { useTranslation } from 'react-i18next';


import { useLogin } from '../../hooks/useLogin';
//import { useAlert } from '../../providers/AlertContext';

const Login = () => {
  
  const { t } = useTranslation();

  const [email, setEmail] = useState('72249');
  const [password, setPassword] = useState('sanchezg');
  //const { warn } = useAlert();
  
  const { error, loading, login,setU,setP } = useLogin();
  
  const handleLoginClick = () => {
    login(email,password);
    //localStorage.removeItem('modalShown');
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
        <div className="relative min-h-screen flex justify-end items-center bg-cover bg-center bg-[url('/assets/images/fondo_mobile_login.png')] lg:bg-[url('/assets/images/fondo-login.png')] md:justify-center md:pr-0 lg:justify-end lg:pr-[110px] 2xl:pr-[179px]">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="w-full max-w-lg lg:justify-end md:justify-center justify-center p-4 relative z-10">
            <div className="bg-gris-azulado-profundo flex justify-center items-center rounded-t-[20px] h-[93px] lg:h-[147px]">
              <img src="../assets/images/MINED_blanco.png" className="h-[30px] w-[152px] lg:h-[57px] lg:w-[290px]" alt="Logo" />
            </div>
            <div className="bg-white rounded-b-[20px] px-[24px] py-[12px] lg:p-8 w-[100%] h-auto shadow-2xl">
              <div className="mb-[12px]">
                <label className="text-[#403E4B] font-sans text-sm mb-[4px]">{t('correoElectronico')} </label>
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
                <label className="text-[#403E4B] font-sans text-sm mb-[4px]">{t('contraseña')} </label>
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
                <button className="boton-primario text-small lg:text-medium font-bold w-full h-[36px] lg:w-[145px] lg:h-[40px]" onClick={handleLoginClick}>{t('btnInciarSesion')} </button>
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
