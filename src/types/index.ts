export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  isActive?: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export type OrderStatus = 'pending' | 'in_preparation' | 'ready' | 'delivered';

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product?: Product | null;
}

export interface Order {
  id: number;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: 'delivery' | 'pickup';
  deliveryAddress?: string | null;
  paymentMethod: 'cash' | 'transfer';
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}
