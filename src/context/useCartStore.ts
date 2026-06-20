import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
          let newItems = [...state.items];

          if (existingItemIndex > -1) {
            // El item ya existe, incrementamos su cantidad
            const existingItem = state.items[existingItemIndex];
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + quantity,
            };
          } else {
            // Es un item nuevo
            newItems.push({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: quantity,
              imageUrl: product.imageUrl,
            });
          }

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      removeItem: (productId) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            // Si la cantidad es 0 o menor, removemos el item
            const newItems = state.items.filter((item) => item.id !== productId);
            return {
              items: newItems,
              total: calculateTotal(newItems),
            };
          }

          const newItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );

          return {
            items: newItems,
            total: calculateTotal(newItems),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          total: 0,
        }),
    }),
    {
      name: 'burger-house-cart', // Clave de localStorage para el carrito
    }
  )
);
