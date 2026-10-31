# Imágenes de TerraForge

Pon aquí las imágenes de este proyecto. Astro las optimiza en el build (AVIF/WebP), así que súbelas en buena calidad.

| Archivo | Uso | Tamaño recomendado |
|---|---|---|
| `cover.jpg` | Portada: tarjeta, escaparate y cabecera del proyecto | 1600×1000 px (16:10) |
| `01.jpg`, `02.jpg`… | Galería en la página del proyecto | 1600 px de ancho |
| `poster.jpg` | Primer fotograma del vídeo | 1600×900 px (16:9) |
| `public/videos/terraforge.mp4` | Gameplay en bucle, sin sonido, 10–20 s | 1280×720, H.264, menos de 4 MB |

Formatos: JPG para capturas con mucho color y PNG para interfaces con texto pequeño. Intenta que cada archivo pese menos de 1 MB.

Después, descomenta o añade estas líneas en el frontmatter de `src/content/projects/terraforge.md`:

```yaml
cover: ../../assets/projects/terraforge/cover.jpg
coverAlt: Descripción breve de la imagen
gallery:
  - { src: ../../assets/projects/terraforge/01.jpg, alt: Qué se ve, caption: Pie opcional }
video: /videos/terraforge.mp4
videoPoster: ../../assets/projects/terraforge/poster.jpg
```

Lo que espero: capturas del mundo (superficie, cuevas, biomas) y un vídeo corto de gameplay. El vídeo va en `public/videos/`, no en esta carpeta.
