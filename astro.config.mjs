import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import svgr from 'vite-plugin-svgr';
import sanity from "astro-sanity";
import vercel from "@astrojs/vercel/edge";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
    site: 'https://theduardomaciel-v2.vercel.app/',
    integrations: [react(), sanity({
        projectId: "0jclcbcz",
        dataset: "production",
        apiVersion: "v2023-01-01",
        useCdn: true
    }), prefetch()],
    output: 'server',
    vite: {
        plugins: [svgr()]
    },
    adapter: vercel({
        includeFiles: [
            './node_modules/@prisma/client/edge.js',
            './node_modules/@prisma/client/index.js',
            './node_modules/@prisma/client/index-browser.js',
            './node_modules/@prisma/client/runtime/index.js',
            './node_modules/@prisma/client/runtime/index-browser.js',
            './node_modules/@prisma/client/runtime/index.d.ts',
            './node_modules/@prisma/client/runtime/index-browser.d.ts',
            './node_modules/@prisma/client/runtime/index.d.ts',
        ]
    })
});