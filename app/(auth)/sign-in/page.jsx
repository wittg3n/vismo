"use client";
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
import { toast, Toaster } from "sonner";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
//form validation
const validationSchema = Yup.object({
    email: Yup.string()
        .email("ایمیل معتبر وارد کنید")
        .required("ایمیل الزامی است"),
    password: Yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .max(20, "رمز عبور نباید بیشتر از 20 کاراکتر باشد"),
});
//page starts
const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const router = useRouter();

    const onSubmit = async (data) => {

        await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message == 'ورود با موفقیت انجام شد') {
                    console.log("in the push")
                    router.replace("/");
                } else {
                    toast.error("Login failed.");
                }
            })
            .catch(error => {
                toast.error("Error occurred during login.");
            });
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
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                        <div className="grid w-full items-center gap-4">

                            {/* Email Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">ایمیل</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ایمیل خود را وارد کنید"
                                    {...register("email")}
                                    name="email" // Set the name attribute to match email autofill
                                    autoComplete="email" // Let browser know this is an email field
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
                                    name="password" // Set the name attribute to match password autofill
                                    autoComplete="current-password" // Let browser know this is a password field
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
                        حساب کاربری داری؟ <Link href={"/sign-up"} className="text-blue-600 underline  font-semibold">
                            یکی بساز
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <Toaster position="top-right" richColors />
        </section>
    );
};

export default SignIn;
