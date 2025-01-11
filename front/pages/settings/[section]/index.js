import { useRouter } from "next/router";
import Account from "../../../components/settings/Account";
import Preferences from "../../../components/settings/Preferences";
import Notifications from "../../../components/settings/Notifications";
import Privacy from "../../../components/settings/Privacy";
import Payments from "../../../components/settings/Payments";
import SettingsSelector from "@/components/settings/SettingsSelector";

const SettingsSection = () => {
    const router = useRouter();
    const { section } = router.query;

    const renderSection = () => {
        switch (section) {
            case "account":
                return <Account />;
            case "preferences":
                return <Preferences />;
            case "notifications":
                return <Notifications />;
            case "privacy":
                return <Privacy />;
            case "payments":
                return <Payments />;
            default:
                return <Preferences />;
        }
    };

    return (
        <div className="flex min-h-screen">
            {/* left navbar */}
            <SettingsSelector/>
            {/* right section */}
            <main className="w-2/3 p-4">
                {renderSection()}
            </main>
        </div>
    );
};

export default SettingsSection;
