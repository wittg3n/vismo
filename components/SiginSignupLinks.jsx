import Link from "next/link";
import { LogIn } from 'lucide-react';

const SiginSignupLinks = () => {
    return (
        <section className="text-[12px] font-light">

            <Link href={"/sign-up"}>
                <LogIn />
            </Link>
        </section>
    );
};

export default SiginSignupLinks;
