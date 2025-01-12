import {useGlobalContext} from "@/components/context/GlobalContext";

const Preferences = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Preferences");

    return (
        <div className="text-white font-bold">
            <h1>Preferences</h1>
            <p>This is the Preferences section.</p>
        </div>
    );
};

export default Preferences;
