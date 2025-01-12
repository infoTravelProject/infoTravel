import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";

const Payments = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Payments");

    return (
        <div>
            <SettingsHeader/>
            <h1>Payments</h1>
            <p>This is the Payments section.</p>
        </div>
    );
};

export default Payments;
