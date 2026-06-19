import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { apiClient } from '../api/apiClient';
import { useAuthStore, type User } from '../context/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginStore = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Redireccionar a la página anterior o a la raíz por defecto
  const from = (location.state as any)?.from?.pathname || '/';

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // 1. Obtener Token
      const loginResponse = await apiClient.post<{ token: string }>('/auth/login', {
        email,
        password,
      });
      const token = loginResponse.data.token;

      // 2. Temporalmente configurar cabecera para pedir datos de perfil
      const profileResponse = await apiClient.get<User>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = profileResponse.data;

      // 3. Guardar en Zustand (persiste en localStorage)
      loginStore(token, user);

      // 4. Redireccionar según el rol
      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 border border-slate-100">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2 select-none">🍔</div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
            Burger House
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <LoginForm
          onSubmit={handleLoginSubmit}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-6 text-center text-sm font-medium">
          <span className="text-slate-500">¿No tenés cuenta? </span>
          <Link
            to="/register"
            className="text-brand-orange hover:text-brand-orange-dark font-semibold transition-colors"
          >
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
};
