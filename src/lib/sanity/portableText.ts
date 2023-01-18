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
        blockComment: ({ value }: { value: any }) => {
            return `
        <div class="block-comment">
            <p>${value.comment}</p>
        </div>
        `;
        },
        code: ({ value }: { value: any }) => {
            return `<code-block code='${value.code}' language='${value.language}'></code-block>`;
        },
    },
    marks: {
        highlight: ({ children }: { children: any }) => {
            return `<mark>${children}</mark>`;
        }
    },
    block: {
        blockComment: ({ value }: { value: any }) => {
            return `
        <div class="block-comment">
            <p>${value.comment}</p>
        </div>
        `;
        },
    }
};


export default function sanity(portableText: string) {
    return portableTextToHtml(portableText, customComponents);
}