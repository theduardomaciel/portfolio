import { useSanityClient } from 'astro-sanity'

export async function getAllPosts() {
    const client = useSanityClient()
    const query = '*[_type == "post"]'
    const posts = await client.fetch(query)
    return posts;
}

export async function getAllPostsWithCategory(category: string) {
    const client = useSanityClient()
    const query = `*[_type == "post" && count((categories[]->title)[@ in ["${category}"]]) > 0]`
    const posts = await client.fetch(query)
    return posts;
}

export async function getPostBySlug(slug: string) {
    const client = useSanityClient()
    const query = '*[_type == "post" && slug.current == $slug][0]'
    const post = await client.fetch(query, { slug })
    return post;
}

export async function getAllTags() {
    const client = useSanityClient()
    const query = '*[_type == "category"]'
    const posts = await client.fetch(query)
    return posts;
}