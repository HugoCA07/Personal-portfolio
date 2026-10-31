import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Category = Project['data']['category'];

/** Todos los proyectos ordenados por `order` y, después, por año (más reciente primero). */
export async function getProjects(filter?: (p: Project) => boolean): Promise<Project[]> {
  const all = await getCollection('projects', filter);
  return all.sort((a, b) => a.data.order - b.data.order || (b.data.year ?? 0) - (a.data.year ?? 0));
}

export const projectUrl = (p: Project) => `/proyectos/${p.id}`;

export const categoryLabel: Record<Category, string> = {
  project: 'Proyecto',
  design: 'Diseño',
  course: 'Formación',
};

/** "Proyecto · 2026 · En desarrollo", omitiendo lo que no se conoce. */
export const metaLine = (p: Project, ...extra: (string | undefined)[]) =>
  [categoryLabel[p.data.category], p.data.year?.toString(), p.data.status, ...extra].filter(Boolean).join(' · ');

/** Iniciales para el marcador de posición cuando no hay imagen. */
export const monogram = (title: string) =>
  title
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
