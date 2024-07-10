'use client';
import localFont from "next/font/local";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";

const pinewood = localFont({ src: '../PinewoodSans.otf', variable: '--pinewoodSans' });

export default function Home({params}: { params: { lang: Locale }}) {
  const dict = getDictionaryUseClient(params.lang);

  return (
    <p>{(dict).navigation.home}</p>
  );
}