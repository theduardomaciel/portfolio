import { useState } from "react";
import "@styles/contact.css";

// Functions
import Translate, { TranslateText } from "@components/Translate";
import axios from "axios";

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
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const userEmail = formData.get("email") as string;

        const isEmailValid = validateEmail(userEmail)

        if (!isEmailValid) {
            setStatus("invalidEmail")
            setTimeout(() => {
                setStatus(false)
            }, 1000);
        } else {
            try {
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
                placeholder={status === "invalidEmail" ? TranslateText("The e-mail inserted is invalid.") : TranslateText("Enter your e-mail here")}
                className={"input"}
                style={{ border: status === "invalidEmail" ? "2px solid red" : "1px solid var(--secondary-01)" }}
                type="email"
                name="email"
            />
            <button type="submit">
                <Translate>Contact</Translate>
            </button>
        </form>
    )
}