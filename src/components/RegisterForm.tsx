import React, { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password || !confirmPassword) {
      setValidationError('Los campos Email, Contraseña y Confirmar contraseña son obligatorios.');
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Por favor ingresa un email válido.');
      return;
    }

    if (password.length < 6) {
      setValidationError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await onSubmit(name, email, password);
    } catch (err) {
      // El error de la API lo maneja el prop 'error'
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {(validationError || error) && (
        <ErrorMessage message={validationError || error || ''} />
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Nombre completo (Opcional)
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Juan Pérez"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@correo.com"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-slate-700 mb-1.5"
        >
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repite tu contraseña"
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all disabled:opacity-50 text-slate-800"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Creando cuenta...</span>
          </>
        ) : (
          <span>Crear cuenta</span>
        )}
      </button>
    </form>
  );
};
