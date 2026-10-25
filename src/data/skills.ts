/**
 * Stack técnico agrupado por categorías.
 * Para añadir una tecnología, añádela al array `items` de su grupo.
 */

export interface SkillGroup {
  title: string;
  caption: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Lenguajes',
    caption: 'Lo que escribo',
    items: ['C++', 'Java', 'JavaScript', 'PHP', 'Python', 'C', 'SQL'],
  },
  {
    title: 'Web',
    caption: 'Lo que construyo',
    items: ['HTML', 'CSS', 'Astro', 'Tailwind CSS', 'XML · XSLT · XQuery'],
  },
  {
    title: 'Herramientas',
    caption: 'Con lo que trabajo',
    items: ['Git', 'GitHub', 'MySQL', 'JDBC', 'CMake', 'SFML', 'Java Swing'],
  },
];

/** Lo que estoy aprendiendo ahora mismo. */
export const learning = ['C++ moderno', 'Desarrollo web de servidor', 'Inglés'];

/** Aficiones fuera de la programación. */
export const interests = ['Informática', 'Paisajes', 'Coches', 'Videojuegos'];
