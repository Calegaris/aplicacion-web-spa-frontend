import React from 'react';
import type { CartItem } from '../types';

interface OrderSummaryProps {
  items: CartItem[];
  customerName: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string;
  paymentMethod: 'cash' | 'transfer';
  total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  customerName,
  deliveryType,
  deliveryAddress,
  paymentMethod,
  total,
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm font-sans space-y-6">
      {/* Resumen de Productos */}
      <div>
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4">
          Resumen del Pedido
        </h3>
        <div className="divide-y divide-slate-100">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between py-2.5 text-sm">
              <span className="text-slate-600 font-medium">
                <span className="font-bold text-brand-orange-dark mr-1">{item.quantity}x</span>{' '}
                {item.name}
              </span>
              <span className="font-extrabold text-slate-800">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
          <span className="text-sm font-bold text-slate-700">Total</span>
          <span className="text-xl font-black text-slate-950">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Datos del Cliente y Envío */}
      <div className="border-t border-slate-100 pt-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-2">
          Datos de Entrega y Pago
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm leading-relaxed">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Cliente
            </span>
            <span className="font-semibold text-slate-700">{customerName}</span>
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Método de Pago
            </span>
            <span className="font-semibold text-slate-700">
              {paymentMethod === 'cash' ? '💵 Efectivo al recibir' : '🏦 Transferencia bancaria'}
            </span>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Tipo de Entrega
            </span>
            <span className="font-semibold text-slate-700">
              {deliveryType === 'delivery'
                ? `🛵 Envío a domicilio: ${deliveryAddress || 'No especificada'}`
                : '🏪 Retiro en local (Av. Siempreviva 742)'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
