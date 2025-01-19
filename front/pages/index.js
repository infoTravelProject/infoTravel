import {useGlobalContext} from "@/components/context/GlobalContext";
import MapComponent from "@/components/MapComponent";

export default function Home() {
    const {setSidebarPage} = useGlobalContext();
    setSidebarPage("Home");

    return (
        <div className={"w-full"}>
            <MapComponent/>
        </div>
    );
}