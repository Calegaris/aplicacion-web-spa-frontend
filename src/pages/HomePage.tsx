import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HowToOrderBanner } from '../components/HowToOrderBanner';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductGrid } from '../components/ProductGrid';
import { ProductModal } from '../components/ProductModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { apiClient } from '../api/apiClient';
import { useCartStore } from '../context/useCartStore';
import type { Category, Product } from '../types';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Sincronizar filtros usando search params de la URL para que persistan/compartan fácilmente
  const [searchParams, setSearchParams] = useSearchParams();
  const searchVal = searchParams.get('q') || '';
  const categoryVal = searchParams.get('cat') || null;

  // Estado del modal de producto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Zustand
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchCatalog = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          apiClient.get<Product[]>('/products'),
          apiClient.get<Category[]>('/categories'),
        ]);

        // Asegurar que los precios sean de tipo Number (Prisma Decimal a veces retorna String)
        const typedProducts = productsRes.data.map((p) => ({
          ...p,
          price: Number(p.price),
        }));

        setProducts(typedProducts);
        setCategories(categoriesRes.data);
      } catch (err: any) {
        console.error(err);
        setError('Ocurrió un error al cargar el menú. Por favor, reintenta.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Lógica de filtrado de productos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchVal.toLowerCase()));

    const matchesCategory = categoryVal
      ? products.some((p) => p.id === product.id) &&
        categories.find((c) => c.slug === categoryVal)?.id === product.categoryId
      : true;

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (query: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (query) {
      nextParams.set('q', query);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleCategorySelect = (categorySlug: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categorySlug) {
      nextParams.set('cat', categorySlug);
    } else {
      nextParams.delete('cat');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleProductCardClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = (quantity: number) => {
    if (selectedProduct) {
      addItem(selectedProduct, quantity);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 font-sans">
      {/* Banner Informativo */}
      <HowToOrderBanner />

      {/* Hero y Buscador */}
      <section className="bg-white border-b border-slate-100 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            ¿Qué vas a pedir hoy? 🍔
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto text-sm sm:text-base font-medium">
            Elegí tus burgers favoritas y armá tu pedido en segundos.
          </p>
          <div className="pt-2">
            <SearchBar onSearch={handleSearch} value={searchVal} />
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorMessage message={error} />}

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" text="Preparando el menú..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filtros de Categorías */}
            <div className="border-b border-slate-100 pb-3">
              <CategoryFilter
                categories={categories}
                activeCategory={categoryVal}
                onCategorySelect={handleCategorySelect}
              />
            </div>

            {/* Grid de Productos */}
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductCardClick}
            />
          </div>
        )}
      </div>

      {/* Modal de Detalle de Producto */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};
