import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import MainContent from '../../components/UserProfile';
import Footer from '../../components/Footer';
import Chat from "@/components/Chat";

const Layout: React.FC<React.PropsWithChildren> = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Ensure MainContent has flex-1 */}
            <MainContent />
            <div className="bg-[#1B3483]">
                <Chat/>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;