import { useRef, useState } from 'react';
import styles from './buttons.module.css'

import { ReactComponent as LikeFilled } from "src/assets/icons/like_filled.svg";
import { ReactComponent as LikeOutlined } from "src/assets/icons/like.svg";

import axios from 'axios';
import debounce from '@utils/debounce';

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
    const debouncing = useRef(false);

    return (
        <button
            className={`button modern ${styles.button} ${isActive ? `${styles.active} selected` : ""}`}
            style={{ width: "100%", paddingInline: "0px" }}
            onClick={async () => {
                setActive(!isActive)
                if (debouncing.current === false) {
                    debouncing.current = true;
                    setTimeout(() => {
                        toggleLike(guest, post)
                        debouncing.current = false;
                    }, 2000);
                }
            }}
        >
            <LikeFilled className={styles.filled} />
            <LikeOutlined className={styles.outlined} />
        </button>
    )
}
