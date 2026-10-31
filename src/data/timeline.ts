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
    year: 'Mar–Jun 2025',
    title: 'Técnico de sistemas (FCT)',
    text: 'Prácticas en App Informática, en Dos Hermanas: diagnóstico, reparación y mantenimiento de equipos.',
  },
  {
    year: '2025',
    title: 'DAW en el IES Martínez Montañés',
    text: 'Desarrollo de Aplicaciones Web, de septiembre de 2025 a junio de 2027: Java, bases de datos, SQL y desarrollo web.',
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
