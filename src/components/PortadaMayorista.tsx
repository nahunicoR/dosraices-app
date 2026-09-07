import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { obtenerEstiloCategoria } from '../config/estilosCategoria';
import { FaArrowLeft, FaHandHoldingHand } from "react-icons/fa6";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { PiOrangeBold } from "react-icons/pi";

interface PortadaMayoristaProps {
  categorias: string[];
}

/**
 * Panel de marca, fijo a la izquierda mientras las tablas de la derecha scrollean.
 * Es una aproximación con Tailwind + íconos (no tenemos el logo ni la foto reales
 * todavía) — reemplazable después por las imágenes de la lista impresa.
 */
export function PortadaMayorista({ categorias }: PortadaMayoristaProps) {
  const edicion = useMemo(() => {
    const texto = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(new Date());
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }, []);

  return (
    <aside className="lg:w-[460px] lg:h-screen shrink-0 bg-cover text-white flex flex-col bg-blend-overlay bg-black/55"
      style={{ backgroundImage: "url('/images/flyer-png.png')" }}>
      <div className="flex-1 lg:overflow-y-auto px-6 py-4 flex flex-col items-center text-center">
        <Link to="/" className="self-start flex gap-2 items-center text-[14px] font-semibold hover:text-white hover:underline transition mb-8">
          <FaArrowLeft size={20} />Volver al inicio
        </Link>

        <div className="w-20 h-20 rounded-full border-2  bg-white/5 flex items-center justify-center mb-4">
          <img className='rounded-full' src="/images/dosraices_logo.png" alt="Dos Raíces Logo" />
        </div>
        <h1 className="text-2xl font-bold tracking-wide">DOS RAÍCES</h1>
        <p className="text-[14px] tracking-[0.2em] font-semibold mt-2 italic">DISTRIBUIDORA MAYORISTA</p>

        <div className="w-10 h-px bg-white my-1" />

        <h2 className="text-xl mt-3 font-bold">Lista Mayorista</h2>
        <p className="text-amber-600 font-semibold text-md mt-1">{edicion}</p>

        <div className="mt-6 bg-brand/85 border border-brand-light/30 rounded-full px-4 py-2 text-[11px] font-semibold tracking-wide">
          VENTA MAYORISTA · BULTOS · CAJAS · KILOS
        </div>

        {categorias.length > 0 && (
          <div className="grid grid-cols-4 gap-x-3 gap-y-4 mt-8 w-full max-w-[280px]">
            {categorias.map((categoria, indice) => {
              const estilo = obtenerEstiloCategoria(categoria, indice);
              const Icono = estilo.icono; // alias con mayúscula: así JSX lo trata como componente
              return (
                <div key={categoria} className="flex flex-col items-center gap-1.5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${estilo.claseColor}`}>
                    <Icono className="text-sm text-white" aria-hidden="true" />
                  </div>
                  <span className="text-[12px] leading-tight font-semibold">{categoria}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-4 pt-2 w-full border-t  grid grid-cols-3 text-[11px] font-semibold">
          <div className="flex flex-col items-center gap-1.5">
            <MdOutlineWorkspacePremium size={25} />
            Calidad seleccionada
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <PiOrangeBold size={25} />
            Productos naturales
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <FaHandHoldingHand size={25} />
            Confianza y compromiso
          </div>
        </div>

        <p className="text-[14px]  italic mt-4 text-amber-600 font-semibold">
          "Alimentos que nutren, conexiones que perduran"
        </p>
      </div>
    </aside>
  );
}
