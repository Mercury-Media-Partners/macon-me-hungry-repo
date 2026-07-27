// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://macon-me-hungry-repo.pages.dev',

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss',
    }
  },

  integrations: [react(), sitemap()]
});