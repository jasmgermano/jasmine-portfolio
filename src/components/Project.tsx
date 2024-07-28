import Image from "next/image";
import ProjectImage from "@/assets/images/projects/teste.jpg";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

type ProjectBtnProps = {
    text: string;
}

function ProjectBtn( {text}: Readonly<ProjectBtnProps> ) {
    return (
        <button className="bg-pink text-white uppercase font-bold py-2 px-4 rounded-full shadow-custom border-2 border-black w-28 lg:w-40 lg:px-6 lg:py-4 lg:text-lg">{text}</button>
    );
}

type ProjectProps = {
    title: string;
    type: string;
    techs: Array<string>;
    dict: ReturnType<typeof getDictionaryUseClient>;
}

export default function Project( { title, type, techs, dict }: Readonly<ProjectProps> ) {
    const renderTechs = (techs: Array<string>) => {
        return techs.map((item, index) => {
            return <p key={index} className="text-md text-dark-green uppercase bg-green rounded-xl py-1 px-3 font-extrabold lg:py-2 lg:px-4 lg:rounded-2xl lg:text-lg">{item}</p>;
        });
    }
    console.log(dict);

    return (
        <div className="flex flex-col w-full items-center md:flex-row md:gap-10 md:justify-around lg:gap-0">
            <div className="w-full bg-white shadow-custom-green border-2 border-black sm:w-1/2 md:h-full lg:w-80" style={{ aspectRatio: '1' }}>
                <Image src={ProjectImage} alt="Project image" className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 dark:text-white">
                <h2 className="text-3xl font-extrabold text-center w-full uppercase mt-4 md:text-left lg:text-4xl">{title}</h2>
                <p className="text-lg font-bold text-center w-full uppercase -mt-2 md:text-left lg:text-xl">{type}</p>
                <div className="flex justify-center flex-wrap gap-2 items-center space-y-1 md:justify-start">
                    {renderTechs(techs)}
                </div>
                <p className="text-center mt-4 md:text-left lg:text-xl">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur eligendi eum reiciendis quam quasi. Quia incidunt, explicabo, eaque modi ut, aspernatur facere dicta laboriosam eos a voluptates magnam illo voluptatem?</p>
                <div className="flex justify-center mt-4 gap-4 md:justify-start">
                    <ProjectBtn text={dict.projects.code} />
                    <ProjectBtn text={dict.projects.test} />
                </div>
            </div>
        </div>
    );
}