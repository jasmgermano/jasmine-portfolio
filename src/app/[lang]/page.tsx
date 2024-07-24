'use client';
import localFont from "next/font/local";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";
import Container from "@/components/Container";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/assets/images/header/logo.svg";
import WhiteLogo from "@/assets/images/header/white-logo.svg";
import MenuItem from "@/components/MenuItem";
import DarkMode from "@/assets/images/header/dark-mode.svg";
import LightMode from "@/assets/images/header/light-mode.svg";
import PortfolioStar from "@/assets/images/header/portfolio star.svg";
import PortifolioStarBlack from "@/assets/images/header/portfolio star black.svg";
import Name from "@/assets/images/header/name.svg";
import Star from "@/assets/images/header/star.svg";
import StarBlue from "@/assets/images/header/star-blue.svg";
import GitHub from "@/assets/images/header/github.svg";
import BlueGithub from "@/assets/images/header/blue-github.svg";
import LinkedIn from "@/assets/images/header/linkedin.svg";
import BlueLinkedIn from "@/assets/images/header/blue-linkedin.svg";
import PictureOfMe from "@/assets/images/presentation/me.png";
import Download from "@/assets/images/presentation/download.svg";
import StarPresentation from "@/assets/images/presentation/star.svg";
import StarBlueSkills from "@/assets/images/skills/star-blue.svg";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { iconFlag, iconFlagKey, locales, textFlag, textFlagKey } from "./locales";
import { useTheme } from "@/context/theme-context";
import { useInView } from "react-intersection-observer";
import TitleSection from "@/components/TitleSection";
import SkillCard from "@/components/SkillCard";

const pinewood = localFont({ src: '../PinewoodSans.otf', variable: '--pinewoodSans' });

type MenuItemsProps = {
  dict: ReturnType<typeof getDictionaryUseClient>;
};

function MenuItems({ dict }: MenuItemsProps) {
  return (
    <>
      <MenuItem title={dict.navigation.home} url="/" />
      <MenuItem title={dict.navigation.about} url="/#about" />
      <MenuItem title={dict.navigation.projects} url="/projects" />
      <MenuItem title={dict.navigation.contact} url="/contact" />
    </>
  );
}

