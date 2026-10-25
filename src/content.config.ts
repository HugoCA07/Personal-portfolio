import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Proyectos: un archivo Markdown por proyecto en `src/content/projects/`.
 * El nombre del archivo es la URL: `terraforge.md` → `/proyectos/terraforge`.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    /** `project` = proyecto propio/destacado · `course` = trabajo de clase (DAW) */
    category: z.enum(['project', 'course']).default('project'),
    status: z.enum(['En desarrollo', 'Completado', 'En curso']).default('Completado'),
    featured: z.boolean().default(false),
    /** Orden de aparición (menor primero). */
    order: z.number().default(100),
    stack: z.array(z.string()),
    /** Ficha técnica estilo "especificaciones de coche". */
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    team: z.array(z.string()).optional(),
    /** Color de acento del proyecto (cualquier color CSS). */
    accent: z.string().default('#0071e3'),
  }),
});

export const collections = { projects };
