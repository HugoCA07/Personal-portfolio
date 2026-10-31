/**
 * Pintado de la escena "Por dentro".
 *
 * El componente solo habla con la interfaz `TeardownRenderer`: recibe el progreso (0–1) y pinta.
 * El renderizador actual funde fotografías reales; si algún día hay un vídeo o una secuencia
 * de frames, basta con añadir aquí otro que implemente la misma interfaz.
 */

export interface TeardownRenderer {
  render(p: number): void;
  /** Recalcula lo que depende del tamaño de pantalla (p. ej. la posición de los puntos). */
  resize?(): void;
}

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Opacidad de un tramo con fundido de entrada y salida. */
export function fade(p: number, from: number, to: number, edge = 0.025): number {
  const fadeIn = from <= 0 ? 1 : clamp01((p - from) / edge);
  const fadeOut = to >= 1 ? 1 : clamp01((to - p) / edge);
  return Math.min(fadeIn, fadeOut);
}

/**
 * Convierte un punto en % de la foto original a % de la caja que la muestra con `object-fit: cover`,
 * teniendo en cuenta el recorte y el encuadre (`object-position`).
 */
export function coverPoint(
  point: { x: number; y: number },
  image: { w: number; h: number },
  box: { w: number; h: number },
  focus: { x: number; y: number },
) {
  const k = Math.max(box.w / image.w, box.h / image.h);
  const rw = image.w * k;
  const rh = image.h * k;
  const ox = (box.w - rw) * (focus.x / 100);
  const oy = (box.h - rh) * (focus.y / 100);
  return {
    x: ((ox + (point.x / 100) * rw) / box.w) * 100,
    y: ((oy + (point.y / 100) * rh) / box.h) * 100,
  };
}

/**
 * Fotos apiladas: cada una entra con un fundido un poco antes de su tramo y tapa a la anterior,
 * y durante su tramo hace un acercamiento lento (efecto "cámara que se acerca").
 * - Capas `[data-shot]` con `data-from` / `data-to`.
 * - Dentro, los `[data-frame]` (foto y puntos) reciben el mismo zoom.
 * - La capa del tramo actual lleva `data-active` (los puntos solo se ven ahí).
 * - Puntos `[data-spot]` con `data-x` / `data-y` en % de la foto; la capa trae `data-w`, `data-h` y `data-focus`.
 * - Los puntos que caen sobre `[data-avoid]` (el texto) o pegados al borde se ocultan.
 */
export function createPhotoRenderer(root: HTMLElement, { overlap = 0.04, zoom = 0.08 } = {}): TeardownRenderer {
  const shots = [...root.querySelectorAll<HTMLElement>('[data-shot]')].map((el) => ({
    el,
    frames: [...el.querySelectorAll<HTMLElement>('[data-frame]')],
    spots: [...el.querySelectorAll<HTMLElement>('[data-spot]')],
    from: Number(el.dataset.from),
    to: Number(el.dataset.to),
    image: { w: Number(el.dataset.w), h: Number(el.dataset.h) },
    focus: (() => {
      const [x = '50', y = '50'] = (el.dataset.focus ?? '50% 50%').split(' ');
      return { x: parseFloat(x), y: parseFloat(y) };
    })(),
  }));

  const avoidEl = root.querySelector<HTMLElement>('[data-avoid]');
  const resize = () => {
    const avoid = avoidEl?.getBoundingClientRect();
    for (const s of shots) {
      if (!s.spots.length) continue;
      const box = { w: s.el.clientWidth, h: s.el.clientHeight };
      const origin = s.el.getBoundingClientRect();
      for (const spot of s.spots) {
        const { x, y } = coverPoint({ x: Number(spot.dataset.x), y: Number(spot.dataset.y) }, s.image, box, s.focus);
        spot.style.left = `${x.toFixed(2)}%`;
        spot.style.top = `${y.toFixed(2)}%`;
        // La etiqueta se abre hacia el lado con más espacio
        spot.classList.toggle('flip', x > 62);
        const px = origin.left + (x / 100) * box.w;
        const py = origin.top + (y / 100) * box.h;
        const overText =
          !!avoid && px > avoid.left - 32 && px < avoid.right + 32 && py > avoid.top - 32 && py < avoid.bottom + 32;
        spot.hidden = overText || x < 5 || x > 93 || y < 12 || y > 92;
      }
    }
  };
  resize();

  return {
    resize,
    render(p) {
      shots.forEach(({ el, frames, from, to }, i) => {
        const opacity = from <= 0 ? 1 : clamp01((p - from + overlap) / overlap);
        const next = shots[i + 1];
        // Una capa tapada por completo por la siguiente se oculta para no gastar en pintarla
        const covered = next ? p >= next.from : false;
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity === 0 || covered ? 'hidden' : 'visible';
        el.toggleAttribute('data-active', p >= from && (p < to || to >= 1) && !covered);
        const t = clamp01((p - from + overlap) / (to - from + overlap));
        const transform = `scale(${(1 + zoom - zoom * t).toFixed(4)})`;
        for (const f of frames) f.style.transform = transform;
      });
    },
  };
}
