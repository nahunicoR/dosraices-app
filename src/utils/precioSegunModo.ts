import type { Producto } from '../types/producto';
import type { ModoVenta } from '../store/modoVentaStore';

/** Si el modo es null (por las dudas, antes de entrar a una página), usamos el precio minorista. */
export function obtenerPrecioSegunModo(producto: Producto, modo: ModoVenta | null): number {
  return modo === 'mayorista' ? producto.precio_mayorista : producto.precio_minorista;
}
