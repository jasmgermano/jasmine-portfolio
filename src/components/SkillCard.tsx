import Image from "next/image";
import FillStar from "@/assets/images/skills/star-pink.svg";
import EmptyStar from "@/assets/images/skills/star.svg";

type SkillCardProps = {
    title: string;
    level: number;
    knowledge?: Array<string>;
}

export default function SkillCard( { title, level, knowledge }: Readonly<SkillCardProps> ) {
    const maxLevel = 5;

    const renderLevel = (level: number) => {
        const levels = [];
        for (let i = 0; i < maxLevel; i++) {
            if (i < level)
                levels.push(<Image key={i} src={FillStar} alt="Filled star" className="w-11 h-11 2xl:w-14 2xl:h-14" />);
            else
                levels.push(<Image key={i} src={EmptyStar} alt="Empty star" className="w-11 h-11 2xl:w-14 2xl:h-14" />);
        }
        return levels;
    }

    const renderKnowledge = (knowledge: Array<string>) => {
        return knowledge.map((item, index) => {
            return <p key={index} className="text-md text-pink uppercase bg-light-blue rounded-full py-1 px-3 font-extrabold 2xl:text-xl">{item}</p>;
        });
    }

    return (
        <div className="flex flex-col items-center justify-start w-full bg-white rounded-[4rem] border-2 border-black shadow-custom-card h-72 z-10 px-7 pt-16 xl:pt-20 xl:h-[350px] 2xl:h-96 2xl:pt-20 2xl:gap-3">
            <h1 className="text-2xl font-bold text-left w-full uppercase 2xl:text-4xl 2xl:pl-3">{title}</h1>
            <div className="flex justify-center space-x-1 2xl:gap-2">
                {renderLevel(level)}
            </div>
            {knowledge && <div className="flex justify-center flex-wrap gap-1 items-center mt-4 space-y-1">
                {renderKnowledge(knowledge)}
            </div>}
        </div>
    );
}