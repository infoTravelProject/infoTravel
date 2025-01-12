import SideBarBox from "@/components/SideBarBox";
import {useGlobalContext} from "@/components/context/GlobalContext";
import Button from "@/components/Button";

export default function SideBar() {
    const {sidebarOpen, sidebarPage} = useGlobalContext();

    if (sidebarOpen) return (
        <div className="fixed top-20 z-30 right-0 w-60 h-[calc(100%-5rem)] bg-[#1B1B1B]/[0.95] shadow-lg shadow-neutral-950">
            <div className="w-full h-fit mt-1">
                <SideBarBox
                    title={"Home"}
                    icon={"/side_home.png"}
                    isActive={sidebarPage==="Home"}
                    link={"/"}/>
                <SideBarBox
                    title={"Profile"}
                    icon={"/side_user.png"}
                    isActive={sidebarPage==="Profile"}
                    link={"/profile"}/>
                <SideBarBox
                    title={"News"}
                    icon={"/side_news.png"}
                    isActive={sidebarPage==="News"}
                    link={"/#"}/>
                <SideBarBox
                    title={"Settings"}
                    icon={"/side_settings.png"}
                    isActive={sidebarPage==="Settings"}
                    link={"/settings"}/>
                <SideBarBox
                    title={"FAQ"}
                    icon={"/side_faq.png"}
                    isActive={sidebarPage==="FAQ"}
                    link={"/#"}/>
                <SideBarBox
                    title={"About"}
                    icon={"/side_about.png"}
                    isActive={sidebarPage==="About"}
                    link={"/#"}/>
                <SideBarBox
                    title={"Support"}
                    icon={"/side_support.png"}
                    isActive={sidebarPage==="Support"}
                    link={"/#"}/>
            </div>
            <div className="absolute w-full bottom-12 h-fit flex flex-row justify-center">
                <div className="scale-90"><Button type={"logout"} text={"Sign Out"}/></div>
            </div>
        </div>
    );
}