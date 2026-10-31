/**
 * Enlaces internos que respetan `base` (la web vive en /Personal-portfolio en GitHub Pages).
 * Escribe las rutas como si la web estuviera en la raíz: `url('/proyectos')`, `url('/#contacto')`.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => (/^(https?:|mailto:|#)/.test(path) ? path : `${base}${path.startsWith('/') ? path : `/${path}`}`);
