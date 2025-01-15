import SelectorBox from "@/components/settings/SelectorBox";
import Button from "@/components/Button";
import {useGlobalContext} from "@/components/context/GlobalContext";

const SettingsSelector = () =>{
    const {settingsPage} = useGlobalContext();
    return(
        <div className="flex flex-col items-center w-72 h-screen bg-[#1E1E1E]/[0.8]">
            <div className="flex-none w-full h-20 bg-white/[0.1] shadow-lg text-white/[0.6] font-inter text-2xl flex flex-col justify-center text-center">SETTINGS</div>
            <form className="w-full px-4 mt-6">
                <Button type={"input"} inputType={"search-button"} inputPlaceholder={"Search settings"} color="amber"/>
            </form>
            <div className="flex flex-col w-full h-full justify-between items-center">
                <div className="w-full h-fit mt-5">
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