'use client'
import { i18nConfig, Locale } from "@/config/i18n.config"

import { defaultDictionary } from "./default-dictionaries"

export const getDictionaryUseClient = (locale: Locale) => {
    return defaultDictionary[locale] ?? defaultDictionary[i18nConfig.defaultLocale as Locale];
};