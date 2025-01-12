import {useGlobalContext} from "@/components/context/GlobalContext";

const Privacy = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Privacy");

    return (
        <div className="text-white font-bold">
            <h1>Privacy</h1>
            <p>This is the Privacy section.</p>
        </div>
    );
};

export default Privacy;
