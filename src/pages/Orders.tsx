import { useEffect, useState } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StoreHeader from '../components/StoreHeader';
import { loadOrders } from '../services/orders';
import type { Order } from '../services/types';

const Orders: React.FC = () => {
  const history = useHistory();
  const { session } = useAuth();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (session) void loadOrders(session.username).then(setOrders);
  }, [session]);

  return (
    <IonPage>
      <StoreHeader back />
      <IonContent className="ml-content">
        <div className="ml-page">
          <h1 className="ml-title">Mis compras</h1>
          {orders === null && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
          {orders?.length === 0 && (
            <div className="ml-card ml-message">
              <p>Aún no tienes compras.</p>
              <button className="ml-btn" onClick={() => history.push('/products')}>Ir a comprar</button>
            </div>
          )}
          {orders?.map((o) => (
            <div key={o.id} className="ml-card ml-order">
              <div className="ml-order__head">
                <div>
                  <b>{new Date(o.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</b>
                  <span className="ml-muted"> · Pedido {o.id}</span>
                </div>
                <span className="ml-badge">Compra exitosa</span>
              </div>
              {o.items.map(({ product, quantity }) => (
                <div key={product.id} className="ml-order__item" onClick={() => history.push(`/product/${product.id}`)}>
                  <img src={product.image} alt={product.title} />
                  <div>
                    <div>{product.title}</div>
                    <span className="ml-muted">{quantity} unidad(es) · $ {product.price.toFixed(2)} c/u</span>
                  </div>
                </div>
              ))}
              <div className="ml-order__foot">
                <span className="ml-muted">{o.paymentDetail}</span>
                <b>Total $ {o.total.toFixed(2)}</b>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Orders;