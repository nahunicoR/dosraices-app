import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-brand-dark mb-2">Dietética Dos Raíces</h1>
        <p className="text-stone-500 mb-8">¿Cómo querés comprar hoy?</p>
        <div className="space-y-4">
          <Link
            to="/mayorista"
            className="block w-full bg-brand-dark text-white rounded-xl py-4 font-semibold hover:bg-brand transition"
          >
            Venta Mayorista
            <span className="block text-xs font-normal text-white/70 mt-1">
              Por bulto cerrado, con monto mínimo
            </span>
          </Link>
          <Link
            to="/minorista"
            className="block w-full bg-white border-2 border-brand-dark text-brand-dark rounded-xl py-4 font-semibold hover:bg-stone-50 transition"
          >
            Venta Minorista
            <span className="block text-xs font-normal text-stone-400 mt-1">Por unidad, sin mínimo</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
