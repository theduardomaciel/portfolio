import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';
import sanity from "astro-sanity";
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
    site: 'https://theduardomaciel-v2.vercel.app/',
    integrations: [react(), sanity({
        projectId: "0jclcbcz",
        dataset: "production",
        apiVersion: "v2023-01-01",
        useCdn: true
    }), prefetch()],
    output: 'server',
    adapter: vercel({
        excludeFiles: [".prisma/client/index-browser"]
    }),
    vite: {
        plugins: [svgr()]
    }
});