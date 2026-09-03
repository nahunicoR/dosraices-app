import { CONFIG } from '../config/config';
import type { Producto } from '../types/producto';

interface RespuestaCatalogo {
  productos: Producto[];
}

let cacheProductos: Producto[] | null = null;

/**
 * Trae el catálogo desde el Apps Script Web App (Paso 2).
 * Cachea el resultado en memoria; pasá forzarRecarga=true para pedirlo de nuevo.
 */
export async function obtenerProductos(forzarRecarga = false): Promise<Producto[]> {
  if (cacheProductos && !forzarRecarga) {
    return cacheProductos;
  }

  if (CONFIG.GOOGLE_SHEETS_API_URL.includes('PEGAR_URL')) {
    throw new Error(
      'Falta configurar GOOGLE_SHEETS_API_URL en src/config/config.ts (ver Paso 2).'
    );
  }

  const respuesta = await fetch(CONFIG.GOOGLE_SHEETS_API_URL);

  if (!respuesta.ok) {
    throw new Error(`Error al obtener el catálogo (HTTP ${respuesta.status}).`);
  }

  const data: RespuestaCatalogo = await respuesta.json();

  // Normalizamos tipos: el Sheet puede devolver números como string, o con espacios de más.
  cacheProductos = data.productos.map((p) => ({
    ...p,
    id: Number(p.id),
    precio_minorista: Number(p.precio_minorista),
    precio_mayorista: Number(p.precio_mayorista),
    nombre_producto: String(p.nombre_producto).trim(),
    categoria: String(p.categoria).trim(),
    imagen_producto: p.imagen_producto ? String(p.imagen_producto).trim() : undefined,
    presentacion: p.presentacion ? String(p.presentacion).trim() : undefined,
  })).filter(p => p.precio_minorista && p.precio_mayorista);

  return cacheProductos;
}

/** Devuelve la lista de categorías únicas, ordenadas alfabéticamente. */
export function obtenerCategorias(productos: Producto[]): string[] {
  const categorias = new Set(productos.map((p) => p.categoria));
  return Array.from(categorias).sort();
}
