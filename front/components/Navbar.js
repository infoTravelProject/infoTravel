'use client';
import { useState } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import SideBar from "@/components/SideBar";

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {setSidebarOpen(!sidebarOpen);}

    return (
        <nav>
            <div className={`relative z-10 flex text-white flex-row items-center justify-between p-4 ${sidebarOpen ? 'bg-white/[0.04]' : 'bg-white/[0.05]'} shadow-md transition hover:shadow-lg hover:bg-white/[0.04]`}>
                <div className="ml-8 text-4xl">
                    <span className="text-white font-BraahOne">info</span>
                    <span className="text-it-blue font-BraahOne">Travel</span>
                </div>
                <div className="flex font-inter items-center">
                    <ul className="flex space-x-10 mr-24">
                        <li>Planner</li>
                        <li>Travel Guides</li>
                        <li>Recommended</li>
                    </ul>
                    <div>
                    <button onClick={toggleSidebar}><FaCircleUser className="w-12 h-12"/></button>
                    </div>
                </div>
            </div>
            {sidebarOpen && (
                <div className={`absolute z-0 right-0 h-full w-full bg-transparent cursor-pointer`} onClick={toggleSidebar}></div>
            )}
            <div>
                <SideBar sidebar={sidebarOpen}/>
            </div>
        </nav>
    );
}