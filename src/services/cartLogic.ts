import type { CartItem, Product } from './types';

export function addItem(items: CartItem[], product: Product): CartItem[] {
  const found = items.find((i) => i.product.id === product.id);
  if (found) {
    return items.map((i) =>
      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }
  return [...items, { product, quantity: 1 }];
}

export function setQuantity(items: CartItem[], id: number, quantity: number): CartItem[] {
  if (quantity <= 0) return removeItem(items, id);
  return items.map((i) => (i.product.id === id ? { ...i, quantity } : i));
}

export function removeItem(items: CartItem[], id: number): CartItem[] {
  return items.filter((i) => i.product.id !== id);
}

export function totalItems(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.quantity, 0);
}

export function totalPrice(items: CartItem[]): number {
  const cents = items.reduce((sum, i) => sum + Math.round(i.product.price * 100) * i.quantity, 0);
  return cents / 100;
}
