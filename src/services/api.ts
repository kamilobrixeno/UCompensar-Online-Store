import type { Product } from './types';

const BASE_URL = 'https://fakestoreapi.com';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(detail || `Error ${res.status} al consultar el servicio`);
  }
  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    // FakeStore API responde texto plano ante credenciales inválidas.
    throw new Error(text || 'Respuesta inválida del servicio');
  }
}

export async function login(username: string, password: string): Promise<string> {
  const data = await request<{ token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return data.token;
}

export const getProducts = () => request<Product[]>('/products');
export const getProduct = (id: number) => request<Product>(`/products/${id}`);
export const getCategories = () => request<string[]>('/products/categories');
export const getProductsByCategory = (category: string) =>
  request<Product[]>(`/products/category/${encodeURIComponent(category)}`);
