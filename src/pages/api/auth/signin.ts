import axios from "axios";

import type { APIRoute } from "astro";

import prisma from "src/lib/prismaClient";

const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
const { PUBLIC_GITHUB_REDIRECT_URI, PUBLIC_GITHUB_CLIENT_ID, GITHUB_SECRET } = process.env

async function getAccessTokenFromCode(code: string, state: string) {
    const params = {
        code,
        state,
        grant_type: "authorization_code",
        redirect_uri: PUBLIC_GITHUB_REDIRECT_URI,
        client_id: PUBLIC_GITHUB_CLIENT_ID,
        client_secret: GITHUB_SECRET,
    }

    try {
        const response = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(response.data)
        const access_token = response.data.split('&')[0].split('=')[1]
        return access_token;
    } catch (error) {
        console.log(error)
        return null
    }
}

async function fetchUser(access_token: string) {
    const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    const { name, avatar_url } = userResponse.data;

    const emailResponse = await axios.get("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    const email = emailResponse.data.find((email: any) => email.primary).email;

    return { name, avatar_url, email };
}

interface GithubUser {
    avatar_url: string;
    name: string;
    email: string;
}

export const post: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { code, state } = body;

    if (!code || !state) {
        return new Response('No code or state provided', {
            status: 400,
        });
    }

    console.log(code, state)

    const access_token = await getAccessTokenFromCode(code, state);
    console.log(access_token)

    if (access_token) {
        const githubUser = await fetchUser(access_token) as GithubUser;
        console.log(githubUser)

        if (!githubUser) {
            return new Response('Error fetching user', {
                status: 500,
            });
        }

        const user = await prisma.guest.findFirst({
            where: {
                email: githubUser.email,
            }
        });

        if (!user) {
            const newUser = await prisma.guest.create({
                data: {
                    name: githubUser.name,
                    email: githubUser.email,
                    /* image_url: githubUser.avatar_url, */
                }
            })
            return new Response(JSON.stringify(newUser), {
                status: 200,
            });
        } else {
            return new Response(JSON.stringify(user), {
                status: 200,
            });
        }
    } else {
        return new Response('Error', {
            status: 500,
        });
    }
};