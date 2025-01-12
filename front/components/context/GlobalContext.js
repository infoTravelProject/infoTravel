'use client';
import {createContext, useContext, useState} from "react";

const GlobalContext = createContext(undefined, undefined);

export const GlobalProvider = ({ children }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {setSidebarOpen(!sidebarOpen);}

    return (<GlobalContext.Provider value={{
        sidebarOpen,
        toggleSidebar
    }}>{children}</GlobalContext.Provider>);
}
export const useGlobalContext = () => useContext(GlobalContext);