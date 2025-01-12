import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";

const Notifications = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Notifications");

    return (
        <div>
            <SettingsHeader/>
            <h1>Notifications</h1>
            <p>This is the Notifications section.</p>
        </div>
    );
};

export default Notifications;
