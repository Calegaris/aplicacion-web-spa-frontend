import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderList } from '../components/OrderList';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import type { Order } from '../types';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await apiClient.get<Order[]>('/orders/me');
        setOrders(response.data);
      } catch (err: any) {
        console.error(err);
        setError('Ocurrió un error al cargar tus pedidos. Por favor, reintenta.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={handleGoBack}
            className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-500"
            title="Volver al menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mis Pedidos</h1>
        </div>

        {error && <div className="mb-6"><ErrorMessage message={error} /></div>}

        <div className="space-y-6">
          <OrderList
            orders={orders}
            onOrderClick={handleOrderClick}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
