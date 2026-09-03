import type { Producto } from '../types/producto';
import { formatearPrecio } from '../utils/formatPrice';
import { obtenerEstiloCategoria } from '../config/estilosCategoria';

interface TablaCategoriaProps {
  categoria: string;
  productos: Producto[];
  indice: number;
}

export function TablaCategoria({ categoria, productos, indice }: TablaCategoriaProps) {
  const estilo = obtenerEstiloCategoria(categoria, indice);

  return (
    <section className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
      <div className={`flex items-center gap-2 px-4 py-3 text-white ${estilo.claseColor}`}>
        <i className={estilo.icono} aria-hidden="true" />
        <h2 className="font-bold tracking-wide text-sm uppercase">{categoria}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-stone-400 text-[11px] uppercase border-b border-stone-100">
              <th className="px-4 py-2 font-semibold">Producto</th>
              <th className="px-4 py-2 font-semibold">Presentación</th>
              <th className="px-4 py-2 font-semibold text-right">
                <span className="hidden sm:inline">Precio minorista</span>
                <span className="sm:hidden">Precio</span>
              </th>
              <th className="px-4 py-2 font-semibold text-right">
                <span className="hidden sm:inline">Precio mayorista</span>
                <span className="sm:hidden">Precio</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50">
                <td className="px-4 py-2.5 text-stone-800 flex gap-3"><span ><img className='w-7' src={producto?.imagen_producto} alt={producto.nombre_producto} /></span>{producto.nombre_producto} </td>
                <td className="px-4 py-2.5 text-stone-500 text-center font-semibold">{producto.presentacion ?? '—'}</td>
                <td className="px-4 py-2.5 text-right font-semibold">
                  {producto.stock > 0 ? (
                    <span className="text-brand-dark">{formatearPrecio(producto.precio_minorista)}</span>
                  ) : (
                    <span className="text-red-600 text-xs font-bold uppercase">Sin stock</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-right font-semibold">
                  {producto.stock > 0 ? (
                    <span className="text-brand-dark">{formatearPrecio(producto.precio_mayorista)}</span>
                  ) : (
                    <span className="text-red-600 text-xs font-bold uppercase">Sin stock</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
