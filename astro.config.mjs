import { defineConfig } from 'astro/config';

// El CSP del servidor solo admite hojas de estilo externas (style-src 'self'):
// nada de CSS en línea. scripts/check-site.mjs lo comprueba en cada compilación.
export default defineConfig({
  site: 'https://arctiva.techmarc.es',
  trailingSlash: 'always',
  publicDir: './static',
  outDir: './dist',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  devToolbar: { enabled: false },
});
