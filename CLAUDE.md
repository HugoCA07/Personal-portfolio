# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Las instrucciones principales del proyecto (comandos, estructura, convenciones de diseño y de Git) están en AGENTS.md y se importan aquí:

@AGENTS.md

## Notas adicionales

### Verificación

- No hay tests ni linter configurados. La única comprobación es `npm run build`, que valida tipos de Astro, el esquema Zod de los Markdown de `src/content/projects/` y genera las imágenes optimizadas.
- `npx astro check` no funciona tal cual porque `@astrojs/check` no está instalado; se queda esperando una confirmación interactiva.
- Para comprobar cambios visuales: `npm run build && npm run preview`, y después revisar a ~390 px y en escritorio, en tema claro y oscuro.

### Arquitectura que abarca varios archivos

- **Proyectos:** `src/content.config.ts` (esquema) → `src/lib/projects.ts` (`getProjects()` ordena por `order` y después por año descendente; `projectUrl()`) → los consumen `sections/Projects.astro`, `pages/proyectos/index.astro` y `pages/proyectos/[id].astro` (con `getStaticPaths`). El `id` es el nombre del archivo `.md`.
- **Tema claro/oscuro:**
  - Un script inline en el `<head>` de `BaseLayout.astro` fija `data-theme` (desde `localStorage` o `prefers-color-scheme`) y añade la clase `js` a `<html>` antes del primer pintado.
  - `ThemeToggle.astro` lo cambia y lo guarda.
  - `global.css` define los tokens en `:root` y en `[data-theme='dark']`, y los expone a Tailwind con `@theme inline` y `@custom-variant dark`.
- **Aparición con scroll:**
  - El IntersectionObserver está en `BaseLayout.astro` y añade `.is-visible` a cada `[data-reveal]`.
  - El estado oculto solo se aplica bajo `html.js`, así que sin JS el contenido se ve igualmente.
  - En estilos `scoped` de Astro, para reaccionar a esa clase usa `:global(.is-visible)` (ejemplo: el terminal de `About.astro`). Si no, la regla scoped gana por especificidad y el contenido no aparece nunca.
- **`PixelWorld.astro`:** el terreno se genera en build con un PRNG con semilla (`src/lib/random.ts`). Es determinista: la misma semilla produce el mismo SVG.

### Trampas conocidas

- **`backdrop-filter`:** Lightning CSS (el minificador de Tailwind 4) fusiona `-webkit-backdrop-filter` y `backdrop-filter` en una sola declaración con prefijo, y entonces el desenfoque deja de funcionar en Chrome. Escribe solo la propiedad estándar.
- **Despliegue en GitHub Pages:** `site` está en `astro.config.mjs`. Si se publica en un subdirectorio (`/Personal-portfolio`), hay que añadir `base` y revisar los enlaces absolutos (`/proyectos/...`, `/favicon.svg`).
- **Contenido pendiente:** el usuario aportará su CV para ampliar la información personal. Esos datos van en `src/config/site.ts`, `src/data/*` o `src/content/projects/`, nunca escritos a mano en los componentes.
