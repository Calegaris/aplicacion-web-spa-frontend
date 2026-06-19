import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

export const HomePage: React.FC = () => {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 border border-slate-100 text-center">
        <div className="text-6xl mb-4 select-none">🍔</div>
        <h1 className="text-4xl font-extrabold text-slate-900 font-sans tracking-tight mb-2">
          Burger House - SPA
        </h1>
        <p className="text-slate-500 mb-8 font-medium">
          Menú y Catálogo (Vista Temporal - Fase 1)
        </p>

        {token && user ? (
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-8 inline-block text-left w-full max-w-md">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Sesión Activa</h2>
            <p className="text-sm text-slate-600 mb-1">
              <strong className="font-semibold text-slate-700">Nombre:</strong> {user.name || 'Sin nombre'}
            </p>
            <p className="text-sm text-slate-600 mb-1">
              <strong className="font-semibold text-slate-700">Email:</strong> {user.email}
            </p>
            <p className="text-sm text-slate-600 mb-3">
              <strong className="font-semibold text-slate-700">Rol:</strong>{' '}
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 text-brand-orange border border-orange-200">
                {user.role}
              </span>
            </p>
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors text-sm shadow-md shadow-red-500/10"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center mb-8">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-lg shadow-md shadow-brand-orange/10 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
            >
              Registrarse
            </Link>
          </div>
        )}

        <div className="border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Rutas de Prueba
          </h3>
          <div className="flex flex-wrap gap-3 justify-center text-sm font-medium">
            <Link
              to="/cart"
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-600 transition-all"
            >
              🛒 Carrito (Público)
            </Link>
            <Link
              to="/checkout"
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-600 transition-all"
            >
              💳 Checkout (Cliente)
            </Link>
            <Link
              to="/orders"
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-600 transition-all"
            >
              📋 Mis Órdenes (Cliente)
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg text-slate-600 transition-all"
            >
              ⚙️ Admin (Admin)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
