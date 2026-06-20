import React from 'react';
import type { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const getProductImage = (url?: string) => {
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
      return stockImages[item.name] || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop';
    }
    return url;
  };

  const formattedUnitPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(item.price);

  const formattedSubtotal = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(item.price * item.quantity);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 font-sans">
      {/* Miniatura del producto */}
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
        <img
          src={getProductImage(item.imageUrl)}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info y Detalle */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">
          {item.name}
        </h4>
        <p className="text-xs text-slate-400 mt-0.5">
          {formattedUnitPrice} c/u
        </p>
      </div>

      {/* Control Stepper de Cantidad */}
      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-sm shrink-0">
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          className="px-2.5 py-1 hover:bg-slate-200 text-slate-500 font-extrabold text-sm transition-colors"
        >
          −
        </button>
        <span className="px-3 text-xs font-bold text-slate-800 select-none min-w-[20px] text-center">
          {item.quantity}
        </span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          className="px-2.5 py-1 hover:bg-slate-200 text-slate-500 font-extrabold text-sm transition-colors"
        >
          +
        </button>
      </div>

      {/* Subtotal e Icono Borrar */}
      <div className="flex items-center gap-3 shrink-0 pl-2">
        <span className="font-extrabold text-slate-900 text-sm sm:text-base text-right min-w-[64px]">
          {formattedSubtotal}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar producto"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
