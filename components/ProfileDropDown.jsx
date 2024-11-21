"use client";
import {
    UserPen,
    LogOut
} from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import Image from "next/image";
import { uploadAvatar } from '@/helpers/uploadAvatar';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import api from '@/helpers/cookieHelper';

export function ProfileDropDown({ userData }) {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter();

    const onLogout = async () => {
        try {
            await api.post('/auth/logout')
            router.push('/sign-in')
        } catch (error) {
            console.log(error)
            toast.error('خطایی در خروج از حساب رخ داد')
        }
    }
    const onSubmit = async () => {
        if (files.length > 0) {
            const result = await uploadAvatar(files[0]);

            if (result.success) {
                toast.success("آواتار با موفقیت به روز شد");
                setIsDialogOpen(false); // Close the dialog
                window.location.reload()
            } else {
                toast.error("خطا در آپلود آواتار: " + result.error);
            }
        } else {
            toast.error("لطفاً یک فایل انتخاب کنید.");
        }
    };

    const onDrop = (acceptedFiles, rejectedFiles) => {
        setErrorMessage("");
        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0];
            if (error.code === "file-too-large") {
                setErrorMessage("اندازه فایل نباید از 5 مگابایت بیشتر باشد.");
            } else if (error.code === "file-invalid-type") {
                setErrorMessage("لطفاً فقط فایل‌های JPEG یا PNG آپلود کنید.");
            }
            return;
        }
        if (acceptedFiles.length > 0) {
            const processedFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFiles(processedFiles);
        } else {
            setErrorMessage("فایل‌های آپلود شده معتبر نیستند.");
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        multiple: false, // Limit to one file
        maxSize: 5 * 1024 * 1024, // 5MB limit
    });
    const getInitials = (str1, str2) => `${str1[0]} ${str2[0]}`;
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer">
                        <AvatarImage src={userData?.miniAvatar || '/images/avatar-1'} alt="profile" />
                        <AvatarFallback className="bg-dark-2">{getInitials(userData.firstname, userData.lastname)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" dir="rtl">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="font-bold text-lg text-right">
                            {userData.firstname + ' ' + userData.lastname}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <DialogTrigger className="w-full" asChild >
                                <div className='flex cursor-pointer'> <span className="ml-2"><UserPen /></span>  ویرایش حساب</div>
                            </DialogTrigger>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className=" justify-center">
                        <Button
                            className="bg-dark-2"
                            onClick={onLogout}
                        >
                            <LogOut />
                            خروج از حساب
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-[425px] bg-dark-1">
                <DialogHeader className="text-right">
                    <DialogTitle>تغییر آواتار</DialogTitle>
                    <DialogDescription>
                        آواتار خود را بارگذاری کنید
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                        <div
                            {...getRootProps()}
                            className={` cursor-pointer bg-dark-2 p-4 rounded-md ${isDragActive ? "border-blue-500" : "border-gray-300"
                                }`}
                        >
                            <input {...getInputProps()} id="avatar-upload" />
                            {isDragActive ? (
                                <p className="text-center text-sm text-blue-500">
                                    فایل را اینجا رها کنید...
                                </p>
                            ) : (
                                <p className="text-center text-sm text-gray-400 ">
                                    برای آپلود تصویر اینجا کلیک کنید یا فایل را بکشید و رها کنید
                                </p>
                            )}
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center mt-2">
                                {errorMessage}
                            </p>
                        )}
                        {files.map((file) =>
                            <div key={file.name} className="w-full">
                                <Image
                                    src={file.preview}
                                    alt={file.name}
                                    className="rounded-md object-cover"
                                    width={220}
                                    height={110}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full bg-white text-dark-2 hover:bg-gray-100 transition-all duration-500" onClick={onSubmit}>

                        ذخیره
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}