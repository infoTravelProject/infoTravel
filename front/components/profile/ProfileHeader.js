import { MdOutlineTravelExplore } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import {useGlobalContext} from "@/components/context/GlobalContext";

export default function ProfileHeader() {

    const {user} = useGlobalContext();

    return (
        <div className="bg-[#1F90E0]/[0.12] min-h-[30vh] min-w-screen flex flex-row text-white">

            {/* left section */}
            <div className="w-1/3 flex items-center justify-center space-x-10">
                <FaCircleUser className="w-32 h-32"/>
                <div className="flex flex-col">

                    {/*name*/}
                    <h2 className="text-3xl mb-4">{user&& user.firstName + " " + user.lastName}</h2>
                    <div className="leading-3">

                        {/*level and rank*/}
                        <p className="text-xl text-[#E06F1F]"> Level 11</p>
                        <p className="text-xs mb-3 text-gray-400"> CASUAL TRAVELER</p>
                    </div>

                    {/* XP bar*/}
                    <div className="flex flex-col">
                        <p className="text-xs mx-auto text-gray-300"> 232 / 300</p>
                        <div className="w-full bg-gray-700 rounded-full h-1">
                            <div className="bg-[#E06F1F] h-1"
                                 style={{width: `${(232 / 300) * 100}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/*middle section*/}
            <div className="w-1/3 flex items-center text-gray-300 space-x-4 px-8 text-sm">
                {/* followers */}
                <div className="flex flex-col items-center h-2/3">
                    <p className="text-xl"> 13</p>
                    <p className="font-bold"> Followers</p>
                </div>

                {/* following */}
                <div className="flex flex-col items-center h-2/3">
                    <p className="text-xl"> 24</p>
                    <p className="font-bold"> Following</p>
                </div>
            </div>

            {/* right section*/}
            <div className="w-1/3 flex items-center justify-center space-x-5">
                <MdOutlineTravelExplore className="w-16 h-16"/>
                <div className="font-inter">

                    {/* visited this year */}
                    <div className="font-bold space-y-1">
                        <p className="text-gray-300"> Visited in 2024</p>
                        <p className="text-[#1FE0D0] pl-2 text-2xl"> 2</p>
                    </div>

                    {/* visited total*/}
                    <div className="font-bold space-y-1 mt-2">
                        <p className="text-gray-300"> Total</p>
                        <p className="text-[#E06F1F] pl-2 text-2xl"> 8</p>
                    </div>
                </div>
            </div>


        </div>
    )
}