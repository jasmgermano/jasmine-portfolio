import { url } from "inspector";
import Link from "next/link";

type MenuItemProps = {
    title: string;
    url: string;
    closeMenu: () => void;
} 

export default function MenuItem({title, url, closeMenu}: Readonly<MenuItemProps>) {
    return (
        <li className="block cursor-pointer py-1.5 px-4 hover:text-pink lg:flex lg:items-center dark:text-white dark:hover:text-pink" onClick={closeMenu}>
            <Link className="block text-xl font-medium text-nowrap lg:font-semibold w-full" href={url}>{title}</Link>
        </li>
    );
}