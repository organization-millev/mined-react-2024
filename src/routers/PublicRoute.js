import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken'); // Verifica si hay un token de acceso en localStorage

    return isAuthenticated ? <Navigate to="/home" /> : children;
};

export default PublicRoute;
