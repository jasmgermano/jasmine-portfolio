'use client';
import localFont from "next/font/local";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";
import { Locale } from "@/config/i18n.config";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
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
import Stars from "@/assets/images/projects/stars.svg";
import AdotarELegau from "@/assets/images/projects/adotarelegau.png";
import RockPaperScissors from "@/assets/images/projects/game.gif";
import Luzinhas from "@/assets/images/projects/luzinhas.gif";
import TalesLudos from "@/assets/images/projects/talesludos.png";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { iconFlag, iconFlagKey, locales, textFlag, textFlagKey } from "./locales";
import { useTheme } from "@/context/theme-context";
import { useInView } from "react-intersection-observer";
import TitleSection from "@/components/TitleSection";
import SkillCard from "@/components/SkillCard";
import Project from "@/components/Project";
import Slider from "react-slick";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/send-email";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import LateralMenuItem from "@/components/LateralMenuItem";


const pinewood = localFont({ src: '../PinewoodSans.otf', variable: '--pinewoodSans' });

type MenuItemsProps = {
  dict: ReturnType<typeof getDictionaryUseClient>;
  closeMenu: () => void;
};

function MenuItems({ dict, closeMenu }: MenuItemsProps) {
  return (
    <>
      <MenuItem title={dict.navigation.home} url="/" closeMenu={closeMenu} />
      <MenuItem title={dict.navigation.about} url="/#about" closeMenu={closeMenu} />
      <MenuItem title={dict.navigation.skills} url="/#skills" closeMenu={closeMenu} />
      <MenuItem title={dict.navigation.projects} url="/#projects" closeMenu={closeMenu} />
      <MenuItem title={dict.navigation.contact} url="/#contact" closeMenu={closeMenu} />
    </>
  );
}

export type FormProps = {
  name: string;
  email: string;
  message: string;
};

type ContactProps = {
  dict: ReturnType<typeof getDictionaryUseClient>;
}

