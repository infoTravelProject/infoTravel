import SideBarBox from "@/components/SideBarBox";
import Image from 'next/image'

export default function SideBar({sidebar}) {
    if (sidebar) return (
        <div className="fixed top-20 z-30 right-0 w-72 h-[calc(100%-5rem)] bg-[#1B1B1B]/[0.95] shadow-lg shadow-neutral-950">
            <div className="w-full h-fit mt-1">
                <SideBarBox title={"Home"} icon={"/side_home.png"} isActive={true} link={"/"}/>
                <SideBarBox title={"Profile"} icon={"/side_user.png"} isActive={false} link={"/profile"}/>
                <SideBarBox title={"News"} icon={"/side_news.png"} isActive={false} link={"/#"}/>
                <SideBarBox title={"Settings"} icon={"/side_settings.png"} isActive={false} link={"/settings"}/>
                <SideBarBox title={"FAQ"} icon={"/side_faq.png"} isActive={false} link={"/#"}/>
                <SideBarBox title={"About"} icon={"/side_about.png"} isActive={false} link={"/#"}/>
                <SideBarBox title={"Support"} icon={"/side_support.png"} isActive={false} link={"/#"}/>
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