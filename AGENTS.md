# AGENTS.md

Guía para agentes de IA (y personas) que trabajen en este repositorio.

## Proyecto

Portfolio personal de **Hugo Cruz Aranda** (GitHub: `HugoCA07`). Sitio estático hecho con **Astro 7** y **Tailwind CSS 4**. Todo el contenido está en **español**.

Se publica en **https://hugoca07.github.io/Personal-portfolio/** con GitHub Pages.

Estilo: minimalista tipo Apple, con mucho espacio, tipografía grande y pocos colores, pero cada sección tiene su propia composición. Los intereses (informática, paisajes, coches) se mencionan con moderación: **no saturar la web con temática de coches ni referencias a Suiza**.

Contenido: **no inventes datos sobre Hugo.** Si falta algo, deja `TODO(Hugo): …`. Privacidad: **nunca publiques su teléfono ni su fecha de nacimiento**. Estudia DAW hasta junio de 2027: no escribas "titulado en DAW".

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321/Personal-portfolio/
npm run build      # build de producción en ./dist
npm run preview    # servir ./dist en local
```

Antes de dar un cambio por terminado, ejecuta `npm run build` y comprueba que no hay errores.

## Estructura

```
src/
├── config/site.ts          # Datos personales, navegación, redes e idiomas. Fuente única de verdad.
├── data/                   # Datos estructurados: stack, timeline, experiencia, "ahora mismo", escena del portátil
├── content/projects/*.md   # Un Markdown por proyecto (colección de contenido)
├── content.config.ts       # Esquema Zod de la colección `projects` (incluye imágenes y vídeo)
├── lib/                    # Helpers: proyectos, url(), scroll-progress, teardown-renderer, interacciones, foto
├── assets/                 # Imágenes optimizadas en build (hero, teardown/, projects/<slug>/, hugo.jpg)
├── layouts/BaseLayout.astro# <head>, SEO, JSON-LD, tema, header/footer, animaciones
├── components/
│   ├── sections/           # Hero, LaptopTeardown, About, Experience, Projects, Skills, Journey, Contact
│   └── ui/                 # Section, ProjectCard, ProjectCover, CourseList, LazyVideo, Portrait…
├── pages/                  # /, /proyectos, /proyectos/[id], 404 y og.jpg (imagen para compartir)
└── styles/global.css       # Tokens de diseño, radios, temas claro/oscuro, utilidades
```

## Cómo ampliar

- **Nuevo proyecto:** crea `src/content/projects/<slug>.md` con el frontmatter de `src/content.config.ts`. Se genera su página `/proyectos/<slug>/`.
  - `category`: `project` (propio), `design` (Figma…) o `course` (trabajo de clase, se muestra en la lista compacta "Formación · DAW").
  - `featured: true` lo muestra en la home con tarjeta grande. El primero por `order` va al escaparate.
  - `year` y `status` son opcionales: si no se conocen, no se muestran.
- **Imágenes de un proyecto:** van en `src/assets/projects/<slug>/` (cada carpeta tiene un README con lo que se espera). En el frontmatter: `cover`, `coverAlt` y `gallery` (rutas relativas al Markdown). `video` es una ruta de `public/` (p. ej. `/videos/terraforge.mp4`) y `videoPoster` una imagen. Sin `cover` se pinta un marcador de posición con el color `accent`.
- **Foto personal:** `src/assets/hugo.jpg` (o .png/.webp). Se detecta sola (`src/lib/portrait.ts`). Sin foto, solo se ve un hueco en desarrollo.
- **Nueva sección en la home:** crea `src/components/sections/X.astro` y añádela en `src/pages/index.astro`. Puedes usar `<Section id eyebrow title intro layout="stack|split">`, pero no la uses en todas: cada sección debe tener una composición propia. Si va en el menú, añádela a `nav` en `src/config/site.ts`.
- **Datos personales / stack / hitos / experiencia / "ahora mismo":** edita `src/config/site.ts` o `src/data/*`. No escribas estos datos a mano dentro de los componentes.
- **Página nueva:** `src/pages/<ruta>.astro` envuelta en `BaseLayout` (acepta `title` y `description`).

## Enlaces internos y despliegue

- `astro.config.mjs` tiene `base: '/Personal-portfolio'`. **Todo enlace interno pasa por `url()`** de `src/lib/url.ts`: `url('/proyectos/')`, `url('/#contacto')`. Nunca escribas `href="/..."` directamente. `projectUrl()` ya lo aplica.
- Usa la barra final en las rutas de página (`/proyectos/terraforge/`) para evitar redirecciones en GitHub Pages.
- `.github/workflows/deploy.yml` publica en cada push a `My-creations` (en GitHub: Settings → Pages → Source: GitHub Actions).

## Convenciones de diseño

- Usa los **tokens** de `global.css` (`bg-canvas`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-muted`, `border-line`, `text-accent`) en vez de colores fijos. Excepción: escenas oscuras concretas (hero, escena del portátil).
- **Solo tres radios:** `rounded-card` (1.75rem: tarjetas, imágenes, fichas), `rounded-xl` (0.75rem: piezas pequeñas) y `rounded-full` (píldoras). **Dos tipos de tarjeta:** `card` (superficie clara) y la oscura del escaparate.
- **Titulares** sin punto final y sin clichés ("apasionado", "ambicioso"…). Textos concretos, que no sirvan para cualquier persona.
- Modo oscuro: variante `dark:` ligada a `html[data-theme="dark"]` (no a la media query).
- **Animaciones ligadas al scroll:** usa `scrollProgress()` de `src/lib/scroll-progress.ts`. Escribe `--p` (0→1) en una sección alta con contenido `sticky`, solo calcula mientras la sección está en pantalla y respeta `prefers-reduced-motion`. Lo usan el hero y la escena del portátil.
- **Hero:** foto en `src/assets/hero-mountains.jpg` (`<Picture>`). Si cambias la foto, actualiza el crédito en `Hero.astro`.
- **Escena del portátil (`LaptopTeardown.astro`):**
  - Son **fotografías reales** de Unsplash (`src/assets/teardown/`), no un modelo ni una ilustración: no la sustituyas por dibujos, CSS 3D o modelos 3D.
  - Fotos, tramos de progreso, encuadre (`focus`), crédito y textos están en `src/data/teardown.ts`.
  - El pintado está en `src/lib/teardown-renderer.ts`, detrás de la interfaz `TeardownRenderer`: las fotos se funden y hacen un acercamiento lento. Podría sustituirse por un vídeo o frames.
  - Con movimiento reducido o sin JS se ve una lista estática de foto + texto.
- **Header:** píldora *liquid glass* (`.glass` en `Header.astro`). Sobre secciones con `data-dark` pasa a cristal oscuro.
- **Aparición:** `data-reveal` (y opcionalmente `style="--delay:80ms"`). No lo pongas en el mismo elemento que tiene transiciones de hover; envuélvelo.
- **Micro-interacciones** (`src/lib/interactions.ts`):
  - `data-tilt="3"`: inclinación y brillo que sigue al cursor.
  - `data-count="13"`: el número cuenta al entrar en pantalla.
  - Ambas se desactivan con movimiento reducido o sin ratón.
- Utilidades propias: `card`, `eyebrow`, `text-gradient`, `prose-apple` (contenido Markdown).
- Respeta `prefers-reduced-motion` en cualquier animación nueva. Anima solo `transform` y `opacity`.
- Mobile first: comprueba siempre a ~390 px de ancho, sin scroll horizontal. En rejillas, usa `grid-cols-[minmax(0,1fr)]` si hay texto que no se parte.
- Sin frameworks de UI en cliente ni dependencias nuevas sin consultarlo: JS mínimo en `<script>` de Astro.

## Código

- TypeScript estricto, imports con alias `@/` (→ `src/`).
- Componentes `.astro` con `interface Props`.
- Comentarios breves y en español, solo donde aporten.
- Prettier-style: 2 espacios, comillas simples.

## Git

- Haz commits pequeños y descriptivos (en español) tras cada cambio que funcione, para poder volver a versiones anteriores.
- Comprueba `npm run build` antes de cada commit.
