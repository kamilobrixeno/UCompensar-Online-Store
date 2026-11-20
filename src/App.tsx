import { IonApp, IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/store.css';

setupIonicReact();

const Routes: React.FC = () => {
  const { session, loading } = useAuth();
  if (loading) return <div className="ion-text-center ion-padding"><IonSpinner /></div>;

  return (
    <IonRouterOutlet>
      <Route exact path="/login">{session ? <Redirect to="/products" /> : <Login />}</Route>
      <Route exact path="/products">{session ? <Products /> : <Redirect to="/login" />}</Route>
      <Route exact path="/product/:id">{session ? <ProductDetail /> : <Redirect to="/login" />}</Route>
      <Route exact path="/cart">{session ? <Cart /> : <Redirect to="/login" />}</Route>
      <Route exact path="/checkout">{session ? <Checkout /> : <Redirect to="/login" />}</Route>
      <Route exact path="/orders">{session ? <Orders /> : <Redirect to="/login" />}</Route>
      <Route exact path="/"><Redirect to={session ? '/products' : '/login'} /></Route>
    </IonRouterOutlet>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <CartProvider>
        <IonReactRouter>
          <Routes />
        </IonReactRouter>
      </CartProvider>
    </AuthProvider>
  </IonApp>
);

export default App;
