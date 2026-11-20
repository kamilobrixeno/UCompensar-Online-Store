import { describe, expect, it } from 'vitest';
import {
  buildOrder, cardDetail, formatCardNumber, formatExpiry, isValidCardNumber, isValidCvv, isValidEmail, isValidExpiry,
} from '../services/orders';

describe('validaciones de pago', () => {
  it('valida tarjetas con Luhn', () => {
    expect(isValidCardNumber('4242 4242 4242 4242')).toBe(true);
    expect(isValidCardNumber('4242 4242 4242 4241')).toBe(false);
    expect(isValidCardNumber('1234')).toBe(false);
  });
  it('formatea numero y vencimiento', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242');
    expect(formatExpiry('1228')).toBe('12/28');
  });
  it('valida vencimiento', () => {
    const now = new Date(2026, 5, 1);
    expect(isValidExpiry('06/26', now)).toBe(true);
    expect(isValidExpiry('05/26', now)).toBe(false);
    expect(isValidExpiry('13/30', now)).toBe(false);
  });
  it('valida cvv y correo', () => {
    expect(isValidCvv('123')).toBe(true);
    expect(isValidCvv('12')).toBe(false);
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
  });
});

describe('buildOrder', () => {
  it('crea la orden sin guardar el numero completo de tarjeta', () => {
    const order = buildOrder('ana', [], 10, 'card', cardDetail('4242 4242 4242 4242'), new Date(2026, 0, 1));
    expect(order.paymentDetail).toBe('Tarjeta terminada en 4242');
    expect(order.id.startsWith('ORD-')).toBe(true);
    expect(order.username).toBe('ana');
    expect(JSON.stringify(order)).not.toContain('4242 4242');
  });
});