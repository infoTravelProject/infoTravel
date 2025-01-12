import {useGlobalContext} from "@/components/context/GlobalContext";

const Account = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Account");

    return (
        <div className="text-white font-bold">
            <h1>Account</h1>
            <p>This is the Account section.</p>
        </div>
    );
};

export default Account;
