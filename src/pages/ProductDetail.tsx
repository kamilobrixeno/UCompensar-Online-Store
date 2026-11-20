import { useEffect, useState } from 'react';
import { IonContent, IonIcon, IonPage, IonSpinner, useIonToast } from '@ionic/react';
import { star } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import * as api from '../services/api';
import type { Product } from '../services/types';
import { useCart } from '../context/CartContext';
import StoreHeader from '../components/StoreHeader';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { add } = useCart();
  const [toast] = useIonToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setProduct(null);
    setError('');
    api.getProduct(Number(id)).then(setProduct).catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'));
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    add(product);
    void toast({ message: 'Agregado al carrito', duration: 1000 });
  };

  return (
    <IonPage>
      <StoreHeader back />
      <IonContent className="ml-content">
        <div className="ml-page">
          {!product && !error && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
          {error && <div className="ml-card ml-message"><p>{error}</p></div>}
          {product && (
            <div className="ml-card ml-detail">
              <div className="ml-detail__img"><img src={product.image} alt={product.title} /></div>
              <div className="ml-detail__info">
                <span className="ml-product__cat">{product.category}</span>
                <h1>{product.title}</h1>
                {product.rating && (
                  <div className="ml-rating">
                    <IonIcon icon={star} /> {product.rating.rate} <span>({product.rating.count} calificaciones)</span>
                  </div>
                )}
                <div className="ml-detail__price">$ {product.price.toFixed(2)}</div>
                <p className="ml-detail__desc">{product.description}</p>
                <button className="ml-btn ml-btn--block" onClick={addToCart}>Agregar al carrito</button>
                <button className="ml-btn ml-btn--ghost ml-btn--block" onClick={() => history.push('/cart')}>Ir al carrito</button>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;