import { useEffect, useState } from 'react';

/** Devuelve `valor` recién después de que pasen `delayMs` sin que cambie. Útil para inputs de búsqueda. */
export function useDebouncedValue<T>(valor: T, delayMs = 300): T {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timeoutId = setTimeout(() => setValorDebounced(valor), delayMs);
    return () => clearTimeout(timeoutId);
  }, [valor, delayMs]);

  return valorDebounced;
}
