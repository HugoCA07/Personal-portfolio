# Personal-portfolio

Mi portfolio personal, hecho con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com).

**En línea:** https://hugoca07.github.io/Personal-portfolio/

- Hero con fotografía de paisaje y animación ligada al scroll.
- Escena "Por dentro": un portátil real, de cerrado a desmontado, contado con fotografías que se funden al hacer scroll.
- Experiencia como técnico de sistemas, stack con niveles reales y trayectoria.
- Proyectos como colección de contenido en Markdown, con portada, galería y vídeo opcionales.
- Header flotante con estilo *liquid glass*, modo claro y oscuro, responsive y accesible (respeta "reducir movimiento").
- Imagen para compartir y datos estructurados generados en el build.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321/Personal-portfolio/
npm run build    # genera ./dist
```

Cada push a `My-creations` se publica solo con GitHub Actions (`.github/workflows/deploy.yml`).

## Añadir un proyecto

Crea un archivo en `src/content/projects/mi-proyecto.md`:

```md
---
title: Mi proyecto
summary: Una frase que lo describa.
year: 2026                 # opcional
category: project          # project · design · course
status: En desarrollo      # opcional
featured: false
order: 50
stack: [Astro, TypeScript]
specs:
  - { label: Lenguaje, value: TypeScript }
repo: https://github.com/HugoCA07/mi-proyecto
accent: "#0071e3"
cover: ../../assets/projects/mi-proyecto/cover.jpg   # opcional
coverAlt: Qué se ve en la imagen
---

Contenido en Markdown…
```

Las imágenes van en `src/assets/projects/<slug>/` (cada carpeta tiene un README con lo que se espera) y tu foto en `src/assets/hugo.jpg`.

Más detalles de estructura y convenciones en [AGENTS.md](./AGENTS.md).
