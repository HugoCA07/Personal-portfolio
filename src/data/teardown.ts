/**
 * Escena "Por dentro": el portátil que se desmonta al hacer scroll.
 *
 * Todo lo ajustable vive aquí: tiempos, movimientos de cada pieza y textos.
 * - Unidades de escena en px (el componente escala la escena para que quepa en pantalla).
 * - Ejes: x → derecha, y → hacia el frente del portátil, z → hacia arriba.
 * - Cada `Motion` suma su desplazamiento entre `from` y `to` (progreso 0–1) con easing suave.
 */

export interface Motion {
  from: number;
  to: number;
  x?: number;
  y?: number;
  z?: number;
  /** Rotaciones en grados. */
  rx?: number;
  ry?: number;
  rz?: number;
}

export type PartId = 'base' | 'battery' | 'board' | 'fan' | 'chip' | 'ram' | 'ssd' | 'topcase' | 'lid';

export interface Part {
  id: PartId;
  /** Posición y tamaño: [x, y, ancho, alto], relativos a la escena o a la pieza padre. */
  rect: [number, number, number, number];
  /** Altura de partida. */
  z: number;
  /** Pieza que la contiene (se mueve con ella). */
  parent?: PartId;
  /** Pieza de detalle: en móvil no se anima por separado. */
  detail?: boolean;
  /** `transform-origin` (la tapa gira sobre la bisagra). */
  origin?: string;
  /** Etiqueta en la vista explosionada y su anclaje en % de la pieza. */
  label?: string;
  anchor?: [number, number];
  /** Lado hacia el que sale la etiqueta (por defecto, derecha). */
  side?: 'left' | 'right';
  motions: Motion[];
}

/** Cámara: inclinación base y movimientos de toda la escena. */
export const camera = {
  width: 440,
  height: 290,
  rx: 58,
  rz: 32,
  /** Caja que debe caber en pantalla (incluye la vista explosionada). */
  fit: { width: 980, height: 1060 },
  motions: [
    { from: 0.1, to: 0.32, y: 60 },
    { from: 0.32, to: 0.6, y: 100 },
    { from: 0.7, to: 0.85, y: 40 },
    { from: 0.82, to: 1, rz: -6 },
  ] as Motion[],
};

/** Tramo en el que aparecen las etiquetas de la vista explosionada. */
export const labelsRange: [number, number] = [0.84, 0.93];

export const parts: Part[] = [
  {
    id: 'base',
    rect: [0, 0, 440, 290],
    z: 0,
    label: 'Carcasa',
    anchor: [100, 30],
    motions: [],
  },
  {
    id: 'battery',
    rect: [70, 168, 300, 104],
    z: 1,
    label: 'Batería',
    anchor: [100, 40],
    motions: [
      { from: 0.58, to: 0.63, z: 20 },
      { from: 0.61, to: 0.7, x: 260, y: 30 },
    ],
  },
  {
    id: 'board',
    rect: [24, 16, 392, 140],
    z: 1,
    label: 'Placa base',
    anchor: [100, 92],
    // Sale hacia delante para que no quede tapada por el teclado
    motions: [{ from: 0.7, to: 0.8, z: 40, y: 200, x: -60 }],
  },
  {
    id: 'ssd',
    parent: 'board',
    rect: [18, 86, 96, 30],
    z: 1,
    detail: true,
    label: 'SSD',
    anchor: [0, 50],
    side: 'left',
    motions: [{ from: 0.72, to: 0.82, z: 40, x: -40 }],
  },
  {
    id: 'chip',
    parent: 'board',
    rect: [140, 34, 62, 62],
    z: 1,
    detail: true,
    label: 'Procesador',
    anchor: [0, 85],
    side: 'left',
    motions: [{ from: 0.72, to: 0.82, z: 70 }],
  },
  {
    id: 'ram',
    parent: 'board',
    rect: [222, 16, 58, 108],
    z: 1,
    detail: true,
    label: 'RAM',
    anchor: [0, 0],
    side: 'left',
    motions: [{ from: 0.73, to: 0.82, z: 105 }],
  },
  {
    id: 'fan',
    parent: 'board',
    rect: [296, 26, 84, 84],
    z: 1,
    detail: true,
    label: 'Ventilador',
    anchor: [100, 50],
    motions: [{ from: 0.74, to: 0.82, z: 50, x: 60 }],
  },
  {
    id: 'topcase',
    rect: [0, 0, 440, 290],
    z: 8,
    label: 'Teclado',
    anchor: [100, 85],
    motions: [
      { from: 0.45, to: 0.58, z: 130 },
      { from: 0.7, to: 0.8, z: 20, y: -50 },
    ],
  },
  {
    id: 'lid',
    rect: [0, 0, 440, 290],
    z: 9,
    origin: '50% 0 0',
    label: 'Pantalla',
    anchor: [100, 30],
    motions: [
      { from: 0.12, to: 0.3, rx: 106 },
      { from: 0.3, to: 0.45, z: 110, y: -40 },
      { from: 0.45, to: 0.58, z: 120 },
      { from: 0.7, to: 0.8, z: 20, y: -50 },
    ],
  },
];

/** Textos de cada tramo. Entran y salen con fundido según su rango. */
export interface Stage {
  from: number;
  to: number;
  kicker: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
}

export const stages: Stage[] = [
  {
    from: 0,
    to: 0.12,
    kicker: 'Por dentro',
    title: 'Entender cómo funciona todo',
    text: 'Sigue bajando: vamos a abrir un portátil pieza a pieza.',
  },
  {
    from: 0.12,
    to: 0.3,
    kicker: 'La tapa',
    title: 'Empecé abriendo equipos de verdad',
    text: 'En el ciclo de Sistemas Microinformáticos y Redes aprendí a montar, diagnosticar y reparar ordenadores.',
  },
  {
    from: 0.3,
    to: 0.45,
    kicker: '01 · Pantalla',
    title: 'Lo que se ve',
    text: 'Interfaces con HTML, CSS, JavaScript y Astro.',
  },
  {
    from: 0.45,
    to: 0.58,
    kicker: '02 · Teclado',
    title: 'Lo que tocas',
    text: 'Formularios, eventos y los detalles que hacen que algo sea cómodo de usar.',
  },
  {
    from: 0.58,
    to: 0.7,
    kicker: '03 · Batería',
    title: 'Lo que aguanta',
    text: 'Git, pruebas y constancia para que un proyecto siga funcionando mañana.',
  },
  {
    from: 0.7,
    to: 0.82,
    kicker: '04 · Placa base',
    title: 'Lo que lo mueve todo',
    text: 'La lógica de verdad: C++, Java, PHP y MySQL.',
  },
  {
    from: 0.82,
    to: 1,
    kicker: 'Vista completa',
    title: 'De reparar equipos a construir software',
    text: 'Trabajé como técnico de sistemas en App Informática, Dos Hermanas (marzo–junio de 2025).',
    link: { label: 'Ver experiencia', href: '/#experiencia' },
  },
];
