export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'card' | 'pse';

export interface Order {
  id: string;
  username: string;
  date: string;
  items: CartItem[];
  total: number;
  method: PaymentMethod;
  /** Descripcion segura del pago (ej. "Tarjeta terminada en 4242"). */
  paymentDetail: string;
}