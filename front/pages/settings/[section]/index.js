import Link from "next/link";
import { useRouter } from "next/router";
import Account from "../../../components/settings/Account";
import Preferences from "../../../components/settings/Preferences";
import Notifications from "../../../components/settings/Notifications";
import Privacy from "../../../components/settings/Privacy";
import Payments from "../../../components/settings/Payments";

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
            <nav className="w-1/3 bg-gray-800 p-4 text-white font-bold">
                <ul>
                    <li className="mb-2">
                        <Link href="/settings/preferences">Preferences</Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings/account">Account</Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings/privacy">Privacy & Security</Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings/notifications">Notifications</Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/settings/payments">Payments</Link>
                    </li>
                </ul>
            </nav>


            {/* right section */}
            <main className="w-2/3 p-4">
                {renderSection()}
            </main>
        </div>
    );
};

export default SettingsSection;
