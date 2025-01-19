import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-0 bg-black bg-opacity-95 text-white border-t-2 border-it-blue">

            <div className="pt-20 pb-10 p-4 flex flex-wrap justify-between ml-8 2xl:ml-40">

                <div className="flex flex-col space-y-6 ml-6 md:ml-16 justify-center">
                    <div>
                        <h2 className="text-white text-2xl font-bold">
                            info<span className="text-it-blue">Travel</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Your gateway to explore the world.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-col space-x-2 space-y-2">
                            <span>Interested in code?</span>
                            <a href="#">
                                <FaGithub className="w-6 h-6 text-it-blue" />
                            </a>
                        </div>
                        <div className="flex flex-col space-x-2 space-y-2">
                            <span>Interested in documentation?</span>
                            <a href="#">
                                <FaGithub className="w-6 h-6 text-it-blue" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto mt-8 md:mt-6 px-6 md:px-16 space-x-8 justify-center mr-4 2xl:mr-32 text-sm md:text-base">

                    <ul className="space-y-2">
                        <li className="space-y-2">
                            <h3 className="text-it-blue font-bold mb-4 text-lg">Product</h3>
                        </li>
                        <li><Link href={"/countries"} className={"text-gray-400 hover:text-it-blue"}>Country list</Link></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">About infoTravel</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">App Guide</a></li>
                        <li><Link href={"/"} className={"text-gray-400 hover:text-it-blue"}>Interactive map</Link></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Planner</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Travel guides</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Recommended</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">FAQ</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">News</a></li>
                    </ul>

                    <ul className="space-y-2">
                        <li className="space-y-2">
                            <h3 className="text-it-blue font-bold mb-4 text-lg">Legal</h3>
                        </li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Privacy policy</a></li>
                    </ul>

                    <ul className="space-y-2">
                        <li className="space-y-2">
                            <h3 className="text-it-blue font-bold mb-4 text-lg">Team</h3>
                        </li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">About us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Karol Kozikowski</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Szymon Baniewicz</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Michał Kozikowski</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Dawid Tyrko</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-it-blue">Ignacy Baikou</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-gray-600 py-4">
                <p>© 2024 infoTravel. All rights reserved.</p>
            </div>
        </footer>
    );
}
