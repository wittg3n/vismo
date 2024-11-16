'use client'

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { ProfileDropDown } from "./ProfileDropDown";
import { useState } from "react";
import SiginSignupLinks from "./SiginSignupLinks";

const Navbar = () => {
    const [isSignedIn, setSignedIn] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-dark-1 px-6 py-4 lg:px-10 flex justify-between items-center h-[68px]">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src={"/icons/logo.svg"}
                    width={32}
                    height={32}
                    alt="Vismo Logo"
                    className="max-sm:size-10"
                />
            </Link>

            <div className="flex items-center gap-5 md:hidden">
                <MobileNav />
            </div>

            <div className="hidden sm:block">
                {isSignedIn ? (
                    <ProfileDropDown />
                ) : (
                    <SiginSignupLinks />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
