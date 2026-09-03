import { useMemo } from 'react';
import type { Producto } from '../types/producto';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  productos: Producto[];
  categorias: string[];
  categoriaActiva: string | null;
}

export function ProductGrid({ productos, categorias, categoriaActiva }: ProductGridProps) {
  const grupos = useMemo(() => {
    const categoriasAMostrar = categoriaActiva ? [categoriaActiva] : categorias;
    return categoriasAMostrar
      .map((categoria) => ({
        categoria,
        productos: productos.filter((p) => p.categoria === categoria),
      }))
      .filter((grupo) => grupo.productos.length > 0);
  }, [categoriaActiva, categorias, productos]);

  if (productos.length === 0) {
    return <p className="text-stone-400 text-center py-12">No se encontraron productos.</p>;
  }

  return (
    <div className="space-y-8">
      {grupos.map(({ categoria, productos: productosCategoria }) => (
        <section key={categoria}>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-brand-dark">{categoria}</h2>
            <span className="bg-stone-200 text-stone-600 text-xs font-semibold px-2 py-0.5 rounded-full">
              {productosCategoria.length}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productosCategoria.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