const Contact: React.FC<ContactProps> = ({ dict }) => {
  const { register, handleSubmit, reset } = useForm<FormProps>();

  function onSubmit(data: FormProps) {
    sendEmail(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-5 lg:w-auto">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col items-center w-full">
          <label htmlFor="name" className="w-full text-white text-lg uppercase text-left px-3">{dict.footer.name}</label>
          <input
            type="text"
            id="name"
            placeholder="jasmine"
            autoComplete="off"
            className="w-full h-10 px-3 placeholder-light-blue border-0 border-b-2 border-white focus:outline-none focus:border-light-blue focus:ring-0 bg-transparent text-white"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <label htmlFor="email" className="w-full text-white text-lg uppercase text-left px-3">Email</label>
          <input
            type="email"
            id="email"
            placeholder="jas@gmail.com"
            autoComplete="off"
            className="w-full h-10 px-3 placeholder-light-blue border-0 border-b-2 border-white focus:outline-none focus:border-light-blue focus:ring-0 bg-transparent text-white"
            {...register('email', { required: true })}
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <label htmlFor="message" className="w-full text-white text-lg uppercase text-left px-3 mb-2">{dict.footer.message}</label>
        <textarea
          id="message"
          placeholder={dict.footer.messageExample}
          autoComplete="off"
          className="w-full h-20 px-3 placeholder-light-blue border-0 border-b-2 border-white focus:outline-none focus:border-light-blue focus:ring-0 bg-transparent text-white"
          {...register('message', { required: true })}
        />
      </div>
      <button className="bg-light-blue flex flex-col items-center px-8 py-3 mt-3 rounded-full shadow-custom border-2 border-black">
        <span className="font-bold uppercase">{dict.footer.send}</span>
      </button>
    </form>
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
  
  const [showMenu, setShowMenu] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowMenu(true);
      } else {
        setShowMenu(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
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
  
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
                        <MenuItems dict={dict} closeMenu={() => setIsOpen(false)} />
                      </ul>
                    </div>
                    <ul className="hidden lg:flex gap-4 items-center justify-end">
                      <MenuItems dict={dict} closeMenu={() => setIsOpen(false)} />
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
                    font-stroke-mobile flex justify-center items-center px-7 pt-2 h-11 md:font-stroke lg:text-4xl lg:px-10 ${lang === 'en-US' ? 'order-3' : 'order-4'}`}>
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
          <div className={`flex flex-col justify-center items-center lg:px-10 w-full gap-4 lg:flex-row lg:gap-0 lg:-mt-6 transition-transform duration-300 lg:duration-1000 ${inView ? 'transform translate-y-0' : 'transform translate-y-10 opacity-0'}`}>
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
      {/* habilidades */}
      <section id="skills" className="bg-lilac py-10 dark:bg-darkest-gray relative">
        <Container>
          <div className="w-full flex flex-col justify-center items-center gap-12 mb-16 md:mb-28 xl:mb-32 2xl:mb-56">
            <div className="w-full flex justify-center md:justify-start">
              <TitleSection title={dict.skills.title} subtitle={dict.skills.subtitle} color="text-light-green" />
            </div>
            <div className="w-80 grid grid-cols-1 gap-7 place-items-center md:w-[640px] md:grid-cols-2 lg:w-[940px] lg:grid-cols-3 xl:w-[1140px] 2xl:w-full">
              <SkillCard title="Javascript" level={3} knowledge={dict.skills.js.knowledge} />
              <SkillCard title="React" level={2} knowledge={dict.skills.react.knowledge} />
              <SkillCard title="Next.js" level={1} knowledge={dict.skills.next.knowledge} />
              <SkillCard title="ASP.NET" level={2} knowledge={dict.skills.aspnet.knowledge} />
              <div className="flex flex-col items-center justify-center bg-white rounded-[4rem] w-80 border-2 border-black shadow-custom-card z-10 px-7 py-10 md:col-span-2 md:w-full md:h-72 xl:h-[350px] 2xl:h-96 2xl:justify-start 2xl:pt-20">
                <h1 className="text-2xl font-bold text-center w-full uppercase 2xl:text-4xl 2xl:pl-3">{dict.skills.other}</h1>
                <ul className="grid grid-cols-1 gap-1 mt-4 text-xl font-semibold md:grid-cols-2 xl:gap-x-10 2xl:text-3xl">
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>Git {dict.general.and} GitHub</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>HTML {dict.general.and} CSS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>RDBMS {dict.general.and} SQL</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>TailwindCSS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>Typescript</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Image src={StarBlue} alt="Star" className="h-7 w-7" />
                    <span>UX/UI Design</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 w-full bg-transparent">
          <svg width="100%" viewBox="0 0 1920 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={theme === 'light' ? 'fill-light-blue' : 'fill-dark-gray'}>
            <path d="M-37 32L28.2333 58.7C93.4667 85 223.933 139 354.4 170.7C484.867 203 615.333 213 745.8 202.7C876.267 192 1006.73 160 1137.2 149.3C1267.67 139 1398.13 149 1528.6 133.3C1659.07 117 1789.53 75 1854.77 53.3L1920 32V320H1854.77C1789.53 320 1659.07 320 1528.6 320C1398.13 320 1267.67 320 1137.2 320C1006.73 320 876.267 320 745.8 320C615.333 320 484.867 320 354.4 320C223.933 320 93.4667 320 28.2333 320H-37V32Z" />
          </svg>
        </div>
      </section>
      {/* fim habilidades */}
      {/* projetos */}
      <section id="projects" className="bg-light-blue dark:bg-dark-gray py-5 relative">
        <Container>
          <div className="w-full flex flex-col justify-center items-center gap-16">
            <div className="w-full flex justify-center md:justify-start">
              <TitleSection title={dict.projects.title} color="text-lilac" />
            </div>
            <div className="w-full h-full mb-16 sm:mb-24 md:mb-28 lg:mb-32">
              <Slider {...settings} className="w-full z-10">
                <div className="px-5 pb-5">
                  <Project 
                    title={dict.projects.adotarProject.title} 
                    type={dict.projects.type.volunteer} 
                    techs={['React', 'Next.js', 'TailwindCSS']} 
                    dictButton={dict.projects.button} image={AdotarELegau} 
                    description={dict.projects.adotarProject.description} 
                    codeUrl="https://github.com/jasmgermano/pet-adoption-website"
                    testUrl="https://adotarelegau.vercel.app"
                  />              
                </div>
                <div className="px-5 pb-5">
                  <Project 
                    title={dict.projects.pedraPapelTesouraProject.title}
                    type={dict.projects.type.study} 
                    techs={['HTML', 'CSS', 'Javascript']} 
                    dictButton={dict.projects.button} image={RockPaperScissors} 
                    description={dict.projects.pedraPapelTesouraProject.description}
                    codeUrl="https://github.com/jasmgermano/rock-paper-scissor" 
                    testUrl="https://pedrapapelitesoura.netlify.app/"
                  />
                </div>
                <div className="px-5 pb-5">
                  <Project 
                    title={dict.projects.luzinhaProject.title}
                    type={dict.projects.type.study}
                    techs={['HTML', 'CSS', 'Javascript']}
                    dictButton={dict.projects.button} image={Luzinhas}
                    description={dict.projects.luzinhaProject.description}
                    codeUrl="https://github.com/jasmgermano/lights"
                    testUrl="https://luzinhas.netlify.app/"
                  />
                </div>
                <div className="px-5 pb-5">
                  <Project 
                    title={dict.projects.talesLudosProject.title}
                    type={dict.projects.type.academic}
                    techs={['Vue.js', 'P5.js']}
                    dictButton={dict.projects.button} image={TalesLudos}
                    description={dict.projects.talesLudosProject.description}
                    codeUrl="https://github.com/jasmgermano/talesludos3/tree/criar-jogos"
                    hidden={true}
                  />
                </div>
              </Slider>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-transparent z-0">
              <svg width="100%" viewBox="0 0 2432 252" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1542.82 21.0136C1442.09 -49.9384 1211.34 186.489 1108.55 313.572V335H1779.54C1742.6 259.901 1643.55 91.9656 1542.82 21.0136Z" fill="#94AE79" />
                <path d="M2349.66 33.9159C2252.92 -34.0718 1984.02 213.011 1885.31 334.784L1932.6 334.784H2577C2541.53 262.823 2446.4 101.903 2349.66 33.9159Z" fill="#94AE79" />
                <path d="M1918.2 84.9203C1837.9 28.4582 1614.69 233.654 1532.75 334.784L1572.01 334.784H2106.92C2077.47 275.022 1998.51 141.382 1918.2 84.9203Z" fill="#94AE79" />
                <path d="M289.266 21.0136C188.535 -49.9384 -42.2161 186.489 -145 313.572V335H525.986C489.051 259.901 389.998 91.9656 289.266 21.0136Z" fill="#94AE79" />
                <path d="M1096.11 33.9159C999.368 -34.0718 730.466 213.011 631.755 334.784L679.05 334.784H1323.45C1287.98 262.823 1192.85 101.903 1096.11 33.9159Z" fill="#94AE79" />
                <path d="M664.651 84.9203C584.348 28.4582 361.133 233.654 279.193 334.784L318.453 334.784H853.365C823.92 275.022 744.955 141.382 664.651 84.9203Z" fill="#94AE79" />
              </svg>
            </div>
            <Image src={Stars} alt="Stars" className="absolute left-16 bottom-10 sm:right-24 sm:bottom-20 lg:right-24 lg:bottom-32 w-10" />
          </div>
        </Container>
      </section>
      {/* footer */}
      <footer id="contact" className="bg-pink dark:bg-black pt-16">
        <Container>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center gap-3 lg:flex-row lg:gap-20">
              <div className="w-full flex flex-col justify-center items-center mb-5 md:justify-start gap-2 lg:w-auto">
                <h1 className="text-2xl font-bold text-center text-white lg:text-4xl">{dict.footer.title}</h1>
                <p className="w-72 text-white text-center text-sm">{dict.footer.description}</p>
                <div className="flex justify-center items-center gap-1 mb-4">
                  <a href="https://www.linkedin.com/in/jasmgermano/" target="_blank" rel="noopener noreferrer">
                    <svg width="32" height="32" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M48.2917 7.625C49.6399 7.625 50.9328 8.16056 51.8861 9.11387C52.8394 10.0672 53.375 11.3601 53.375 12.7083V48.2917C53.375 49.6399 52.8394 50.9328 51.8861 51.8861C50.9328 52.8394 49.6399 53.375 48.2917 53.375H12.7083C11.3601 53.375 10.0672 52.8394 9.11387 51.8861C8.16056 50.9328 7.625 49.6399 7.625 48.2917V12.7083C7.625 11.3601 8.16056 10.0672 9.11387 9.11387C10.0672 8.16056 11.3601 7.625 12.7083 7.625H48.2917ZM47.0208 47.0208V33.55C47.0208 31.3525 46.1479 29.2449 44.594 27.691C43.0401 26.1371 40.9325 25.2642 38.735 25.2642C36.5746 25.2642 34.0583 26.5858 32.8383 28.5683V25.7471H25.7471V47.0208H32.8383V34.4904C32.8383 32.5333 34.4142 30.9321 36.3713 30.9321C37.315 30.9321 38.2201 31.307 38.8874 31.9743C39.5547 32.6416 39.9296 33.5467 39.9296 34.4904V47.0208H47.0208ZM17.4867 21.7567C18.6191 21.7567 19.7052 21.3068 20.506 20.506C21.3068 19.7052 21.7567 18.6191 21.7567 17.4867C21.7567 15.1229 19.8504 13.1913 17.4867 13.1913C16.3475 13.1913 15.2549 13.6438 14.4493 14.4493C13.6438 15.2549 13.1913 16.3475 13.1913 17.4867C13.1913 19.8504 15.1229 21.7567 17.4867 21.7567ZM21.0196 47.0208V25.7471H13.9792V47.0208H21.0196Z" fill="white" />
                    </svg>
                  </a>
                  <a href="https://github.com/jasmgermano" target="_blank" rel="noopener noreferrer">
                    <svg width="32" height="32" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.5 5.08331C27.1623 5.08331 23.8572 5.74073 20.7735 7.01804C17.6898 8.29535 14.8879 10.1675 12.5277 12.5277C7.76119 17.2942 5.08337 23.7591 5.08337 30.5C5.08337 41.7341 12.378 51.2654 22.4684 54.6458C23.7392 54.8491 24.1459 54.0612 24.1459 53.375V49.0796C17.1055 50.6046 15.6059 45.6737 15.6059 45.6737C14.4367 42.7254 12.7846 41.9375 12.7846 41.9375C10.4717 40.3616 12.9625 40.4125 12.9625 40.4125C15.5042 40.5904 16.8513 43.0304 16.8513 43.0304C19.0625 46.8937 22.7988 45.75 24.2475 45.14C24.4763 43.4879 25.1371 42.3696 25.8488 41.7341C20.2063 41.0987 14.2842 38.9129 14.2842 29.2291C14.2842 26.4079 15.25 24.1458 16.9021 22.3412C16.648 21.7058 15.7584 19.0625 17.1563 15.6312C17.1563 15.6312 19.2913 14.945 24.1459 18.2237C26.1538 17.6646 28.3396 17.385 30.5 17.385C32.6605 17.385 34.8463 17.6646 36.8542 18.2237C41.7088 14.945 43.8438 15.6312 43.8438 15.6312C45.2417 19.0625 44.3521 21.7058 44.098 22.3412C45.75 24.1458 46.7159 26.4079 46.7159 29.2291C46.7159 38.9383 40.7684 41.0733 35.1005 41.7087C36.0155 42.4966 36.8542 44.0471 36.8542 46.4108V53.375C36.8542 54.0612 37.2609 54.8746 38.5571 54.6458C48.6475 51.24 55.9167 41.7341 55.9167 30.5C55.9167 27.1622 55.2593 23.8571 53.982 20.7734C52.7047 17.6897 50.8325 14.8878 48.4723 12.5277C46.1122 10.1675 43.3103 8.29535 40.2266 7.01804C37.1429 5.74073 33.8378 5.08331 30.5 5.08331Z" fill="white" />
                    </svg>
                  </a>
                  {/* whatsapp */}
                  <a href="https://wa.me/5519988359366/?text=oii%2C+gostei+muito+do+seu+portif%C3%B3lio%21" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="white" d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
                  </a>
                </div>
              </div>
              <Contact dict={dict} />
            </div>
            <Link href={"/"}><Image src={WhiteLogo} alt="Logo" className="h-8 w-14 mt-10" /></Link>
            <div className="lg:flex pb-3 w-full justify-center items-center gap-2 flex-col mt-2">
              <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-1">
                <span className="text-white text-sm">{dict.footer.design}</span>
                <span className="text-white text-sm">© 2024 Jasmine Germano</span>
              </div>
            </div>
          </div>
        </Container>
      </footer>
      <div className={`fixed right-3 transform -translate-y-1/2 z-50 ${showMenu ? '-bottom-10' : 'hidden'} font-bold`}>
        <TooltipProvider>
          <ul className="flex flex-col items-center gap-4">
            <LateralMenuItem title={dict.navigation.home} url="#" />
            <LateralMenuItem title={dict.navigation.about} url="#about" />
            <LateralMenuItem title={dict.navigation.skills} url="#skills" />
            <LateralMenuItem title={dict.navigation.projects} url="#projects" />
            <LateralMenuItem title={dict.navigation.contact} url="#contact" />
          </ul>
        </TooltipProvider>
      </div>
    </div>
  );
}
