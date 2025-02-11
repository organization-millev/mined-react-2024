// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRefreshToken } from '../api/apiConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
    //const [authenticated, setAuthenticated] = useState(localStorage.getItem('isAuthenticated') == 'true');
    const [triggerRefreshToken, setTriggerRefreshToken] = useState(false);
    const { data: dataRefreshToken, error: errorRefreshToken } = apiRefreshToken(triggerRefreshToken,refreshToken);

    const refreshAccessToken = async () => {
       setTriggerRefreshToken(true);
    };

    useEffect(() => {
        //
        if (dataRefreshToken) {
            const { access_token , refresh_token, token_type } = dataRefreshToken;
            if (access_token && refresh_token && token_type) {
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                localStorage.setItem('typeToken', token_type);
                //localStorage.setItem('isAuthenticated', 'true');
                //setAuthenticated(true);
                setTriggerRefreshToken(false); 
            }
        } else if (errorRefreshToken) {
            
            //localStorage.setItem('isAuthenticated', 'false');
            //setAuthenticated(false);
            setTriggerRefreshToken(false);
        }
    }, [dataRefreshToken, errorRefreshToken]);

    return (
        <AuthContext.Provider value={{ accessToken,refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};


