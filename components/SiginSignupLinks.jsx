import Link from "next/link";
import { LogIn } from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

const SiginSignupLinks = () => {
    return (
        <section className="text-[12px] font-light">
            <HoverCard>
                <HoverCardTrigger>
                    <div>
                        <Link href={"/sign-up"}>
                            <LogIn />
                        </Link>
                    </div>
                </HoverCardTrigger>
                <HoverCardContent className="justify-center text-[10px] h-[20px] align-middle">
                    ساخت یا ورود به حساب کاربری
                </HoverCardContent>
            </HoverCard>
        </section>
    );
};

export default SiginSignupLinks;
