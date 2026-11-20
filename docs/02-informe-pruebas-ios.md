# Informe de pruebas de la aplicación Online Store en iOS

**Autor:** [Nombre del estudiante]
**Programa:** [Programa académico], Universidad Ucompensar
**Fecha:** [DD/MM/AAAA]

## Introducción

El presente informe documenta el proceso de pruebas de la aplicación móvil híbrida Online Store en la plataforma iOS. La aplicación comparte el código web desarrollado con Ionic y React (Ionic Framework, s. f.) y se empaqueta como proyecto nativo mediante Capacitor (Capacitor, s. f.). La compilación y la ejecución requieren Xcode (Mac App Store, s. f.) en un equipo macOS. La publicación mediante App Store Connect (Apple Store Connect, s. f.) queda fuera del alcance de este trabajo.

## Objetivo

Verificar que la aplicación autentica usuarios, consume los servicios API, gestiona el carrito y conserva los datos localmente en simuladores y dispositivos iOS, y registrar los defectos hallados con su corrección.

## Entorno de pruebas

| Elemento | Detalle |
| --- | --- |
| Equipo de desarrollo | [Mac, modelo y macOS] |
| Xcode | [versión] |
| CocoaPods | [versión] |
| Capacitor | 7.x |
| Ionic React | 8.x |

### Equipos utilizados

| Tipo | Modelo | Versión de iOS |
| --- | --- | --- |
| Simulador | [p. ej., iPhone 15] | [17.x] |
| Simulador | [ ] | [ ] |
| Dispositivo físico | [ ] | [ ] |

## Procedimiento de compilación

1. Se instalaron las dependencias con `npm install`.
2. Se sincronizó el proyecto con `npm run cap:sync`.
3. Se abrió el proyecto con `npm run ios:open`.
4. En *Signing & Capabilities* se seleccionó el equipo de desarrollo (se requiere un Apple ID; la ejecución en dispositivo con cuenta gratuita es posible, pero la distribución requiere membresía).
5. Se ejecutó la aplicación en cada simulador y dispositivo.

## Pruebas funcionales

Se aplican los mismos casos del informe de Android (A-01 a A-12), con identificadores I-01 a I-12.

| ID | Caso de prueba | Resultado esperado | Simulador 1 | Simulador 2 | Dispositivo | Evidencia |
| --- | --- | --- | --- | --- | --- | --- |
| I-01 | Iniciar sesión con credenciales válidas | Se muestra el catálogo | [ ] | [ ] | [ ] | Fig. 1 |
| I-02 | Iniciar sesión con credenciales inválidas | Se muestra mensaje de error | [ ] | [ ] | [ ] | |
| I-03 | Reabrir con sesión activa | Se conserva la sesión | [ ] | [ ] | [ ] | |
| I-04 | Cargar el catálogo | Se listan productos | [ ] | [ ] | [ ] | |
| I-05 | Filtrar por categoría | Se filtran productos | [ ] | [ ] | [ ] | |
| I-06 | Ver detalle de producto | Se muestran los datos | [ ] | [ ] | [ ] | |
| I-07 | Agregar al carrito | Se actualiza el contador | [ ] | [ ] | [ ] | |
| I-08 | Cambiar cantidad y eliminar | El total se recalcula | [ ] | [ ] | [ ] | |
| I-09 | Reabrir con carrito guardado | Se conserva el carrito | [ ] | [ ] | [ ] | |
| I-10 | Sin conexión a internet | Mensaje de error y reintento | [ ] | [ ] | [ ] | |
| I-11 | Rotación, área segura (notch) y gesto de retroceso | Interfaz correcta | [ ] | [ ] | [ ] | |
| I-12 | Cerrar sesión | Vuelve al inicio de sesión | [ ] | [ ] | [ ] | |

## Defectos y correctivos

| ID | Descripción | Causa | Corrección aplicada | Nueva prueba |
| --- | --- | --- | --- | --- |
| [D-01] | [ ] | [ ] | [ ] | [ ] |

## Conclusiones

[Redactar en tercera persona.]

## Referencias

Apple Store Connect. (s. f.). *Documentos de Apple Store Connect*. Recuperado el 25 de julio de 2023, de https://appstoreconnect.apple.com/login

Capacitor. (s. f.). *Capacitor: Cross-platform native runtime for web apps*. Recuperado el 25 de julio de 2023, de https://capacitorjs.com/docs

Ionic Framework. (s. f.). *Introduction to Ionic*. Recuperado el 12 de julio de 2023, de https://ionicframework.com/docs

Mac App Store. (s. f.). *Xcode*. Recuperado el 25 de julio de 2023, de https://apps.apple.com/co/app/xcode/id497799835?mt=12
