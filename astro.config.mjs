// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Cambia `site` por tu dominio final (necesario para el sitemap y las URLs canónicas).
// Si despliegas en GitHub Pages bajo /Personal-portfolio, añade también `base: '/Personal-portfolio'`.
export default defineConfig({
  site: 'https://hugoca07.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
