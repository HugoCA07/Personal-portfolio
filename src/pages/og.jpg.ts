/**
 * Imagen para compartir en redes (1200×630), generada en el build:
 * la foto del hero oscurecida + nombre y rol con el estilo de la web.
 * Usa `sharp`, que ya instala Astro para optimizar imágenes.
 */
import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { site } from '@/config/site';

const W = 1200;
const H = 630;

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  // Ruta desde la raíz del proyecto (el build se ejecuta ahí)
  const photo = await readFile(join(process.cwd(), 'src/assets/hero-mountains.jpg'));
  const host = new URL(import.meta.env.SITE ?? 'https://hugoca07.github.io').host;

  const overlay = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#000" stop-opacity="0.25"/>
          <stop offset="1" stop-color="#000" stop-opacity="0.75"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shade)"/>
      <g font-family="Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" fill="#fff">
        <text x="80" y="110" font-size="22" letter-spacing="5" fill-opacity="0.75" font-family="'SF Mono', Consolas, monospace">PORTFOLIO</text>
        <text x="76" y="420" font-size="104" font-weight="700" letter-spacing="-4">${escape(site.name)}<tspan fill="#2997ff">.</tspan></text>
        <text x="80" y="490" font-size="36" fill-opacity="0.85">${escape(site.role)}</text>
        <text x="80" y="560" font-size="24" fill-opacity="0.6" font-family="'SF Mono', Consolas, monospace">${escape(host)}</text>
      </g>
    </svg>`);

  const png = await sharp(photo)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .composite([{ input: overlay }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/jpeg' } });
};
