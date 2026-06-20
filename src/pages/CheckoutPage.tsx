import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/useCartStore';
import { useAuthStore } from '../context/useAuthStore';
import { CheckoutForm } from '../components/CheckoutForm';
import type { CheckoutData } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, total } = useCartStore();
  const { user } = useAuthStore();

  // Validar si el carrito está vacío en la carga
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [items, navigate]);

  const handleFormSubmit = (data: CheckoutData) => {
    // Pasar los datos del formulario a la página de confirmación previa vía state de navegación
    navigate('/checkout/confirm', {
      state: { checkoutData: data },
    });
  };

  const handleGoBack = () => {
    navigate('/cart');
  };

  // Pre-cargar datos del usuario autenticado si existen
  const initialData: Partial<CheckoutData> = {
    name: user?.name || '',
    email: user?.email || '',
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-500"
            title="Volver al carrito"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout</h1>
        </div>

        {/* Formulario y Resumen */}
        <div className="grid grid-cols-1 gap-8">
          <div>
            <CheckoutForm
              onSubmit={handleFormSubmit}
              initialData={initialData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
