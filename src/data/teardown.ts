/**
 * Escena "Por dentro": un portátil real, de cerrado a desmontado, contado con fotografías.
 *
 * Cada tramo tiene su foto, su rango de progreso (0–1) y su texto. Las fotos se funden
 * entre sí y hacen un acercamiento lento mientras dura su tramo.
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
    text: 'Sigue bajando: vamos a abrir un portátil pieza a pieza.',
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
    text: 'Interfaces con HTML, CSS, JavaScript y Astro.',
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
    text: 'Formularios, eventos y los detalles que hacen que algo sea cómodo de usar.',
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
    text: 'En el ciclo de Sistemas Microinformáticos y Redes aprendí a montar, diagnosticar y reparar ordenadores.',
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
    text: 'Git, pruebas y constancia para que un proyecto siga funcionando mañana.',
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
    text: 'La lógica de verdad: C++, Java, PHP y MySQL.',
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
    text: 'Trabajé como técnico de sistemas en App Informática, Dos Hermanas (marzo–junio de 2025).',
    link: { label: 'Ver experiencia', href: '/#experiencia' },
  },
];
