'use client'

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { ProfileDropDown } from "./ProfileDropDown";
import { useState, useEffect } from "react";
import SiginSignupLinks from "./SiginSignupLinks";
import api from "@/helpers/cookieHelper";
const Navbar = () => {
    const [err, serErr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isSignedIn, setIsSigedIn] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/get')
                console.log(response.data)
                setUser(response.data)
                setIsSigedIn(true)
            } catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, []);

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
                    <ProfileDropDown userData={user} />
                ) : (
                    <SiginSignupLinks />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
