import React from 'react';
import type { Order } from '../types';

interface AdminOrderDetailProps {
  order: Order;
  onStatusChange: (newStatus: string) => Promise<void>;
  isLoading?: boolean;
}

const getNextStatus = (status: string) => {
  const norm = status.toLowerCase();
  if (norm === 'pending' || norm === 'pendiente') {
    return { key: 'en preparación', label: 'Marcar como "En preparación" 🍳', color: 'bg-brand-orange hover:bg-brand-orange-dark shadow-brand-orange/15' };
  }
  if (norm === 'in_preparation' || norm === 'en preparación' || norm === 'preparacion') {
    return { key: 'listo', label: 'Marcar como "Listo para retirar" 🟢', color: 'bg-green-600 hover:bg-green-700 shadow-green-600/10' };
  }
  if (norm === 'ready' || norm === 'listo') {
    return { key: 'entregado', label: 'Marcar como "Entregado" ⚪', color: 'bg-slate-600 hover:bg-slate-700 shadow-slate-600/10' };
  }
  return null;
};

export const AdminOrderDetail: React.FC<AdminOrderDetailProps> = ({
  order,
  onStatusChange,
  isLoading = false,
}) => {
  const nextStatusInfo = getNextStatus(order.status);

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
    <div className="space-y-6 font-sans text-slate-300">
      {/* Botón de Acción Dinámica */}
      {nextStatusInfo && (
        <div className="bg-brand-dark-card border border-brand-dark-border p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Actualizar Estado del Pedido</h4>
            <p className="text-xs text-slate-500">Haz click en el botón para avanzar el pedido a la siguiente fase de la cocina.</p>
          </div>
          <button
            onClick={() => onStatusChange(nextStatusInfo.key)}
            disabled={isLoading}
            className={`w-full sm:w-auto px-6 py-3.5 text-white font-extrabold rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm ${nextStatusInfo.color}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              <span>{nextStatusInfo.label}</span>
            )}
          </button>
        </div>
      )}

      {/* Grid de Contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productos pedidos */}
        <div className="lg:col-span-2 bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-white border-b border-brand-dark-border pb-3 mb-2">
            Desglose del Pedido
          </h3>
          <div className="divide-y divide-brand-dark-border/40">
            {order.items.map((item) => {
              const productName = item.product?.name || 'Producto';
              return (
                <div key={item.id} className="flex items-center gap-4 py-3">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-dark-hover border border-brand-dark-border shrink-0">
                    <img
                      src={getProductImage(productName, item.product?.imageUrl)}
                      alt={productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm truncate">{productName}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatPrice(Number(item.unitPrice))} c/u
                    </p>
                  </div>
                  {/* Cantidad y Subtotal */}
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded border border-brand-orange/20">
                      x{item.quantity}
                    </span>
                    <span className="font-extrabold text-white text-sm min-w-[56px] text-right">
                      {formatPrice(Number(item.unitPrice) * item.quantity)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-brand-dark-border pb-1 pt-4 flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-400">Total Facturado</span>
            <span className="text-xl font-black text-white">{formatPrice(calculateTotal())}</span>
          </div>
        </div>

        {/* Datos de Entrega y Pago */}
        <div className="lg:col-span-1 bg-brand-dark-card border border-brand-dark-border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-white border-b border-brand-dark-border pb-3 mb-3">
              Datos del Cliente
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Nombre
                </span>
                <span className="font-semibold text-slate-200">{order.customerName}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Email
                </span>
                <span className="font-semibold text-slate-200">{order.customerEmail}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                  Teléfono
                </span>
                <a
                  href={`tel:${order.customerPhone}`}
                  className="font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors font-mono underline"
                >
                  {order.customerPhone}
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-dark-border/40 pt-4 space-y-3 text-sm">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                Método de Entrega
              </span>
              <span className="font-semibold text-slate-200">
                {order.deliveryType === 'delivery'
                  ? `🛵 Envío: ${order.deliveryAddress || 'No especificada'}`
                  : '🏪 Retiro en local'}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                Método de Pago
              </span>
              <span className="font-semibold text-slate-200">
                {order.paymentMethod === 'cash' ? '💵 Efectivo' : '🏦 Transferencia bancaria'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
