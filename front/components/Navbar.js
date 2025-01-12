import { FaCircleUser } from "react-icons/fa6";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import {useGlobalContext} from "@/components/context/GlobalContext";

export default function Navbar() {
    const {sidebarOpen, toggleSidebar} = useGlobalContext();

    return (
        <nav>
            <div className={`fixed top-0 h-20 px-6 w-screen z-20 flex text-white flex-row items-center justify-between ${sidebarOpen ? 'bg-[#1B1B1B]' : 'bg-[#1E1E1E]'} shadow-md transition hover:shadow-lg hover:bg-[#1B1B1B]`}>
                <Link href={"/"}>
                    <div className="ml-8 text-4xl">
                        <span className="text-white font-BraahOne">info</span>
                        <span className="text-it-blue font-BraahOne">Travel</span>
                    </div>
                </Link>
                <div className="flex font-inter items-center">
                    <ul className="flex space-x-14 mr-20">
                        <li><a href="#" className="hover:text-it-blue transition">Planner</a></li>
                        <li><a href="#" className="hover:text-it-blue transition">Travel Guides</a></li>
                        <li><a href="#" className="hover:text-it-blue transition">Recommended</a></li>
                    </ul>
                    <div>
                    <button onClick={toggleSidebar}><FaCircleUser className="w-12 h-12 mr-8"/></button>
                    </div>
                </div>
            </div>
            {sidebarOpen && (
                <div className={`fixed top-0 z-10 w-screen h-screen bg-transparent cursor-default`} onClick={toggleSidebar}></div>
            )}
            <div>
                <SideBar/>
            </div>
        </nav>
    );
}