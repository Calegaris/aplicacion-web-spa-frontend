import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { apiClient } from '../api/apiClient';
import { useAuthStore, type User } from '../context/useAuthStore';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const loginStore = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegisterSubmit = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError('');

    try {
      // 1. Registrar usuario
      await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      // 2. Iniciar sesión automáticamente
      const loginResponse = await apiClient.post<{ token: string }>('/auth/login', {
        email,
        password,
      });
      const token = loginResponse.data.token;

      // 3. Obtener datos de perfil
      const profileResponse = await apiClient.get<User>('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = profileResponse.data;

      // 4. Guardar en Zustand
      loginStore(token, user);

      // 5. Redireccionar al menú principal
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error al registrar la cuenta. Inténtalo de nuevo.');
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
            Crea tu cuenta gratis en un paso
          </p>
        </div>

        <RegisterForm
          onSubmit={handleRegisterSubmit}
          isLoading={isLoading}
          error={error}
        />

        <div className="mt-6 text-center text-sm font-medium">
          <span className="text-slate-500">¿Ya tenés cuenta? </span>
          <Link
            to="/login"
            className="text-brand-orange hover:text-brand-orange-dark font-semibold transition-colors"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
