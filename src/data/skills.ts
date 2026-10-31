/**
 * Stack técnico.
 * - `levels`: tecnologías con nivel declarado (1 básico · 2 intermedio · 3 sólido).
 * - `skillGroups`: el resto, agrupado por área y sin nivel.
 */

export type Level = 1 | 2 | 3;

export const levelInfo: Record<Level, { label: string; text: string }> = {
  3: { label: 'Sólido', text: 'Lo uso con soltura en proyectos propios y de clase.' },
  2: { label: 'Intermedio', text: 'He construido cosas con ello y sigo profundizando.' },
  1: { label: 'Básico', text: 'Conozco los conceptos y lo he puesto en práctica.' },
};

export const levels: { level: Level; items: string[] }[] = [
  { level: 3, items: ['Java', 'C++', 'HTML5', 'CSS3'] },
  { level: 2, items: ['JavaScript', 'PHP · Laravel', 'Angular', 'Bootstrap', 'Tailwind CSS'] },
  { level: 1, items: ['JWT y cookies de sesión', "HTTPS con Let's Encrypt", 'Docker'] },
];

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: 'Bases de datos', items: ['MySQL', 'SQL', 'JDBC'] },
  {
    title: 'Herramientas',
    items: ['Git', 'GitHub · Pull Requests', 'IntelliJ IDEA', 'VS Code', 'NetBeans', 'Eclipse', 'CMake'],
  },
  {
    title: 'Sistemas',
    items: ['Configuración de redes', 'Montaje de hardware', 'Gestión de sistemas operativos'],
  },
  { title: 'También he usado', items: ['Python', 'C', 'Astro', 'XML · XSLT · XQuery', 'SFML', 'Java Swing', 'Figma'] },
];

/** Lo que estoy aprendiendo ahora mismo. */
export const learning = ['C++ moderno', 'Desarrollo web de servidor'];
