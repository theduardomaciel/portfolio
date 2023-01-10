import { portableTextToHtml } from 'astro-sanity';
import getSanityImageURL from './getSanityImageUrl';

const customComponents = {
    types: {
        mainImage: ({ value }: { value: any }) => {
            return `
        <picture>
          <source
            srcset="${getSanityImageURL(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${getSanityImageURL(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
        },
        image: ({ value }: { value: any }) => {
            return `
        <picture>
          <source
            srcset="${getSanityImageURL(value.asset).format('webp').url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${getSanityImageURL(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
        },
        code: ({ value }: { value: any }) => {
            return `<code-block code='${value.code}' language='${value.language}'></code-block>`;
        },
    },
};


export default function sanity(portableText: string) {
    return portableTextToHtml(portableText, customComponents);
}