import prisma from "src/lib/prisma";

import type { APIRoute } from "astro";

export async function getGuestFromId(id?: string) {
    if (!id) {
        return null;
    }

    try {
        const guest = await prisma.guest.findUnique({
            where: {
                id: id,
            },
            include: {
                readingList: true,
                likedPosts: true,
            },
        });

        return guest;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const guestId = params.get("guestId");

    if (!guestId) {
        return new Response("No guest id provided", {
            status: 400,
        });
    }

    try {
        const guest = await getGuestFromId(guestId);

        return new Response(JSON.stringify(guest?.readingList), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 500,
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { name, image_url, email } = body;

    if (!email || !name || !image_url) {
        return new Response("Data missing", {
            status: 400,
        });
    }

    try {
        const createdGuest = await prisma.guest.create({
            data: {
                name: name,
                /* image_url: image_url, */
                email: email,
            },
        });

        return new Response(JSON.stringify(createdGuest), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", {
            status: 500,
        });
    }
};
