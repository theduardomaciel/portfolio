import { useSanityClient, createImageBuilder } from 'astro-sanity';

export const imageBuilder = createImageBuilder(useSanityClient());

export default function getSanityImageURL(source: any) {
    return imageBuilder.image(source);
}