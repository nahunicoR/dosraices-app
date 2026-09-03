import { IconType } from "react-icons";
import {
  FaSeedling,
  FaLeaf,
  FaWheatAwn,
  FaCarrot,
  FaBowlFood,
  FaWineBottle,
  FaPepperHot,
  FaBasketShopping,
  FaBox,
  FaMortarPestle,
  FaUtensils,
} from 'react-icons/fa6';

export interface EstiloCategoria {
  /** Color de fondo de la barra de encabezado de la tabla y del ícono en la portada. */
  claseColor: string;
  /** Ícono de Font Awesome (clases completas, ej. "fa-solid fa-seedling"). */
  icono: IconType;
}

// Paleta pensada para que cada categoría se distinga de un vistazo, como en la
// lista impresa. Las claves van en minúscula/sin espacios extra (ver normalizarClave).
const ESTILOS_CONOCIDOS: Record<string, EstiloCategoria> = {
  'frutos secos': { claseColor: 'bg-brand-dark', icono: FaSeedling },
  semillas: { claseColor: 'bg-amber-600', icono: FaLeaf },
  cereales: { claseColor: 'bg-sky-700', icono: FaWheatAwn },
  legumbres: { claseColor: 'bg-violet-700', icono: FaCarrot },
  conservas: { claseColor: 'bg-rose-700', icono: FaBowlFood },
  'aceites y vinagres': { claseColor: 'bg-teal-700', icono: FaWineBottle },
  'salsas y condimentos': { claseColor: 'bg-orange-600', icono: FaPepperHot },
};

// Para categorías que se agreguen en el Sheet y todavía no tengan un estilo
// asignado arriba: se les asigna una de estas en orden, así nunca quedan sin color.
const PALETA_RESERVA: EstiloCategoria[] = [
  { claseColor: 'bg-slate-700', icono: FaBasketShopping },
  { claseColor: 'bg-cyan-700', icono: FaBox },
  { claseColor: 'bg-fuchsia-700', icono: FaMortarPestle },
  { claseColor: 'bg-lime-700', icono: FaUtensils },
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