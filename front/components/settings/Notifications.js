import {useGlobalContext} from "@/components/context/GlobalContext";
import SettingsHeader from "@/components/settings/SettingsHeader";
import Label from "@/components/Label";
import ToggleBox from "@/components/settings/ToggleBox";

const Notifications = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Notifications");

    return (
        <div>
            <SettingsHeader/>
            <Label text={"Email notifications"}/>
            <ToggleBox text={"Login alerts"}/>
            <ToggleBox text={"New features"}/>
            <ToggleBox text={"Recommended events and points of interest"}/>
            <ToggleBox text={"Special offers"}/>
            <ToggleBox text={"Upcoming trips and events"} type={true}/>
            <ToggleBox text={"Personalized news"} type={"disabled"}/>
            <ToggleBox text={"Personalized travel recommendations"} type={"disabled"}/>
            <ToggleBox text={"New travel guide releases"} type={"disabled"}/>
        </div>
    );
};

export default Notifications;
