import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Button from "@/components/Button";

const Preferences = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Preferences");

    //<temp>
    const tempData = [
        {
            id: 1,
            label: "I hate my eyes",
            value: "ultra-light",
        },
        {
            id: 2,
            label: "Light",
            value: "light",
        },
        {
            id: 3,
            label: "Dark",
            value: "dark",
        },
        {
            id: 4,
            label: "Python developer",
            value: "ultra-dark",
        }
    ];
    //</temp>

    return (
        <div>
            <SettingsHeader/>
            <h1>Preferences</h1>
            <p>This is the Preferences section.</p>
            <div className={"w-64"}>
                <Button type={"select"} color={"amber"} selectData={tempData}/>
            </div>
        </div>
    );
};

export default Preferences;
