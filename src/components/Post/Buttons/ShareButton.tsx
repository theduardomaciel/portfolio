import styles from './buttons.module.css'

import { ReactComponent as ShareIcon } from "src/assets/icons/share.svg";

interface Props {
    post: any;
}


async function sharePost(shareData: { title: string; text: string; url: string; }) {
    try {
        await navigator.share(shareData)
    } catch (err) {
        console.log(err)
    }
}

export default function ShareButton({ post }: Props) {

    const shareData = {
        title: post.title,
        text: "Read this post on theduardomaciel's blog",
        url: `https://theduardomaciel.vercel.app/blog/${post.slug.current}`
    }

    return (
        <button
            className={`button modern inverted`}
            style={{ width: "100%" }}
            onClick={() => sharePost(shareData)}
        >
            <ShareIcon className={styles.icon} />
            Share
        </button>
    )
}
