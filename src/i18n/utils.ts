import { ui, defaultLang } from "./ui";

export function getLangFromHeaders(headers: Headers) {
	const acceptLanguage = headers.get("accept-language");
	if (!acceptLanguage) return defaultLang;
	const [lang] = acceptLanguage.split(",");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}
