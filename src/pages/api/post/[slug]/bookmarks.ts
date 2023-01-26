import type { APIRoute } from "astro";
import prisma from "src/lib/prisma";

async function toggleReadingList(slug: string, guestId: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug: slug
        },
        include: {
            inListOf: true
        }
    });

    if (!post) {
        return await prisma.post.create({
            data: {
                slug: slug,
                inListOf: {
                    connect: {
                        id: guestId
                    }
                }
            },
            include: {
                inListOf: true
            }
        });
    }

    const alreadyInList = post.inListOf.some((guest) => guest.id === guestId);

    if (alreadyInList) {
        return await prisma.post.update({
            where: {
                slug: slug
            },
            data: {
                inListOf: {
                    disconnect: {
                        id: guestId
                    }
                }
            },
            include: {
                inListOf: true
            }
        });
    }

    return await prisma.post.update({
        where: {
            slug: slug
        },
        data: {
            inListOf: {
                connect: {
                    id: guestId
                }
            }
        },
        include: {
            inListOf: true
        }
    });
}

export const patch: APIRoute = async ({ params, request }) => {
    const body = await request.json();
    const { guestId } = body;
    const slug = params.slug;

    if (!slug) {
        return new Response('No slug provided', {
            status: 400,
        });
    }

    if (!guestId) {
        return new Response('No guest id provided', {
            status: 400,
        });
    }

    try {
        const updatedGuest = await toggleReadingList(slug, guestId);

        return new Response(null, { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Error', {
            status: 500,
        });
    }
};