import React, { createContext, useContext, useState, useEffect } from 'react';

import { apiRefreshToken } from '../api/apiConfig';
import { useUsuario } from '../hooks/useUsuario';

// Definición de constantes para los tipos de curso
const asynchronous = "Asincrónico"; //minedacademy
const synchronous = "Sincrónico"; //minedtv

const UserContext = createContext(null);

const roleDocente = "Instructor";

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    
    const { usuario , GetUser,logout} = useUsuario();
    
    const [ roleUser, setRoleUser] = useState(localStorage.getItem('role') || 'estudiante');
    
    const [ isEducator, setIsEducator ] = useState(false);
    
    useEffect(() => { GetUser(); }, []); 
    
    const initialCourseType = localStorage.getItem('courseType') || asynchronous;
    //

    const [userData, setUserData] = useState({
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
        active_packages: [],
        profiles:[],
        is_type_curse: initialCourseType // Valor por defecto usando constante
    });
    //

    useEffect(() => {
        
        if (usuario) {
            setUserData(prevData => ({
                ...prevData,
                user_id: usuario.user_id || "",
                first_name: usuario.first_name || "",
                last_name: usuario.last_name || "",
                email: usuario.email || "",
                email_verified_at: usuario.email_verified_at || "",
                provider_expiration: usuario.provider_expiration || "",
                provider_status: usuario.provider_status || "",
                remember_token: usuario.remember_token || "",
                created_at: usuario.created_at || "",
                updated_at: usuario.updated_at || "",
                account_flag: usuario.account_flag || "",
                photo: usuario.photo || "",
                active_packages: usuario.active_packages || [], // Mantiene el tipo de curso actual o usa el valor predeterminado
                profiles: usuario.profiles || [],
                is_type_curse: initialCourseType,
            }));
            
            /*if (usuario.roles && usuario.roles.length > 0) {
                //setRoleUser(usuario.roles[0].role_name);
                setRoleUser(roleDocente);
            }*/
            
            if (usuario.roles && usuario.roles.length > 0) {
                const educatorRole = usuario.roles.some(role => role.role_name === "Educador");
                setIsEducator(educatorRole);
                setRoleUser(educatorRole ? roleDocente : usuario.roles[0].role_name);
            }
            
        }
        
    }, [usuario]);
    
    useEffect(() => {
        setUserData(prevData => ({
            ...prevData,
            ...usuario
        }));
    }, [usuario]);
    
    // Función para reiniciar los datos del usuario
    const resetUserData = () => {
        setUserData({
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

    // Actualiza el tipo de curso
    const setCourseType = (type) => {
        setUserData(prevData => ({ ...prevData, is_type_curse: type }));
        localStorage.setItem('courseType', type);
    };
    
    

    // Comprueba si el tipo de curso es asincrónico o sincrónico y devuelve true o false
    const isCourseType = (type) => {
        //
        return userData.is_type_curse === type;
    };
    
    
    // Función para extraer la primera letra del nombre y la segunda del apellido
    const getInitials = () => {
        const firstInitial = userData.first_name.charAt(0).toUpperCase();
        const secondInitial = userData.last_name.charAt(0).toUpperCase();
        return `${firstInitial}${secondInitial}`;
    };
    
    // Función para obtener el nombre completo con límite de caracteres
    const getFullName = (charLimit) => {
        const fullName = `${userData.first_name} ${userData.last_name}`;
        if (fullName.length > charLimit) {
            return `${fullName.substring(0, charLimit)}...`;
        }
        return fullName;
    };
    
    const courseTypeValue = isCourseType(asynchronous) ? 2 : 1;
    
    /*const getActivePackages = () => {
        if (Array.isArray(userData.active_packages)) {
            return userData.active_packages.map(pkg => ({
                permission_name: pkg.cat_txt_name,
                permission_description: pkg.permission_description,
                expiration_date: pkg.expiration_date
            }));
        }
        return [];
    };*/
    
    const getActivePackages = () => {
        if (!Array.isArray(userData.active_packages)) {
            return [];
        }
    
        return userData.active_packages
        .filter(pkg => pkg.cat_txt_name !== null)
        .map(pkg => ({
            permission_name: pkg.cat_txt_name,
            permission_description: pkg.permission_description,
            expiration_date: pkg.expiration_date
        }));
    };
    
    /*const getProfilePicture = () => {
        const currentAvatarId = usuario.profiles?.[0]?.avatar_txt_icon_url;
        const photo = usuario.photo;

        if (currentAvatarId && currentAvatarId !== null) {
            return currentAvatarId;
        } else if (photo) {
            return photo;
        } else {
            const initials = getInitials();
            return initials;
        }
    };*/
    
    const getProfilePicture = () => {
        const currentAvatarId = usuario.profiles?.[0]?.current_avatar_id;
        const avatarTxtIconUrl = usuario.profiles?.[0]?.avatar_txt_icon_url;
        const photo = usuario.photo;
    
        if (currentAvatarId === 0) {
            if (photo) {
                return photo;
            } else {
                const initials = getInitials();
                return initials;
            }
        } else if (currentAvatarId > 0) {
            return avatarTxtIconUrl;
        } else {
            if (photo) {
                return photo;
            } else {
                const initials = getInitials();
                return initials;
            }
        }
    };

    
    // Función para cerrar sesión y borrar datos del usuario
    const logoutC = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('typeToken');
        localStorage.removeItem('courseType');
        resetUserData();
    };
    
   /* 
    localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                localStorage.setItem('typeToken', token_type);*/
    
    return (
        <UserContext.Provider value={{ roleDocente, GetUser,logout, userData, setUserData, setCourseType, isCourseType , asynchronous , synchronous , resetUserData 
                                       ,getInitials , courseTypeValue
                                       ,getFullName,getActivePackages,getProfilePicture,roleUser,isEducator
                                     
            
        }}>
            {children}
        </UserContext.Provider>
    );
};
