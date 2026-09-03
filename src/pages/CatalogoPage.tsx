import { useEffect, useMemo, useState } from 'react';
import type { ModoVenta } from '../store/modoVentaStore';
import { useModoVentaStore } from '../store/modoVentaStore';
import { useCarritoStore } from '../store/carritoStore';
import { useCatalogo } from '../hooks/useCatalogo';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { obtenerCategorias } from '../services/catalogoService';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ProductGrid } from '../components/ProductGrid';
import { BannerMayorista } from '../components/BannerMayorista';
import { CartButton } from '../components/CartButton';
import { CartPanel } from '../components/CartPanel';

interface CatalogoPageProps {
  modo: ModoVenta;
}

export function CatalogoPage({ modo }: CatalogoPageProps) {
  const establecerModo = useModoVentaStore((state) => state.establecerModo);
  const vaciarCarrito = useCarritoStore((state) => state.vaciar);
  const { productos, cargando, error } = useCatalogo();

  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const terminoDebounced = useDebouncedValue(terminoBusqueda, 250);

  // Evita mezclar precios de una modalidad con la otra en el mismo pedido.
  useEffect(() => {
    establecerModo(modo);
    vaciarCarrito();
    setCategoriaActiva(null);
    setTerminoBusqueda('');
  }, [modo, establecerModo, vaciarCarrito]);

  const categorias = useMemo(() => obtenerCategorias(productos), [productos]);

  const productosFiltrados = useMemo(() => {
    const termino = terminoDebounced.trim().toLowerCase();
    return productos.filter((producto) => {
      const coincideCategoria = !categoriaActiva || producto.categoria === categoriaActiva;
      const coincideBusqueda = producto.nombre_producto.toLowerCase().includes(termino);
      return coincideCategoria && coincideBusqueda;
    });
  }, [productos, categoriaActiva, terminoDebounced]);

  return (
    <>
      {cargando && <p className="p-8 text-center text-stone-500">Cargando catálogo...</p>}

      {!cargando && error && (
        <div className="max-w-md mx-auto p-8 text-center">
          <p className="text-red-600 font-semibold">No se pudo cargar el catálogo</p>
          <p className="text-stone-500 mt-2 text-sm">{error}</p>
        </div>
      )}

      {!cargando && !error && (
        <>
          <Header terminoBusqueda={terminoBusqueda} onCambiarBusqueda={setTerminoBusqueda} />
          <BannerMayorista />

          <div className="max-w-6xl mx-auto px-4 pt-8 pb-2 text-center">
            <h2 className="text-2xl font-bold text-brand-dark">Explorá por categoría</h2>
            <div className="w-16 h-1 bg-brand-accent mx-auto mt-2 rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row gap-6">
            <aside className="sm:w-64 shrink-0">
              <Sidebar
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                onSeleccionar={setCategoriaActiva}
              />
            </aside>
            <main className="flex-1">
              <ProductGrid
                productos={productosFiltrados}
                categorias={categorias}
                categoriaActiva={categoriaActiva}
              />
            </main>
          </div>
        </>
      )}

      <CartButton />
      <CartPanel />
    </>
  );
}
