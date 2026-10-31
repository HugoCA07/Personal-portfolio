import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Proyectos: un archivo Markdown por proyecto en `src/content/projects/`.
 * El nombre del archivo es la URL: `terraforge.md` → `/proyectos/terraforge`.
 *
 * Imágenes: guárdalas en `src/assets/projects/<slug>/` y referéncialas con ruta relativa
 * al Markdown, p. ej. `cover: ../../assets/projects/terraforge/cover.jpg`.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      /** Opcional: si no se conoce, no se muestra. */
      year: z.number().optional(),
      /** `project` = proyecto propio · `design` = diseño (Figma…) · `course` = trabajo de clase (DAW) */
      category: z.enum(['project', 'design', 'course']).default('project'),
      status: z.enum(['En desarrollo', 'Completado', 'En curso']).optional(),
      featured: z.boolean().default(false),
      /** Orden de aparición (menor primero). */
      order: z.number().default(100),
      stack: z.array(z.string()).default([]),
      /** Ficha técnica: pares etiqueta/valor. */
      specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      repo: z.url().optional(),
      demo: z.url().optional(),
      team: z.array(z.string()).optional(),
      /** Color de acento del proyecto (cualquier color CSS). */
      accent: z.string().default('#0071e3'),

      /** Imagen principal (tarjetas y cabecera). Recomendado 1600×1000, JPG/PNG. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Capturas adicionales para la página del proyecto. */
      gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
      /** Vídeo corto sin sonido (mp4/webm) en `public/`, p. ej. `/videos/terraforge.mp4`. */
      video: z.string().optional(),
      /** Fotograma que se muestra antes de cargar el vídeo. */
      videoPoster: image().optional(),
    }),
});

export const collections = { projects };
