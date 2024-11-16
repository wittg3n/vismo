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
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
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

export function ProfileDropDown() {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const onDrop = (acceptedFiles, rejectedFiles) => {
        // Reset error message on every new drop
        setErrorMessage("");

        // Handle rejected files
        if (rejectedFiles.length > 0) {
            const error = rejectedFiles[0].errors[0];
            if (error.code === "file-too-large") {
                setErrorMessage("اندازه فایل نباید از 5 مگابایت بیشتر باشد.");
            } else if (error.code === "file-invalid-type") {
                setErrorMessage("لطفاً فقط فایل‌های JPEG یا PNG آپلود کنید.");
            }
            return;
        }

        // Log the files to debug
        console.log("Accepted files:", acceptedFiles);
        console.log("Rejected files:", rejectedFiles);

        // If there are valid image files, process them
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

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src="/icons/profile.svg" alt="profile" />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" dir="rtl">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="font-bold text-lg text-right">
                        خشایار مافی
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem >
                        <Dialog >
                            <DialogTrigger className="w-full" >
                                <Link href="#" className="text-sm  ">
                                    تغییر آواتار
                                </Link>
                            </DialogTrigger>
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

                                        {files.map((file) => (
                                            <div key={file.name} className="w-full">
                                                <Image
                                                    src={file.preview}
                                                    alt={file.name}
                                                    className="rounded-md object-cover"
                                                    width={220}
                                                    height={110}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="w-full bg-white text-dark-2 hover:bg-green-1 transition-all duration-500">
                                        ذخیره
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem className=" justify-center">
                    <Button
                        className="bg-danger"
                    >
                        <LogOut />
                        خروج از حساب
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
