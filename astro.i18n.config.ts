import { defineAstroI18nConfig } from "astro-i18n"

export default defineAstroI18nConfig({
    defaultLangCode: "en",
    supportedLangCodes: ['pt-BR'],
    showDefaultLangCode: false,
    translations: {
        "en": "./locales/en/translations.json",
        "pt-BR": "./locales/pt-BR/translations.json",
    },
    routeTranslations: {},
})