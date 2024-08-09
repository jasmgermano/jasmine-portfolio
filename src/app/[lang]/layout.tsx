import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { i18nConfig } from '@/config/i18n.config';
import { ThemeProvider } from '@/context/theme-context';
import { Metadata } from 'next';
import Head from 'next/head';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Jasmine Germano',
  description: 'Personal website of Jasmine Germano'
};

export function generateStaticParams() {
  const languages = i18nConfig.locales.map((lang) => ({ lang }));
  return languages;
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider>
          <body className={poppins.className}>
            {children}
          </body>
        </ThemeProvider>
    </html>
  );
}
