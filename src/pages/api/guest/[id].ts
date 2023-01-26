import type { APIRoute } from "astro";
import prisma from "src/lib/prisma";

export const get: APIRoute = async ({ params, request }) => {
    const guestId = params.id;

    if (!guestId) {
        return new Response('No guest id provided', {
            status: 400,
        });
    }

    try {
        const guest = await prisma.guest.findUnique({
            where: {
                id: guestId
            },
            include: {
                readingList: true
            }
        });

        return new Response(JSON.stringify(guest?.readingList), {
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