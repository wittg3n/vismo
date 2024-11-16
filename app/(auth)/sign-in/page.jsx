"use client"
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Import toast from Sonner
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import Image from "next/image";

// Validation schema using Yup (without username)
const validationSchema = Yup.object({
    email: Yup.string()
        .email("ایمیل معتبر وارد کنید")
        .required("ایمیل الزامی است"),
    password: Yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .max(20, "رمز عبور نباید بیشتر از 20 کاراکتر باشد"),
});

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message);
                localStorage.setItem("token", result.token);
                window.location.href = "/";
            } else {
                const error = await response.json();
                toast.error(error.message);
            }
        } catch (error) {
            toast.error("خطا در ورود رخ داده است. لطفا دوباره تلاش کنید.");
            console.error(error);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader className="flex items-center">
                    <Link href="/" className="gap-1">
                        <Image
                            src={"/icons/logo-black.svg"}
                            width={96}
                            height={400}
                            alt="Vismo Logo"
                            className="max-sm:size-10"
                            style={{ userSelect: "none", pointerEvents: "none" }}
                        />
                    </Link>
                    <CardTitle>وارد شوید</CardTitle>
                    <CardDescription className="flex items-center">
                        فقط با چند کلیک با دوستان خود در هرجای جهان ارتباط برقرار کنید  (بلاخص در فرانسه)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">

                            {/* Email Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">ایمیل</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ایمیل خود را وارد کنید"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">رمز عبور</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="رمز عبور را وارد کنید"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="mt-4 w-full py-2 bg-dark-2 rounded-md text-white hover:bg-[#191919] transition-all duration-300">ورود</button>
                    </form>
                </CardContent>
                <CardFooter className="flex min-w-full">
                    <p className="text-[12px]">
                        حساب کاربری داری؟ <Link href={"/sign-in"} className="text-blue-600 underline underline-offset-4 font-semibold">
                            وارد شو
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </section>
    );
};

export default SignIn;
