import Navbar from './Navbar';
import Footer from './Footer';
import {GlobalProvider} from "@/components/context/GlobalContext";

export default function Layout({ children }) {
    return (
        <GlobalProvider>
        <div>
            <Navbar />
            <main className="bg-black bg-gradient-to-t from-black/0 to-[#1F90E0]/[0.12] mt-20 min-h-screen min-w-screen">
                {children}
            </main>
            <Footer />
        </div>
        </GlobalProvider>
    );
}