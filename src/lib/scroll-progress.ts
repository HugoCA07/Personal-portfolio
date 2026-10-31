/**
 * Progreso de scroll (0 → 1) de una sección más alta que la pantalla con contenido `sticky`.
 * 0 = la sección empieza a fijarse arriba · 1 = termina el tramo fijo.
 *
 * - Escribe el progreso en una variable CSS (por defecto `--p`) y/o llama a `onProgress`.
 * - Solo escucha el scroll mientras la sección está en pantalla (IntersectionObserver).
 * - Agrupa las lecturas en un `requestAnimationFrame` y usa listeners pasivos.
 * - Con `prefers-reduced-motion` fija el valor `reducedValue` y no anima.
 */

export interface ScrollProgressOptions {
  /** Variable CSS donde se escribe el progreso (`null` para no escribirla). */
  cssVar?: string | null;
  /** Valor fijo cuando el usuario prefiere menos movimiento. */
  reducedValue?: number;
  onProgress?: (p: number) => void;
}

export interface ScrollProgress {
  /** Fuerza un recálculo (por ejemplo, tras cambiar el tamaño de algo). */
  refresh(): void;
  destroy(): void;
}

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollProgress(el: HTMLElement, options: ScrollProgressOptions = {}): ScrollProgress {
  const { cssVar = '--p', reducedValue = 0, onProgress } = options;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let last = Number.NaN;

  const update = () => {
    frame = 0;
    let p = reducedValue;
    if (!reduced.matches) {
      const range = el.offsetHeight - innerHeight;
      p = range > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / range)) : 0;
    }
    if (p === last) return;
    last = p;
    if (cssVar) el.style.setProperty(cssVar, p.toFixed(4));
    onProgress?.(p);
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const refresh = () => {
    last = Number.NaN;
    schedule();
  };

  let listening = false;
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting === listening) return;
    listening = entry.isIntersecting;
    if (listening) addEventListener('scroll', schedule, { passive: true });
    else removeEventListener('scroll', schedule);
    // Un último cálculo al salir deja el progreso en 0 o 1 aunque el scroll haya sido muy rápido
    schedule();
  });
  io.observe(el);

  addEventListener('resize', refresh, { passive: true });
  reduced.addEventListener('change', refresh);
  update();

  return {
    refresh,
    destroy() {
      io.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', refresh);
      reduced.removeEventListener('change', refresh);
      cancelAnimationFrame(frame);
    },
  };
}
