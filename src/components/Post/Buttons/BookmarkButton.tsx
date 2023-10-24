import axios from "axios";
import { useRef, useState } from "react";
import styles from "./buttons.module.css";

import BookmarkFilled from "src/assets/icons/bookmark_filled.svg?react";
import BookmarkOutlined from "src/assets/icons/bookmark.svg?react";

interface Props {
    post: any;
    guest: any;
    initialValue: boolean;
}

async function toggleLike(guest: any, post: any) {
    const response = await axios.patch(
        `/api/post/${post.slug.current}/bookmarks`,
        { guestId: guest.id }
    );
    console.log(response.data);
}

export default function BookmarkButton({ guest, post, initialValue }: Props) {
    const [isActive, setActive] = useState(initialValue);
    const debouncing = useRef(false);

    return (
        <button
            className={`button modern ${styles.button} ${
                isActive ? `${styles.active} selected` : ""
            }`}
            style={{ width: "100%", paddingInline: "0px" }}
            onClick={() => {
                setActive(!isActive);
                if (debouncing.current === false) {
                    debouncing.current = true;
                    setTimeout(() => {
                        toggleLike(guest, post);
                        debouncing.current = false;
                    }, 2000);
                }
            }}
        >
            <BookmarkFilled className={styles.filled} />
            <BookmarkOutlined className={styles.outlined} />
        </button>
    );
}
