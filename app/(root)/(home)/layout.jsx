import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"



const HomeLayout = ({ children }) => {
    return (

        <main className="relative overflow-hidden ">
            <Navbar />
            <div className="flex">
                <Sidebar />

                <section className="flex flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>

        </main>

    )
}
export default HomeLayout