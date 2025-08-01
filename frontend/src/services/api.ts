import axios from "axios"
import { getToken, setToken, getRefreshToken } from "../utils/token"
import { triggerSessionExpired } from '@/contexts/AuthContext';

const BASE_URL = import.meta.env.VITE_API_URL
console.log(BASE_URL)
export const api = axios.create({
    
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }

});

api.interceptors.request.use((config) =>{
    const token = getToken();
    if (token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // No hacer refresh en estas rutas
    const noRefreshPaths = ['/auth/login', '/auth/register', '/auth/refresh'];
    const isNoRefreshPath = noRefreshPaths.some(path => originalRequest?.url?.includes(path));   

    // Si es error 401 y no hemos intentado refresh aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

    // Si no corresponde hacer refresh, dispara sesión expirada directo
      if (isNoRefreshPath) {
        triggerSessionExpired(); // <-- recuperamos esto
        return Promise.reject(error);
      }  

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const refreshResponse = await api.post('/auth/refresh', {
          refresh_token: refreshToken
        });

        if (refreshResponse.data?.access_token) {
          const newAccessToken = refreshResponse.data.access_token;
          setToken(newAccessToken);

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          throw new Error('Invalid refresh response format');
        }

      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        
        triggerSessionExpired();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
