export const defaultLang = "en";

import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";
import pt_br from "./dictionaries/pt-br.json";

export const translations = {
    en,
    es,
    "pt-br": pt_br,
};

export function getLangFromHeaders(headers: Headers) {
    const acceptLanguage = headers.get("accept-language");
    if (!acceptLanguage) return defaultLang;

    const [lang] = acceptLanguage.split(",");
    const locale = lang.toLocaleLowerCase();

    if (locale in translations) return locale as keyof typeof translations;
    return defaultLang;
}

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in translations) return lang as keyof typeof translations;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
    return (
        translations[lang as keyof typeof translations] ||
        translations[defaultLang as keyof typeof translations]
    );
}
