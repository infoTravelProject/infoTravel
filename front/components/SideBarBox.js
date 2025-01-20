import Image from 'next/image'
import Link from "next/link";
import {useGlobalContext} from "@/components/context/GlobalContext";

const SideBarBox = ({title, icon, isActive, link}) => {
    const {toggleSidebar} = useGlobalContext();
    const closeSidebar = () => {
        if(!isActive) {
            toggleSidebar();
        }
    }

    return (
        <Link href={link}>
            <div onClick={closeSidebar} className={`mt-1 w-full h-16 sm:h-14 bg-black/[0.25] text-white/[0.8] text-lg ${isActive ? 'cursor-default' : 'hover:bg-black/[0.35] cursor-pointer'}`}>
                <div className={`flex flex-row items-center ${isActive ? 'bg-gradient-to-l from-it-blue/[0.1] to-transparent' : 'bg-transparent'} h-full`}>
                    <div className="h-8 w-8 ml-6">
                        <Image src={icon} width={500} height={500} alt="?" className="scale-75 opacity-85"/>
                    </div>
                    <div className="ml-5">{title}</div>
                    <div className={`absolute right-0 w-1.5 h-14 ${isActive ? 'bg-it-blue' : 'bg-transparent'}`}></div>
                </div>
            </div>
        </Link>
    );
};
export default SideBarBox;