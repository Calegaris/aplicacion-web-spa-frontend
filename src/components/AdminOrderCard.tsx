import React from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { Order } from '../types';

interface AdminOrderCardProps {
  order: Order;
  onClick: () => void;
}

export const AdminOrderCard: React.FC<AdminOrderCardProps> = ({
  order,
  onClick,
}) => {
  const formattedOrderNumber = `#${String(order.id).padStart(5, '0')}`;

  const formattedDate = new Date(order.createdAt).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedTotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(order.items.reduce((acc, item) => acc + Number(item.unitPrice) * item.quantity, 0));

  return (
    <div
      onClick={onClick}
      className="group bg-brand-dark-card border border-brand-dark-border hover:border-brand-orange p-5 rounded-2xl shadow-sm hover:shadow-xl hover:bg-brand-dark-hover transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-base font-extrabold text-white group-hover:text-brand-orange transition-colors">
            Orden {formattedOrderNumber}
          </span>
          <span className="text-slate-600 font-bold hidden sm:inline">•</span>
          <span className="text-sm font-bold text-slate-300">{order.customerName}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
          <span>📅 {formattedDate} hs</span>
          <span>|</span>
          <span>{order.deliveryType === 'delivery' ? '🛵 Envío' : '🏪 Retiro'}</span>
          <span>|</span>
          <span>🍔 {order.items.reduce((acc, item) => acc + item.quantity, 0)} items</span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-brand-dark-border/40 pt-3 sm:border-t-0 sm:pt-0 shrink-0">
        <OrderStatusBadge status={order.status} size="sm" />
        <div className="flex items-center gap-2">
          <span className="text-base font-black text-white">{formattedTotal}</span>
          <span className="text-slate-600 group-hover:text-brand-orange group-hover:translate-x-0.5 transition-all text-sm font-black select-none">
            ➔
          </span>
        </div>
      </div>
    </div>
  );
};
