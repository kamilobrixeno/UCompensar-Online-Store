import { Preferences } from '@capacitor/preferences';

/**
 * Almacenamiento local. En Android/iOS usa SharedPreferences/UserDefaults;
 * en web usa localStorage (comportamiento nativo del plugin).
 */
export async function saveJson<T>(key: string, value: T): Promise<void> {
  await Preferences.set({ key, value: JSON.stringify(value) });
}

export async function loadJson<T>(key: string, fallback: T): Promise<T> {
  const { value } = await Preferences.get({ key });
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function removeKey(key: string): Promise<void> {
  await Preferences.remove({ key });
}

export const KEYS = { session: 'session', cart: 'cart' } as const;
