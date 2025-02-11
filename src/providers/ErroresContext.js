import React, { createContext, useContext } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useLocation } from 'react-router-dom';

const ErroresContext = createContext();

export const useErrores = () => useContext(ErroresContext);

export const ErroresProvider = ({ children }) => {
    
  const navigate = useNavigate();
  const location = useLocation();

  const handleError = (error, info) => {
    
    const currentDate = new Date().toLocaleString();
    
    
    
    
    

    /*if (process.env.REACT_APP_DEBUG === 'false') {
      window.location.href = '/home';
    }*/
  };

  return (
    <ErroresContext.Provider value={{}}>
      <ErrorBoundary FallbackComponent={null} onError={handleError}>
        {children}
      </ErrorBoundary>
    </ErroresContext.Provider>
  );
};
