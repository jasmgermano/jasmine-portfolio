import { useTheme } from '@/context/theme-context';
import { Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import Image from 'next/image';
import Star from "@/assets/images/header/star.svg";
import StarBlue from "@/assets/images/header/star-blue.svg";

type MenuItemProps = {
    title: string;
    url: string;
}

export default function LateralMenuItem({ title, url }: Readonly<MenuItemProps>) {
    const { theme } = useTheme();
    
    return (
        <li>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href={url}>
                        <div className="relative">
                            <Image
                                src={theme === 'light' ? Star : StarBlue}
                                alt="Star"
                                className="h-4 w-4 transition-transform duration-300 hover:scale-125"
                                style={{ transition: 'transform 0.3s ease' }}
                            />
                        </div>
                    </a>
                </TooltipTrigger>
                <TooltipContent side="left" className="text-xs p-2 rounded-md dark:text-light-blue">
                    {title}
                </TooltipContent>
            </Tooltip>
        </li>
    );
}