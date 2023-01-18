import { useState } from 'react';
import styles from './buttons.module.css'

import { ReactComponent as LikeFilled } from "src/assets/icons/like_filled.svg";
import { ReactComponent as LikeOutlined } from "src/assets/icons/like.svg";

import debounce from '@utils/functions/debounce';
import axios from 'axios';

interface Props {
    post: any;
    guest: any;
    initialValue: boolean;
}

async function toggleLike(guest: any, post: any) {
    const response = await axios.patch(`/api/post/${post.slug.current}/likes`, { guestId: guest.id });
    console.log(response.data)
}

export default function LikeButton({ guest, post, initialValue }: Props) {
    const [isActive, setActive] = useState(initialValue);

    return (
        <button
            className={`button modern ${styles.button} ${isActive ? `${styles.active} selected` : ""}`}
            style={{ width: "100%", paddingInline: "0px" }}
            onClick={() => {
                setActive(!isActive)
                /* debounce(() => toggleLike(guest, post), 1000) */
                toggleLike(guest, post)
            }}
        >
            <LikeFilled className={styles.filled} />
            <LikeOutlined className={styles.outlined} />
        </button>
    )
}
