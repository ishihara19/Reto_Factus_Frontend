import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getToken, removeToken, removeRefreshToken } from '@/utils/token';
import { userMe } from '@/services/authService';
import type { Datum } from '@/types/user';

// Tipos para el contexto
interface AuthContextType {
  user: Datum | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sessionExpired: boolean; // 👈 Nuevo estado
  login: (userData: Datum) => void;
  logout: (isExpired?: boolean) => void; // 👈 Parámetro opcional
  updateUser: (userData: Partial<Datum>) => void;
  clearSessionExpired: () => void; // 👈 Nueva función
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props del provider
interface AuthProviderProps {
  children: ReactNode;
}

// Variable global para el logout (para usar en interceptors)
let globalLogout: ((isExpired?: boolean) => void) | null = null;

export const setGlobalLogout = (logoutFn: (isExpired?: boolean) => void) => {
  globalLogout = logoutFn;
};

// Función helper para usar en interceptors
export const triggerSessionExpired = () => {
  console.log("[triggerSessionExpired] Sesión expirada");
  if (globalLogout) {
    globalLogout(true);
  }
};

// Provider del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Datum | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false); // 👈 Nuevo estado

  // Función para obtener datos del usuario desde la API
  const fetchUserData = async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      // Llamada a tu endpoint para obtener datos del usuario
      const res = await userMe();
      setUser(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Si hay error, limpiamos los tokens
      removeToken();
      removeRefreshToken();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar datos del usuario al iniciar
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para hacer login
  const login = (userData: Datum) => {
    setUser(userData);
    setSessionExpired(false); // 👈 Limpiar estado de expiración
  };

  // Función para hacer logout
  const logout = (isExpired: boolean = false) => {
    removeToken();
    removeRefreshToken();
    setUser(null);
    
    if (isExpired) {
      setSessionExpired(true); // 👈 Marcar como expirada
    } else {
      // Si es logout manual, redirigir inmediatamente
      window.location.href = '/auth/login';
    }
  };

  // Función para limpiar estado de sesión expirada
  const clearSessionExpired = () => {
    setSessionExpired(false);
  };

  // Función para actualizar datos del usuario
  const updateUser = (userData: Partial<Datum>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  // Configurar el logout global cuando se monta el componente
  useEffect(() => {
    setGlobalLogout(logout);
    
    // Cleanup al desmontar
    return () => {
      globalLogout = null;
    };
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    sessionExpired, // 👈 Exponer el estado
    login,
    logout,
    updateUser,
    clearSessionExpired, // 👈 Exponer la función
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};