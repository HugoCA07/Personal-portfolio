/**
 * Pintado de la escena "Por dentro".
 *
 * El componente solo habla con la interfaz `TeardownRenderer`: recibe el progreso (0–1) y pinta.
 * El renderizador actual funde fotografías reales; si algún día hay un vídeo o una secuencia
 * de frames, basta con añadir aquí otro que implemente la misma interfaz.
 */

export interface TeardownRenderer {
  render(p: number): void;
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Opacidad de un tramo con fundido de entrada y salida. */
export function fade(p: number, from: number, to: number, edge = 0.025): number {
  const fadeIn = from <= 0 ? 1 : clamp01((p - from) / edge);
  const fadeOut = to >= 1 ? 1 : clamp01((to - p) / edge);
  return Math.min(fadeIn, fadeOut);
}

/**
 * Fotos apiladas: cada una entra con un fundido un poco antes de su tramo y tapa a la anterior,
 * y durante su tramo hace un acercamiento lento (efecto "cámara que se acerca").
 * Lee los tramos de `data-from` / `data-to` de cada capa `[data-shot]`.
 */
export function createPhotoRenderer(root: HTMLElement, { overlap = 0.04, zoom = 0.1 } = {}): TeardownRenderer {
  const shots = [...root.querySelectorAll<HTMLElement>('[data-shot]')].map((el) => ({
    el,
    img: el.querySelector<HTMLElement>('img'),
    from: Number(el.dataset.from),
    to: Number(el.dataset.to),
  }));

  return {
    render(p) {
      shots.forEach(({ el, img, from, to }, i) => {
        const opacity = from <= 0 ? 1 : clamp01((p - from + overlap) / overlap);
        // Una capa tapada por completo por la siguiente se oculta para no gastar en pintarla
        const next = shots[i + 1];
        const covered = next ? p >= next.from : false;
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity === 0 || covered ? 'hidden' : 'visible';
        if (img) {
          const t = clamp01((p - from + overlap) / (to - from + overlap));
          img.style.transform = `scale(${(1 + zoom - zoom * t).toFixed(4)})`;
        }
      });
    },
  };
}
