import pt_br from "@languages/pt_br.json"

const languages = {
    "pt": pt_br
} as any;

export function TranslateText(text: string) {
    const language = "en";
    // return the translated text or the original text
    if (Object.keys(languages).includes(language)) {
        return languages[language][text] || text;
    }

    return text;
};

const Translate = ({ children }: any) => {
    return TranslateText(children);
};

export default Translate;