import SideBarBox from "@/components/SideBarBox";
import Image from 'next/image'

export default function SideBar({sidebar}) {
    if (sidebar) return (
        <div className="absolute z-20 right-0 w-72 h-full bg-[#1E1E1E]/[0.8] shadow-lg shadow-neutral-950">
            <div className="w-full h-fit mt-8">
                <SideBarBox title={"Home"} icon={"/side_home.png"} isActive={true}/>
                <SideBarBox title={"Profile"} icon={"/side_user.png"} isActive={false}/>
                <SideBarBox title={"News"} icon={"/side_news.png"} isActive={false}/>
                <SideBarBox title={"Settings"} icon={"/side_settings.png"} isActive={false}/>
                <SideBarBox title={"FAQ"} icon={"/side_faq.png"} isActive={false}/>
                <SideBarBox title={"About"} icon={"/side_about.png"} isActive={false}/>
                <SideBarBox title={"Support"} icon={"/side_support.png"} isActive={false}/>
            </div>
            <div className="absolute w-full bottom-0 h-72 flex flex-col justify-end items-center">
                <div className="flex flex-row bg-black/[0.15] rounded-full mb-12 cursor-pointer transition hover:bg-black/[0.25]">
                    <div className="w-8 flex flex-col justify-center ml-8">
                        <Image src={"/logout.png"} width={500} height={500} alt={"?"} className="scale-75"/>
                    </div>
                    <div className="pr-10 pl-2 py-4 text-white/[0.9] text-xl">Sign out</div>
                </div>
            </div>
        </div>
    );
}