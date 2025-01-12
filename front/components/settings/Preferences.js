import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";

const Preferences = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Preferences");

    return (
        <div>
            <SettingsHeader/>
            <h1>Preferences</h1>
            <p>This is the Preferences section.</p>
        </div>
    );
};

export default Preferences;
