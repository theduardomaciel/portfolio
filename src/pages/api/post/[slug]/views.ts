import type { APIRoute } from "astro";
import prisma from "src/lib/prisma";

export const get: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const slug = params.get('slug');

    if (!slug) {
        return new Response('No slug provided', {
            status: 400,
        });
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                slug: slug
            }
        });

        return new Response(JSON.stringify({ total: post?.views }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log(error)
        return new Response('Error', {
            status: 500,
        });
    }
};

export const post: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
        return new Response('No slug provided', {
            status: 400,
        });
    }

    try {
        const newOrUpdatedViews = await prisma.post.upsert({
            where: {
                slug: slug
            },
            create: {
                slug: slug,
            },
            update: {
                views: {
                    increment: 1
                }
            }
        });

        return new Response(JSON.stringify({
            total: newOrUpdatedViews.views.toString()
        }), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Error', {
            status: 500,
        });
    }
};