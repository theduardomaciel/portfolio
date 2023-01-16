import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
/* import astroI18next from "astro-i18next"; */
/* import i18n from "astro-i18n" */

import svgr from 'vite-plugin-svgr';
import sanity from "astro-sanity";

export default defineConfig({
    site: 'https://theduardomaciel-v2.vercel.app/',
    integrations: [/* i18n(), */mdx(), sitemap(), react(), image(), sanity({
        projectId: "0jclcbcz",
        dataset: "production",
        apiVersion: "v2023-01-01",
        useCdn: true,
    })],
    vite: {
        plugins: [svgr()]
    }
});