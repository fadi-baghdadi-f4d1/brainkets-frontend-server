import React from 'react';
import Navbar from '../components/Navbar';
import MainContent from '../components/HomeContent';
import Footer from '../components/Footer';
import Chat from "@/components/Chat";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            {/* @ts-ignore */}
            <MainContent className="flex-1"/> {/* Ensure MainContent has flex-1 */}
            <div className="bg-[#1B3483]">
                <Chat/>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;