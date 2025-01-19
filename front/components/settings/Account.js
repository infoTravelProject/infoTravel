import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Label from "@/components/Label";
import Button from "@/components/Button";
import tempLanguageData from "@/data/tempLanguageData.json";

const Account = () => {

    const {setSettingsPage, user} = useGlobalContext();
    setSettingsPage("Account");

    function mapper(data, value){
        let returnItem;
        data.map(item => {
            if(item.value === value){
                returnItem = item;
            }
        });
        return returnItem;
    }

    return (
        <div>
            <SettingsHeader/>
            <Label text={"Public information"}/>
            <div className="flex flex-col gap-y-5">
                <div className={"flex justify-between flex-wrap gap-x-10 gap-y-5"}>
                    <Button type={"input"} label={"first name"} required={true} inputPlaceholder={"Enter first name"} selectDefault={user&& user.firstName} color={"amber"}/>
                    <Button type={"input"} label={"last name"} required={true} inputPlaceholder={"Enter last name"} selectDefault={user&& user.lastName} color={"amber"}/>
                    <Button type={"input"} label={"nickname"} inputPlaceholder={"Enter nickname"} selectDefault={user&& user.nickname}/>
                    <Button type={"input"} label={"date of birth"} inputPlaceholder={"dd/mm/yyyy"} selectDefault={user&& user.dateOfBirth}/>
                </div>
                <div className={"flex justify-between flex-wrap gap-x-10 gap-y-5"}>
                    <div className={"flex-1 max-w-2xl"}><Button type={"input"} inputType={"textarea"} label={"profile bio"} inputPlaceholder={"Write about yourself..."} selectDefault={user&& user.profileBio}/></div>
                    <div className={"min-w-64"}><Button type={"select"} selectData={tempLanguageData} label={"region"} required={true} color={"amber"} selectDefault={user&& mapper(tempLanguageData, user.region)}/></div>
                    <div className={"w-64"}></div>
                </div>
                <div className={"flex justify-end"}>
                    <button className={"pointer-events-none"}><Button text={"Save changes"} color={"grey"}/></button>
                </div>
            </div>
            <Label text={"private information"}/>
            <div className="flex flex-col gap-y-5">
                <div className={"flex justify-between flex-warp gap-x-10 gap-y-5"}>
                    <Button type={"input"} label={"email"} required={true} inputPlaceholder={"Enter email"} selectDefault={user&& user.email} color={"amber"}/>
                    <Button type={"input"} label={"phone umber"} inputPlaceholder={"+48 xxx xxx xxx"} selectDefault={user&& user.phoneNumber}/>
                    <div className={"w-64"}></div>
                    <Button type={"input"} inputType={"password"} label={"password"} required={true} inputPlaceholder={"Current password"} color={"red"}></Button>
                </div>
                <div className={"flex justify-between flex-warp gap-x-10 gap-y-5"}>
                    <button><Button text={"Add recovery email"} type={"button-contrast"}/></button>
                    <button><Button text={"Change password"} type={"button-contrast"} color={"red"}/></button>
                </div>
                <div className={"flex justify-between flex-warp gap-x-10 gap-y-5"}>
                    <button><Button text={"Change email"} type={"button-contrast"} color={"amber"}/></button>
                    <button><Button text={"Delete account"} type={"button-contrast"} color={"red"}/></button>
                </div>
            </div>
        </div>
    );
};

export default Account;
