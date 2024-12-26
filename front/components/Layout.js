import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            <main className="bg-black bg-gradient-to-t from-black/0 to-[#1F90E0]/[0.12] min-h-screen min-w-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
}