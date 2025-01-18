import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Label from "@/components/Label";
import Button from "@/components/Button";
import tempLanguageData from "@/data/tempLanguageData.json";

const Account = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Account");

    return (
        <div>
            <SettingsHeader/>
            <Label text={"Public information"}/>
            <div className="flex flex-col gap-y-5">
                <div className={"flex justify-between flex-wrap gap-x-10 gap-y-5"}>
                    <Button type={"input"} label={"first name"} required={true} inputPlaceholder={"Enter first name"} selectDefault={"Example"} color={"amber"}/>
                    <Button type={"input"} label={"last name"} required={true} inputPlaceholder={"Enter last name"} selectDefault={"User"} color={"amber"}/>
                    <Button type={"input"} label={"nickname"} inputPlaceholder={"Enter nickname"}/>
                    <Button type={"input"} label={"date of birth"} inputPlaceholder={"dd/mm/yyyy"}/>
                </div>
                <div className={"flex justify-between flex-wrap gap-x-10 gap-y-5"}>
                    <div className={"flex-1 max-w-2xl"}><Button type={"input"} inputType={"textarea"} label={"profile bio"} inputPlaceholder={"Write about yourself..."}/></div>
                    <div className={"min-w-64"}><Button type={"select"} selectData={tempLanguageData} label={"region"} required={true} color={"amber"}/></div>
                    <div className={"w-64"}></div>
                </div>
                <div className={"flex justify-end"}>
                    <button className={"pointer-events-none"}><Button text={"Save changes"} color={"grey"}/></button>
                </div>
            </div>
            <Label text={"private information"}/>
            <div className="flex flex-col gap-y-5">
                <div className={"flex justify-between"}>
                    <Button type={"input"} label={"email"} required={true} inputPlaceholder={"Enter email"} selectDefault={"exampleuser@gmail.com"} color={"amber"}/>
                    <Button type={"input"} label={"phone umber"} inputPlaceholder={"+48 xxx xxx xxx"}/>
                    <div className={"w-64"}></div>
                    <Button type={"input"} inputType={"password"} label={"password"} required={true} inputPlaceholder={"Current password"} color={"red"}></Button>
                </div>
                <div className={"flex justify-between"}>
                    <button><Button text={"Add recovery email"} type={"button-contrast"}/></button>
                    <button><Button text={"Change password"} type={"button-contrast"} color={"red"}/></button>
                </div>
                <div className={"flex justify-between"}>
                    <button><Button text={"Change email"} type={"button-contrast"} color={"amber"}/></button>
                    <button><Button text={"Delete account"} type={"button-contrast"} color={"red"}/></button>
                </div>
            </div>
        </div>
    );
};

export default Account;
