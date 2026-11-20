import { useState } from 'react';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
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
      <IonContent className="ml-content">
        <div className="ml-login-top">
          <div className="ml-logo ml-logo--static">
            <span className="ml-logo__mark">U</span>
            <span className="ml-logo__text">UCompensar<small>Store</small></span>
          </div>
        </div>
        <div className="ml-login">
          <form className="ml-card ml-login__card" onSubmit={submit} data-testid="login-form">
            <h2>Ingresa a tu cuenta</h2>
            <label className="ml-field">
              <span>Usuario</span>
              <input autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="ml-field">
              <span>Contraseña</span>
              <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {error && <p className="ml-error">{error}</p>}
            <button className="ml-btn ml-btn--block" type="submit" disabled={busy}>
              {busy ? <IonSpinner name="dots" /> : 'Ingresar'}
            </button>
            <p className="ml-muted ml-login__hint">
              Cuenta de prueba (FakeStore API): usuario <b>mor_2314</b>, contraseña <b>83r5^_</b>
            </p>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
