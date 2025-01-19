'use client';
import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext(undefined, undefined);

export const GlobalProvider = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [sidebarPage, setSidebarPage] = useState(null);
    const [settingsPage, setSettingsPage] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("poland");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);
    //TODO
    //
    // const validateToken = async () => {
    //     if (!token) {
    //         logout();  // If no token, logout immediately
    //         return;
    //     }
    //
    //     try {
    //         const response = await fetch('http://localhost:8080/api/users/check-token', {
    //             headers: { authorization: `Bearer ${token}` },
    //         });
    //
    //         if (!response.ok) {
    //             throw new Error('Token is invalid or expired');
    //         }
    //
    //         const data = await response.json();
    //         console.log(data.message); // Token is valid
    //     } catch (err) {
    //         console.error(err.message);
    //         logout(); // Logout if token is invalid or expired
    //     }
    // };
    // useEffect(() => {
    //     if (token) {
    //         validateToken(); TODO add to export
    //     }
    // },[token]);

    const login = (userData, tokenData)=>{
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', tokenData);
    }

    const logout = ()=>{
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

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
                setSelectedCountry,
                login,
                logout,
                user
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
