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
    year: '2023',
    title: 'Sistemas Microinformáticos y Redes',
    text: 'CFGM en el IES Ramón y Cajal (Tocina y Los Rosales), de septiembre de 2023 a junio de 2025. Me concedieron una beca por buenas calificaciones.',
  },
  {
    year: '2024',
    title: 'Primer commit',
    text: 'Creo mi cuenta de GitHub y empiezo a programar en serio: C, C++, Python y mis primeras webs.',
  },
  {
    year: '2025',
    title: 'DAW en el IES Martínez Montañés',
    text: 'Primer curso de Desarrollo de Aplicaciones Web: Java, bases de datos y SQL.',
  },
  {
    year: 'Ahora',
    title: '2º de DAW',
    text: 'Segundo curso: desarrollo en entorno cliente y servidor, diseño de interfaces y el proyecto final.',
    current: true,
  },
  {
    year: 'Jun 2027',
    title: 'Fin de DAW',
    text: 'Termino el ciclo.',
    future: true,
  },
];
