// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Publicado en GitHub Pages: https://hugoca07.github.io/Personal-portfolio/
// Los enlaces internos pasan por `url()` (src/lib/url.ts), que añade `base`.
// Si algún día usas dominio propio o el repo HugoCA07.github.io, cambia `site` y quita `base`.
export default defineConfig({
  site: 'https://hugoca07.github.io',
  base: '/Personal-portfolio',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
