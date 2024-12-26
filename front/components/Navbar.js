import { FaCircleUser } from "react-icons/fa6";

export default function Navbar() {
    return (
        <nav className="flex text-white flex-row items-center justify-between p-4 bg-black bg-opacity-95">
            <div className="ml-8 text-3xl">
                <span className="text-white font-bold font-BraahOne">info</span>
                <span className="text-it-blue font-bold font-BraahOne">Travel</span>
            </div>
            <div className="flex font-inter items-center">
                <ul className="flex space-x-10 mr-24">
                    <li>Planner</li>
                    <li>Travel Guides</li>
                    <li>Recommended</li>
                </ul>
                <div>
                <FaCircleUser className="w-12 h-12"/>
                </div>
            </div>
        </nav>
    );
}