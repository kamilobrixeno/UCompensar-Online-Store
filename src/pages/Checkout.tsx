import { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage, IonSpinner } from '@ionic/react';
import { businessOutline, cardOutline, checkmarkCircle, lockClosedOutline } from 'ionicons/icons';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import StoreHeader from '../components/StoreHeader';
import {
  buildOrder, cardDetail, formatCardNumber, formatExpiry, isValidCardNumber, isValidCvv, isValidEmail, isValidExpiry, saveOrder,
} from '../services/orders';
import type { Order, PaymentMethod } from '../services/types';

type Step = 'method' | 'details' | 'processing' | 'success';

const BANKS = ['Bancolombia', 'Banco de Bogotá', 'Davivienda', 'BBVA Colombia', 'Banco de Occidente', 'Nequi', 'Banco Popular'];
const money = (n: number) => `$ ${n.toFixed(2)}`;

const Checkout: React.FC = () => {
  const history = useHistory();
  const { session } = useAuth();
  const { items, total, count, clear } = useCart();
  const [step, setStep] = useState<Step>('method');
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<Order | null>(null);

  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [pse, setPse] = useState({ bank: '', person: 'natural', docType: 'CC', doc: '', email: '' });

  useEffect(() => {
    if (step !== 'processing' || !session) return;
    const detail = method === 'card' ? cardDetail(card.number) : `PSE - ${pse.bank}`;
    const timer = setTimeout(async () => {
      const created = buildOrder(session.username, items, total, method, detail);
      await saveOrder(created);
      setOrder(created);
      clear();
      setStep('success');
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (items.length === 0 && step !== 'success' && step !== 'processing') return <Redirect to="/cart" />;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (method === 'card') {
      if (!isValidCardNumber(card.number)) e.number = 'Número de tarjeta inválido.';
      if (card.name.trim().length < 3) e.name = 'Ingresa el nombre como aparece en la tarjeta.';
      if (!isValidExpiry(card.expiry)) e.expiry = 'Fecha inválida (MM/AA).';
      if (!isValidCvv(card.cvv)) e.cvv = 'CVV inválido.';
    } else {
      if (!pse.bank) e.bank = 'Selecciona tu banco.';
      if (!/^\d{5,12}$/.test(pse.doc)) e.doc = 'Documento inválido (5 a 12 dígitos).';
      if (!isValidEmail(pse.email)) e.email = 'Correo inválido.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setStep('processing');
  };

  const stepIndex = step === 'method' ? 0 : step === 'details' ? 1 : 2;
  const err = (k: string) => (errors[k] ? <small className="ml-error">{errors[k]}</small> : null);

  return (
    <IonPage>
      <StoreHeader back={step === 'method' || step === 'details'} />
      <IonContent className="ml-content">
        <div className="ml-page">
          {step !== 'success' && (
            <ol className="ml-steps">
              {['Medio de pago', 'Datos', 'Confirmación'].map((label, i) => (
                <li key={label} className={i <= stepIndex ? 'is-done' : ''}><span>{i + 1}</span>{label}</li>
              ))}
            </ol>
          )}

          {step === 'processing' && (
            <div className="ml-card ml-processing">
              <IonSpinner />
              <h2>{method === 'pse' ? `Redirigiendo a ${pse.bank}...` : 'Procesando tu pago...'}</h2>
              <p className="ml-muted">No cierres esta ventana.</p>
            </div>
          )}

          {step === 'success' && order && (
            <div className="ml-card ml-success">
              <IonIcon icon={checkmarkCircle} />
              <h2>¡Listo! Tu compra fue exitosa</h2>
              <p className="ml-muted">Pedido {order.id} · {new Date(order.date).toLocaleString('es-CO')}</p>
              <div className="ml-success__box">
                <div className="ml-summary__row"><span>Productos</span><span>{order.items.reduce((n, i) => n + i.quantity, 0)}</span></div>
                <div className="ml-summary__row"><span>Medio de pago</span><span>{order.paymentDetail}</span></div>
                <div className="ml-summary__row ml-summary__total"><span>Total pagado</span><span>{money(order.total)}</span></div>
              </div>
              <button className="ml-btn" onClick={() => history.replace('/orders')}>Ver mis compras</button>
              <button className="ml-btn ml-btn--ghost" onClick={() => history.replace('/products')}>Seguir comprando</button>
            </div>
          )}

          {(step === 'method' || step === 'details') && (
            <div className="ml-cart">
              <div className="ml-card ml-pay">
                {step === 'method' && (
                  <>
                    <h2>¿Cómo quieres pagar?</h2>
                    <button className={`ml-option${method === 'card' ? ' is-active' : ''}`} onClick={() => setMethod('card')}>
                      <IonIcon icon={cardOutline} />
                      <span><b>Tarjeta de crédito o débito</b><small>Visa, Mastercard, American Express</small></span>
                    </button>
                    <button className={`ml-option${method === 'pse' ? ' is-active' : ''}`} onClick={() => setMethod('pse')}>
                      <IonIcon icon={businessOutline} />
                      <span><b>PSE</b><small>Débito desde tu cuenta bancaria</small></span>
                    </button>
                    <button className="ml-btn ml-btn--block" onClick={() => setStep('details')}>Continuar</button>
                  </>
                )}

                {step === 'details' && method === 'card' && (
                  <form onSubmit={pay} noValidate>
                    <h2>Agrega tu tarjeta</h2>
                    <div className="ml-fake-card">
                      <span>{card.number || '•••• •••• •••• ••••'}</span>
                      <span>{card.name || 'NOMBRE APELLIDO'}</span>
                      <span>{card.expiry || 'MM/AA'}</span>
                    </div>
                    <label className="ml-field"><span>Número de tarjeta</span>
                      <input inputMode="numeric" placeholder="4242 4242 4242 4242" value={card.number}
                        onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })} />{err('number')}</label>
                    <label className="ml-field"><span>Nombre del titular</span>
                      <input autoComplete="cc-name" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })} />{err('name')}</label>
                    <div className="ml-row">
                      <label className="ml-field"><span>Vencimiento</span>
                        <input inputMode="numeric" placeholder="MM/AA" value={card.expiry}
                          onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />{err('expiry')}</label>
                      <label className="ml-field"><span>CVV</span>
                        <input inputMode="numeric" type="password" maxLength={4} value={card.cvv}
                          onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })} />{err('cvv')}</label>
                    </div>
                    <p className="ml-muted"><IonIcon icon={lockClosedOutline} /> Simulación: usa 4242 4242 4242 4242 con una fecha futura. No se guarda el número completo.</p>
                    <button className="ml-btn ml-btn--block" type="submit">Pagar {money(total)}</button>
                    <button type="button" className="ml-link" onClick={() => setStep('method')}>Cambiar medio de pago</button>
                  </form>
                )}

                {step === 'details' && method === 'pse' && (
                  <form onSubmit={pay} noValidate>
                    <h2>Paga con PSE</h2>
                    <label className="ml-field"><span>Banco</span>
                      <select value={pse.bank} onChange={(e) => setPse({ ...pse, bank: e.target.value })}>
                        <option value="">Selecciona tu banco</option>
                        {BANKS.map((b) => <option key={b}>{b}</option>)}
                      </select>{err('bank')}</label>
                    <div className="ml-row">
                      <label className="ml-field"><span>Tipo de persona</span>
                        <select value={pse.person} onChange={(e) => setPse({ ...pse, person: e.target.value })}>
                          <option value="natural">Natural</option>
                          <option value="juridica">Jurídica</option>
                        </select></label>
                      <label className="ml-field"><span>Tipo de documento</span>
                        <select value={pse.docType} onChange={(e) => setPse({ ...pse, docType: e.target.value })}>
                          <option>CC</option><option>CE</option><option>NIT</option>
                        </select></label>
                    </div>
                    <label className="ml-field"><span>Número de documento</span>
                      <input inputMode="numeric" value={pse.doc} onChange={(e) => setPse({ ...pse, doc: e.target.value.replace(/\D/g, '') })} />{err('doc')}</label>
                    <label className="ml-field"><span>Correo electrónico</span>
                      <input type="email" value={pse.email} onChange={(e) => setPse({ ...pse, email: e.target.value })} />{err('email')}</label>
                    <p className="ml-muted"><IonIcon icon={lockClosedOutline} /> Simulación: no se realiza ninguna conexión con el banco.</p>
                    <button className="ml-btn ml-btn--block" type="submit">Ir a mi banco y pagar {money(total)}</button>
                    <button type="button" className="ml-link" onClick={() => setStep('method')}>Cambiar medio de pago</button>
                  </form>
                )}
              </div>

              <aside className="ml-card ml-summary">
                <h3>Resumen de compra</h3>
                <div className="ml-summary__row"><span>Productos ({count})</span><span>{money(total)}</span></div>
                <div className="ml-summary__row ml-summary__total"><span>Total</span><span>{money(total)}</span></div>
              </aside>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;