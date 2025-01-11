import { useEffect } from "react";
import { useRouter } from "next/router";

const SettingsIndex = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/settings/preferences");
    }, [router]);

    return null;
};

export default SettingsIndex;
