"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constance";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MobileNav = () => {
    const pathname = usePathname();

    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt="hamburger"
                        className="cursor-pointer sm:hidden"
                    />
                </SheetTrigger>
                <SheetContent side="right" className="border-none bg-dark-1">
                    <div className="flex flex-col gap-1 p-4">
                        <div className="flex flex-row-reverse sm:flex-row items-center gap-4 mb-6">
                            <Avatar>
                                <AvatarImage src="/icons/profile.svg" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                            <SheetClose asChild>
                                <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                    {sidebarLinks.map((link) => {
                                        const isActive = pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));

                                        return (
                                            <SheetClose asChild key={link.route}>
                                                <Link
                                                    href={link.route}
                                                    key={link.label}
                                                    className={cn(
                                                        'flex gap-4 items-center p-4 rounded-lg w-full max-w-60 transition-colors duration-300',
                                                        isActive ? 'bg-blue-1' : 'hover:bg-dark-2'
                                                    )}
                                                >
                                                    <Image
                                                        src={link.imgUrl}
                                                        alt={link.label}
                                                        width={16}
                                                        height={16}
                                                    />
                                                    <p className="font-semibold">
                                                        {link.label}
                                                    </p>
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </section>
                            </SheetClose>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    );
};

export default MobileNav;