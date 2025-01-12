import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";

const Account = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Account");

    return (
        <div>
            <SettingsHeader/>
            <h1>Account</h1>
            <p>This is the Account section.</p>
        </div>
    );
};

export default Account;
