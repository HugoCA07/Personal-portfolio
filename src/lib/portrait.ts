/**
 * Foto personal: se detecta sola si existe `src/assets/hugo.{jpg,jpeg,png,webp}`.
 * Sin foto, en desarrollo se reserva el hueco y en producción no se muestra.
 */
const found = Object.values(
  import.meta.glob<{ default: ImageMetadata }>('/src/assets/hugo.{jpg,jpeg,png,webp}', { eager: true }),
)[0]?.default;

export const portrait = found;
export const showPortrait = Boolean(found) || import.meta.env.DEV;
