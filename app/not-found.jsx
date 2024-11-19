'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center w-full h-screen">
            {/* Back Arrow */}
            <button
                onClick={() => router.back()}
                className="absolute top-4 left-4 p-2"
            >
                <ArrowLeft />
            </button>

            <div className="text-center">
                <Image
                    width={600}
                    height={200}
                    src={'/images/not-found.svg'}
                    alt="not-found"
                />

                <div className="flex items-center justify-center space-x-4 ">
                    <h2 className="text-xl font-semibold ml-2">صفحه‌ای یافت نشد</h2>
                    <div className="border-l-2 border-gray-300 h-12"></div>

                    <p className="my-4">صفحه مورد نظر اصن وجود خارجی ندارد</p>
                </div>


            </div>
        </div>
    )
}
