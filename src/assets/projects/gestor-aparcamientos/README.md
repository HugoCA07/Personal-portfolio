# Imágenes de Gestor de Aparcamientos

Pon aquí las imágenes de este proyecto. Astro las optimiza en el build (AVIF/WebP), así que súbelas en buena calidad.

| Archivo | Uso | Tamaño recomendado |
|---|---|---|
| `cover.jpg` | Portada: tarjeta, escaparate y cabecera del proyecto | 1600×1000 px (16:10) |
| `01.jpg`, `02.jpg`… | Galería en la página del proyecto | 1600 px de ancho |

Formatos: JPG para capturas con mucho color y PNG para interfaces con texto pequeño. Intenta que cada archivo pese menos de 1 MB.

Después, descomenta o añade estas líneas en el frontmatter de `src/content/projects/gestor-aparcamientos.md`:

```yaml
cover: ../../assets/projects/gestor-aparcamientos/cover.jpg
coverAlt: Descripción breve de la imagen
gallery:
  - { src: ../../assets/projects/gestor-aparcamientos/01.jpg, alt: Qué se ve, caption: Pie opcional }
```

Lo que espero: capturas de las ventanas principales (accesos, abonados, stock…), o un GIF corto del flujo.
