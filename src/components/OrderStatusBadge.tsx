import React from 'react';

interface OrderStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  size = 'md',
}) => {
  // Normalizar el estado
  const normalizedStatus = status.toLowerCase();

  const getStatusStyles = () => {
    switch (normalizedStatus) {
      case 'pending':
      case 'pendiente':
        return {
          label: 'Pendiente 🔴',
          classes: 'bg-red-50 text-status-pending border-red-200/50',
        };
      case 'in_preparation':
      case 'en preparación':
      case 'preparacion':
        return {
          label: 'En preparación 🟠',
          classes: 'bg-orange-50 text-status-preparation border-orange-200/50',
        };
      case 'ready':
      case 'listo':
        return {
          label: 'Listo para retirar 🟢',
          classes: 'bg-green-50 text-status-ready border-green-200/50',
        };
      case 'delivered':
      case 'entregado':
        return {
          label: 'Entregado ⚪',
          classes: 'bg-slate-100 text-status-delivered border-slate-200/50',
        };
      default:
        return {
          label: status,
          classes: 'bg-slate-50 text-slate-600 border-slate-200',
        };
    }
  };

  const { label, classes } = getStatusStyles();

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border shadow-sm tracking-wide transition-all ${sizeClasses[size]} ${classes}`}
    >
      {label}
    </span>
  );
};
