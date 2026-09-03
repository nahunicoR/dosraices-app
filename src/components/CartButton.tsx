import { useCantidadTotalCarrito, useCarritoStore } from '../store/carritoStore';
import { FaShoppingCart } from "react-icons/fa";


export function CartButton() {
  const cantidad = useCantidadTotalCarrito();
  const abrir = useCarritoStore((state) => state.abrir);

  return (
    <button
      type="button"
      onClick={abrir}
      className="fixed bottom-6 right-6 z-40 bg-brand-dark text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-brand transition"
      aria-label={cantidad > 0 ? `Ver carrito (${cantidad} unidades)` : 'Ver carrito'}
    >
      <span className="text-2xl">
        <FaShoppingCart size={30} />
      </span>
      {cantidad > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {cantidad}
        </span>
      )}
    </button>
  );
}
