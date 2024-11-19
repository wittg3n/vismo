'use client'

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { Toaster } from "sonner"

import Edge from "@/components/Edge"
const HomeLayout = ({ children }) => {
    return (

        <main className="relative overflow-hidden ">

            <Navbar />
            <div className="flex">
                <Sidebar />

                <section className="flex flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px14">
                    <div className="w-full">
                        <Edge></Edge>

                        {children}
                    </div>
                </section>
            </div>
            <Toaster position="top-right" richColors />

        </main>

    )
}
export default HomeLayout