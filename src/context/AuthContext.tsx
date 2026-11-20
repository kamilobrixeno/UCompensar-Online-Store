import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import * as api from '../services/api';
import { KEYS, loadJson, removeKey, saveJson } from '../services/storage';

interface Session {
  username: string;
  token: string;
}

interface AuthState {
  session: Session | null;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJson<Session | null>(KEYS.session, null).then((s) => {
      setSession(s);
      setLoading(false);
    });
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    const token = await api.login(username.trim(), password);
    const next = { username: username.trim(), token };
    await saveJson(KEYS.session, next);
    setSession(next);
  }, []);

  const signOut = useCallback(async () => {
    await removeKey(KEYS.session);
    setSession(null);
  }, []);

  const value = useMemo(() => ({ session, loading, signIn, signOut }), [session, loading, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
