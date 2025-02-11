import React, {  useEffect,useState  } from 'react';
import { apiGetUser } from '../api/apiConfig';

const asynchronous = "Asincrónico"; //minedacademy
const synchronous = "Sincrónico"; //minedtv


export const useUsuario = () => {
    
    const [triggerUser, setTriggerUser] = useState(false);
    
    const { data: dataUser , error:errorUser, cargando:cargandoUser } = apiGetUser(triggerUser);
    
    const initialCourseType = localStorage.getItem('courseType') || asynchronous;
    
    const [usuario, setUsuario] = useState({
        user_id:"",
        first_name: "",
        last_name: "",
        email: "",
        email_verified_at: "",
        provider_expiration: "",
        provider_status: "",
        remember_token: "",
        created_at: "",
        updated_at: "",
        account_flag: "",
        photo: "",
        active_packages: "",
        is_type_curse:  initialCourseType, 
    });

    useEffect(() => {
        
        if (dataUser && Array.isArray(dataUser) && dataUser.length > 0) {
            
            const {
                user_id,
                provider_id,
                first_name,
                last_name,
                email,
                email_verified_at,
                provider_expiration,
                provider_status,
                remember_token,
                created_at,
                updated_at,
                account_flag,
                photo,
                code_country,
                active_packages,
                roles,
                profiles,
            } = dataUser[0];
            

            setUsuario({
                user_id: user_id || "",
                first_name: first_name || "",
                last_name: last_name || "",
                email: email || "",
                email_verified_at: email_verified_at || "",
                provider_expiration: provider_expiration || "",
                provider_status: provider_status || "",
                remember_token: remember_token || "",
                created_at: created_at || "",
                updated_at: updated_at || "",
                account_flag: "", // Asigna el valor adecuado si está disponible
                photo: photo,
                active_packages: active_packages || [],
                provider_id: provider_id || "",
                account_flag: account_flag || "",
                code_country: code_country || "",
                roles: roles || [],
                profiles: profiles || [],
            });
            
            // Guardar nombre, apellido y correo en localStorage
            localStorage.setItem("first_name", first_name || "");
            localStorage.setItem("last_name", last_name || "");
            localStorage.setItem("email", email || "");
            
        }else if(errorUser) {
            
        }
        
    }, [dataUser, errorUser ]); 
    
    const GetUser = () => {
      setTriggerUser(true);
    };
    
    const resetUserData = () => {
        setUsuario({
            user_id: "",
            first_name: "",
            last_name: "",
            email: "",
            email_verified_at: "",
            provider_expiration: "",
            provider_status: "",
            remember_token: "",
            created_at: "",
            updated_at: "",
            account_flag: "",
            photo: "",
            active_packages: [],
            is_type_curse: initialCourseType // Valor por defecto usando constante
        });
    };
    
    const getActivePackages = () => {
        return usuario.active_packages.map(pkg => ({
            permission_name: pkg.permission_name,
            permission_description: pkg.permission_description,
            expiration_date: pkg.expiration_date
        }));
    };
    
    const getProfilePicture = () => {
        const currentAvatarId = usuario.profiles?.[0]?.current_avatar_id;
        const photo = usuario.photo;

        if (currentAvatarId) {
            // Aquí puedes construir la URL para el avatar basado en el current_avatar_id
            return `https://www.imgacademy.com/sites/default/files/img-academy-boarding-school-worlds-most-dedicated.jpg`; // Asegúrate de usar la URL correcta
        } else if (photo) {
            return photo;
        } else {
            // Retorna las iniciales del nombre si no hay avatar ni foto
            const initials = `${usuario.first_name?.[0] || ''}${usuario.last_name?.[0] || ''}`.toUpperCase();
            return initials;
        }
    };
    
    const logout = () => {
        // Borrar tokens de autenticación del almacenamiento local
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('typeToken');
        localStorage.removeItem('courseType');

        // Resetear datos del usuario
        resetUserData();
    };

    
    
   /*useEffect(() => {
       if(triggerUser){
           setTriggerUser(false);
       }
    }, [triggerUser]);*/
    
    
    
    
    
    const [logros,setLogros] = useState({
        logros:[],
        cargando:true
    })
    
    const loadLogros = () => 
      
        setLogros(prevState => ({
            ...prevState,
            logros:[{
            id_logro:"1",
            medalla:"oro",
            puntos:"100",
            logro:"Índices",
            desafio:"Mira 3 clases seguidas de Índices",
            tipo:"clases",
            logrado:"3",
            total:"3",
            desbloqueo:true,
            titulo:"Nombre de titulo"
        },
        {
            id_logro:"2",
            medalla:"oro",
            puntos:"100",
            logro:"Crypto",
            desafio:"Mira 3 clases seguidas de Crypto",
            tipo:"clases",
            logrado:"3",
            total:"5",
            desbloqueo:false,
            titulo:"Nombre de titulo"
        }]}
        )
      
     )
    
    const loadUsuario = () => {
        
        setUsuario(prevState => ({
            ...prevState,
            nombres:"Juan ",
            apellidos:"Pérez",
            foto:"../assets/images/perfil-color.png",
            codigo:"544TF5R7",
            paquetes:[
                {paquete:"E-Commerce",codigo:"BECA00",vencimiento:"2025-12-31"},
                {paquete:"E-Commerce",codigo:"BECA00",vencimiento:"2025-12-31"},
                {paquete:"E-Commerce",codigo:"BECA00",vencimiento:"2025-12-31"},
                ],
            cargando:true
        }))
    }
    
    
    
    return {usuario,logros,loadLogros, logout,GetUser,getActivePackages,getProfilePicture}
}