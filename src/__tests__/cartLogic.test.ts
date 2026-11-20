import { describe, expect, it } from 'vitest';
import { addItem, removeItem, setQuantity, totalItems, totalPrice } from '../services/cartLogic';
import type { Product } from '../services/types';

const p = (id: number, price: number): Product => ({
  id, price, title: `P${id}`, description: '', category: 'c', image: '',
});

describe('cartLogic', () => {
  it('agrega un producto nuevo con cantidad 1', () => {
    expect(addItem([], p(1, 10))).toEqual([{ product: p(1, 10), quantity: 1 }]);
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    const items = addItem(addItem([], p(1, 10)), p(1, 10));
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('elimina el producto si la cantidad llega a 0', () => {
    const items = setQuantity(addItem([], p(1, 10)), 1, 0);
    expect(items).toEqual([]);
  });

  it('actualiza la cantidad', () => {
    const items = setQuantity(addItem([], p(1, 10)), 1, 5);
    expect(totalItems(items)).toBe(5);
  });

  it('calcula el total sin errores de punto flotante', () => {
    let items = addItem([], p(1, 0.1));
    items = setQuantity(items, 1, 3);
    items = addItem(items, p(2, 0.2));
    expect(totalPrice(items)).toBe(0.5);
  });

  it('elimina un producto por id', () => {
    const items = removeItem(addItem(addItem([], p(1, 1)), p(2, 2)), 1);
    expect(items.map((i) => i.product.id)).toEqual([2]);
  });
});
