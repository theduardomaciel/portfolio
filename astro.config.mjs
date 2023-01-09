import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
/* import tailwind from "@astrojs/tailwind";
import astroI18next from "astro-i18next"; */

import svgr from 'vite-plugin-svgr'

export default defineConfig({
    site: 'https://theduardomaciel-v2.vercel.app/',
    integrations: [mdx(), sitemap(), react(), image()],
    vite: {
        plugins: [svgr()]
    }
});