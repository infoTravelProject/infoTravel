import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";

const Privacy = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Privacy");

    return (
        <div>
            <SettingsHeader/>
            <h1>Privacy</h1>
            <p>This is the Privacy section.</p>
        </div>
    );
};

export default Privacy;
