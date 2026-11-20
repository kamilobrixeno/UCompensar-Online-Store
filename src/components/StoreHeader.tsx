import { IonHeader, IonIcon } from '@ionic/react';
import { arrowBackOutline, cartOutline, logOutOutline, receiptOutline, searchOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface Props {
  search?: string;
  onSearch?: (value: string) => void;
  back?: boolean;
  children?: React.ReactNode;
}

const StoreHeader: React.FC<Props> = ({ search, onSearch, back, children }) => {
  const history = useHistory();
  const { session, signOut } = useAuth();
  const { count } = useCart();
  return (
    <IonHeader className="ml-header ion-no-border">
      <div className="ml-header__bar">
        {back && (
          <button className="ml-icon-btn" aria-label="Volver" onClick={() => history.goBack()}>
            <IonIcon icon={arrowBackOutline} />
          </button>
        )}
        <button className="ml-logo" onClick={() => history.push('/products')} aria-label="Inicio">
          <span className="ml-logo__mark">U</span>
          <span className="ml-logo__text">UCompensar<small>Store</small></span>
        </button>
        {onSearch ? (
          <label className="ml-search">
            <input
              type="search"
              placeholder="Buscar productos"
              value={search ?? ''}
              onChange={(e) => onSearch(e.target.value)}
            />
            <IonIcon icon={searchOutline} />
          </label>
        ) : (
          <div className="ml-spacer" />
        )}
        <div className="ml-actions">
          {session && <span className="ml-user">{session.username}</span>}
          <button className="ml-icon-btn" aria-label="Mis compras" onClick={() => history.push('/orders')}>
            <IonIcon icon={receiptOutline} />
          </button>
          <button className="ml-icon-btn" aria-label="Carrito" onClick={() => history.push('/cart')}>
            <IonIcon icon={cartOutline} />
            {count > 0 && <span className="ml-cart-badge">{count}</span>}
          </button>
          <button className="ml-icon-btn" aria-label="Cerrar sesión" onClick={() => void signOut()}>
            <IonIcon icon={logOutOutline} />
          </button>
        </div>
      </div>
      {children}
    </IonHeader>
  );
};

export default StoreHeader;