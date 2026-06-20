import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  // Reiniciar cantidad cuando se abre para un nuevo producto
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!product) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddClick = () => {
    onAddToCart(quantity);
    onClose();
  };

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

  const handleShare = () => {
    const shareText = `Mirá esta burger 🍔: ${product.name} - $${product.price}`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        })
        .catch((err) => console.log('Error compartiendo:', err));
    } else {
      // Fallback a WhatsApp Web / API
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const totalPrice = product.price * quantity;
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(totalPrice);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product.name}>
      <div className="space-y-6 font-sans">
        {/* Imagen del producto grande */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
          <img
            src={getProductImage(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info y descripción */}
        <div>
          <span className="text-2xl font-black text-slate-900">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
              minimumFractionDigits: 0,
            }).format(product.price)}
          </span>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            {product.description || 'Sin ingredientes o detalles especificados.'}
          </p>
        </div>

        {/* Controles de Cantidad (Stepper) y Compartir */}
        <div className="flex items-center justify-between border-y border-slate-100 py-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-700">Cantidad:</span>
            <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50 shadow-sm">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="px-3 py-1.5 hover:bg-slate-200 text-slate-600 font-extrabold text-lg disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                −
              </button>
              <span className="px-4 text-sm font-bold text-slate-800 select-none min-w-[24px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="px-3 py-1.5 hover:bg-slate-200 text-slate-600 font-extrabold text-lg transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Botón Compartir */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-orange border border-slate-200 rounded-lg px-3 py-2 bg-white hover:bg-orange-50/20 hover:border-orange-200 transition-all shadow-sm"
          >
            <span>🔗</span>
            <span>Compartir</span>
          </button>
        </div>

        {/* CTA Agregar al carrito con precio dinámico */}
        <button
          type="button"
          onClick={handleAddClick}
          className="w-full py-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-extrabold rounded-xl shadow-lg shadow-brand-orange/15 transition-all hover:scale-[1.01] active:scale-[0.99] flex justify-between items-center px-6"
        >
          <span>Agregar al carrito</span>
          <span>{formattedPrice}</span>
        </button>
      </div>
    </Modal>
  );
};
