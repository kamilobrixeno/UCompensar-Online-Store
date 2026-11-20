import { IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonText, IonThumbnail, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { addOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, total, setQty, remove, clear } = useCart();
  const [alert] = useIonAlert();

  const checkout = () =>
    alert({
      header: 'Compra simulada',
      message: `Total: $${total.toFixed(2)}. Esta aplicación es académica y no procesa pagos.`,
      buttons: [{ text: 'Vaciar carrito', handler: () => clear() }, 'Cerrar'],
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"><IonBackButton defaultHref="/products" /></IonButtons>
          <IonTitle>Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {items.length === 0 ? (
          <IonText color="medium"><p className="ion-padding ion-text-center">Tu carrito está vacío.</p></IonText>
        ) : (
          <IonList>
            {items.map(({ product, quantity }) => (
              <IonItem key={product.id}>
                <IonThumbnail slot="start"><img src={product.image} alt={product.title} style={{ objectFit: 'contain' }} /></IonThumbnail>
                <IonLabel className="ion-text-wrap">
                  <h3>{product.title}</h3>
                  <p>${product.price.toFixed(2)} x {quantity}</p>
                </IonLabel>
                <IonButton fill="clear" aria-label="Disminuir" onClick={() => setQty(product.id, quantity - 1)}><IonIcon slot="icon-only" icon={removeOutline} /></IonButton>
                <span>{quantity}</span>
                <IonButton fill="clear" aria-label="Aumentar" onClick={() => setQty(product.id, quantity + 1)}><IonIcon slot="icon-only" icon={addOutline} /></IonButton>
                <IonButton fill="clear" color="danger" aria-label="Eliminar" onClick={() => remove(product.id)}><IonIcon slot="icon-only" icon={trashOutline} /></IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      {items.length > 0 && (
        <IonFooter>
          <IonToolbar>
            <IonTitle>Total: ${total.toFixed(2)}</IonTitle>
            <IonButtons slot="end"><IonButton fill="solid" color="primary" onClick={checkout}>Pagar</IonButton></IonButtons>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Cart;
