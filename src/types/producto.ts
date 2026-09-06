export type MetodoEnvio =
  | 'cabify'
  | 'uber'
  | 'pedidos ya'
  | 'propio'
  | 'retira por local';

export interface Producto {
  id: number;
  nombre_producto: string;
  categoria: string;
  descripcion: string;
  stock: number;

  // Precios distintos según el canal de venta (ver Sheet: columnas
  // precio_minorista y precio_mayorista).
  precio_minorista: number;
  precio_mayorista: number;
  minorista_100gr: number;
  minorista_250gr: number;
  minorista_500gr: number;
  MAYORISTA_250gr: number;
  MAYORISTA_500gr: number;
  MAYORISTA_1KG: number;
  metodo_envio: MetodoEnvio;
  // Opcional: URL pública de la foto del producto.
  imagen_producto?: string;
  // Opcional: unidad de venta mostrada en la lista de precios (ej. "Kg", "Lata 400 g",
  // "500 ml (unidad)"). Requiere agregar la columna "presentacion" en el Google Sheet;
  // si no existe todavía, queda undefined y la UI lo maneja sin romperse.
  presentacion?: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
