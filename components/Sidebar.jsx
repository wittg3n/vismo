"use client";

import { sidebarLinks } from "@/constance";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <section className="transition-all duration-300  sticky right-0 top-0 flex min-h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[220px]">
            <div className="flex flex-col gap-6">
                {sidebarLinks.map((link) => {
                    // Check if it's the exact route or a subroute (but prevent "/" from matching all routes)
                    const isActive = pathname === link.route || (link.route !== "/" && pathname.startsWith(link.route));

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn(
                                'flex gap-4 items-center p-4 rounded-lg justify-start  transition-colors duration-300 button-blur  ',
                                isActive ? 'bg-blue-1 button-shadow button-blur ' : 'hover:bg-dark-2' // Adds hover effect for non-active links
                            )}
                        >
                            <Image
                                src={link.imgUrl}
                                alt={link.label}
                                width={18}
                                height={18}
                            />
                            <p className="text-md font-semibold max-lg:hidden">
                                {link.label}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Sidebar;