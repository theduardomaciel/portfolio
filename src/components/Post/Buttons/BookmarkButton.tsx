import axios from 'axios';
import { useState } from 'react';
import styles from './buttons.module.css'

import { ReactComponent as BookmarkFilled } from "src/assets/icons/bookmark_filled.svg";
import { ReactComponent as BookmarkOutlined } from "src/assets/icons/bookmark.svg";

interface Props {
    post: any;
    guest: any;
    initialValue: boolean;
}

async function toggleLike(guest: any, post: any) {
    const response = await axios.patch(`/api/post/${post.slug.current}/bookmarks`, { guestId: guest.id });
    console.log(response.data)
}

export default function BookmarkButton({ guest, post, initialValue }: Props) {
    const [isActive, setActive] = useState(initialValue);

    return (
        <button
            className={`button modern ${styles.button} ${isActive ? `${styles.active} selected` : ""}`}
            style={{ width: "100%", paddingInline: "0px" }}
            onClick={() => {
                setActive(!isActive)
                toggleLike(guest, post)
            }}
        >
            <BookmarkFilled className={styles.filled} />
            <BookmarkOutlined className={styles.outlined} />
        </button>
    )
}
