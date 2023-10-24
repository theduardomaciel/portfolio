import { useId } from "react";

import styles from "./buttons.module.css";
import ShareIcon from "src/assets/icons/share.svg?react";

interface Props {
    post: any;
    label?: string;
}

async function sharePost(
    shareData: {
        title: string;
        text: string;
        url: string;
    },
    id: string
) {
    if (navigator.share && navigator.canShare(shareData)) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("O navegador não possui suporte ao compartilhamento.");

        const shareButton = document.getElementById(
            `shareButton_${id}`
        ) as HTMLButtonElement;
        shareButton.classList.add(styles.error);

        const text = document.getElementById(
            `shareButtonText_${id}`
        ) as HTMLParagraphElement;
        const originalText = text.innerText;

        text.innerText = "Link do artigo copiado!";
        navigator.clipboard.writeText(shareData.url);

        setTimeout(() => {
            shareButton.classList.remove(styles.error);
            text.innerText = originalText;
        }, 2000);
    }
}

export default function ShareButton({ post, label }: Props) {
    const id = useId();

    const shareData = {
        title: post.title,
        text: "Read this post on theduardomaciel's blog",
        url: `https://theduardomaciel.vercel.app/blog/${post.slug.current}`,
    };

    return (
        <button
            id={`shareButton_${id}`}
            className={`button modern inverted`}
            style={{ width: "100%" }}
            onClick={() => sharePost(shareData, id)}
        >
            <ShareIcon className={`${styles.icon} ${styles.ephemeral}`} />
            <p id={`shareButtonText_${id}`}>{label}</p>
        </button>
    );
}
