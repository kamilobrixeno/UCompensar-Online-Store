# Online Store

Aplicación móvil híbrida de tienda en línea, desarrollada con Ionic, React y Capacitor para Android e iOS.

Proyecto académico (metodología ABP, Ucompensar). Una sola base de código web se empaqueta con Capacitor como aplicación nativa. Consume la [FakeStore API](https://fakestoreapi.com) y no procesa pagos reales.

<br />

## Tabla de contenido

- [Versions](#versions)
- [Funcionalidades](#funcionalidades)
- [Stack y dependencias (package.json)](#stack-y-dependencias-packagejson)
- [Arquitectura](#arquitectura)
- [Ejecución en local](#ejecución-en-local)
- [Compilar en Android Studio](#compilar-en-android-studio)
- [Compilar en Xcode (iOS)](#compilar-en-xcode-ios)
- [Scripts disponibles](#scripts-disponibles)
- [Documentación entregable](#documentación-entregable)

<br />

## Versions

| Nº    |    Date    | User | HU | Description                                                                 |
| :---- | :--------: | :--: | -- | --------------------------------------------------------------------------- |
| 1.0.0 | 2026-11-19 |      |    | Versión inicial: autenticación, API, catálogo, carrito y almacenamiento local |

### Detalle por versión

<!-- markdownlint-disable MD033 -->

<details>
<summary><strong>1.0.0</strong> — Versión inicial (2026-11-19)</summary>

<br />

- Inicio de sesión contra la API y sesión persistente.
- Catálogo con filtro por categoría, detalle de producto y recarga por gesto.
- Carrito con cantidades, total y persistencia local.
- Proyectos nativos Android e iOS generados con Capacitor.
- Pruebas unitarias de la lógica del carrito.

Archivos principales:

- `src/services/api.ts` — cliente de la API.
- `src/services/storage.ts` — almacenamiento local con `@capacitor/preferences`.
- `src/services/cartLogic.ts` — lógica pura del carrito.
- `src/context/AuthContext.tsx`, `src/context/CartContext.tsx` — estado global.
- `src/pages/*` — Login, Products, ProductDetail, Cart.
- `capacitor.config.ts`, `android/`, `ios/` — empaquetado nativo.

</details>

<!-- markdownlint-enable MD033 -->

<br />

## Funcionalidades

| Requisito               | Dónde está                                                      |
| ----------------------- | --------------------------------------------------------------- |
| Autenticación           | `POST /auth/login`, `AuthContext`, rutas protegidas en `App.tsx` |
| Servicios API           | `src/services/api.ts` (productos, categorías, detalle, login)   |
| Carrito de compras      | `CartContext`, `cartLogic.ts`, página `Cart`                    |
| Almacenamiento local    | `@capacitor/preferences` guarda sesión y carrito                |

Usuario de prueba: `mor_2314` / `83r5^_` (cuenta pública de la FakeStore API).

<br />

## Stack y dependencias (package.json)

- Paquete: `online-store` 1.0.0
- Base: React 18, TypeScript 5, Vite 6
- UI: Ionic React 8 (`@ionic/react`, `@ionic/react-router`), ionicons
- Routing: react-router-dom 5
- Nativo: Capacitor 7 (`core`, `android`, `ios`, `app`, `preferences`, `splash-screen`, `status-bar`)
- Testing: Vitest 3

<br />

## Arquitectura

```
src/
  services/   api.ts, storage.ts, cartLogic.ts, types.ts
  context/    AuthContext.tsx, CartContext.tsx
  pages/      Login, Products, ProductDetail, Cart
  __tests__/  cartLogic.test.ts
android/      proyecto Android Studio (Capacitor)
ios/          proyecto Xcode (Capacitor)
docs/         documentos del entregable
```

Flujo: `npm run build` genera `dist/`, `npx cap sync` lo copia a `android/` e `ios/`, y el IDE nativo compila.

<br />

## Ejecución en local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Levantar en el navegador:

   ```bash
   npm run dev
   ```

No se requieren variables de entorno. Si se agregan archivos `.env`, no se suben al repositorio.

<br />

## Compilar en Android Studio

Requisitos: Node 18+ y Android Studio (incluye JDK 21 y SDK).

1. `npm install`
2. `npm run cap:sync`
3. `npm run android:open` (o abrir la carpeta `android/` desde Android Studio).
4. Esperar el *Gradle Sync*. Si pide instalar Android SDK Platform 35, aceptar.
5. Elegir un emulador o dispositivo con depuración USB y presionar **Run**.
6. APK: `Build > Build Bundle(s) / APK(s) > Build APK(s)`. Queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

Si Gradle no encuentra el JDK: `File > Settings > Build Tools > Gradle > Gradle JDK` y seleccionar el JDK embebido (jbr 21).

<br />

## Compilar en Xcode (iOS)

Requiere macOS, Xcode y CocoaPods.

1. `npm install && npm run cap:sync`
2. `npm run ios:open`
3. En *Signing & Capabilities* elegir el equipo de desarrollo y ejecutar en simulador o dispositivo.

<br />

## Scripts disponibles

| Script                | Descripción                                    |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo web                     |
| `npm run build`       | Verifica tipos y genera `dist/`                |
| `npm run preview`     | Sirve el build localmente                      |
| `npm test`            | Pruebas unitarias con Vitest                   |
| `npm run cap:sync`    | Build web y sincronización con Android e iOS   |
| `npm run android:open`| Abre el proyecto en Android Studio             |
| `npm run ios:open`    | Abre el proyecto en Xcode                      |

<br />

## Documentación entregable

- [Pruebas en Android](docs/01-informe-pruebas-android.md)
- [Pruebas en iOS](docs/02-informe-pruebas-ios.md)
- [Informe de resultados ABP](docs/03-informe-abp.md)
