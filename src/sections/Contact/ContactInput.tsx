import React, { HTMLInputTypeAttribute, useState } from "react";
import "@styles/contact.css";

// Functions
import axios from "axios";

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function ContactInput() {
    const [status, setStatus] = useState<any>({
        placeholder: "Enter your e-mail here",
        style: {
            border: "1px solid var(--secondary-01)",
        },
        "data-state": "idle"
    })

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const userEmail = formData.get("email") as string;

        const isEmailValid = validateEmail(userEmail)
        event.currentTarget.reset();

        if (!isEmailValid) {
            setStatus({
                placeholder: "Please enter a valid e-mail",
                style: {
                    border: "2px solid rgb(255, 0, 0)",
                }
            })
            setTimeout(() => {
                setStatus({
                    placeholder: "Enter your e-mail here",
                    style: {
                        border: "1px solid var(--secondary-01)",
                    }
                })
            }, 1750);
        } else {
            try {
                setStatus({
                    placeholder: "Wait while the server is contacted...",
                    disabled: true,
                    style: {
                        border: "1px solid var(--purple)",
                    },
                    "data-state": "loading"
                })
                const response = await axios.post("/api/contact", { email: userEmail })
                if (response.status === 200) {
                    window.location.href = "/contact/success"
                } else {
                    window.location.href = "/contact/error"
                }
            } catch (error) {
                console.log(error)
                window.location.href = "/contact/error"
            }
        }
    }

    return (
        <form className="inputHolder" onSubmit={handleSubmit}>
            <input
                className={"input"}
                type="email"
                name="email"
                data-state="idle"
                {...status}
            />
            <button type="submit" disabled={status.disabled === true} style={{ cursor: status.disabled ? "not-allowed" : "pointer" }}>
                {
                    status['data-state'] === "loading" ?
                        <div className="loader"></div> :
                        "Contact"
                }
            </button>
        </form>
    )
}