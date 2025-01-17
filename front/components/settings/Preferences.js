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
    const tempLanguageData =[
        {
            id: 1,
            label: "English - US",
            value: "enus",
        },
        {
            id: 2,
            label: "English - UK",
            value: "enuk",
        },
        {
            id: 3,
            label: "Spanish",
            value: "es",
        },
        {
            id: 4,
            label: "Polish",
            value: "pl",
        },
        {
            id: 5,
            label: "German",
            value: "de",
        }
    ];
    function mapper(data, value){
        let returnItem;
        data.map(item => {
            if(item.value === value){
                returnItem = item;
            }
        });
        return returnItem;
    }
    //</temp>

    return (
        <div>
            <SettingsHeader/>
            <Label text={"General"}/>
            <div className={"flex justify-between"}>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}
                selectDefault={mapper(tempData, "dark")}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"language"} required={true} selectData={tempLanguageData}
                selectDefault={mapper(tempLanguageData, "enus")}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
                <Button type={"select"} color={"amber"} selectType={"simple"} label={"theme"} required={true} selectData={tempData}/>
            </div>
            <Label text={"Profile"}/>
        </div>
    );
};

export default Preferences;
