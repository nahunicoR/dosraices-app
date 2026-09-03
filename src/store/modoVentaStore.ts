import { create } from 'zustand';

export type ModoVenta = 'mayorista' | 'minorista';

interface ModoVentaState {
  /** null hasta que se entra a /mayorista o /minorista (todavía no se eligió modalidad). */
  modo: ModoVenta | null;
  establecerModo: (modo: ModoVenta) => void;
}

export const useModoVentaStore = create<ModoVentaState>((set) => ({
  modo: null,
  establecerModo: (modo) => set({ modo }),
}));
