import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

import { validarEnBlanco } from '../utils/validaciones';
import { useAlert } from '../providers/AlertContext';
import { apiLogin } from '../api/apiConfig';



export const useLogin = () => {
    

    const navigate = useNavigate();
    //const { userData,setUserData , asynchronous , GetUser } = useUser();
    
    const [error, setError] = useState({ username: null, password: null });
    const [loading, setLoading] = useState(false);
    const { warn } = useAlert();
    
    const [u, setU] = useState(false);
    const [p, setP] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    
    const { data: dataLogin ,error:errorLogin,cargando:cargandoLogin } = apiLogin(trigger,u,p);
    
 
    const login = async (username, password) => {

        setLoading(true);
        setError({ username: null, password: null });
        
        const ValUser = validarEnBlanco(username, "Error usuario");
        const ValPass = validarEnBlanco(password, "Error pass");
        let hasError = false;
        let errors = { username: null, password: null };
        if (!ValUser.valido) {
            errors.username = ValUser.mensaje;
            hasError = true;
        }
        
        if (!ValPass.valido) {
            errors.password  = ValPass.mensaje;
            hasError = true;
        }
        
        if (hasError) {
            setError(errors);
            setLoading(false);
            return;
        }
        
        setU(username);
        setP(password);
        setTrigger(true);
    };
    
    useEffect(() => {
        if (dataLogin && Object.keys(dataLogin).length > 0) {
            const { access_token, refresh_token, token_type } = dataLogin;
            if (access_token && refresh_token && token_type) {
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                localStorage.setItem('typeToken', token_type);
                localStorage.removeItem('modalShown');
                //setLoading(false);
                window.location.reload();
                //navigate(ROUTES.home);
            }
        } else if (errorLogin) {
          setLoading(false);  
          setError({ username: 'Error de autenticación', password: 'Error de autenticación' });
          warn('Usuario o contraseña incorrecta');
        }
    }, [dataLogin, errorLogin ]); 
    
    

    return {  error, loading, login,setU,setP };
};