/**
 * Configuración global del sitio.
 * Todo lo que es "sobre ti" vive aquí: cambia un dato y se actualiza en toda la web.
 */

export const site = {
  name: 'Hugo Cruz Aranda',
  shortName: 'Hugo Cruz',
  monogram: 'HC',
  role: 'Desarrollador web en formación',
  description:
    'Portfolio de Hugo Cruz Aranda: desarrollador web en formación (DAW). C++, Java, JavaScript, PHP y Python. Código, paisajes y coches.',
  bornYear: 2007,
  location: 'España',
  email: '2007huugoo@gmail.com',
  locale: 'es-ES',
  lang: 'es',
  github: {
    user: 'HugoCA07',
    url: 'https://github.com/HugoCA07',
    publicRepos: 13,
  },
} as const;

export const nav = [
  { label: 'Sobre mí', href: '/#sobre-mi' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Stack', href: '/#stack' },
  { label: 'Ruta', href: '/#ruta' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

export const socials = [
  { label: 'GitHub', href: site.github.url },
  { label: 'Email', href: `mailto:${site.email}` },
] as const;

/** URL de un repositorio de tu cuenta de GitHub. */
export const repoUrl = (repo: string) => `${site.github.url}/${repo}`;
