# AGENTS.md

Guía para agentes de IA (y personas) que trabajen en este repositorio.

## Proyecto

Portfolio personal de **Hugo Cruz Aranda** (GitHub: `HugoCA07`). Sitio estático hecho con **Astro 7** y **Tailwind CSS 4**. Todo el contenido está en **español**.

Estilo: minimalista tipo Apple (mucho espacio, tipografía grande, pocos colores). Sus intereses (informática, paisajes, coches) se mencionan con moderación: **no saturar la web con temática de coches ni referencias a Suiza**.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build de producción en ./dist
npm run preview    # servir ./dist en local
```

Antes de dar un cambio por terminado, ejecuta `npm run build` y comprueba que no hay errores.

## Estructura

```
src/
├── config/site.ts          # Datos personales, navegación y redes. Fuente única de verdad.
├── data/                   # Datos estructurados (stack, ruta/timeline)
├── content/projects/*.md   # Un Markdown por proyecto (colección de contenido)
├── content.config.ts       # Esquema Zod de la colección `projects`
├── lib/                    # Helpers (consultas de proyectos, random con semilla)
├── assets/                 # Imágenes optimizadas en build (foto del hero)
├── layouts/BaseLayout.astro# <head>, SEO, tema, header/footer, animaciones
├── components/
│   ├── sections/           # Secciones de la home (Hero, About, Projects, Skills, Journey, Contact)
│   └── ui/                 # Piezas reutilizables (Section, ProjectCard, SpecSheet, PixelWorld…)
├── pages/                  # Rutas: /, /proyectos, /proyectos/[id], 404
└── styles/global.css       # Tokens de diseño, temas claro/oscuro, utilidades
```

## Cómo ampliar

- **Nuevo proyecto:** crea `src/content/projects/<slug>.md` con el frontmatter definido en `src/content.config.ts`. Se genera automáticamente su página `/proyectos/<slug>`. `featured: true` lo muestra en la home (el primer destacado por `order` va al escaparate grande). `category: course` lo agrupa en "Formación".
- **Nueva sección en la home:** crea `src/components/sections/X.astro` usando `<Section id eyebrow title intro>` y añádela en `src/pages/index.astro`. Si debe aparecer en el menú, añádela a `nav` en `src/config/site.ts`.
- **Datos personales / stack / hitos:** edita `src/config/site.ts`, `src/data/skills.ts` o `src/data/timeline.ts`. No escribas estos datos a mano dentro de los componentes.
- **Página nueva:** `src/pages/<ruta>.astro` envuelta en `BaseLayout` (acepta `title` y `description`).

## Convenciones de diseño

- Usa los **tokens** de `global.css` (`bg-canvas`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-muted`, `border-line`, `text-accent`) en vez de colores fijos, para que funcionen en claro y oscuro.
- Modo oscuro: variante `dark:` ligada a `html[data-theme="dark"]` (no a la media query).
- Hero: foto en `src/assets/hero-mountains.jpg` (optimizada con `<Picture>` de `astro:assets`). La sección mide ~185svh con contenido `sticky`; el script fija `--p` (0→1) según el scroll y el CSS anima zoom, recorte redondeado y textos a partir de esa variable. Si cambias la foto, actualiza el crédito en `Hero.astro`.
- Header: píldora flotante con estilo *liquid glass* (clase `.glass` en `Header.astro`).
- Animación de aparición: añade `data-reveal` (y opcionalmente `style="--delay:80ms"`). No lo pongas en el mismo elemento que tiene transiciones de hover; envuélvelo.
- Utilidades propias: `card`, `eyebrow`, `text-gradient`, `prose-apple` (contenido Markdown).
- Respeta `prefers-reduced-motion` en cualquier animación nueva.
- Mobile first: comprueba siempre a ~390 px de ancho, sin scroll horizontal.
- Sin frameworks de UI en cliente: JS mínimo en `<script>` de Astro.

## Código

- TypeScript estricto, imports con alias `@/` (→ `src/`).
- Componentes `.astro` con `interface Props`.
- Comentarios breves y en español, solo donde aporten.
- Prettier-style: 2 espacios, comillas simples.

## Git

- Haz commits pequeños y descriptivos (en español) tras cada cambio que funcione, para poder volver a versiones anteriores.
- Comprueba `npm run build` antes de cada commit.
