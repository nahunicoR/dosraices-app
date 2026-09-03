/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta "Dos Raíces": verde bosque + dorado, sobre fondo papel/crema.
        // Tomada de la lista mayorista impresa (portada verde oscuro, sello
        // dorado "Venta Mayorista") y del patrón de verduras en línea.
        brand: {
          dark: '#1c3328', // verde bosque oscuro — headers, botones principales, portada
          DEFAULT: '#3d6b4c', // verde medio — hover de botones, franja de envíos
          light: '#a9c4a0', // verde salvia claro — fondos suaves, placeholders
          accent: '#c98a2e', // dorado — sello "mayorista", barra de progreso, avisos
        },
        paper: '#f3efe2', // fondo crema/papel de toda la app
      },
    },
  },
  plugins: [],
};
