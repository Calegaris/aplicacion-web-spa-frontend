import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-slate-100 flex">
      {/* Sidebar Falso */}
      <aside className="w-64 bg-[#1A1A1A] border-r border-[#262626] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="text-3xl">🍔</span>
            <span className="font-sans font-extrabold text-xl tracking-tight text-white">
              BH Admin
            </span>
          </div>
          <nav className="space-y-2">
            <Link
              to="/admin"
              className="block px-4 py-2.5 rounded-lg bg-brand-orange text-white font-semibold"
            >
              📋 Órdenes
            </Link>
            <Link
              to="/"
              className="block px-4 py-2.5 rounded-lg hover:bg-[#222] text-slate-400 font-medium transition-colors"
            >
              🏪 Menú Público
            </Link>
          </nav>
        </div>
        <div>
          <div className="p-4 bg-[#222] rounded-xl border border-[#262626] mb-4">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Usuario
            </p>
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || 'Administrador'}
            </p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-[#262626]">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Dashboard de Órdenes
          </h1>
          <span className="px-3 py-1 bg-red-950/40 text-red-500 border border-red-900/50 rounded-full font-bold text-xs">
            Modo Administrador
          </span>
        </header>

        <div className="bg-[#1A1A1A] rounded-2xl border border-[#262626] p-12 text-center max-w-2xl mx-auto my-12">
          <div className="text-5xl mb-4">⚙️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Panel del local</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-6">
            Este panel de control se habilitará completamente en la Fase 5 con la gestión de pedidos entrantes y transiciones de estado.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-[#262626] hover:bg-[#333] text-white font-semibold rounded-xl border border-[#333] transition-colors"
          >
            Volver al Menú Público
          </Link>
        </div>
      </main>
    </div>
  );
};
