import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../context/useAuthStore';
import { useCartStore } from '../context/useCartStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { token, user, logout } = useAuthStore();
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown si se hace click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-dark-card border-b border-brand-dark-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl select-none">🍔</span>
              <span className="font-sans font-extrabold text-xl tracking-tight text-white hover:text-brand-orange transition-colors">
                Burger House
              </span>
            </Link>
          </div>

          {/* Acciones del Navbar (Carrito y Perfil) */}
          <div className="flex items-center gap-4">
            {/* Ícono de Carrito con Badge */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-300 hover:text-brand-orange transition-colors"
              aria-label="Ver carrito"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark-card shadow-sm animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Menú de Usuario / CTA Login */}
            {token && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-brand-dark-hover transition-all"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </span>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name || 'Usuario'}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-brand-dark-card rounded-xl border border-brand-dark-border shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-brand-dark-border">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Sesión</p>
                      <p className="text-sm font-bold text-white truncate">{user.name || 'Usuario'}</p>
                    </div>
                    {user.role === 'admin' ? (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-brand-dark-hover hover:text-brand-orange transition-colors"
                      >
                        ⚙️ Panel Admin
                      </Link>
                    ) : (
                      <Link
                        to="/orders"
                        onClick={() => setDropdownOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-brand-dark-hover hover:text-brand-orange transition-colors"
                      >
                        📋 Mis Pedidos
                      </Link>
                    )}
                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-brand-dark-hover hover:text-red-300 transition-colors border-t border-brand-dark-border/40 mt-1"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-bold bg-brand-orange hover:bg-brand-orange-dark text-white rounded-lg transition-all shadow-md shadow-brand-orange/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
