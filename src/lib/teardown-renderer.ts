/**
 * Renderizadores de la escena "Por dentro".
 *
 * El componente solo habla con la interfaz `TeardownRenderer`: recibe el progreso (0–1) y pinta.
 * Hoy existe uno con CSS 3D; si más adelante hay un render realista exportado como frames,
 * basta con añadir aquí un `createCanvasFramesRenderer` que dibuje el frame correspondiente.
 */
import type { Motion, Part } from '@/data/teardown';
import { camera, labelsRange } from '@/data/teardown';

export interface TeardownRenderer {
  render(p: number): void;
}

type Transform = Required<Pick<Motion, 'x' | 'y' | 'z' | 'rx' | 'ry' | 'rz'>>;
const ZERO: Transform = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
const KEYS = Object.keys(ZERO) as (keyof Transform)[];

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
/** easeInOutCubic: arranque y frenada suaves. */
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Suma los movimientos activos en el progreso `p`. */
export function sample(motions: Motion[], p: number): Transform {
  const acc = { ...ZERO };
  for (const m of motions) {
    const t = ease(clamp01((p - m.from) / (m.to - m.from)));
    if (t === 0) continue;
    for (const k of KEYS) acc[k] += (m[k] ?? 0) * t;
  }
  return acc;
}

/** Opacidad de un tramo con fundido de entrada y salida. */
export function fade(p: number, from: number, to: number, edge = 0.025): number {
  const fadeIn = from <= 0 ? 1 : clamp01((p - from) / edge);
  const fadeOut = to >= 1 ? 1 : clamp01((to - p) / edge);
  return Math.min(fadeIn, fadeOut);
}

const r = (n: number) => Math.round(n * 100) / 100;

/** Renderizador con CSS 3D: cada pieza es un plano con `preserve-3d`. */
export function createCss3dRenderer(root: HTMLElement, parts: Part[]): TeardownRenderer {
  const scene = root.querySelector<HTMLElement>('[data-scene]')!;
  const compact = matchMedia('(max-width: 639.98px)');
  const items = parts.map((part) => {
    const el = root.querySelector<HTMLElement>(`[data-part="${part.id}"]`)!;
    return { part, el, tag: el.querySelector<HTMLElement>(':scope > [data-tag]') };
  });

  return {
    render(p) {
      const cam = sample(camera.motions, p);
      const srx = camera.rx + cam.rx;
      const srz = camera.rz + cam.rz;
      scene.style.transform = `translate3d(${r(cam.x)}px, ${r(cam.y)}px, 0) rotateX(${r(srx)}deg) rotateZ(${r(srz)}deg)`;

      const labels = clamp01((p - labelsRange[0]) / (labelsRange[1] - labelsRange[0]));
      for (const { part, el, tag } of items) {
        const skip = part.detail && compact.matches;
        const m = skip ? ZERO : sample(part.motions, p);
        el.style.transform =
          `translate3d(${r(m.x)}px, ${r(m.y)}px, ${r(part.z + m.z)}px) ` +
          `rotateX(${r(m.rx)}deg) rotateY(${r(m.ry)}deg) rotateZ(${r(m.rz)}deg)`;

        if (!tag) continue;
        // La etiqueta deshace todas las rotaciones para mirar siempre de frente a la pantalla
        tag.style.opacity = skip ? '0' : String(labels);
        tag.style.transform =
          `translateZ(2px) rotateZ(${r(-m.rz)}deg) rotateY(${r(-m.ry)}deg) rotateX(${r(-m.rx)}deg) ` +
          `rotateZ(${r(-srz)}deg) rotateX(${r(-srx)}deg) scale(var(--tag-scale, 1))`;
      }
    },
  };
}
