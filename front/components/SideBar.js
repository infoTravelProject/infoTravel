import SideBarBox from "@/components/SideBarBox";
import Image from 'next/image'
import {useGlobalContext} from "@/components/context/GlobalContext";

export default function SideBar() {
    const {sidebarOpen, sidebarPage} = useGlobalContext();

    if (sidebarOpen) return (
        <div className="fixed top-20 z-30 right-0 w-72 h-[calc(100%-5rem)] bg-[#1B1B1B]/[0.95] shadow-lg shadow-neutral-950">
            <div className="w-full h-fit mt-1">
                <SideBarBox title={"Home"} icon={"/side_home.png"} isActive={sidebarPage==="Home"} link={"/"}/>
                <SideBarBox title={"Profile"} icon={"/side_user.png"} isActive={sidebarPage==="Profile"} link={"/profile"}/>
                <SideBarBox title={"News"} icon={"/side_news.png"} isActive={sidebarPage==="News"} link={"/#"}/>
                <SideBarBox title={"Settings"} icon={"/side_settings.png"} isActive={sidebarPage==="Settings"} link={"/settings"}/>
                <SideBarBox title={"FAQ"} icon={"/side_faq.png"} isActive={sidebarPage==="FAQ"} link={"/#"}/>
                <SideBarBox title={"About"} icon={"/side_about.png"} isActive={sidebarPage==="About"} link={"/#"}/>
                <SideBarBox title={"Support"} icon={"/side_support.png"} isActive={sidebarPage==="Support"} link={"/#"}/>
            </div>
            <div className="absolute w-full bottom-0 h-72 flex flex-col justify-end items-center">
                <div className="flex flex-row bg-black/[0.25] rounded-full mb-12 cursor-pointer transition hover:bg-black/[0.35] hover:border-amber-600 border-transparent border-2">
                    <div className="w-8 flex flex-col justify-center ml-8">
                        <Image src={"/logout.png"} width={500} height={500} alt={"?"} className="scale-75"/>
                    </div>
                    <div className="pr-10 pl-2 py-4 text-white/[0.9] text-xl">Sign out</div>
                </div>
            </div>
        </div>
    );
}