import { useSanityClient } from 'astro-sanity'

export async function getAllPosts() {
    const client = useSanityClient()
    const query = '*[_type == "post"]'
    const posts = await client.fetch(query)
    return posts;
}

export async function getAllTags() {
    const client = useSanityClient()
    const query = '*[_type == "category"]'
    const posts = await client.fetch(query)
    return posts;
}