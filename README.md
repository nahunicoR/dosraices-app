# Dietética Dos Raíces

Catálogo online con modalidad mayorista/minorista, carrito de compras y pedido por WhatsApp. Los productos se traen desde una Google Sheet publicada como Google Apps Script Web App.

Migrado a **React + TypeScript** (desde la versión original en TypeScript "vanilla" con manipulación directa del DOM), usando **Zustand** para el estado global del carrito y la modalidad de venta.

## Stack

- [Vite](https://vitejs.dev/) + React 18 + TypeScript
- [React Router](https://reactrouter.com/) (`BrowserRouter`) para las rutas `/`, `/mayorista`, `/minorista` y `/catalogo`
- [Zustand](https://github.com/pmndrs/zustand) para el estado global (carrito y modalidad de venta)
- Tailwind CSS

## Paleta de colores

Rediseñada en verde bosque + crema, a partir de la lista mayorista impresa y el patrón de verduras en línea de la marca. Todo vive en `tailwind.config.js`:

- `brand.dark` (`#1c3328`): headers, botones principales, portada de `/catalogo`.
- `brand.DEFAULT` (`#3d6b4c`): hover de botones, franja de envíos.
- `brand.light` (`#a9c4a0`): fondos suaves, textos secundarios sobre verde oscuro.
- `brand.accent` (`#c98a2e`): dorado — reservado para llamados de atención puntuales (progreso de compra mínima mayorista), no para la marca en general.
- `paper` (`#f3efe2`): fondo crema de toda la app (reemplaza el gris `slate-100` anterior).

El resto de la UI usa grises cálidos (`stone-*`) en vez de los `slate-*` (grisazulados) originales, para no desentonar con el crema de fondo. Los colores por categoría de `/catalogo` (`src/config/estilosCategoria.ts`) se mantuvieron variados a propósito — igual que en la lista impresa — para que cada categoría se distinga de un vistazo; solo "Frutos Secos" se alineó al verde exacto de marca.

Si más adelante conseguís los valores exactos de marca (por ejemplo del logo en vectorial), es cuestión de ajustar esos 5 valores en `tailwind.config.js` y toda la app se actualiza sola, porque ningún componente tiene colores de marca hardcodeados fuera de ese archivo (con la excepción, a propósito, de los colores por categoría).

## Por qué Zustand

El proyecto original ya resolvía el carrito con un mini patrón pub-sub a mano (`suscribirseAlCarrito` + `notificar`) porque varias partes de la pantalla (botón flotante, panel del carrito, banner mayorista, header) necesitan enterarse cuando cambia el carrito, sin estar todas anidadas entre sí. Eso es exactamente el caso de uso para el que sirve Zustand: estado compartido por componentes que no tienen una relación padre-hijo directa, sin la ceremonia de Redux ni tener que envolver la app en un Context Provider. La migración quedó así:

- `src/store/carritoStore.ts`: items del carrito, si el panel está abierto, y las acciones (`agregar`, `actualizarCantidad`, `quitar`, `vaciar`, `abrir`, `cerrar`).
- `src/store/modoVentaStore.ts`: la modalidad activa (`mayorista` | `minorista`), usada por casi todos los componentes para mostrar el precio correcto.

Cualquier componente que necesite el carrito o la modalidad los lee con un hook (`useCarritoStore`, `useModoVentaStore`) y se re-renderiza solo cuando cambia la porción de estado que le interesa (no hay "vaciados" innecesarios de toda la pantalla).

## Cambios de comportamiento respecto al original

- **Routing**: pasa de un router manual basado en `window.location.hash` a `react-router-dom` con `BrowserRouter` (URLs sin `#`, ej. `/mayorista` en vez de `/#/mayorista`). **Importante para el deploy**: al usar `BrowserRouter` el servidor tiene que redirigir cualquier ruta a `index.html` (fallback SPA), porque `/mayorista` ya no es un hash sino una ruta "real". Ya incluí:
  - `public/_redirects` (Netlify)
  - `vercel.json` (Vercel)
  - Si lo alojás en otro lado (Apache, Nginx, GitHub Pages, hosting compartido), avisame cuál usás y te paso la configuración puntual — sin este paso, refrescar la página en `/mayorista` da 404.
- **Buscador con debounce** (250ms) para no re-filtrar el catálogo en cada tecla.
- **Bug corregido**: en `catalogoService.ts`, la normalización de IDs escribía en un campo `id_producto` que no existía en el tipo `Producto`, dejando el `id` real sin normalizar a número. Ahora normaliza `id` correctamente.
- Los eventos de "agregar al carrito" ya no se resuelven con un `CustomEvent` del DOM (`document.dispatchEvent`); ahora es una llamada directa a la acción del store, que es el equivalente idiomático en React.
- Mejoras de accesibilidad: labels en inputs, `aria-label` en botones de ícono, `role="dialog"` en el panel del carrito, `rel="noopener noreferrer"` en links externos.

## Página `/catalogo` (lista de precios mayorista)

Es una vista de **solo lectura** (sin carrito) que reproduce la lista de precios impresa: portada de marca fija a la izquierda + tablas de productos por categoría, con scroll independiente, a la derecha. Usa los mismos `obtenerProductos()` / `obtenerCategorias()` que el resto de la app, así que se actualiza sola con el Google Sheet — no hay nada hardcodeado.

- `src/pages/ListaPreciosPage.tsx`: arma el layout de dos columnas. El panel izquierdo no usa `position: fixed` — el truco es que el contenedor exterior mide `h-screen` con `overflow-hidden`, y solo el `<main>` de la derecha tiene `overflow-y-auto`. Es más robusto que `position: fixed` porque no hay que calcular anchos/márgenes a mano. En mobile (`< lg`) se cae a un layout apilado normal, ya que un panel fijo de altura completa no entra cómodo en una pantalla chica.
- `src/components/PortadaMayorista.tsx`: el panel de marca (logo, categorías, badges). **Es una aproximación con Tailwind + íconos de Font Awesome** — todavía no tenemos el logo ni la foto reales de la lista impresa. Cuando los tengas, este es el único archivo que hay que tocar para reemplazar el círculo con ícono por tu logo real (`<img>`) y agregar la foto de fondo o de producto.
- `src/components/TablaCategoria.tsx`: la tabla de cada categoría (Producto / Presentación / Precio mayorista). Si `producto.stock` es 0, muestra "Sin stock" en vez del precio.
- `src/config/estilosCategoria.ts`: mapea cada categoría a un color + ícono (así "Frutos Secos" siempre sale verde oscuro, "Legumbres" violeta, etc., como en la lista impresa). Si en el Sheet aparece una categoría nueva que no está en ese mapa, se le asigna automáticamente un color de una paleta de respaldo — nunca se rompe ni queda sin estilo.
- **Campo nuevo `presentacion`** en `Producto` (`src/types/producto.ts`) y en la normalización de `catalogoService.ts`: agregá una columna `presentacion` en tu Google Sheet (ej. "Kg", "Lata 400 g", "500 ml (unidad)") para que se vea en esa columna. Si todavía no la agregás, la tabla muestra un guion (—) en su lugar — no rompe nada.

## Configuración

Copiá `.env.example` (o editá `.env`) con tus valores:

```
VITE_APP_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
VITE_NUM_WHATSAPP_DISTRIBUIDORA=549XXXXXXXXXX
VITE_INSTAGRAM_LINK=https://instagram.com/tu_cuenta
VITE_LOCATION_LINK=https://maps.app.goo.gl/xxxxx
```

También podés editar los valores por defecto en `src/config/config.ts`.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # tsc + vite build -> carpeta dist/
npm run preview # sirve el build de dist/ localmente
```

## Estructura

```
src/
  components/   # componentes de presentación (Header, Sidebar, ProductCard, CartPanel, PortadaMayorista, TablaCategoria, etc.)
  pages/        # LandingPage, CatalogoPage (/mayorista, /minorista) y ListaPreciosPage (/catalogo)
  store/        # carritoStore y modoVentaStore (Zustand)
  services/     # catalogoService: fetch + cache del catálogo
  hooks/        # useCatalogo, useDebouncedValue
  utils/        # formatPrice, precioSegunModo, whatsapp
  types/        # Producto, ItemCarrito
  config/       # config.ts (variables de entorno), estilosCategoria.ts (color/ícono por categoría)
```
