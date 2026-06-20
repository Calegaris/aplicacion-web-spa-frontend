import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddClick: () => void;
  onCardClick: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddClick,
  onCardClick,
}) => {
  // Manejar el click rápido en el botón sin disparar el click de la card
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddClick();
  };

  // Mapeo de imágenes a alta resolución de Unsplash (si la URL es la de placeholder por defecto)
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
      return stockImages[product.name] || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop';
    }
    return url;
  };

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div
      onClick={onCardClick}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-orange-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative font-sans hover:-translate-y-1"
    >
      {/* Contenido Superior */}
      <div>
        {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <img
            src={getProductImage(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-extrabold text-slate-900 group-hover:text-brand-orange transition-colors truncate text-base">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 min-h-[32px] leading-relaxed">
            {product.description || 'Sin descripción disponible.'}
          </p>
        </div>
      </div>

      {/* Fila de precio y botón de agregar */}
      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
        <span className="text-lg font-black text-slate-900">{formattedPrice}</span>
        <button
          type="button"
          onClick={handleQuickAdd}
          className="w-9 h-9 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-brand-orange/20 transition-all hover:scale-105 active:scale-95"
          title="Agregar 1 al carrito"
        >
          +
        </button>
      </div>
    </div>
  );
};
