import Image from "next/image";
import SelectorBox from "@/components/settings/SelectorBox";

const SettingsSelector = () =>{
    return(
        <div className="flex flex-col items-center w-72 h-screen bg-[#1E1E1E]/[0.8]">
            <div className="w-full h-20 bg-white/[0.1] shadow-lg text-white/[0.6] font-inter text-2xl flex flex-col justify-center text-center">SETTINGS</div>
            <div className="w-64 h-12 rounded-full bg-white/[0.11] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] flex-row flex row items-center mt-4">
                <Image src={"/search_white.png"} width={512} height={512} alt={"?"}
                       className="w-5 h-5 ml-4 opacity-50"/>
                <div className="font-inter text-white/[0.35] ml-4 cursor-default">Search placeholder</div>
            </div>
            <div className="flex flex-col w-full h-full justify-between items-center">
                <div className="w-full h-fit mt-6">
                    <SelectorBox title={"Preferences"} isActive={true} link={"/settings/preferences"}
                                 icon={"/preferences.png"}/>
                    <SelectorBox title={"Account"} isActive={false} link={"/settings/account"} icon={"/side_news.png"}/>
                    <SelectorBox title={"Privacy & security"} isActive={false} link={"/settings/privacy"}
                                 icon={"/privacy.png"}/>
                    <SelectorBox title={"Notifications"} isActive={false} link={"/settings/notifications"}
                                 icon={"/notifications.png"}/>
                    <SelectorBox title={"Payments"} isActive={false} link={"/settings/payments"} icon={"/payments.png"}/>
                </div>
                <div className="flex flex-row bg-black/[0.25] w-fit rounded-full mb-24 cursor-pointer transition hover:bg-black/[0.35] hover:border-amber-600 border-transparent border-2">
                    <div className="w-8 flex flex-col justify-center ml-8">
                        <Image src={"/logout.png"} width={500} height={500} alt={"?"} className="scale-75"/>
                    </div>
                    <div className="pr-10 pl-2 py-4 text-white/[0.9] text-xl">Sign out</div>
                </div>
            </div>
        </div>
    );
}
export default SettingsSelector;