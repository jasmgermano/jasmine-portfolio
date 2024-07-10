const defaultLocale = 'pt-BR';
const langs = ['en-US', 'pt-BR'] as const;

const locales = langs as unknown as string[];
export const i18nConfig = { defaultLocale, locales, localDetection: true };

export type Locale = typeof langs[number];