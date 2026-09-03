import { useMemo } from 'react';
import { create } from 'zustand';
import type { Producto, ItemCarrito } from '../types/producto';
import { obtenerPrecioSegunModo } from '../utils/precioSegunModo';
import { useModoVentaStore } from './modoVentaStore';

interface CarritoState {
  items: ItemCarrito[];
  abierto: boolean;
  agregar: (producto: Producto, cantidad: number) => void;
  actualizarCantidad: (idProducto: number, cantidad: number) => void;
  quitar: (idProducto: number) => void;
  vaciar: () => void;
  abrir: () => void;
  cerrar: () => void;
}

export const useCarritoStore = create<CarritoState>((set) => ({
  items: [],
  abierto: false,

  agregar: (producto, cantidad) =>
    set((state) => {
      const existente = state.items.find((item) => item.producto.id === producto.id);
      const items = existente
        ? state.items.map((item) =>
            item.producto.id === producto.id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        : [...state.items, { producto, cantidad }];

      // feedback inmediato: se abre el panel al agregar
      return { items, abierto: true };
    }),

  actualizarCantidad: (idProducto, cantidad) =>
    set((state) => ({
      items:
        cantidad <= 0
          ? state.items.filter((item) => item.producto.id !== idProducto)
          : state.items.map((item) =>
              item.producto.id === idProducto ? { ...item, cantidad } : item
            ),
    })),

  quitar: (idProducto) =>
    set((state) => ({
      items: state.items.filter((item) => item.producto.id !== idProducto),
    })),

  vaciar: () => set({ items: [] }),
  abrir: () => set({ abierto: true }),
  cerrar: () => set({ abierto: false }),
}));

/** Cantidad total de unidades en el carrito (para el badge del botón flotante). */
export function useCantidadTotalCarrito(): number {
  return useCarritoStore((state) => state.items.reduce((acc, item) => acc + item.cantidad, 0));
}

/** Total en pesos, calculado con el precio correspondiente al modo activo (mayorista/minorista). */
export function useTotalCarrito(): number {
  const items = useCarritoStore((state) => state.items);
  const modo = useModoVentaStore((state) => state.modo);

  return useMemo(
    () => items.reduce((acc, item) => acc + obtenerPrecioSegunModo(item.producto, modo) * item.cantidad, 0),
    [items, modo]
  );
}
