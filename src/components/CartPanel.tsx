import { CONFIG } from '../config/config';
import { formatearPrecio } from '../utils/formatPrice';
import { obtenerPrecioSegunModo } from '../utils/precioSegunModo';
import { construirMensajePedido, construirLinkWhatsApp } from '../utils/whatsapp';
import { useModoVentaStore } from '../store/modoVentaStore';
import { useCarritoStore, useTotalCarrito } from '../store/carritoStore';

export function CartPanel() {
  const modo = useModoVentaStore((state) => state.modo);
  const abierto = useCarritoStore((state) => state.abierto);
  const items = useCarritoStore((state) => state.items);
  const cerrar = useCarritoStore((state) => state.cerrar);
  const actualizarCantidad = useCarritoStore((state) => state.actualizarCantidad);
  const quitar = useCarritoStore((state) => state.quitar);
  const total = useTotalCarrito();

  if (!abierto) return null;

  const esMayorista = modo === 'mayorista';
  const progreso = esMayorista
    ? Math.min(100, Math.round((total / CONFIG.MINIMUM_PURCHASE_AMOUNT) * 100))
    : 100;
  const alcanzoMinimo = !esMayorista || total >= CONFIG.MINIMUM_PURCHASE_AMOUNT;
  const puedeEnviarPedido = items.length > 0 && alcanzoMinimo;

  function manejarPedidoWhatsApp(): void {
    if (CONFIG.WHATSAPP_NUMBER.includes('PEGAR_NUMERO')) {
      alert('Falta configurar VITE_NUM_WHATSAPP_DISTRIBUIDORA en el .env (ver Paso 1).');
      return;
    }

    const mensaje = construirMensajePedido(items, total, modo);
    const link = construirLinkWhatsApp(mensaje);
    window.open(link, '_blank', 'noopener,noreferrer');

    // Opcional: si querés vaciar el carrito automáticamente al enviar el pedido,
    // llamá acá a useCarritoStore.getState().vaciar(). Lo dejamos así para que
    // el cliente pueda volver atrás si se arrepiente antes de mandar el mensaje.
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={cerrar} aria-hidden="true" />
      <aside
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <h2 className="text-lg font-bold text-brand-dark">
            Tu pedido {esMayorista ? '(mayorista)' : '(minorista)'}
          </h2>
          <button
            type="button"
            onClick={cerrar}
            className="text-stone-400 hover:text-stone-600 text-2xl leading-none"
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-stone-400 text-center py-8">Todavía no agregaste productos.</p>
          ) : (
            items.map((item) => {
              const precioUnitario = obtenerPrecioSegunModo(item.producto, modo);
              return (
                <div
                  key={item.producto.id}
                  className="flex items-center justify-between gap-2 border-b border-stone-100 pb-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-stone-800 truncate">
                      {item.producto.nombre_producto}
                    </p>
                    <p className="text-xs text-stone-400">{formatearPrecio(precioUnitario)} c/u</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 text-stone-500 hover:bg-stone-100"
                      aria-label={`Restar unidad de ${item.producto.nombre_producto}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.cantidad}</span>
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 text-stone-500 hover:bg-stone-100"
                      aria-label={`Sumar unidad de ${item.producto.nombre_producto}`}
                    >
                      +
                    </button>
                  </div>
                  <p className="w-20 text-right font-semibold text-sm text-brand-dark shrink-0">
                    {formatearPrecio(precioUnitario * item.cantidad)}
                  </p>
                  <button
                    type="button"
                    onClick={() => quitar(item.producto.id)}
                    className="text-stone-300 hover:text-red-500 shrink-0"
                    aria-label={`Quitar ${item.producto.nombre_producto}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {esMayorista && (
          <div className="px-4 pt-3">
            <div className="flex justify-between text-xs text-stone-500 mb-1">
              <span>Mínimo: {formatearPrecio(CONFIG.MINIMUM_PURCHASE_AMOUNT)}</span>
              <span>{progreso}%</span>
            </div>
            <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-accent transition-all" style={{ width: `${progreso}%` }} />
            </div>
            <p className={`text-xs mt-2 ${alcanzoMinimo ? 'text-green-600' : 'text-brand-accent'}`}>
              {alcanzoMinimo
                ? '✓ Alcanzaste el mínimo para enviar tu pedido'
                : 'Sumá productos para alcanzar el mínimo mayorista'}
            </p>
          </div>
        )}

        <div className="p-4 border-t border-stone-200">
          <div className="flex justify-between mb-3">
            <span className="font-semibold text-stone-700">Total</span>
            <span className="font-bold text-lg text-brand-dark">{formatearPrecio(total)}</span>
          </div>
          <button
            type="button"
            onClick={manejarPedidoWhatsApp}
            disabled={!puedeEnviarPedido}
            className="w-full bg-green-600 text-white rounded-lg py-3 font-medium hover:bg-green-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Pedir por WhatsApp
          </button>
        </div>
      </aside>
    </>
  );
}
