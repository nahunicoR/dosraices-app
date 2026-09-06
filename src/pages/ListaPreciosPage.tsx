import { useMemo } from 'react';
import { useCatalogo } from '../hooks/useCatalogo';
import { obtenerCategorias } from '../services/catalogoService';
import { PortadaMayorista } from '../components/PortadaMayorista';
// import { TablaCategoria } from '../components/TablaCategoria';
import { TableComponent } from '../components/TableComponent';

/**
 * Página de solo lectura (no tiene carrito): reproduce la lista de precios
 * mayorista impresa, pero con datos reales de la API. La portada de la
 * izquierda queda fija en pantalla (en desktop) y solo las tablas de la
 * derecha scrollean.
 *
 * El layout usa flex + h-screen/overflow-y-auto en vez de position:fixed:
 * el contenedor exterior mide exactamente la altura de la ventana y no deja
 * scrollear (overflow-hidden), así que el único que puede scrollear es el
 * <main>. Es más prolijo que position:fixed porque no hay que calcular
 * anchos/márgenes a mano para que el contenido de la derecha no quede tapado.
 * En mobile (breakpoint < lg) se cae a un layout apilado normal, porque un
 * panel fijo de altura completa no entra cómodo en una pantalla chica.
 */
export function ListaPreciosPage() {
  const { productos, cargando, error } = useCatalogo();
  const categorias = useMemo(() => obtenerCategorias(productos), [productos]);

  return (
    <div className="lg:flex lg:h-screen lg:overflow-hidden bg-paper">
      <PortadaMayorista categorias={categorias} />

      <main className="flex-1 lg:h-screen lg:overflow-y-auto px-4 sm:px-8 py-8">
        {/* 
          //!!eliminar <div className="max-w-3xl mx-auto space-y-6"></div>
          //!!se expande pero puede romper.
        <div className="max-w-3xl mx-auto space-y-6"></div>
        
        */}
        <div className=" mx-auto space-y-6">
          {cargando && <p className="text-center text-stone-500 py-12">Cargando lista de precios...</p>}

          {!cargando && error && (
            <div className="max-w-full mx-auto text-center py-12">
              <p className="text-red-600 font-semibold">No se pudo cargar el catálogo</p>
              <p className="text-stone-500 mt-2 text-sm">{error}</p>
            </div>
          )}

          {!cargando && !error && categorias.length === 0 && (
            <p className="text-center text-stone-400 py-12">Todavía no hay productos cargados.</p>
          )}

          {!cargando &&
            !error &&
            categorias.map((categoria, indice) => (
              <TableComponent
                key={categoria}
                categoria={categoria}
                indice={indice}
                productos={productos.filter((producto) => producto.categoria === categoria)}
              />
            ))}
        </div>
      </main>
    </div>
  );
}
