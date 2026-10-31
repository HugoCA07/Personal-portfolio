/**
 * Configuración global del sitio.
 * Todo lo que es "sobre ti" vive aquí: cambia un dato y se actualiza en toda la web.
 * Privacidad: no añadir teléfono ni fecha de nacimiento.
 */

export const site = {
  name: 'Hugo Cruz Aranda',
  shortName: 'Hugo Cruz',
  monogram: 'HC',
  role: 'Desarrollador web en formación',
  description:
    'Portfolio de Hugo Cruz Aranda: estudiante de Desarrollo de Aplicaciones Web y técnico de sistemas. Java, C++, PHP, JavaScript y MySQL.',
  location: 'Sevilla, España',
  email: '2007huugoo@gmail.com',
  locale: 'es-ES',
  lang: 'es',
  github: {
    user: 'HugoCA07',
    url: 'https://github.com/HugoCA07',
  },
  linkedin: 'https://www.linkedin.com/in/hugo-cruz-aranda-186848344',
} as const;

export const nav = [
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Experiencia', href: '/#experiencia' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Trayectoria', href: '/#trayectoria' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

export const socials = [
  { label: 'GitHub', href: site.github.url },
  { label: 'LinkedIn', href: site.linkedin },
  { label: 'Email', href: `mailto:${site.email}` },
] as const;

/** Idiomas y certificaciones. */
export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'C2', note: 'LanguageCert · antes B2 y B1 de Cambridge' },
] as const;

/** URL de un repositorio de tu cuenta de GitHub. */
export const repoUrl = (repo: string) => `${site.github.url}/${repo}`;
