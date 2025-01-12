import Image from "next/image";
import SelectorBox from "@/components/settings/SelectorBox";
import Button from "@/components/Button";
import {useGlobalContext} from "@/components/context/GlobalContext";

const SettingsSelector = () =>{
    const {settingsPage} = useGlobalContext();
    return(
        <div className="flex flex-col items-center w-72 h-screen bg-[#1E1E1E]/[0.8]">
            <div className="w-full h-20 bg-white/[0.1] shadow-lg text-white/[0.6] font-inter text-2xl flex flex-col justify-center text-center">SETTINGS</div>
            <div className="w-64 h-12 rounded-full bg-white/[0.11] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] flex-row flex row items-center mt-4">
                <Image src={"/search_white.png"} width={512} height={512} alt={"?"} className="w-5 h-5 ml-4 opacity-50"/>
                <div className="font-inter text-white/[0.35] ml-4 cursor-default">Search placeholder</div>
            </div>
            <div className="flex flex-col w-full h-full justify-between items-center">
                <div className="w-full h-fit mt-6">
                    <SelectorBox title={"Preferences"}
                                 isActive={settingsPage==="Preferences"}
                                 link={"/settings/preferences"}
                                 icon={"/preferences.png"}/>
                    <SelectorBox title={"Account"}
                                 isActive={settingsPage==="Account"}
                                 link={"/settings/account"}
                                 icon={"/side_news.png"}/>
                    <SelectorBox title={"Privacy & security"}
                                 isActive={settingsPage==="Privacy"}
                                 link={"/settings/privacy"}
                                 icon={"/privacy.png"}/>
                    <SelectorBox title={"Notifications"}
                                 isActive={settingsPage==="Notifications"}
                                 link={"/settings/notifications"}
                                 icon={"/notifications.png"}/>
                    <SelectorBox title={"Payments"}
                                 isActive={settingsPage==="Payments"}
                                 link={"/settings/payments"}
                                 icon={"/payments.png"}/>
                </div>
                <div className={"mb-24"}><Button type={"logout"} text={"Sign Out"}/></div>
            </div>
        </div>
    );
}
export default SettingsSelector;