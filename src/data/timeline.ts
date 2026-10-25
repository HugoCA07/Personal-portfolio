/**
 * Trayectoria: hitos ordenados cronológicamente.
 * `current: true` marca el punto en el que estás ahora.
 */

export interface Milestone {
  year: string;
  title: string;
  text: string;
  current?: boolean;
  future?: boolean;
}

export const timeline: Milestone[] = [
  {
    year: '2007',
    title: 'El comienzo',
    text: 'Nazco con la curiosidad de saber cómo funciona todo por dentro.',
  },
  {
    year: '2024',
    title: 'Primer commit',
    text: 'Creo mi cuenta de GitHub y empiezo a programar en serio: C, C++, Python y mis primeras webs.',
  },
  {
    year: '2025',
    title: '1º de DAW',
    text: 'Empiezo el ciclo de Desarrollo de Aplicaciones Web: Java, bases de datos, SQL y frontend.',
  },
  {
    year: '2026',
    title: 'TerraForge',
    text: 'Construyo desde cero un motor y juego sandbox 2D en C++ con generación procedural de mundos.',
  },
  {
    year: '2026',
    title: 'Gestor de aparcamientos',
    text: 'Proyecto en equipo: una app de escritorio MVC en Java y MySQL para una cadena de parkings.',
  },
  {
    year: 'Ahora',
    title: '2º de DAW',
    text: 'Desarrollo web en entorno cliente y servidor, diseño de interfaces y PHP.',
    current: true,
  },
  {
    year: 'Próximo',
    title: 'Lo que viene',
    text: 'Proyectos más grandes y colaborar con otros desarrolladores.',
    future: true,
  },
];
