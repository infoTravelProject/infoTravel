import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Button from "@/components/Button";
import Label from "@/components/Label";

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
            <Label text={"General"}/>
            <div className={"flex justify-between"}>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
            </div>
            <Label text={"Profile"}/>
        </div>
    );
};

export default Preferences;
