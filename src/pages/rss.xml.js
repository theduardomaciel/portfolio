import rss from '@astrojs/rss';

export const get = () =>
    rss({
        title: "edu's porfolio.",
        description: "A simple portfolio for showcasing my projects and knowledge.",
        site: import.meta.env.SITE,
        items: import.meta.glob('./blog/**/*.{md,mdx}'),
    });
