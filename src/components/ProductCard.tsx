import { useState } from 'react';
import type { Producto } from '../types/producto';
import { formatearPrecio } from '../utils/formatPrice';
import { obtenerPrecioSegunModo } from '../utils/precioSegunModo';
import { useModoVentaStore } from '../store/modoVentaStore';
import { useCarritoStore } from '../store/carritoStore';

interface ProductCardProps {
  producto: Producto;
}

// Si el producto tiene imagen_producto (URL), la mostramos. Si la URL falla al
// cargar, caemos en un placeholder con la inicial del nombre.
export function ProductCard({ producto }: ProductCardProps) {
  const modo = useModoVentaStore((state) => state.modo);
  const agregarAlCarrito = useCarritoStore((state) => state.agregar);

  const [cantidad, setCantidad] = useState(1);
  const [imagenFallo, setImagenFallo] = useState(false);

  const inicial = producto.nombre_producto.charAt(0).toUpperCase();
  const precio = obtenerPrecioSegunModo(producto, modo);
  const mostrarImagen = Boolean(producto.imagen_producto) && !imagenFallo;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 flex flex-col overflow-hidden">
      <div className="relative aspect-square bg-brand-light/20 flex items-center justify-center overflow-hidden">
        {mostrarImagen ? (
          <img
            src={producto.imagen_producto}
            alt={producto.nombre_producto}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImagenFallo(true)}
          />
        ) : (
          <span className="text-4xl font-bold text-brand/60">{inicial}</span>
        )}
        <span
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 text-brand-dark flex items-center justify-center text-xs font-bold shadow"
          title={`${producto.nombre_producto} — ${producto.categoria}`}
        >
          i
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-stone-800 leading-snug">{producto.nombre_producto}</h3>
        <p className="text-sm text-stone-400 mt-1">{producto.categoria}</p>
        <p className="text-lg font-bold text-brand-dark mt-2">{formatearPrecio(precio)}</p>

        <div className="mt-auto pt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCantidad((actual) => Math.max(1, actual - 1))}
            className="w-8 h-8 rounded-full border border-stone-300 text-stone-500 hover:bg-stone-100"
            aria-label={`Restar unidad de ${producto.nombre_producto}`}
          >
            −
          </button>
          <span className="flex-1 text-center font-medium" aria-live="polite">
            {cantidad}
          </span>
          <button
            type="button"
            onClick={() => setCantidad((actual) => actual + 1)}
            className="w-8 h-8 rounded-full border border-stone-300 text-stone-500 hover:bg-stone-100"
            aria-label={`Sumar unidad de ${producto.nombre_producto}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => agregarAlCarrito(producto, cantidad)}
          className="mt-3 w-full bg-brand-dark text-white rounded-lg py-2 text-sm font-medium hover:bg-brand transition"
          aria-label={`Agregar ${producto.nombre_producto} al carrito`}
        >
          <i className="fa-solid fa-cart-plus" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
