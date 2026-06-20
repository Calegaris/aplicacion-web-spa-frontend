import React from 'react';
import { Link } from 'react-router-dom';
import { OrderCard } from './OrderCard';
import { LoadingSpinner } from './LoadingSpinner';
import type { Order } from '../types';

interface OrderListProps {
  orders: Order[];
  onOrderClick: (orderId: number) => void;
  isLoading?: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  onOrderClick,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="py-20">
        <LoadingSpinner size="lg" text="Cargando tu historial..." />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto font-sans space-y-6">
        <div className="text-6xl select-none">📦</div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">No tenés pedidos anteriores</h3>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Parece que todavía no realizaste ningún pedido online. ¡Explorá el menú y probá nuestras burgers!
          </p>
        </div>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/15 transition-all"
        >
          Ver el menú
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-sans">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onClick={() => onOrderClick(order.id)}
        />
      ))}
    </div>
  );
};
