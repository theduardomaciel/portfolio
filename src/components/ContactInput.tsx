import { useState } from "react";
import "@styles/contact.css";

// Components
import Button from '@components/Button';

// Functions
import postEmail from '@utils/functions/sendEmailToDiscord';
import Translate, { TranslateText } from "@components/Translate";

const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export default function ContactInput() {
    const [status, setStatus] = useState<boolean | "pending" | "success" | "invalidEmail" | "serverError">(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.target as HTMLFormElement);
        const userEmail = formData.get("email") as string;

        const isEmailValid = validateEmail(userEmail)

        if (!isEmailValid) {
            setStatus("invalidEmail")
            setTimeout(() => {
                setStatus(false)
            }, 1000);
        } else {
            const response = await postEmail(userEmail)
            if (!response) {
                setStatus("serverError")
                setTimeout(() => {
                    setStatus(false)
                }, 1000);
            } else {
                setStatus("success")
            }
        }
    }

    return (
        <form className="inputHolder" onSubmit={handleSubmit}>
            <input
                placeholder={status === "invalidEmail" ? TranslateText("The e-mail inserted is invalid.") : TranslateText("Enter your e-mail here")}
                className={"input"}
                style={{ borderColor: status === "invalidEmail" ? "red" : "var(--secondary-color-01)" }}
                type="email"
                name="email"
            />
            <Button type="submit">
                <Translate>Contact</Translate>
            </Button>
        </form>
    )
}