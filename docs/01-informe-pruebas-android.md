# Informe de pruebas de la aplicación Online Store en Android

**Autor:** [Nombre del estudiante]
**Programa:** [Programa académico], Universidad Ucompensar
**Fecha:** [DD/MM/AAAA]

## Introducción

El presente informe documenta el proceso de pruebas de la aplicación móvil híbrida Online Store en la plataforma Android. La aplicación se desarrolló con Ionic y React (Ionic Framework, s. f.) y se empaquetó como aplicación nativa mediante Capacitor (Capacitor, s. f.). La compilación y la ejecución se realizaron con Android Studio (Android Studio Developers, s. f.). La publicación en Google Play Console (Google Play Console, s. f.) queda fuera del alcance de este trabajo.

## Objetivo

Verificar que la aplicación autentica usuarios, consume los servicios API, gestiona el carrito y conserva los datos localmente en emuladores y dispositivos Android, y registrar los defectos hallados con su corrección.

## Entorno de pruebas

| Elemento | Detalle |
| --- | --- |
| Sistema de desarrollo | [Windows 10/11] |
| Android Studio | [versión] |
| Node.js | [versión] |
| Capacitor | 7.x |
| Ionic React | 8.x |
| API | FakeStore API (https://fakestoreapi.com) |

### Equipos utilizados

| Tipo | Modelo | Versión de Android | Resolución |
| --- | --- | --- | --- |
| Emulador | [p. ej., Pixel 6] | [p. ej., 14 (API 34)] | [ ] |
| Emulador | [ ] | [ ] | [ ] |
| Dispositivo físico | [ ] | [ ] | [ ] |

## Procedimiento de compilación

1. Se instalaron las dependencias con `npm install`.
2. Se generó el paquete web y se sincronizó con el proyecto nativo mediante `npm run cap:sync`.
3. Se abrió la carpeta `android/` en Android Studio y se esperó la sincronización de Gradle.
4. Se ejecutó la aplicación en cada emulador y dispositivo, y se generó el APK de depuración.

## Pruebas automatizadas

Se ejecutó `npm test` con Vitest (6 pruebas sobre la lógica del carrito: agregar, incrementar, cambiar cantidad, eliminar y calcular el total sin errores de punto flotante). Resultado verificado en el entorno de desarrollo: 6 de 6 pruebas aprobadas. También se verificó que el servicio de autenticación responde con un token para la cuenta de prueba.

## Pruebas funcionales manuales

Estado: *Aprobada*, *Fallida* u *Observación*. Completar tras ejecutar cada caso.

| ID | Caso de prueba | Resultado esperado | Emulador 1 | Emulador 2 | Dispositivo | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |
| A-01 | Iniciar sesión con credenciales válidas | Se muestra el catálogo | [ ] | [ ] | [ ] | Fig. 1 |
| A-02 | Iniciar sesión con credenciales inválidas | Se muestra mensaje de error | [ ] | [ ] | [ ] | Fig. 2 |
| A-03 | Cerrar la aplicación y reabrirla con sesión activa | Se conserva la sesión | [ ] | [ ] | [ ] | |
| A-04 | Cargar el catálogo | Se listan productos con imagen | [ ] | [ ] | [ ] | Fig. 3 |
| A-05 | Filtrar por categoría | Solo se muestran productos de la categoría | [ ] | [ ] | [ ] | |
| A-06 | Ver detalle de un producto | Se muestran descripción, precio y calificación | [ ] | [ ] | [ ] | |
| A-07 | Agregar productos al carrito | Se actualiza el contador | [ ] | [ ] | [ ] | Fig. 4 |
| A-08 | Cambiar cantidad y eliminar | El total se recalcula | [ ] | [ ] | [ ] | |
| A-09 | Reabrir la aplicación con artículos en el carrito | Se conserva el carrito | [ ] | [ ] | [ ] | |
| A-10 | Abrir sin conexión a internet | Se muestra error con opción de reintentar | [ ] | [ ] | [ ] | |
| A-11 | Rotar pantalla y botón atrás del sistema | Navegación coherente | [ ] | [ ] | [ ] | |
| A-12 | Cerrar sesión | Se vuelve al inicio de sesión | [ ] | [ ] | [ ] | |

## Defectos y correctivos

| ID | Descripción | Causa | Corrección aplicada | Nueva prueba |
| --- | --- | --- | --- | --- |
| [D-01] | [ ] | [ ] | [ ] | [ ] |

Si no se detectaron defectos, se debe indicar expresamente en esta sección.

## Conclusiones

[Redactar en tercera persona. Ejemplo: "Se evidenció que la aplicación cumple los requisitos de autenticación, consumo de API, carrito y almacenamiento local en los equipos evaluados."]

## Referencias

Android Studio Developers. (s. f.). *Home page*. Recuperado el 25 de julio de 2023, de https://developer.android.com/studio

Capacitor. (s. f.). *Capacitor: Cross-platform native runtime for web apps*. Recuperado el 25 de julio de 2023, de https://capacitorjs.com/docs

Google Play Console. (s. f.). *Documentos Google Play Console*. Recuperado el 25 de julio de 2023, de https://play.google.com/console

Ionic Framework. (s. f.). *Introduction to Ionic*. Recuperado el 6 de septiembre de 2023, de https://ionicframework.com/docs

Khanna, R. (2016). *Getting started with Ionic*. Packt.
