import React from 'react';
import { AdminOrderCard } from './AdminOrderCard';
import { LoadingSpinner } from './LoadingSpinner';
import type { Order } from '../types';

interface AdminOrderListProps {
  orders: Order[];
  onOrderClick: (orderId: number) => void;
  isLoading?: boolean;
}

export const AdminOrderList: React.FC<AdminOrderListProps> = ({
  orders,
  onOrderClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <LoadingSpinner size="lg" text="Cargando cola de pedidos..." />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-brand-dark-card rounded-2xl border border-brand-dark-border shadow-sm max-w-lg mx-auto font-sans space-y-6">
        <div className="text-5xl select-none">📭</div>
        <div>
          <h3 className="text-lg font-bold text-white">No hay pedidos registrados</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Actualmente no hay ninguna orden que coincida con el filtro seleccionado.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      {orders.map((order) => (
        <AdminOrderCard
          key={order.id}
          order={order}
          onClick={() => onOrderClick(order.id)}
        />
      ))}
    </div>
  );
};
