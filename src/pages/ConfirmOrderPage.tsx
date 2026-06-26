import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../context/useCartStore';
import { OrderSummary } from '../components/OrderSummary';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import type { CheckoutData } from '../types';

export const ConfirmOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, total, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const checkoutData = (location.state as any)?.checkoutData as CheckoutData;

  // Redirigir si no hay datos de checkout o el carrito está vacío (solo al montar)
  useEffect(() => {
    if (!checkoutData) {
      navigate('/checkout', { replace: true });
    } else if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmOrder = async () => {
    if (!checkoutData || items.length === 0) return;
    setIsLoading(true);
    setError('');

    try {
      // Enviar el pedido incluyendo directamente los ítems en el cuerpo de la petición
      const orderResponse = await apiClient.post('/orders', {
        name: checkoutData.name,
        email: checkoutData.email,
        phone: checkoutData.phone,
        deliveryType: checkoutData.deliveryType,
        address: checkoutData.address,
        paymentMethod: checkoutData.paymentMethod,
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      });

      const order = orderResponse.data;

      // 3. Limpiar carrito local
      clearCart();

      // 4. Redirigir a pantalla de éxito
      navigate('/checkout/success', {
        state: { orderId: order.id },
        replace: true,
      });
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Ocurrió un error al confirmar tu pedido. Por favor, reintenta.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/checkout', {
      state: { checkoutData },
    });
  };

  if (!checkoutData || items.length === 0) return null;

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleGoBack}
            disabled={isLoading}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-50"
            title="Volver y editar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Confirmar Pedido</h1>
        </div>

        {error && <div className="mb-6"><ErrorMessage message={error} /></div>}

        <div className="space-y-6">
          {/* Resumen del Pedido */}
          <OrderSummary
            items={items}
            customerName={checkoutData.name}
            deliveryType={checkoutData.deliveryType}
            deliveryAddress={checkoutData.address}
            paymentMethod={checkoutData.paymentMethod}
            total={total}
          />

          {/* Botón de Confirmación */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total a Pagar</p>
              <p className="text-2xl font-black text-slate-950">
                {new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 0,
                }).format(total)}
              </p>
            </div>

            <button
              onClick={handleConfirmOrder}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Procesando Pedido...</span>
                </>
              ) : (
                <span>Confirmar y Enviar Pedido 🚀</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
