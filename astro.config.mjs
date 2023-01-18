import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
// import i18n from "astro-i18n"

import svgr from 'vite-plugin-svgr';
import sanity from "astro-sanity";
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
export default defineConfig({
    site: 'https://theduardomaciel-v2.vercel.app/',
    integrations: [sitemap(), react(), sanity({
        projectId: "0jclcbcz",
        dataset: "production",
        apiVersion: "v2023-01-01",
        useCdn: true
    })],
    output: 'server',
    vite: {
        plugins: [svgr()]
    },
    adapter: vercel()
});