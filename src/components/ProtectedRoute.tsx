import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // Si no está autenticado, redirigir a /login y recordar la ubicación previa
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere rol de admin y el usuario es regular, redirigir a la raíz
  if (requiredRole === 'admin' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si requiere rol de cliente (user) y el usuario es admin, redirigir al panel de admin
  if (requiredRole === 'user' && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
