import type { ItemCarrito } from '../types/producto';
import type { ModoVenta } from '../store/modoVentaStore';
import { formatearPrecio } from './formatPrice';
import { CONFIG } from '../config/config';
import { obtenerPrecioSegunModo } from './precioSegunModo';

/** Arma el texto del pedido a partir de los items del carrito, con el precio del modo activo. */
export function construirMensajePedido(
  items: ItemCarrito[],
  total: number,
  modo: ModoVenta | null
): string {
  const etiquetaModo = modo === 'mayorista' ? 'MAYORISTA' : 'MINORISTA';

  const lineas = items.map((item) => {
    const precioUnitario = obtenerPrecioSegunModo(item.producto, modo);
    return `• ${item.cantidad}x ${item.producto.nombre_producto} — ${formatearPrecio(
      precioUnitario * item.cantidad
    )}`;
  });

  return [
    `¡Hola! Quiero hacer el siguiente pedido (${etiquetaModo}):`,
    '',
    ...lineas,
    '',
    `Total: ${formatearPrecio(total)}`,
  ].join('\n');
}

/** Arma el link de WhatsApp (wa.me) con el mensaje ya codificado. */
export function construirLinkWhatsApp(mensaje: string): string {
  const textoCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${textoCodificado}`;
}
