import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Todos los proyectos ordenados por `order` y, después, por año (más reciente primero). */
export async function getProjects(filter?: (p: Project) => boolean): Promise<Project[]> {
  const all = await getCollection('projects', filter);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export const projectUrl = (p: Project) => `/proyectos/${p.id}`;
