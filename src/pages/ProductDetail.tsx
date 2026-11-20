import { useEffect, useState } from 'react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonSpinner, IonText, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useParams } from 'react-router-dom';
import * as api from '../services/api';
import type { Product } from '../services/types';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { add } = useCart();
  const [toast] = useIonToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setProduct(null);
    setError('');
    api.getProduct(Number(id)).then(setProduct).catch((e) => setError(e instanceof Error ? e.message : 'Error al cargar'));
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonBackButton defaultHref="/products" /></IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!product && !error && <div className="ion-text-center"><IonSpinner /></div>}
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        {product && (
          <>
            <img src={product.image} alt={product.title} style={{ height: 240, objectFit: 'contain', width: '100%', background: '#fff' }} />
            <h2>{product.title}</h2>
            <IonText color="medium"><p>{product.category}</p></IonText>
            <h3>${product.price.toFixed(2)}</h3>
            {product.rating && <p>Calificación: {product.rating.rate} ({product.rating.count} reseñas)</p>}
            <p>{product.description}</p>
            <IonButton expand="block" onClick={() => { add(product); void toast({ message: 'Agregado al carrito', duration: 1000 }); }}>
              Agregar al carrito
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;
