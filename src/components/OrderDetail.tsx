import React from 'react';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { Order } from '../types';

interface OrderDetailProps {
  order: Order;
}

const STEPS = [
  { key: 'pendiente', label: 'Pendiente', icon: '⏰' },
  { key: 'en preparación', label: 'En preparación', icon: '🍳' },
  { key: 'listo', label: 'Listo', icon: '🟢' },
  { key: 'entregado', label: 'Entregado', icon: '⚪' },
];

const getStepIndex = (status: string): number => {
  const norm = status.toLowerCase();
  if (norm === 'pending' || norm === 'pendiente') return 0;
  if (norm === 'in_preparation' || norm === 'en preparación' || norm === 'preparacion') return 1;
  if (norm === 'ready' || norm === 'listo') return 2;
  if (norm === 'delivered' || norm === 'entregado') return 3;
  return 0;
};

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const currentStep = getStepIndex(order.status);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getProductImage = (name: string, url?: string) => {
    if (!url || url.includes('placeholder.com') || url.includes('via.placeholder')) {
      const stockImages: Record<string, string> = {
        'Clásica': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop',
        'BBQ': 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&auto=format&fit=crop',
        'Doble queso': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop',
        'Crispy Chicken': 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&auto=format&fit=crop',
        'Mushroom Swiss': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop',
        'Papas fritas': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&auto=format&fit=crop',
        'Aros de cebolla': 'https://images.unsplash.com/photo-1639024471283-2bc7b3c6a267?w=500&auto=format&fit=crop',
        'Salsa BBQ': 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=500&auto=format&fit=crop',
        'Coca-Cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop',
        'Agua mineral': 'https://images.unsplash.com/photo-1608885898957-a599fb18ec3d?w=500&auto=format&fit=crop',
      };
      return stockImages[name] || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop';
    }
    return url;
  };

  const calculateTotal = () => {
    return order.items.reduce((acc, item) => acc + Number(item.unitPrice) * item.quantity, 0);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Estado - Timeline Visual */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8 text-center sm:text-left">
          Seguimiento del Pedido
        </h3>
        
        {/* Timeline */}
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-2">
          {/* Línea horizontal (detrás) */}
          <div className="absolute top-[22px] left-[10%] right-[10%] h-[4px] bg-slate-100 hidden sm:block -z-0" />
          {/* Línea horizontal de progreso activo */}
          <div
            className="absolute top-[22px] left-[10%] h-[4px] bg-green-500 hidden sm:block -z-0 transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 80}%` }}
          />

          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isActive = idx === currentStep;
            const isFuture = idx > currentStep;

            let circleClass = '';
            if (isCompleted) {
              circleClass = 'bg-green-500 text-white border-green-500 ring-4 ring-green-100';
            } else if (isActive) {
              circleClass = 'bg-brand-orange text-white border-brand-orange ring-4 ring-orange-100';
            } else {
              circleClass = 'bg-slate-50 text-slate-400 border-slate-200';
            }

            return (
              <div
                key={step.key}
                className="flex sm:flex-col items-center gap-3 sm:gap-2.5 z-10 w-full sm:w-auto text-left sm:text-center shrink-0"
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-black transition-all duration-300 ${circleClass}`}
                >
                  {isCompleted ? '✓' : step.icon}
                </div>
                <div>
                  <span
                    className={`block text-sm font-bold ${
                      isActive ? 'text-brand-orange-dark font-black' : isCompleted ? 'text-green-600' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 block mt-0.5 sm:hidden">
                    {isCompleted ? 'Completado' : isActive ? 'Estado actual' : 'Pendiente'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Desglose y Detalles del Envío */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productos pedidos */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-2">
            Productos Pedidos
          </h3>
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => {
              const productName = item.product?.name || 'Producto';
              return (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                    <img
                      src={getProductImage(productName, item.product?.imageUrl)}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{productName}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatPrice(Number(item.unitPrice))} c/u
                    </p>
                  </div>
                  {/* Cantidad y Subtotal */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                      x{item.quantity}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm min-w-[56px] text-right">
                      {formatPrice(Number(item.unitPrice) * item.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-4 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-700">Total</span>
            <span className="text-xl font-black text-slate-950">{formatPrice(calculateTotal())}</span>
          </div>
        </div>

        {/* Datos de Entrega y Pago */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 mb-3">
              Detalle del Envío
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Nombre
                </span>
                <span className="font-semibold text-slate-700">{order.customerName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Email
                </span>
                <span className="font-semibold text-slate-700">{order.customerEmail}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Teléfono
                </span>
                <span className="font-semibold text-slate-700">{order.customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Método de Entrega
              </span>
              <span className="font-semibold text-slate-700">
                {order.deliveryType === 'delivery'
                  ? `🛵 Delivery: ${order.deliveryAddress || 'No especificada'}`
                  : '🏪 Retiro en local (Av. Siempreviva 742)'}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Método de Pago
              </span>
              <span className="font-semibold text-slate-700">
                {order.paymentMethod === 'cash' ? '💵 Efectivo al recibir' : '🏦 Transferencia bancaria'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
