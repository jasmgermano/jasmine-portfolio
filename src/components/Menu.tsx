'use client';
import { useState } from "react";
import Image from "next/image";
import Logo from "../assets/images/header/logo.svg";
import Container from "./Container";

function MenuItem() {
    return (
        <li className="block cursor-pointer py-1.5 px-4 hover:text-custom-cyan lg:flex lg:items-center">
            <a className="block text-xl font-medium text-nowrap lg:font-semibold w-full" href="/">Adotar é legAU</a>
        </li>
    );
}

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    return (
        <Container>
            <div className="w-screen relative bg-transparent">
                <nav>
                    <div className="flex justify-center items-center relative">
                        <Image src={Logo} alt="Logo" className="h-8" />
                    </div>
                    <div className="absolute top-0 right-0">
                        <button onClick={toggleMenu} className="h-8 w-6">
                            {isOpen ? (
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 47 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M44.9857 13.2H2.01429C0.161143 13.2 0 14.6751 0 16.5C0 18.3249 0.161143 19.8 2.01429 19.8H44.9857C46.8389 19.8 47 18.3249 47 16.5C47 14.6751 46.8389 13.2 44.9857 13.2ZM44.9857 26.4H2.01429C0.161143 26.4 0 27.8751 0 29.7C0 31.5249 0.161143 33 2.01429 33H44.9857C46.8389 33 47 31.5249 47 29.7C47 27.8751 46.8389 26.4 44.9857 26.4ZM2.01429 6.6H44.9857C46.8389 6.6 47 5.1249 47 3.3C47 1.4751 46.8389 0 44.9857 0H2.01429C0.161143 0 0 1.4751 0 3.3C0 5.1249 0.161143 6.6 2.01429 6.6Z" fill="black" />
                                </svg>
                            )}
                        </button>
                        <p></p>
                    </div>
                </nav>
            </div>
        </Container>
    )
}