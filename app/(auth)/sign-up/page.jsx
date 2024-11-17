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
import { toast, Toaster } from "sonner";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from "next/link";
import Image from "next/image";

const validationSchema = Yup.object({
    username: Yup.string()
        .required("نام کاربری الزامی است")
        .min(3, "نام کاربری باید حداقل 3 حرف باشد")
        .max(20, "نام کاربری نباید بیشتر از 20 حرف باشد"),
    email: Yup.string()
        .email("ایمیل معتبر وارد کنید")
        .required("ایمیل الزامی است"),
    password: Yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
        .max(20, "رمز عبور نباید بیشتر از 20 کاراکتر باشد"),
    confirmPassword: Yup.string()
        .required("تکرار رمز عبور الزامی است")
        .oneOf([Yup.ref('password'), null], 'رمز عبور ها باید یکسان باشند'),
    firstname: Yup.string()
        .required("نام الزامی است")
        .min(2, "نام باید حداقل 2 حرف باشد"),
    lastname: Yup.string()
        .required("نام خانوادگی الزامی است")
        .min(2, "نام خانوادگی باید حداقل 2 حرف باشد"),
});


const Signup = () => {
    // Initialize react-hook-form with Yup validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Form submission handler
    const onSubmit = async (data) => {
        try {

            const response = await fetch("http://localhost:3001/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message);  // Show success toast
            } else {
                const error = await response.json();
                toast.error(error.message);  // Show error toast if any
            }
        } catch (error) {
            toast.error("خطا در ثبت نام رخ داده است. لطفا دوباره تلاش کنید.");
            console.error(error);
        }
    };

    return (
        <section className="h-screen flex items-center justify-center">
            <Card className="w-[300px] md:w-[500px]">
                <CardHeader className="flex items-center">
                    <Link href="/" className=" gap-1">
                        <Image
                            src={"/icons/logo-black.svg"}
                            width={64}
                            height={400}
                            alt="Vismo Logo"
                            className="max-sm:size-10"
                            style={{ userSelect: "none", pointerEvents: "none" }}
                        />

                    </Link>
                    <CardTitle>
                        ساخت حساب کاربری
                    </CardTitle>
                    <CardDescription className="flex items-center">فقط با چند کلیک با دوستان خود در هرجای جهان ارتباط برقرار کنید  (بلاخص در فرانسه)</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="md:grid grid-cols-2 gap-2 transition-all duration-300">
                                {/* Firstname Field */}
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="firstname">نام</Label>
                                    <Input
                                        id="firstname"
                                        placeholder="نام خود را وارد کنید"
                                        {...register("firstname")}
                                    />
                                    {errors.firstname && (
                                        <span className="text-red-500 text-sm">{errors.firstname.message}</span>
                                    )}
                                </div>

                                {/* Lastname Field */}
                                <div className="block md:flex md:flex-col md:space-y-1.5">
                                    <Label htmlFor="lastname">نام خانوادگی</Label>
                                    <Input
                                        id="lastname"
                                        placeholder="نام خانوادگی خود را وارد کنید"
                                        {...register("lastname")}
                                    />
                                    {errors.lastname && (
                                        <span className="text-red-500 text-sm">{errors.lastname.message}</span>
                                    )}
                                </div>
                            </div>
                            {/* Username Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">نام کاربری</Label>
                                <Input
                                    id="username"
                                    placeholder="مثال: Wittg3n"
                                    {...register("username")}
                                />
                                {errors.username && (
                                    <span className="text-red-500 text-sm">{errors.username.message}</span>
                                )}
                            </div>



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

                            {/* Confirm Password Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">تکرار رمز عبور</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="تکرار رمز عبور را وارد کنید"
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="mt-4 w-full py-2 w-full bg-dark-2 rounded-md text-white hover:bg-[#191919] transition-all duration-300">ورود</button>
                    </form>

                </CardContent>
                <CardFooter className="flex min-w-full">
                    <p className="text-[12px]">
                        حساب کاربری داری؟ <Link href={"/sign-in"} className=" text-blue-600 underline underline-offset-4 font-semibold ">
                            وارد شو
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <Toaster position="top-right" richColors />


        </section>
    );
};

export default Signup;
