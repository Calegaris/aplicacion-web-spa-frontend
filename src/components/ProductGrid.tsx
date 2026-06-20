import React from 'react';
import { ProductCard } from './ProductCard';
import { useCartStore } from '../context/useCartStore';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onProductClick,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
        <span className="text-4xl mb-2 inline-block">🔍</span>
        <h3 className="text-lg font-bold text-slate-800">No se encontraron productos</h3>
        <p className="text-sm text-slate-500 mt-1">
          Intenta cambiar los filtros o los términos de búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 font-sans">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddClick={() => addItem(product, 1)}
          onCardClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};
