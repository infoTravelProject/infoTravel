import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Button from "@/components/Button";
import Label from "@/components/Label";
import ToggleBox from "@/components/settings/ToggleBox";
import tempData from "@/data/tempData.json";
import tempLanguageData from "@/data/tempLanguageData.json";

const Preferences = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Preferences");

    //<temp>
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
            <div className={"flex justify-between flex-wrap gap-x-10 gap-y-5"}>
                <div className={"min-w-64"}><Button type={"select"} color={"blue"} selectType={"simple"} label={"theme"} selectData={tempData}
                selectDefault={mapper(tempData, "dark")}/></div>
                <div className={"min-w-64"}><Button type={"select"} color={"blue"} selectType={"simple"} label={"language"} selectData={tempLanguageData}
                selectDefault={mapper(tempLanguageData, "enus")}/></div>
                <div className={"min-w-64"}><Button type={"select"} color={"blue"} selectType={"simple"} label={"units"} selectData={tempData}/></div>
                <div className={"min-w-64"}><Button type={"select"} color={"blue"} selectType={"simple"} label={"currency"} selectData={tempData}/></div>
            </div>
            <Label text={"Profile"}/>
            <div className={"flex justify-between pb-4"}>
                <div className={"min-w-64"}><Button type={"select"} color={"blue"} selectType={"simple"} label={"profile theme"} selectData={tempData}/></div>
            </div>
            <ToggleBox text={"Display following/followers count"} type={"on"}/>
            <ToggleBox text={"Display nickname instead of first name"} type={"disabled"}/>
            <ToggleBox text={"Display age"}/>
            <ToggleBox text={"Display region"} type={true}/>
            <ToggleBox text={"Display visited countries & recently visited"} type={"on"}/>
        </div>
    );
};

export default Preferences;
