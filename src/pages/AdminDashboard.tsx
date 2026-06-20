import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusFilter } from '../components/StatusFilter';
import { AdminOrderList } from '../components/AdminOrderList';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import type { Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiClient.get<Order[]>('/orders');
      setOrders(response.data);
    } catch (err: any) {
      console.error(err);
      setError('Ocurrió un error al cargar la cola de pedidos de administración.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderClick = (orderId: number) => {
    navigate(`/admin/orders/${orderId}`);
  };

  // Filtrado local
  const filteredOrders = orders.filter((order) => {
    if (!activeStatus) return true;
    return order.status.toLowerCase() === activeStatus.toLowerCase();
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Cola de Pedidos
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Visualiza y administra las fases de preparación de los pedidos de Burger House.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={isLoading}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white border border-brand-dark-border hover:border-slate-500 bg-brand-dark-card rounded-xl px-4 py-2.5 transition-all shadow-sm disabled:opacity-50"
        >
          <span>🔄</span>
          <span>Actualizar</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Selector de Filtros */}
      <div className="border-b border-brand-dark-border/40 pb-3">
        <StatusFilter activeStatus={activeStatus} onStatusSelect={setActiveStatus} />
      </div>

      {/* Lista de Pedidos */}
      <AdminOrderList
        orders={filteredOrders}
        onOrderClick={handleOrderClick}
        isLoading={isLoading}
      />
    </div>
  );
};
