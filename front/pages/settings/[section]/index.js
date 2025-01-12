import { useRouter } from "next/router";
import Account from "../../../components/settings/Account";
import Preferences from "../../../components/settings/Preferences";
import Notifications from "../../../components/settings/Notifications";
import Privacy from "../../../components/settings/Privacy";
import Payments from "../../../components/settings/Payments";
import SettingsSelector from "@/components/settings/SettingsSelector";
import Head from "next/head";
import {useGlobalContext} from "@/components/context/GlobalContext";

const SettingsSection = () => {
    const router = useRouter();
    const { section } = router.query;

    const {setSidebarPage} = useGlobalContext();
    setSidebarPage("Settings");

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
        <div className="flex flex-row">
            <Head>
                <title>Settings - infoTravel</title>
            </Head>
            {/* left navbar */}
            <SettingsSelector/>
            {/* right section */}
            <main className="flex-grow px-16">
                {renderSection()}
            </main>
        </div>
    );
};

export default SettingsSection;
