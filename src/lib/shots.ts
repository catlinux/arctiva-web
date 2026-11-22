import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/capturas/*.png', { eager: true });

export function shot(name: string): ImageMetadata {
  const m = files[`../assets/capturas/${name}.png`];
  if (!m) throw new Error(`Falta la captura ${name}.png en src/assets/capturas/`);
  return m.default;
}
