interface SidebarProps {
  categorias: string[];
  categoriaActiva: string | null;
  onSeleccionar: (categoria: string | null) => void;
}

export function Sidebar({ categorias, categoriaActiva, onSeleccionar }: SidebarProps) {
  return (
    <nav className="space-y-2" aria-label="Categorías de productos">
      <button
        type="button"
        onClick={() => onSeleccionar(null)}
        className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
          !categoriaActiva ? 'bg-brand-dark text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
        }`}
      >
        Todos los productos
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria}
          type="button"
          onClick={() => onSeleccionar(categoria)}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            categoriaActiva === categoria ? 'bg-brand-dark text-white' : 'bg-white text-stone-700 hover:bg-stone-100'
          }`}
        >
          {categoria}
        </button>
      ))}
    </nav>
  );
}
