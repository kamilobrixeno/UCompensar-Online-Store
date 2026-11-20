import { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonText, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Ingresa usuario y contraseña.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await signIn(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No fue posible iniciar sesión.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Online Store</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={submit} data-testid="login-form">
          <h2>Iniciar sesión</h2>
          <IonItem>
            <IonInput label="Usuario" labelPlacement="floating" autocomplete="username" value={username}
              onIonInput={(e) => setUsername(String(e.detail.value ?? ''))} />
          </IonItem>
          <IonItem>
            <IonInput label="Contraseña" labelPlacement="floating" type="password" autocomplete="current-password" value={password}
              onIonInput={(e) => setPassword(String(e.detail.value ?? ''))} />
          </IonItem>
          {error && <IonText color="danger"><p>{error}</p></IonText>}
          <IonButton expand="block" type="submit" disabled={busy} className="ion-margin-top">
            {busy ? <IonSpinner name="dots" /> : 'Entrar'}
          </IonButton>
          <IonText color="medium">
            <p>Cuenta de prueba (FakeStore API): usuario <b>mor_2314</b>, contraseña <b>83r5^_</b></p>
          </IonText>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
