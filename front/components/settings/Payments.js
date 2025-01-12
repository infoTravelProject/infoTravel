import {useGlobalContext} from "@/components/context/GlobalContext";

const Payments = () => {
    const {setSettingsPage} = useGlobalContext();
    setSettingsPage("Payments");

    return (
        <div className="text-white font-bold">
            <h1>Payments</h1>
            <p>This is the Payments section.</p>
        </div>
    );
};

export default Payments;
