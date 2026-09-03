// Completá estos valores a mano antes de correr el proyecto (o usá el .env).

const API_URL = import.meta.env.VITE_APP_SCRIPT_URL;
const NUM_WHATSAPP = import.meta.env.VITE_NUM_WHATSAPP_DISTRIBUIDORA;
const INSTAGRAM_LINK = import.meta.env.VITE_INSTAGRAM_LINK;
const LOCATION_LINK = import.meta.env.VITE_LOCATION_LINK;

export const CONFIG = {
  // Paso 2: pegá acá la URL que termina en /exec del Apps Script Web App.
  GOOGLE_SHEETS_API_URL: API_URL || 'PEGAR_URL_APPS_SCRIPT_AQUI',

  // Número de WhatsApp del emprendimiento, formato internacional sin '+' ni espacios.
  // Ejemplo Argentina (11 3344-5566): 5491133445566
  WHATSAPP_NUMBER: NUM_WHATSAPP || 'PEGAR_NUMERO_WHATSAPP_AQUI',

  // Enlaces del header (opcional). Dejalos como están si no los usás todavía.
  INSTAGRAM_URL: INSTAGRAM_LINK || 'PEGAR_LINK_INSTAGRAM_AQUI',
  UBICACION_URL: LOCATION_LINK || 'PEGAR_LINK_UBICACION_AQUI',

  // Monto mínimo de compra, exigido únicamente en la página mayorista (/mayorista).
  // La página minorista (/minorista) nunca pide mínimo.
  MINIMUM_PURCHASE_AMOUNT: 250000,
} as const;
