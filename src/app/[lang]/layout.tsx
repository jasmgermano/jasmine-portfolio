import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { i18nConfig } from '@/config/i18n.config';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export function generateStaticParams() {
  const languages = i18nConfig.locales.map((lang) => ({ lang }));
  return languages;
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
