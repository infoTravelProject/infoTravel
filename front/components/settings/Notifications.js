import {useGlobalContext} from "@/components/context/GlobalContext";

const Notifications = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Notifications");

    return (
        <div className="text-white font-bold">
            <h1>Notifications</h1>
            <p>This is the Notifications section.</p>
        </div>
    );
};

export default Notifications;
