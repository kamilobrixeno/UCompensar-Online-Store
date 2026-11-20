import { loadJson, ordersKey, saveJson } from './storage';
import type { CartItem, Order, PaymentMethod } from './types';

/** Algoritmo de Luhn para validar el numero de tarjeta (solo simulacion). */
export function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\s+/g, '');
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}

export function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 19).replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function isValidExpiry(value: string, now = new Date()): boolean {
  const m = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1);
}

export function isValidCvv(value: string): boolean {
  return /^\d{3,4}$/.test(value);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function cardDetail(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  return `Tarjeta terminada en ${digits.slice(-4)}`;
}

export function buildOrder(
  username: string,
  items: CartItem[],
  total: number,
  method: PaymentMethod,
  paymentDetail: string,
  now = new Date(),
): Order {
  return {
    id: `ORD-${now.getTime().toString(36).toUpperCase()}`,
    username,
    date: now.toISOString(),
    items,
    total,
    method,
    paymentDetail,
  };
}

export const loadOrders = (username: string) => loadJson<Order[]>(ordersKey(username), []);

export async function saveOrder(order: Order): Promise<void> {
  const current = await loadOrders(order.username);
  await saveJson(ordersKey(order.username), [order, ...current]);
}