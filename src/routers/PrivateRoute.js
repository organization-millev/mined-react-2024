import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import WspButton from '../components/common/WspButton/WspButton';

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifica si hay un token de acceso en localStorage
    //return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
    
    return isAuthenticated ? (
        <>
            <Outlet />
            <WspButton />
        </>
    ) : (
        <Navigate to="/" />
    );
};

export default PrivateRoute;
