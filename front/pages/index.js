import {useGlobalContext} from "@/components/context/GlobalContext";

export default function Home() {
    const {setSidebarPage} = useGlobalContext();
    setSidebarPage("Home");

    return (
        <div>
            <h1 className="text-white text-5xl font-inter p-56 font-bold flex items-center justify-center">
                Welcome to InfoTravel!
            </h1>
        </div>
    );
}