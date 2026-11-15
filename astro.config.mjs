// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/**
 * URL produksi. Isi lewat environment variable SITE_URL saat build
 * (mis. di Vercel/Netlify: SITE_URL=https://digitalcanvas.example.ac.id).
 * Selama kosong, canonical URL, og:url, dan sitemap tidak dibuat.
 */
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: site ? [sitemap()] : [],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
