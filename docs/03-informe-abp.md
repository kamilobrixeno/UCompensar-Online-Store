# Informe de resultados de la metodología ABP

**Proyecto:** Aplicación móvil híbrida de tienda en línea (Online Store)
**Autor:** [Nombre del estudiante]
**Fecha:** [DD/MM/AAAA]

## Introducción

El presente informe recopila las etapas planeadas y ejecutadas en el marco del Aprendizaje Basado en Proyectos (ABP) y evalúa los resultados obtenidos. El proyecto consistió en desarrollar una aplicación móvil híbrida con Ionic (Ionic Framework, s. f.) y Capacitor (Capacitor, s. f.), compilable para Android con Android Studio (Android Studio Developers, s. f.) y para iOS con Xcode (Mac App Store, s. f.).

## Planteamiento del problema

Se requiere una aplicación de comercio electrónico que funcione en varias plataformas móviles con una sola base de código, lo que reduce costos y tiempos frente al desarrollo nativo por separado (Griffith, 2017).

## Objetivos

**General.** Desarrollar y probar una aplicación móvil híbrida de tienda en línea para Android e iOS.

**Específicos.**
1. Implementar autenticación de usuarios.
2. Consumir servicios API para el catálogo de productos.
3. Implementar un carrito de compras.
4. Conservar sesión y carrito mediante almacenamiento local.
5. Compilar la aplicación con Capacitor y los entornos nativos.
6. Documentar las pruebas en emuladores y dispositivos.

## Alcance

Incluye el código fuente, la compilación para Android e iOS y la documentación de pruebas. Excluye la publicación en Google Play Console (Google Play Console, s. f.) y App Store Connect (Apple Store Connect, s. f.), porque requiere membresía.

## Planeación

| Etapa | Actividades | Producto | Fechas planeadas |
| --- | --- | --- | --- |
| 1. Análisis | Revisión de la bibliografía y definición de requisitos | Lista de requisitos | [ ] |
| 2. Diseño | Selección de tecnologías, definición de pantallas y flujo | Arquitectura y pantallas | [ ] |
| 3. Desarrollo | Implementación de autenticación, API, carrito y almacenamiento | Código fuente | [ ] |
| 4. Empaquetado | Integración con Capacitor, Android Studio y Xcode | Proyectos `android/` e `ios/` | [ ] |
| 5. Pruebas | Pruebas unitarias, en emulador y en dispositivo | Informes de pruebas | [ ] |
| 6. Cierre | Evaluación de resultados | Este informe | [ ] |

## Ejecución

| Etapa | Qué se realizó | Fecha real | Observaciones |
| --- | --- | --- | --- |
| Análisis | Se definieron los requisitos de autenticación, API, carrito y almacenamiento local | [ ] | |
| Diseño | Se eligieron Ionic React, Capacitor y la FakeStore API como fuente de datos | [ ] | |
| Desarrollo | Se implementaron las pantallas de inicio de sesión, catálogo, detalle y carrito, con estado global y persistencia local | [ ] | |
| Empaquetado | Se agregaron las plataformas Android e iOS con Capacitor | [ ] | |
| Pruebas | Se ejecutaron 6 pruebas unitarias aprobadas y las pruebas manuales documentadas en los informes 01 y 02 | [ ] | |
| Cierre | Se redactó la evaluación | [ ] | |

## Evaluación de los objetivos

| Objetivo específico | Evidencia | Estado |
| --- | --- | --- |
| 1. Autenticación | `AuthContext.tsx`, casos A-01 a A-03 | [Logrado / Parcial] |
| 2. Servicios API | `api.ts`, casos A-04 a A-06 | [ ] |
| 3. Carrito | `CartContext.tsx`, `cartLogic.ts`, casos A-07 y A-08 | [ ] |
| 4. Almacenamiento local | `storage.ts`, casos A-03 y A-09 | [ ] |
| 5. Compilación | Proyectos `android/` e `ios/`, APK de depuración | [ ] |
| 6. Documentación de pruebas | Informes 01 y 02 | [ ] |

## Dificultades y lecciones aprendidas

[Describir en tercera persona. Ejemplos a considerar: configuración del JDK y del SDK de Android, firma en iOS por requerir macOS y Apple ID, comportamiento del almacenamiento local en web frente a nativo.]

## Conclusiones

[Redactar en tercera persona, relacionando el resultado con los objetivos.]

## Referencias

Android Studio Developers. (s. f.). *Home page*. Recuperado el 25 de julio de 2023, de https://developer.android.com/studio

Apple Store Connect. (s. f.). *Documentos de Apple Store Connect*. Recuperado el 25 de julio de 2023, de https://appstoreconnect.apple.com/login

Capacitor. (s. f.). *Capacitor: Cross-platform native runtime for web apps*. Recuperado el 25 de julio de 2023, de https://capacitorjs.com/docs

Google Play Console. (s. f.). *Documentos Google Play Console*. Recuperado el 25 de julio de 2023, de https://play.google.com/console

Griffith, C. (2017). *Mobile app development with Ionic: Cross-platform apps with Ionic, Angular & Cordova*. O'Reilly.

Ionic Framework. (s. f.). *Introduction to Ionic*. Recuperado el 6 de septiembre de 2023, de https://ionicframework.com/docs

Mac App Store. (s. f.). *Xcode*. Recuperado el 25 de julio de 2023, de https://apps.apple.com/co/app/xcode/id497799835?mt=12
