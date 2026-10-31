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
  - En estilos `scoped` de Astro, para reaccionar a esa clase usa `:global(.is-visible)` (ejemplo: la ficha de `Experience.astro`). Si no, la regla scoped gana por especificidad y el contenido no aparece nunca.
- **`PixelWorld.astro`:** el terreno se genera en build con un PRNG con semilla (`src/lib/random.ts`). Es determinista: la misma semilla produce el mismo SVG.

### Trampas conocidas

- **`backdrop-filter`:** Lightning CSS (el minificador de Tailwind 4) fusiona `-webkit-backdrop-filter` y `backdrop-filter` en una sola declaración con prefijo, y entonces el desenfoque deja de funcionar en Chrome. Escribe solo la propiedad estándar.
- **`base: '/Personal-portfolio'`:** un `href="/..."` escrito a mano funciona en `npm run dev` con otra ruta, pero da 404 en GitHub Pages. Usa siempre `url()` de `src/lib/url.ts`.
- **YAML en el frontmatter:** dentro de `{ label: X, value: ... }` una coma corta el valor. Si el valor lleva coma, ponlo entre comillas: `value: 'PC, tablet y móvil'`.
- **Rejillas en móvil:** una rejilla sin columnas definidas y con texto `truncate`/`nowrap` ensancha la página. Usa `grid-cols-[minmax(0,1fr)]` y `min-w-0`.
- **Etiquetas de la escena 3D:** se orientan hacia la pantalla deshaciendo las rotaciones de la escena y de su pieza (`teardown-renderer.ts`). Si añades rotaciones nuevas a la cámara o a una pieza, el cálculo inverso ya las tiene en cuenta; si cambias el orden de las rotaciones, hay que cambiarlo también en la inversa.
- **Contenido pendiente:** hay `TODO(Hugo)` en los Markdown de Diviflex, Autoescuela Máxima y Web de Bricolaje. Pregunta antes de rellenarlos y no inventes datos.

### Verificación visual

- Para revisar visualmente se han usado capturas de Chrome headless vía DevTools Protocol (scripts temporales, no versionados).
- La escena del portátil hay que revisarla en varios puntos del progreso (0, 0,2, 0,5, 0,8 y 1), a 390 y 1440 px, y también con `prefers-reduced-motion`.
