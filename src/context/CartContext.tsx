import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import * as logic from '../services/cartLogic';
import { KEYS, loadJson, saveJson } from '../services/storage';
import type { CartItem, Product } from '../services/types';

interface CartState {
  items: CartItem[];
  count: number;
  total: number;
  add: (p: Product) => void;
  setQty: (id: number, q: number) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    loadJson<CartItem[]>(KEYS.cart, []).then((saved) => {
      setItems(saved);
      hydrated.current = true;
    });
  }, []);

  useEffect(() => {
    if (hydrated.current) void saveJson(KEYS.cart, items);
  }, [items]);

  const add = useCallback((p: Product) => setItems((c) => logic.addItem(c, p)), []);
  const setQty = useCallback((id: number, q: number) => setItems((c) => logic.setQuantity(c, id, q)), []);
  const remove = useCallback((id: number) => setItems((c) => logic.removeItem(c, id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: logic.totalItems(items), total: logic.totalPrice(items), add, setQty, remove, clear }),
    [items, add, setQty, remove, clear],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
