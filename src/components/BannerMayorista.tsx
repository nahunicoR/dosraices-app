import { CONFIG } from '../config/config';
import { formatearPrecio } from '../utils/formatPrice';
import { useModoVentaStore } from '../store/modoVentaStore';
import { useTotalCarrito } from '../store/carritoStore';

export function BannerMayorista() {
  const modo = useModoVentaStore((state) => state.modo);
  const total = useTotalCarrito();

  if (modo !== 'mayorista') return null;

  const progreso = Math.min(100, Math.round((total / CONFIG.MINIMUM_PURCHASE_AMOUNT) * 100));
  const alcanzoMinimo = total >= CONFIG.MINIMUM_PURCHASE_AMOUNT;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6">
      <div className="bg-amber-50 border border-brand-accent/40 rounded-2xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <h2 className="font-bold text-brand-dark text-lg">Venta Mayorista</h2>
          </div>
          <span className="bg-white border border-brand-accent/40 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full">
            Por bulto cerrado
          </span>
        </div>
        <p className="text-sm text-stone-600 mt-2">
          Sumá productos al carrito: al llegar a{' '}
          <span className="font-semibold text-brand-accent">
            {formatearPrecio(CONFIG.MINIMUM_PURCHASE_AMOUNT)}
          </span>{' '}
          se habilita tu pedido mayorista.
        </p>
        <div className="flex justify-between items-baseline mt-3">
          <span className="text-2xl font-bold text-brand-dark">{formatearPrecio(total)}</span>
          <span className="text-xs text-stone-400">
            Mínimo: {formatearPrecio(CONFIG.MINIMUM_PURCHASE_AMOUNT)}
          </span>
        </div>
        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-brand-accent transition-all" style={{ width: `${progreso}%` }} />
        </div>
        {alcanzoMinimo && (
          <p className="text-sm text-green-600 font-medium mt-3">
            ✓ Alcanzaste el mínimo para enviar tu pedido
          </p>
        )}
      </div>
    </div>
  );
}
