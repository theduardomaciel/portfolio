import type { APIRoute } from "astro";

const URL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${import.meta.env.SPOTIFY_CLIENT_ID}&state=meninocoiso&scope=user-read-private%20user-read-playback-state%20user-read-email&redirect_uri=http://localhost:3000/api/spotify/callback`

export const get: APIRoute = async ({ request, redirect }) => {
    return redirect(URL, 307);
};