export default function Home({ params }: Readonly<{ params: { lang: Locale } }>) {
  const dict = getDictionaryUseClient(params.lang);
  const [isOpen, setIsOpen] = useState(false);

  const { lang } = useParams();
  const pathName = usePathname();

  const flagIconSrc = iconFlag[lang as iconFlagKey]?.src;
  const flagIconAlt = iconFlag[lang as iconFlagKey]?.alt;
  const flagText = textFlag[lang as textFlagKey];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const getPathName = (lng: string) => {
    const path = pathName.split('/' + lang).join('');
    return '/' + lng + path;
  };

  const { theme, toggleTheme } = useTheme();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.07,
  });

  const downloadResume = () => {
    fetch('../api/downloadResume')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao baixar o arquivo');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => alert(`Erro ao baixar o arquivo: ${error.message}`));
  };

  return (
    <div className="w-full dark:bg-black">
      <header className="bg-pattern bg-center h-[700px] bg-no-repeat bg-cover lg:h-screen dark:bg-pattern-dark">
        <div className="bg-opacity-55 bg-white h-full dark:bg-opacity-40 dark:bg-dark-gray">
          <div className="w-full">
            <div className="relative bg-transparent pt-5">
              <Container>
                {/* menu */}
                <nav className="w-full flex items-center">
                  <div className="flex justify-start items-center gap-4 w-1/3 lg:order-3 lg:justify-end">
                    <Link href={getPathName(lang === 'en-US' ? 'pt-BR' : 'en-US')}>
                      <div className="flex items-center lg:gap-2">
                        <Image src={flagIconSrc} alt={flagIconAlt} className="h-6 w-6" />
                        <span className="text-dark-green text-xl font-bold hidden lg:block dark:text-white">{flagText}</span>
                      </div>
                    </Link>
                    <button onClick={toggleTheme} className="h-8 w-8">
                      <Image src={theme === 'light' ? DarkMode : LightMode} alt="Dark Mode" className="h-7 w-7" />
                    </button>
                  </div>
                  <div className="flex justify-center items-center w-1/3 lg:justify-start">
                    <Link href={"/"}><Image src={theme === 'light' ? Logo : WhiteLogo} alt="Logo" className="h-8 w-14" /></Link>
                  </div>
                  <div className="flex justify-end items-center w-1/3 lg:justify-center">
                    <button onClick={toggleMenu} className="h-8 w-6 block lg:hidden z-50 relative">
                      {isOpen ? (
                        <svg viewBox="0 0 24 24" fill="none" className={theme === 'light' ? 'stroke-black' : 'stroke-white'}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 47 33" xmlns="http://www.w3.org/2000/svg" className={theme === 'light' ? 'fill-black' : 'fill-white'}>
                          <path d="M44.9857 13.2H2.01429C0.161143 13.2 0 14.6751 0 16.5C0 18.3249 0.161143 19.8 2.01429 19.8H44.9857C46.8389 19.8 47 18.3249 47 16.5C47 14.6751 46.8389 13.2 44.9857 13.2ZM44.9857 26.4H2.01429C0.161143 26.4 0 27.8751 0 29.7C0 31.5249 0.161143 33 2.01429 33H44.9857C46.8389 33 47 31.5249 47 29.7C47 27.8751 46.8389 26.4 44.9857 26.4ZM2.01429 6.6H44.9857C46.8389 6.6 47 5.1249 47 3.3C47 1.4751 46.8389 0 44.9857 0H2.01429C0.161143 0 0 1.4751 0 3.3C0 5.1249 0.161143 6.6 2.01429 6.6Z" />
                        </svg>
                      )}
                    </button>
                    <div className={`fixed top-0 right-0 h-full w-full transition-all duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-0'} bg-white ${isOpen ? 'rounded-none' : 'rounded-full'} z-40 flex flex-col justify-center items-center dark:bg-dark-gray`}>
                      <ul className="flex flex-col items-center">
                        <MenuItems dict={dict} />
                      </ul>
                    </div>
                    <ul className="hidden lg:flex gap-4 items-center justify-end">
                      <MenuItems dict={dict} />
                    </ul>
                  </div>
                </nav>
                {/* fim menu */}
              </Container>
            </div>
          </div>
          <div className="w-full h-[600px] flex items-center animate-float lg:h-screen">
            <Container>
              {/* header */}
              <div className="w-full h-full flex flex-col justify-center items-center lg:-mt-28">
                <div className="flex justify-center items-center relative lg:-ml-96 lg:-mb-10 order-1">
                  <Image src={theme === 'light' ? PortfolioStar : PortifolioStarBlack} alt={dict.header.altPortfolioStar} className="h-28" />
                  <span className="absolute text-white font-bold text-xl uppercase text-center -rotate-[8deg] dark:text-black">
                    {dict.header.port}
                    <span className="block -mt-3">{dict.header.folio}</span>
                  </span>
                </div>
                <div className="flex items-center justify-center w-full order-2 gap-4 lg:gap-0">
                  <Image src={theme === 'light' ? Star : StarBlue} alt="Star" className="h-12 -mr-3" />
                  <Image src={Name} alt={dict.header.nameAlt} className="h-24 w-auto lg:h-36" />
                  <Image src={theme === 'light' ? Star : StarBlue} alt="Star" className="h-12 -ml-3" />
                </div>
                <h2 className={`text-2xl font-extrabold uppercase -mt-2 lg:text-3xl ${lang === 'en-US' ? 'order-4 mt-0' : 'order-3'} dark:text-light-blue`}>{dict.header.developer}</h2>
                <div className={`bg-lilac text-white font-bold rounded-full border-[1.5px] border-black ${pinewood.className} text-3xl 
                    font-stroke flex justify-center items-center px-7 pt-2 h-11 lg:text-4xl lg:px-10 ${lang === 'en-US' ? 'order-3' : 'order-4'}`}>
                  <span className="text-light-green">FULL STACK</span>
                </div>
                <div className="flex mt-3 gap-1 order-5 lg:flex-col lg:-mr-[410px] lg:-mt-28">
                  <a href="https://www.linkedin.com/in/jasmgermano/" target="_blank" rel="noopener noreferrer">
                    <Image src={theme === 'light' ? LinkedIn : BlueLinkedIn} alt="LinkedIn" className="h-8 w-8" />
                  </a>
                  <a href="https://github.com/jasmgermano" target="_blank" rel="noopener noreferrer">
                    <Image src={theme === 'light' ? GitHub : BlueGithub} alt="Github" className="h-8 w-8" />
                  </a>
                </div>
              </div>
              {/* fim header */}
            </Container>
          </div>
        </div>
      </header>
      <section id="about"
        className={`bg-pink dark:bg-black pb-10 `}
        ref={ref}>
        <Container>
          <div className={`flex flex-col justify-center items-center lg:px-10 w-full gap-4 lg:flex-row lg:gap-0 lg:-mt-6 transition-transform duration-1000 ${inView ? 'transform translate-y-0' : 'transform translate-y-10 opacity-0'}`}>
            <div className="mx-auto -mt-10 lg:-mt-0 lg:order-2 lg:w-1/3 lg:flex lg:flex-col lg:items-center">
              <Image src={PictureOfMe} alt="Picture of me" className="h-40 w-40 lg:h-52 lg:w-52" />
              <button onClick={downloadResume} className="hidden bg-light-blue flex-col items-center px-8 py-3 mt-3 rounded-full shadow-custom border-2 border-black lg:flex">
                <span className="font-bold uppercase">{dict.presentation.downloadResume}</span>
                <Image src={Download} alt="Download" className="h-5 w-5" />
              </button>
            </div>
            <div className="w-full flex flex-col items-center gap-5 lg:order-1 lg:w-2/3 lg:items-start lg:mt-10">
              <div className="flex justify-stretch items-center gap-3">
                <h2 className="text-2xl font-bold text-center text-white uppercase whitespace-nowrap lg:text-5xl">{dict.presentation.title}</h2>
                <Image src={StarPresentation} alt="Star" className="h-6 w-6 mx-auto" />
              </div>
              <p className="text-white text-justify text-sm lg:text-2xl">{dict.presentation.description}</p>
            </div>
            <button onClick={downloadResume} className="bg-light-blue flex flex-col items-center px-8 py-3 mt-3 rounded-full shadow-custom border-2 border-black lg:hidden">
              <span className="font-bold uppercase">{dict.presentation.downloadResume}</span>
              <Image src={Download} alt="Download" className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </section>
      <section id="skills" className="bg-lilac py-10 dark:bg-darkest-gray px-20">
        <div className="w-full flex flex-col justify-center items-center gap-12">
          <div className="w-full flex justify-center md:justify-start">
            <TitleSection title={dict.skills.title} subtitle={dict.skills.subtitle} />
          </div>
          <div className="w-80 grid grid-cols-1 gap-7 place-items-center md:w-[640px] md:grid-cols-2 lg:w-[940px] lg:grid-cols-3 xl:w-[1140px] 2xl:w-full">
            <SkillCard title="JS" level={3} knowledge={dict.skills.js.knowledge} />
            <SkillCard title="React" level={2} knowledge={dict.skills.react.knowledge} />
            <SkillCard title="Next" level={1} knowledge={dict.skills.next.knowledge} />
            <SkillCard title="ASP.NET" level={2} knowledge={dict.skills.aspnet.knowledge} />
            <div className="flex flex-col items-center justify-start bg-white rounded-[4rem] w-80 border-2 border-black shadow-custom-card z-10 px-7 py-10 md:col-span-2 md:w-full md:h-72 xl:h-80 2xl:h-96 2xl:justify-center">
              <TitleSection title={dict.skills.other} />
              <ul className="grid grid-cols-1 gap-1 mt-4 text-2xl font-semibold md:grid-cols-2 xl:gap-x-10 2xl:text-4xl">
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>Git {dict.general.and} GitHub</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>HTML {dict.general.and} CSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>RDBMS {dict.general.and} SQL</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>TailwindCSS</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>Typescript</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>UX/UI Design</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image src={StarBlueSkills} alt="Star" className="h-7 w-7" />
                  <span>Next.JS</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
