import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { addOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StoreHeader from '../components/StoreHeader';

const Cart: React.FC = () => {
  const history = useHistory();
  const { items, total, count, setQty, remove } = useCart();

  return (
    <IonPage>
      <StoreHeader back />
      <IonContent className="ml-content">
        <div className="ml-page">
          <h1 className="ml-title">Carrito de compras</h1>
          {items.length === 0 ? (
            <div className="ml-card ml-message">
              <p>Tu carrito está vacío.</p>
              <button className="ml-btn" onClick={() => history.push('/products')}>Descubrir productos</button>
            </div>
          ) : (
            <div className="ml-cart">
              <div className="ml-card ml-cart__list">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="ml-cart__row">
                    <img src={product.image} alt={product.title} />
                    <div className="ml-cart__info">
                      <h3>{product.title}</h3>
                      <span className="ml-muted">{product.category}</span>
                      <button className="ml-link" onClick={() => remove(product.id)}>
                        <IonIcon icon={trashOutline} /> Eliminar
                      </button>
                    </div>
                    <div className="ml-qty">
                      <button aria-label="Disminuir" onClick={() => setQty(product.id, quantity - 1)}><IonIcon icon={removeOutline} /></button>
                      <span>{quantity}</span>
                      <button aria-label="Aumentar" onClick={() => setQty(product.id, quantity + 1)}><IonIcon icon={addOutline} /></button>
                    </div>
                    <div className="ml-cart__price">$ {(product.price * quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <aside className="ml-card ml-summary">
                <h3>Resumen de compra</h3>
                <div className="ml-summary__row"><span>Productos ({count})</span><span>$ {total.toFixed(2)}</span></div>
                <div className="ml-summary__row ml-summary__total"><span>Total</span><span>$ {total.toFixed(2)}</span></div>
                <button className="ml-btn ml-btn--block" onClick={() => history.push('/checkout')}>Continuar compra</button>
              </aside>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Cart;