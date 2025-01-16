'use client';
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext(undefined, undefined);

export const GlobalProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [sidebarPage, setSidebarPage] = useState(null);
    const [settingsPage, setSettingsPage] = useState(null);

    const [selectedCountry, setSelectedCountry] = useState("poland");

    return (
        <GlobalContext.Provider
            value={{
                sidebarOpen,
                toggleSidebar,
                sidebarPage,
                setSidebarPage,
                settingsPage,
                setSettingsPage,
                selectedCountry,
                setSelectedCountry
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
