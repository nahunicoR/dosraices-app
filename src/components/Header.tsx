import { Link } from 'react-router-dom';
import { CONFIG } from '../config/config';
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

interface HeaderProps {
  terminoBusqueda: string;
  onCambiarBusqueda: (valor: string) => void;
}

export function Header({ terminoBusqueda, onCambiarBusqueda }: HeaderProps) {
  return (
    <>
      <header className="bg-brand-dark text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/30 flex items-center justify-center font-bold text-sm shrink-0">
              DR
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Dietética Dos Raíces</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <a
                  href={`https://wa.me/${CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-white text-sm"
                  title="WhatsApp"
                >
                  <IoLogoWhatsapp size={20} color='#3AAD3F' />

                </a>
                <a
                  href={CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-300 hover:text-white text-sm"
                  title="Instagram"
                >
                  <FaInstagram size={20} color='#D433CC' />
                </a>
                <a
                  href={CONFIG.UBICACION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-white text-sm"
                  title="Ubicación"
                >
                  <FaLocationDot size={20} color='#E61F0A' />
                </a>
                <Link
                  to="/"
                  className="text-white/70 hover:text-white text-xs underline"
                  title="Volver a elegir mayorista/minorista"
                >
                  Cambiar tipo de compra
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-[200px] max-w-md">
            <label htmlFor="input-buscador" className="sr-only">
              Buscar productos
            </label>
            <input
              id="input-buscador"
              type="text"
              value={terminoBusqueda}
              onChange={(evento) => onCambiarBusqueda(evento.target.value)}
              placeholder="Buscar productos..."
              className="w-full rounded-md px-4 py-2 text-stone-800 focus:outline-none"
            />
          </div>
        </div>
      </header>
      <div className="bg-brand text-white text-center text-sm py-2 px-4">
        🚚 Hacemos envíos a todo el Gran Mendoza
      </div>
    </>
  );
}
