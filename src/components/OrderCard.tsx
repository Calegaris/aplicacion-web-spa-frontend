import React from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const formattedOrderNumber = `#${String(order.id).padStart(5, '0')}`;

  const formattedDate = new Date(order.createdAt).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(order.total || order.items.reduce((acc, item) => acc + Number(item.unitPrice) * item.quantity, 0));

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 font-sans hover:-translate-y-0.5"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-base font-black text-slate-900 group-hover:text-brand-orange transition-colors">
            Orden {formattedOrderNumber}
          </span>
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-slate-400 font-medium">
          <span>📅 {formattedDate} hs</span>
          <span className="hidden sm:inline text-slate-200">|</span>
          <span>🍔 {order.items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-base font-black text-slate-950">{formattedTotal}</span>
        <span className="text-slate-400 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all text-lg font-extrabold select-none">
          ➔
        </span>
      </div>
    </div>
  );
};
