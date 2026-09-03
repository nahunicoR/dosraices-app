export interface EstiloCategoria {
  /** Color de fondo de la barra de encabezado de la tabla y del ícono en la portada. */
  claseColor: string;
  /** Ícono de Font Awesome (clases completas, ej. "fa-solid fa-seedling"). */
  icono: string;
}

// Paleta pensada para que cada categoría se distinga de un vistazo, como en la
// lista impresa. Las claves van en minúscula/sin espacios extra (ver normalizarClave).
const ESTILOS_CONOCIDOS: Record<string, EstiloCategoria> = {
  'frutos secos': { claseColor: 'bg-brand-dark', icono: 'fa-solid fa-seedling' },
  semillas: { claseColor: 'bg-amber-600', icono: 'fa-solid fa-leaf' },
  cereales: { claseColor: 'bg-sky-700', icono: 'fa-solid fa-wheat-awn' },
  legumbres: { claseColor: 'bg-violet-700', icono: 'fa-solid fa-carrot' },
  conservas: { claseColor: 'bg-rose-700', icono: 'fa-solid fa-bowl-food' },
  'aceites y vinagres': { claseColor: 'bg-teal-700', icono: 'fa-solid fa-wine-bottle' },
  'salsas y condimentos': { claseColor: 'bg-orange-600', icono: 'fa-solid fa-pepper-hot' },
};

// Para categorías que se agreguen en el Sheet y todavía no tengan un estilo
// asignado arriba: se les asigna una de estas en orden, así nunca quedan sin color.
const PALETA_RESERVA: EstiloCategoria[] = [
  { claseColor: 'bg-slate-700', icono: 'fa-solid fa-basket-shopping' },
  { claseColor: 'bg-cyan-700', icono: 'fa-solid fa-box' },
  { claseColor: 'bg-fuchsia-700', icono: 'fa-solid fa-mortar-pestle' },
  { claseColor: 'bg-lime-700', icono: 'fa-solid fa-utensils' },
];

function normalizarClave(categoria: string): string {
  return categoria.trim().toLowerCase();
}

/** Devuelve color + ícono para una categoría. `indice` se usa solo como respaldo para categorías nuevas. */
export function obtenerEstiloCategoria(categoria: string, indice: number): EstiloCategoria {
  const estiloConocido = ESTILOS_CONOCIDOS[normalizarClave(categoria)];
  if (estiloConocido) return estiloConocido;
  return PALETA_RESERVA[indice % PALETA_RESERVA.length];
}
