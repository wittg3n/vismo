'use client'

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./mobileNav";
import { ProfileDropDown } from "./ProfileDropDown";
import { useState, useEffect } from "react";
import api from "@/helpers/cookieHelper";
import { Skeleton } from "@/components/ui/skeleton"
const Navbar = () => {
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const [user, setUser] = useState(null);

    useEffect(() => {

        console.log('useEffect called');
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/get');
                console.log('Full response:', response);
                if (response.data) {
                    console.log('User data received:', response.data);
                    setUser(response.data);
                } else {
                    console.log('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);
    if (!user) {
        return (
            <nav className="fixed top-0 left-0 w-full z-50 bg-dark-1 px-6 py-4 lg:px-10 flex justify-between items-center h-[68px]">

                <Skeleton className={"h-10 w-10rounded-full"} />
                <div className="flex items-center gap-5 md:hidden">
                </div>

                <div className="hidden sm:block">
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </nav>
        )
    }
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
                <ProfileDropDown userData={user} />

            </div>
        </nav>
    );
};

export default Navbar;