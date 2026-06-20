import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/useCartStore';
import { useAuthStore } from '../context/useAuthStore';
import { CartItem } from '../components/CartItem';
import { CartSummary } from '../components/CartSummary';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, updateQuantity, removeItem } = useCartStore();
  const { token } = useAuthStore();

  const handleCheckout = () => {
    if (token) {
      navigate('/checkout');
    } else {
      // Si no hay login, guardar destino de checkout en el router
      navigate('/login', {
        state: { from: { pathname: '/checkout' } },
      });
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  // Carrito Vacío
  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-100 p-8 border border-slate-100 text-center space-y-6">
          <div className="text-6xl animate-bounce duration-1000 select-none">🛒</div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Tu carrito está vacío</h1>
            <p className="text-sm text-slate-400 mt-2">
              ¿Aún no te decidiste? Recorré nuestro menú y encontrá la burger perfecta.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/15 transition-all text-center"
          >
            Ver el menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado y botón volver */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-500"
            title="Volver"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mi Carrito</h1>
        </div>

        {/* Layout de dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Listado de items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-2">
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 text-sm font-medium text-slate-500">
              <span>Items en carrito:</span>
              <span className="font-bold text-slate-800">
                {items.reduce((acc, item) => acc + item.quantity, 0)} unidades
              </span>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={total}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
