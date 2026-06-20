import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-brand-dark-base text-slate-100 font-sans">
      {/* Sidebar Fijo Izquierdo */}
      <aside className="w-64 bg-brand-dark-card border-r border-brand-dark-border p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl select-none">🍔</span>
            <span className="font-sans font-extrabold text-xl tracking-tight text-white">
              BH Admin
            </span>
          </div>

          {/* Navegación */}
          <nav className="space-y-1.5">
            <Link
              to="/admin"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                isActive('/admin') || location.pathname.startsWith('/admin/orders')
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/15'
                  : 'text-slate-400 hover:bg-brand-dark-hover hover:text-white'
              }`}
            >
              <span>📋</span>
              <span>Pedidos Entrantes</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-brand-dark-hover hover:text-white transition-all"
            >
              <span>🏪</span>
              <span>Menú Público</span>
            </Link>
          </nav>
        </div>

        {/* Perfil del Administrador */}
        <div className="space-y-4 pt-6 border-t border-brand-dark-border/40">
          <div className="p-3.5 bg-brand-dark-hover rounded-xl border border-brand-dark-border text-xs leading-relaxed">
            <p className="font-bold text-slate-500 uppercase tracking-wider mb-0.5">Rol</p>
            <p className="font-extrabold text-brand-orange mb-2">Administrador</p>
            <p className="font-bold text-white truncate">{user?.name || 'Administrador'}</p>
            <p className="text-slate-400 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 bg-red-950/30 hover:bg-red-900/40 text-red-400 hover:text-red-300 font-bold border border-red-900/50 rounded-xl transition-all text-sm flex items-center justify-center gap-1.5"
          >
            <span>⏻</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Area de Contenido Derecho */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header Superior */}
        <header className="h-16 border-b border-brand-dark-border bg-brand-dark-card flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-white font-sans tracking-tight">
              Burger House
            </h2>
            <span className="text-slate-500">/</span>
            <span className="text-xs font-bold text-slate-400 bg-brand-dark-hover border border-brand-dark-border px-2 py-0.5 rounded">
              Panel de Control
            </span>
          </div>
          <span className="px-3 py-1 bg-red-950/40 text-red-500 border border-red-900/40 rounded-full font-bold text-xs">
            Modo Administrador
          </span>
        </header>

        {/* Contenido Principal */}
        <main className="flex-grow p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
