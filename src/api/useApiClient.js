import axios from 'axios';
import qs from 'qs';


const API_BASE_URL = process.env.REACT_APP_ENDPOINT;
const API_ECOMMERCE_URL = process.env.REACT_APP_ECOMMERCE_ENDPOINT;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const useApiClient = (prefijo = "general") => {
  
  let baseURL = API_BASE_URL
  switch(prefijo){
    case "ecommerce":
      baseURL = API_ECOMMERCE_URL
      break;
    default:
      baseURL = API_BASE_URL
  }
  
  const apiClient = axios.create({ baseURL: baseURL });
  
  apiClient.interceptors.response.use(
     (response) => {
       return response;
     },
     async (error) => {
     const { config, response } = error;
       const originalRequest = config;

     if (response && response.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          originalRequest._retry = true;
         const refreshToken = localStorage.getItem('refreshToken');
         const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };
           const data = qs.stringify({
            refresh_token: refreshToken,
             grant_type: 'refresh_token',
           });
          try {
            const { data: responseData } = await axios.post(
             `${API_BASE_URL}/auth/token`,
               data,
              { headers }
            );
            localStorage.setItem('accessToken', responseData.data.access_token);
            localStorage.setItem('refreshToken', responseData.data.refresh_token);
            apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + responseData.data.access_token;
            processQueue(null, responseData.data.access_token);
            originalRequest.headers['Authorization'] = 'Bearer ' + responseData.data.access_token;
            return apiClient(originalRequest);
            
          } catch (refreshError) {
            
            processQueue(refreshError, null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            sessionStorage.setItem('deviceLimit', 1);
            window.location.href = '/';
            return Promise.reject(refreshError);
            
           } finally {
             isRefreshing = false;
          }
          
         }

         return new Promise((resolve, reject) => {
           failedQueue.push({
             resolve: (token) => {
               originalRequest.headers['Authorization'] = 'Bearer ' + token;
               resolve(apiClient(originalRequest));
             },
             reject: (err) => {
               localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
               window.location.href = '/';
              reject(err);
             },
           });
         });
       }

       return Promise.reject(error);
     }
  );

  return apiClient;
};


//https://15xnr4ex12.execute-api.sa-east-1.amazonaws.com/Dev/auth/token
/*import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = process.env.REACT_APP_ENDPOINT;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const useApiClient = () => {
  const apiClient = axios.create({ baseURL: API_BASE_URL });
 
   
  apiClient.interceptors.response.use(response => {
    return response;
  }, async error => {
    const { config, response } = error;
    const originalRequest = config;
    
    
    
    
    if ( (error && (error.response.request.status === 401 || error.response.request.status === 403)) ) {
      
      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');
      
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };

      try {
        
        const data = qs.stringify({
          refresh_token: refreshToken,
          grant_type: "refresh_token"
        });
        
        const { data: responseData   } = await axios.post(`${API_BASE_URL}/auth/token`, data, { headers });
        
        localStorage.setItem('accessToken', responseData.data.access_token);
        localStorage.setItem('refreshToken', responseData.data.refresh_token);
        apiClient.defaults.headers.common['Authorization'] = 'Bearer ' + responseData.data.access_token;
        processQueue(null, responseData.data.access_token);

        originalRequest.headers['Authorization'] = 'Bearer ' + responseData.data.access_token;
        return axios(originalRequest);
        
      } catch (refreshError) {
        
       
        if(refreshError.response.data.message === "Invalid Refresh Token"){
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }
        
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    
    
    
    return Promise.reject(error);
  });

  return apiClient;
};*/


/* 
    if (error.code && error.code === "ERR_NETWORK" && error.config.url.includes("/auth/user")) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
    }*/

/*import React, {  useContext, useState , useEffect } from 'react';
import axios from 'axios';
import { apiRefreshToken } from '../api/apiConfig';
const API_BASE_URL = process.env.REACT_APP_ENDPOINT;
const MAX_RETRY_COUNT = 1; // Define el máximo número de intentos de reintento

export const useApiClient = () => {
 
  
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');
  const [triggerRefreshToken, setTriggerRefreshToken] = useState(false);
  
  //
  
  const apiClient = axios.create({ baseURL: API_BASE_URL });
  
  
  
  apiClient.interceptors.response.use(response => {
    return response;
  }, async error => {
      const originalRequest = error.config;
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }
      if (originalRequest._retryCount < MAX_RETRY_COUNT) {
        originalRequest._retryCount += 1;
        try {
            //const { data , error , cargando } = apiRefreshToken(triggerRefreshToken,refreshToken);
            //actualizar token apiRefreshToken    
            
            alert("fallo api luis");
            
            const token = "";
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            
            return apiClient(originalRequest);
          
        } catch (error) {
          
        }
      }
    return Promise.reject(error);
  });

  return apiClient;
};
*/
