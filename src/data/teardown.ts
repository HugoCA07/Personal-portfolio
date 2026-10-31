/**
 * Escena "Por dentro": un portátil real, de cerrado a desmontado, contado con fotografías.
 *
 * Cada tramo tiene su foto, su rango de progreso (0–1), su texto y, opcionalmente, puntos
 * interactivos (`spots`) sobre las piezas, en % de la foto original (x: izquierda→derecha, y: arriba→abajo).
 * Los textos no repiten datos de otras secciones (formación, prácticas, tecnologías): eso vive en
 * Trayectoria, Experiencia y Stack.
 * Fotos de Unsplash (licencia libre de Unsplash); el crédito se muestra en la escena.
 * Para cambiar una foto: sustituye el archivo en `src/assets/teardown/` y actualiza `credit`.
 */
import portatil from '@/assets/teardown/01-portatil.jpg';
import pantalla from '@/assets/teardown/02-pantalla.jpg';
import teclado from '@/assets/teardown/03-teclado.jpg';
import interior from '@/assets/teardown/04-interior.jpg';
import bateria from '@/assets/teardown/05-bateria.jpg';
import placa from '@/assets/teardown/06-placa.jpg';
import taller from '@/assets/teardown/07-taller.jpg';

export interface Spot {
  x: number;
  y: number;
  label: string;
  text: string;
}

export interface Stage {
  from: number;
  to: number;
  image: ImageMetadata;
  alt: string;
  /** Encuadre de la foto (`object-position`) para que lo importante no se recorte. */
  focus?: string;
  credit: { author: string; url: string };
  kicker: string;
  title: string;
  text: string;
  link?: { label: string; href: string };
  spots?: Spot[];
}

export const stages: Stage[] = [
  {
    from: 0,
    to: 0.14,
    image: portatil,
    alt: 'Portátil entreabierto que ilumina la mesa en la oscuridad',
    focus: '55% 50%',
    credit: { author: 'Ales Nesetril', url: 'https://unsplash.com/photos/gray-and-black-laptop-computer-on-surface-Im7lZjxeLhg' },
    kicker: 'Por dentro',
    title: 'Entender cómo funciona todo',
    text: 'Desplázate para abrirlo. En las fotos del interior, toca o pasa el ratón por los puntos para ver qué es cada pieza.',
  },
  {
    from: 0.14,
    to: 0.28,
    image: pantalla,
    alt: 'Pantalla de un portátil con código',
    focus: '60% 30%',
    credit: { author: 'Caspar Camille Rubin', url: 'https://unsplash.com/photos/macbook-pro-with-images-of-computer-language-codes-fPkvU7RDmCo' },
    kicker: '01 · Pantalla',
    title: 'Lo que se ve',
    text: 'Interfaces que se entienden sin instrucciones.',
  },
  {
    from: 0.28,
    to: 0.42,
    image: teclado,
    alt: 'Teclado negro con las teclas iluminadas',
    focus: '60% 50%',
    credit: { author: 'Christian Lue', url: 'https://unsplash.com/photos/black-computer-keyboard-on-black-surface-oj7Z1ucRxcs' },
    kicker: '02 · Teclado',
    title: 'Lo que tocas',
    text: 'Formularios y eventos que responden como esperas.',
  },
  {
    from: 0.42,
    to: 0.56,
    image: interior,
    alt: 'Portátil abierto por debajo sobre una alfombrilla de corte, con los componentes a la vista',
    focus: '50% 55%',
    credit: { author: 'Ritupon Baishya', url: 'https://unsplash.com/photos/laptop-with-internal-components-exposed-qzS0Xso98L0' },
    kicker: 'La tapa inferior',
    title: 'Empecé abriendo equipos de verdad',
    text: 'Montar, diagnosticar y reparar: así aprendí cómo encaja cada pieza.',
    spots: [
      { x: 58.5, y: 26.5, label: 'Ventilador', text: 'Saca el aire caliente. Si suena raro, casi siempre es polvo.' },
      { x: 42, y: 35, label: 'Heat pipe', text: 'Tubo de cobre que lleva el calor del procesador a los ventiladores.' },
      { x: 54, y: 62, label: 'Batería', text: 'Varias celdas pegadas al chasis.' },
      { x: 75, y: 26, label: 'Pincel', text: 'La herramienta más usada en un mantenimiento: quitar polvo.' },
    ],
  },
  {
    from: 0.56,
    to: 0.7,
    image: bateria,
    alt: 'Celdas de la batería dentro del chasis de un portátil',
    focus: '50% 45%',
    credit: { author: 'Ritupon Baishya', url: 'https://unsplash.com/photos/laptop-battery-cells-and-copper-components-ycqGBZJi2Bk' },
    kicker: '03 · Batería',
    title: 'Lo que aguanta',
    text: 'Código que sigue funcionando mañana: control de versiones, pruebas y constancia.',
    spots: [
      { x: 31, y: 37, label: 'Celda', text: 'Cada bloque es una celda de iones de litio.' },
      { x: 51, y: 69, label: 'Contactos', text: 'Contactos de cobre para la conexión eléctrica.' },
      { x: 86.5, y: 69, label: 'Tornillo', text: 'Tornillos de cabeza especial: hace falta la punta adecuada.' },
    ],
  },
  {
    from: 0.7,
    to: 0.84,
    image: placa,
    alt: 'Placa base de un portátil con el ventilador y los chips',
    focus: '40% 50%',
    credit: { author: 'Zoshua Colah', url: 'https://unsplash.com/photos/close-up-view-of-a-laptops-internal-components-and-fan-YunxbqyMGYo' },
    kicker: '04 · Placa base',
    title: 'Lo que lo mueve todo',
    text: 'La lógica y los datos que nadie ve, pero que hacen que todo funcione.',
    spots: [
      { x: 31, y: 42, label: 'Ventilador', text: 'Turbina que mueve el aire por las aletas del disipador.' },
      { x: 12, y: 52, label: 'Disipador', text: 'Aletas metálicas por las que sale el calor.' },
      { x: 56, y: 63, label: 'Bobina', text: 'Ayuda a estabilizar la corriente que llega a los componentes.' },
      { x: 34.5, y: 86, label: 'Chip blindado', text: 'Un chip bajo una tapa metálica que lo protege de interferencias.' },
    ],
  },
  {
    from: 0.84,
    to: 1,
    image: taller,
    alt: 'Interior de un portátil durante una limpieza, con un pincel al lado',
    focus: '35% 50%',
    credit: { author: 'Ritupon Baishya', url: 'https://unsplash.com/photos/laptop-interior-with-cooling-fan-0-3Pj0vXhQY' },
    kicker: 'El taller',
    title: 'De reparar equipos a construir software',
    text: 'Desmontar algo es la mejor forma de entenderlo. Con el software hago lo mismo.',
    link: { label: 'Dónde lo aprendí', href: '/#experiencia' },
    spots: [
      { x: 47, y: 34, label: 'Ventilador', text: 'Limpio y sin polvo: equipo listo para devolver.' },
      { x: 46, y: 61, label: 'Memoria', text: 'Chips de memoria soldados a la placa.' },
      { x: 78, y: 52, label: 'Pincel', text: 'Cerdas suaves para no dañar los componentes.' },
    ],
  },
];
