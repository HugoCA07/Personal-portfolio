# Personal-portfolio

Mi portfolio personal, hecho con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com).

- Hero con fotografía de paisaje y animación ligada al scroll.
- Header flotante con estilo *liquid glass*.
- Proyectos como colección de contenido en Markdown, cada uno con su ficha técnica.
- Modo claro y oscuro, responsive y sin dependencias de JavaScript en cliente.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera ./dist
```

## Añadir un proyecto

Crea un archivo en `src/content/projects/mi-proyecto.md`:

```md
---
title: Mi proyecto
summary: Una frase que lo describa.
year: 2026
category: project   # o "course"
status: En desarrollo
featured: false
order: 50
stack: [Astro, TypeScript]
specs:
  - { label: Motor, value: TypeScript }
repo: https://github.com/HugoCA07/mi-proyecto
accent: "#0071e3"
---

Contenido en Markdown…
```

Más detalles de estructura y convenciones en [AGENTS.md](./AGENTS.md).
