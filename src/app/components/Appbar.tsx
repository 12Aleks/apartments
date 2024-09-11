"use client"
import {ReactNode, useState} from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button
} from "@nextui-org/react";
import Image from "next/image";

interface IAppBarProps {
    children: ReactNode;
}

const Appbar = ({children}: IAppBarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    return (
        <Navbar className="shadow-md" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/"
                          className="border-2 border-blue-400 pt-5 pb-5 pl-10 pr-10 relative flex items-center text-primary-400 hover:text-primary-600 transition-colors"
                          style={{}}
                    >
                        {/*<Image src="/banner.png" alt="Logo logo" width="55" height="40" className="pe-3 opacity-70"/>*/}
                        <p className="absolute -left-4 bg-white uppercase font-bold text-inherit">Apartments</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">

            </NavbarContent>
            <NavbarContent justify="end">
                {children}
            </NavbarContent>
            <NavbarMenu>

            </NavbarMenu>
        </Navbar>
    );
};

export default Appbar;