import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MainContent from '../components/HomeContent';
import Footer from '../components/Footer';
import UsersContent from "../components/UsersContent";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <UsersContent className="flex-1" /> {/* Ensure UsersContent has flex-1 */}
            <Footer />
        </div>
    );
};

export default Layout;
