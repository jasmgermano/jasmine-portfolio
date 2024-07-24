import { i18nConfig } from "@/config/i18n.config";
import USA from "@/assets/images/header/USA.svg";
import BRA from "@/assets/images/header/BRA.svg";

export const iconFlag = {
    'en-US': {
        src: USA,
        alt: 'USA Flag',
    },
    'pt-BR': {
        src: BRA,
        alt: 'Brazil Flag',
    }
};

export const textFlag = {
    'en-US': 'EN',
    'pt-BR': 'PT',
};

export type iconFlagKey = keyof typeof iconFlag;
export type textFlagKey = keyof typeof textFlag;

export const locales = i18nConfig.locales.map((code: string) => {
    return {
        code,
        text: textFlag[code as iconFlagKey],
        icon: iconFlag[code as textFlagKey],
    };
});


