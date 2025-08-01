// components/SessionExpiredModal.tsx
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const SessionExpiredModal: React.FC = () => {
  const { sessionExpired, clearSessionExpired } = useAuth();

  if (!sessionExpired) return null;

  const handleLogin = () => {
    clearSessionExpired();
    window.location.href = '/auth/login';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          {/* Icono de advertencia */}
          <div className="mb-4">
            <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg 
                className="h-6 w-6 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>
          </div>

          {/* Título */}
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Sesión Expirada
          </h2>

          {/* Mensaje */}
          <p className="text-gray-600 mb-6">
            Tu sesión ha expirado, por tu seguridad. Por favor, inicia sesión nuevamente para continuar.
          </p>

          {/* Botón */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;