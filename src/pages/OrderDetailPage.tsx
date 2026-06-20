import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderDetail } from '../components/OrderDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import type { Order } from '../types';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Al no haber endpoint GET /orders/:id para clientes, recuperamos el historial /orders/me y filtramos
      const response = await apiClient.get<Order[]>('/orders/me');
      const foundOrder = response.data.find((o) => o.id === Number(id));

      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('No se encontró el pedido o no tienes permisos para visualizarlo.');
      }
    } catch (err: any) {
      console.error(err);
      setError('Ocurrió un error al recuperar el detalle del pedido.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleGoBack = () => {
    navigate('/orders');
  };

  const formattedOrderNumber = id ? `#${String(id).padStart(5, '0')}` : '';

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              disabled={isLoading}
              className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-50"
              title="Volver a mis pedidos"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Pedido {formattedOrderNumber}
            </h1>
          </div>

          {!isLoading && !error && (
            <button
              onClick={fetchOrderDetails}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-brand-orange border border-slate-200 hover:border-orange-200 bg-white rounded-lg px-3 py-2 transition-all shadow-sm"
              title="Actualizar estado"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">Actualizar</span>
            </button>
          )}
        </div>

        {error && <div className="mb-6"><ErrorMessage message={error} /></div>}

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" text="Cargando detalle del pedido..." />
          </div>
        ) : (
          order && <OrderDetail order={order} />
        )}
      </div>
    </div>
  );
};
