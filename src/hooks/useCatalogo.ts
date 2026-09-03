import { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/catalogoService';
import type { Producto } from '../types/producto';

interface EstadoCatalogo {
  productos: Producto[];
  cargando: boolean;
  error: string | null;
}

/** Trae el catálogo al montar el componente. Se vuelve a pedir si cambia `recargarKey`. */
export function useCatalogo(recargarKey: unknown = null): EstadoCatalogo {
  const [estado, setEstado] = useState<EstadoCatalogo>({
    productos: [],
    cargando: true,
    error: null,
  });

  useEffect(() => {
    let cancelado = false;
    setEstado((prev) => ({ ...prev, cargando: true, error: null }));

    obtenerProductos()
      .then((productos) => {
        if (!cancelado) setEstado({ productos, cargando: false, error: null });
      })
      .catch((error: Error) => {
        if (!cancelado) setEstado({ productos: [], cargando: false, error: error.message });
      });

    return () => {
      cancelado = true;
    };
  }, [recargarKey]);

  return estado;
}
